import type { IncomingMessage, ServerResponse } from "http";
import { appendConsultRow } from "./sheets.js";

export default async function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "method not allowed", success: false }));
    return;
  }

  let body: Record<string, string> = {};
  if (req.body && typeof req.body === "object") {
    body = req.body as Record<string, string>;
  } else {
    await new Promise<void>((resolve) => {
      let raw = "";
      req.on("data", (chunk) => { raw += chunk; });
      req.on("end", () => {
        try { body = JSON.parse(raw); } catch { /* ignore */ }
        resolve();
      });
    });
  }

  const { company, name, phone, email, message } = body;
  if (!company || !name || !phone || !email) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "필수 항목을 모두 입력해 주세요.", success: false }));
    return;
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "서버 설정 오류입니다. 관리자에게 문의해 주세요.", success: false }));
    return;
  }

  const text = [
    `*새 상담 신청이 들어왔습니다* :bell:`,
    `• *로펌(회사)*: ${company}`,
    `• *담당자*: ${name}`,
    `• *연락처*: ${phone}`,
    `• *이메일*: ${email}`,
    message ? `• *문의 내용*: ${message}` : null,
  ].filter(Boolean).join("\n");

  const [slackRes] = await Promise.all([
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }),
    appendConsultRow({ company, name, phone, email, message }).catch(() => {}),
  ]);

  if (!slackRes.ok) {
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", success: false }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: true, success: true }));
}

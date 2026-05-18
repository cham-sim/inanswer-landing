import type { IncomingMessage, ServerResponse } from "http";

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

  const { name, company, email, reportId } = body;
  if (!name || !company || !email) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "필수 항목을 모두 입력해 주세요.", success: false }));
    return;
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (webhookUrl) {
    const text = [
      `*리포트 다운로드 요청* :page_facing_up:`,
      `• *리포트*: ${reportId ?? "unknown"}`,
      `• *이름*: ${name}`,
      `• *소속*: ${company}`,
      `• *이메일*: ${email}`,
    ].join("\n");
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }).catch(() => {});
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: true, success: true }));
}

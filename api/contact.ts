import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  if (req.method !== "POST") {
    res.writeHead(405).end();
    return;
  }

  const { company, name, phone, email } = (req.body ?? {}) as Record<string, string>;
  if (!company || !name || !phone || !email) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "missing fields" }));
    return;
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "webhook not configured" }));
    return;
  }

  const text = [
    `*새 상담 신청이 들어왔습니다* :bell:`,
    `• *로펌(회사)*: ${company}`,
    `• *담당자*: ${name}`,
    `• *연락처*: ${phone}`,
    `• *이메일*: ${email}`,
  ].join("\n");

  const slackRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!slackRes.ok) {
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "slack error" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: true }));
}

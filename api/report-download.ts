import type { IncomingMessage, ServerResponse } from "http";
import { Resend } from "resend";
import { buildReportEmailHtml } from "./report-email-html.js";

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

  // Send email via Resend
  let emailStatus = "skipped";
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL ?? "InAnswer <noreply@inanswer.kr>";
  const siteUrl = process.env.SITE_URL ?? "https://inanswer.kr";

  if (resendApiKey) {
    const resend = new Resend(resendApiKey);

    // Fetch PDF and attach
    let attachments: { filename: string; content: string }[] = [];
    try {
      const pdfRes = await fetch(`${siteUrl}/report-ai-citation-v1.pdf`);
      if (pdfRes.ok) {
        const buf = await pdfRes.arrayBuffer();
        attachments = [{
          filename: "대한민국로펌AI인용현황리포트_2026.05.pdf",
          content: Buffer.from(buf).toString("base64"),
        }];
      }
    } catch { /* PDF 첨부 실패 시 본문만 발송 */ }

    const pdfUrl = `${siteUrl}/report-ai-citation-v1.pdf`;
    const consultUrl = `${siteUrl}/consult`;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "[InAnswer] 대한민국 로펌 AI 인용 현황 리포트",
      html: buildReportEmailHtml(name, pdfUrl, consultUrl),
      attachments,
    });
    emailStatus = error ? `failed: ${error.message}` : "sent";
  }

  // Notify Slack
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (webhookUrl) {
    const emailEmoji = emailStatus === "sent" ? ":white_check_mark:" : emailStatus === "skipped" ? ":grey_question:" : ":x:";
    const text = [
      `*리포트 다운로드 요청* :page_facing_up:`,
      `• *리포트*: ${reportId ?? "unknown"}`,
      `• *이름*: ${name}`,
      `• *소속*: ${company}`,
      `• *이메일*: ${email}`,
      `• *메일 발송*: ${emailEmoji} ${emailStatus}`,
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

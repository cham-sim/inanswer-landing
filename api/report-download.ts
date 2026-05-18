import type { IncomingMessage, ServerResponse } from "http";
import { Resend } from "resend";

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
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "[InAnswer] 대한민국 로펌 AI 인용 현황 리포트 다운로드 링크",
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #111;">
          <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">리포트 다운로드 링크</h2>
          <p style="color: #555; margin-bottom: 24px;">안녕하세요, ${name}님. 아래 버튼을 클릭하시면 리포트를 다운로드하실 수 있습니다.</p>
          <a href="${siteUrl}/report-ai-citation-v1.pdf" style="display: inline-block; padding: 14px 28px; background: #1B3A2D; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">PDF 다운로드</a>
          <p style="margin-top: 32px; font-size: 12px; color: #999;">본 메일은 InAnswer 리포트 신청에 의해 자동 발송되었습니다.</p>
        </div>
      `,
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

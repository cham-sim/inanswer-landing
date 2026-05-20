import { Resend } from "resend";
import { buildReportEmailHtml } from "./report-email-html.js";
import type { Report } from "./report-config.js";
import { REPORT_EMAIL_FROM } from "./report-config.js";
import { makeReportToken } from "./report-token.js";
import { appendReportRow } from "./sheets.js";

export async function sendReportEmail({
  report,
  name,
  email,
  siteUrl,
}: {
  report: Report;
  name: string;
  email: string;
  siteUrl: string;
}): Promise<string> {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) return "skipped";

  const resend = new Resend(resendApiKey);
  const fromEmail = process.env.FROM_EMAIL ?? REPORT_EMAIL_FROM;
  const token = makeReportToken(report.id, email);
  const pdfUrl = `${siteUrl}/api/report-file?t=${token}`;
  const consultUrl = `${siteUrl}/consult`;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: report.emailSubject,
    html: buildReportEmailHtml(name, pdfUrl, consultUrl),
  });

  return error ? `failed: ${error.message}` : "sent";
}

export async function notifySlack({
  name,
  company,
  email,
  reportId,
  emailStatus,
}: {
  name: string;
  company: string;
  email: string;
  reportId?: string;
  emailStatus: string;
}): Promise<void> {
  const tasks: Promise<unknown>[] = [
    appendReportRow({ name, company, email, reportId, emailStatus }).catch(() => {}),
  ];

  if (process.env.NODE_ENV === "production") {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl) {
      const emailEmoji =
        emailStatus === "sent"
          ? ":white_check_mark:"
          : emailStatus === "skipped"
            ? ":grey_question:"
            : ":x:";

      const text = [
        `*리포트 다운로드 요청* :page_facing_up:`,
        `• *리포트*: ${reportId ?? "unknown"}`,
        `• *이름*: ${name}`,
        `• *소속*: ${company}`,
        `• *이메일*: ${email}`,
        `• *메일 발송*: ${emailEmoji} ${emailStatus}`,
      ].join("\n");

      tasks.push(
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }).catch(() => {}),
      );
    }
  }

  await Promise.all(tasks);
}

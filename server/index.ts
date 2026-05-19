import "dotenv/config";
import express from "express";
import { readFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import { buildReportEmailHtml } from "../api/report-email-html.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  app.post("/api/contact", async (req, res) => {
    const { company, name, phone, email } = req.body ?? {};
    if (!company || !name || !phone || !email) {
      res.status(400).json({ error: "필수 항목을 모두 입력해 주세요.", success: false });
      return;
    }

    if (process.env.NODE_ENV === "production") {
      const webhookUrl = process.env.SLACK_WEBHOOK_URL;
      if (!webhookUrl) {
        res.status(500).json({ error: "서버 설정 오류입니다. 관리자에게 문의해 주세요.", success: false });
        return;
      }

      const { message } = req.body ?? {};
      const text = [
        `*새 상담 신청이 들어왔습니다* :bell:`,
        `• *로펌(회사)*: ${company}`,
        `• *담당자*: ${name}`,
        `• *연락처*: ${phone}`,
        `• *이메일*: ${email}`,
        message ? `• *문의 내용*: ${message}` : null,
      ].filter(Boolean).join("\n");

      const slackRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!slackRes.ok) {
        res.status(502).json({ error: "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", success: false });
        return;
      }
    }

    res.json({ ok: true, success: true });
  });

  app.post("/api/report-download", async (req, res) => {
    const { name, company, email, reportId } = req.body ?? {};
    if (!name || !company || !email) {
      res.status(400).json({ error: "missing fields", success: false });
      return;
    }

    // Send email via Resend
    let emailStatus = "skipped";
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL ?? "InAnswer <noreply@inanswer.kr>";

    console.log("[report-download] RESEND_API_KEY:", resendApiKey ? "✓ set" : "✗ missing");

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      let attachments: { filename: string; content: Buffer }[] = [];
      try {
        const pdfPath = path.resolve(__dirname, "..", "client", "public", "lawfirm-geo-report-202605.pdf");
        console.log("[report-download] PDF path:", pdfPath);
        const pdfBuffer = await readFile(pdfPath);
        attachments = [{ filename: "대한민국로펌AI인용현황리포트_2026.05.pdf", content: pdfBuffer }];
        console.log("[report-download] PDF loaded, size:", pdfBuffer.length);
      } catch (e) {
        console.error("[report-download] PDF read failed:", e);
      }

      console.log("[report-download] Sending email to:", email, "from:", fromEmail);
      const siteUrl = process.env.SITE_URL ?? "https://inanswer.kr";
      const pdfUrl = `${siteUrl}/lawfirm-geo-report-202605.pdf`;
      const consultUrl = `${siteUrl}/consult`;

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "[InAnswer] 대한민국 로펌 AI 인용 현황 리포트",
        html: buildReportEmailHtml(name, pdfUrl, consultUrl),
        attachments,
      });
      if (error) {
        console.error("[report-download] Resend error:", error);
        emailStatus = `failed: ${error.message}`;
      } else {
        console.log("[report-download] Resend success, id:", data?.id);
        emailStatus = "sent";
      }
    }

    if (process.env.NODE_ENV === "production") {
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
    }

    res.json({ ok: true, success: true });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

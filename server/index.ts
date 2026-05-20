import "dotenv/config";
import express from "express";
import { readFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { getReport } from "../api/report-config.js";
import { sendReportEmail, notifySlack } from "../api/report-send.js";
import { verifyReportToken } from "../api/report-token.js";
import { appendConsultRow } from "../api/sheets.js";

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

    const { message } = req.body ?? {};

    if (process.env.NODE_ENV === "production") {
      const webhookUrl = process.env.SLACK_WEBHOOK_URL;
      if (!webhookUrl) {
        res.status(500).json({ error: "서버 설정 오류입니다. 관리자에게 문의해 주세요.", success: false });
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

    await appendConsultRow({ company, name, phone, email, message }).catch(() => {});

    res.json({ ok: true, success: true });
  });

  app.post("/api/report-download", async (req, res) => {
    const { name, company, email, reportId } = req.body ?? {};
    if (!name || !company || !email) {
      res.status(400).json({ error: "missing fields", success: false });
      return;
    }

    const report = getReport(reportId);
    const siteUrl = process.env.NODE_ENV === "production"
      ? (process.env.SITE_URL ?? "https://inanswer.kr")
      : `${req.protocol}://${req.get("host")}`;

    const emailStatus = report
      ? await sendReportEmail({ report, name, email, siteUrl })
      : "skipped";

    await notifySlack({ name, company, email, reportId, emailStatus });

    res.json({ ok: true, success: true });
  });

  app.get("/api/report-file", async (req, res) => {
    const token = req.query.t as string | undefined;
    if (!token) {
      res.status(400).send("missing token");
      return;
    }

    const payload = verifyReportToken(token);
    if (!payload) {
      res.status(403).send("invalid or tampered token");
      return;
    }

    const report = getReport(payload.reportId);
    if (!report) {
      res.status(404).send("report not found");
      return;
    }

    try {
      const pdfPath = path.resolve(__dirname, "..", "private", report.pdfFilename);
      const pdfBuffer = await readFile(pdfPath);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${report.pdfFilename}"; filename*=UTF-8''${encodeURIComponent(report.pdfDisplayName)}`);
      res.send(pdfBuffer);
    } catch {
      res.status(404).send("file not found");
    }
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

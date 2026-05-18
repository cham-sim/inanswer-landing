import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  app.post("/api/contact", async (req, res) => {
    const { company, name, phone, email } = req.body ?? {};
    if (!company || !name || !phone || !email) {
      res.status(400).json({ error: "missing fields" });
      return;
    }

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
      res.status(500).json({ error: "webhook not configured" });
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
      res.status(502).json({ error: "slack error" });
      return;
    }

    res.json({ ok: true });
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

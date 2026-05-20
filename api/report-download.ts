import type { IncomingMessage, ServerResponse } from "http";
import { getReport } from "./report-config.js";
import { sendReportEmail, notifySlack } from "./report-send.js";

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

  const report = getReport(reportId);
  const siteUrl = process.env.SITE_URL ?? "https://inanswer.kr";

  const emailStatus = report
    ? await sendReportEmail({ report, name, email, siteUrl })
    : "skipped";

  await notifySlack({ name, company, email, reportId, emailStatus });

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: true, success: true }));
}

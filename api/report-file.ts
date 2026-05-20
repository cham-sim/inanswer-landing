import type { IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs/promises";
import path from "path";
import { getReport } from "./report-config.js";
import { verifyReportToken } from "./report-token.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "GET") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "method not allowed" }));
    return;
  }

  const url = new URL(req.url ?? "", `http://${req.headers.host}`);
  const token = url.searchParams.get("t");

  if (!token) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("missing token");
    return;
  }

  const payload = verifyReportToken(token);
  if (!payload) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("invalid or tampered token");
    return;
  }

  const report = getReport(payload.reportId);
  if (!report) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("report not found");
    return;
  }

  try {
    const pdfPath = path.join(process.cwd(), "private", report.pdfFilename);
    const pdfBuffer = await readFile(pdfPath);
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${report.pdfFilename}"; filename*=UTF-8''${encodeURIComponent(report.pdfDisplayName)}`,
    });
    res.end(pdfBuffer);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("file not found");
  }
}

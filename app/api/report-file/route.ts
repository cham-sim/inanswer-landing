import { readFile } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";
import { verifyReportToken } from "@api/report-token";
import { getReport } from "@api/report-config";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("t");
  if (!token) return new Response("missing token", { status: 400 });

  const payload = verifyReportToken(token);
  if (!payload) return new Response("invalid token", { status: 403 });

  const report = getReport(payload.reportId);
  if (!report) return new Response("report not found", { status: 404 });

  try {
    const pdfPath = path.join(process.cwd(), "private", report.pdfFilename);
    const pdfBuffer = await readFile(pdfPath);
    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${report.pdfFilename}"; filename*=UTF-8''${encodeURIComponent(report.pdfDisplayName)}`,
      },
    });
  } catch {
    return new Response("file not found", { status: 404 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getReport } from "@api/report-config";
import { sendReportEmail, notifySlack } from "@api/report-send";

export async function POST(req: NextRequest) {
  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    // ignore
  }

  const { name, company, email, reportId } = body;
  if (!name || !company || !email) {
    return NextResponse.json(
      { error: "필수 항목을 모두 입력해 주세요.", success: false },
      { status: 400 },
    );
  }

  const report = getReport(reportId);
  const siteUrl =
    process.env.NODE_ENV === "production"
      ? (process.env.SITE_URL ?? "https://inanswer.kr")
      : req.nextUrl.origin;

  const emailStatus = report
    ? await sendReportEmail({ report, name, email, siteUrl })
    : "skipped";

  await notifySlack({ name, company, email, reportId, emailStatus });

  return NextResponse.json({ ok: true, success: true });
}

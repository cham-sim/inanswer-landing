import { NextRequest, NextResponse } from "next/server";
import { appendConsultRow } from "@api/sheets";

export async function POST(req: NextRequest) {
  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    // ignore
  }

  const { company, name, phone, email, message } = body;
  if (!company || !name || !phone || !email) {
    return NextResponse.json(
      { error: "필수 항목을 모두 입력해 주세요.", success: false },
      { status: 400 },
    );
  }

  if (process.env.NODE_ENV === "production") {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "서버 설정 오류입니다. 관리자에게 문의해 주세요.", success: false },
        { status: 500 },
      );
    }

    const text = [
      `*새 상담 신청이 들어왔습니다* :bell:`,
      `• *로펌(회사)*: ${company}`,
      `• *담당자*: ${name}`,
      `• *연락처*: ${phone}`,
      `• *이메일*: ${email}`,
      message ? `• *문의 내용*: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const slackRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!slackRes.ok) {
      return NextResponse.json(
        { error: "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", success: false },
        { status: 502 },
      );
    }
  }

  await appendConsultRow({ company, name, phone, email, message }).catch(() => {});

  return NextResponse.json({ ok: true, success: true });
}

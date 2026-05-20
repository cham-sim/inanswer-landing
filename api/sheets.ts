async function postToSheet(sheet: string, row: string[]): Promise<void> {
  if (process.env.NODE_ENV !== "production") return;
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.GOOGLE_SHEETS_SECRET ?? "",
      sheet,
      row,
    }),
  }).catch(() => {});
}

export async function appendConsultRow(data: {
  company: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
}): Promise<void> {
  const timestamp = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  await postToSheet("상담", [timestamp, data.company, data.name, data.phone, data.email, data.message ?? ""]);
}

export async function appendReportRow(data: {
  name: string;
  company: string;
  email: string;
  reportId?: string;
  emailStatus: string;
}): Promise<void> {
  const timestamp = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  await postToSheet("리포트", [timestamp, data.reportId ?? "", data.name, data.company, data.email, data.emailStatus]);
}

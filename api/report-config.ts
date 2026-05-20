export const REPORT_EMAIL_FROM = "인앤써(InAnswer) <noreply@inanswer.kr>";

export interface Report {
  id: string;
  pdfFilename: string;
  pdfDisplayName: string;
  emailSubject: string;
}

export const REPORTS: Report[] = [
  {
    id: "lawfirm-geo-report-202605",
    pdfFilename: "lawfirm-geo-report-202605.pdf",
    pdfDisplayName: "대한민국로펌AI인용현황리포트_2026.05.pdf",
    emailSubject:
      "[🔗다운로드 링크] 2026년 5월 대한민국 로펌 AI 인용 현황 리포트가 도착했습니다📊",
  },
];

export function getReport(id: string): Report | undefined {
  return REPORTS.find((r) => r.id === id);
}

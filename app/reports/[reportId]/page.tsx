import ReportPage from "@/pages/reports/ReportPage";

export default async function Page({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;
  return <ReportPage reportId={reportId} />;
}

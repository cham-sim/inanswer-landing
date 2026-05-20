import { notFound } from "next/navigation";
import LawfirmGeoReport202605 from "./LawfirmGeoReport202605";

const REPORT_COMPONENTS: Record<string, React.ComponentType<{ reportId: string }>> = {
  "lawfirm-geo-report-202605": LawfirmGeoReport202605,
};

export default function ReportPage({ reportId }: { reportId: string }) {
  const ReportComponent = REPORT_COMPONENTS[reportId];
  if (!ReportComponent) notFound();
  return <ReportComponent reportId={reportId} />;
}

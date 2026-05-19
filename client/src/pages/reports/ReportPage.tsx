import { useParams } from "wouter";
import NotFound from "@/pages/NotFound";
import LawfirmGeoReport202605 from "./LawfirmGeoReport202605";

const REPORT_COMPONENTS: Record<string, React.ComponentType<{ reportId: string }>> = {
  "lawfirm-geo-report-202605": LawfirmGeoReport202605,
};

export default function ReportPage() {
  const { reportId } = useParams<{ reportId: string }>();

  const ReportComponent = reportId ? REPORT_COMPONENTS[reportId] : undefined;

  if (!ReportComponent) return <NotFound />;

  return <ReportComponent reportId={reportId} />;
}

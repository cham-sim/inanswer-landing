import { Redirect } from "wouter";

// 리포트가 하나일 때는 바로 해당 리포트로 redirect.
// 여러 리포트가 생기면 이 컴포넌트를 리스트 UI로 교체하면 됨.
export default function ReportsList() {
  return <Redirect to="/reports/lawfirm-geo-report-202605" />;
}

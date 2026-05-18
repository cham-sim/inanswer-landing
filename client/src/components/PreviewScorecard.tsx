function ScoreBadge({ label, tone }: { label: string; tone: string }) {
  const colors =
    tone === "good"
      ? { bg: "rgba(31,138,91,0.12)", fg: "#1F8A5B" }
      : tone === "caution"
      ? { bg: "rgba(182,68,0,0.12)", fg: "var(--caution)" }
      : { bg: "rgba(0,0,0,0.06)", fg: "var(--graphite)" };
  return (
    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 999, background: colors.bg, color: colors.fg, letterSpacing: "0.02em" }}>
      {label}
    </span>
  );
}

function SummaryCard({ title, subtitle, score, total, status, tone }: { title: string; subtitle: string; score: number; total: number; status: string; tone: string }) {
  const barColor = tone === "good" ? "#1F8A5B" : "var(--caution)";
  return (
    <div style={{ padding: "12px 14px", background: "var(--snow)", borderRadius: 10, border: "1px solid var(--silver-mist)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>{title}</div>
        <ScoreBadge label={status} tone={tone} />
      </div>
      <div style={{ fontSize: 9.5, color: "var(--graphite)", marginTop: 3, lineHeight: 1.4, height: 26, overflow: "hidden" }}>{subtitle}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginTop: 6 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{score}</span>
        <span style={{ fontSize: 10, color: "var(--graphite)" }}>/ {total}</span>
      </div>
      <div style={{ height: 5, marginTop: 8, background: "var(--fog)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(score / total) * 100}%`, background: barColor, borderRadius: 999 }} />
      </div>
    </div>
  );
}

function BreakdownItem({ name, count, scoreText, barPct, status, tone, highlight }: { name: string; count: number; scoreText: string; barPct: number; status: string; tone: string; highlight?: boolean }) {
  const barColor = tone === "good" ? "#1F8A5B" : "var(--caution)";
  return (
    <div style={{ padding: "10px 12px", background: highlight ? "var(--fog)" : "var(--snow)", border: highlight ? "1px solid var(--ink)" : "1px solid var(--silver-mist)", borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: "var(--ink)", display: "inline-flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontWeight: 600 }}>{name}</span>
          <span style={{ color: "var(--graphite)", fontSize: 10, fontWeight: 400 }}>{count}개 세부 항목</span>
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <ScoreBadge label={status} tone={tone} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="var(--graphite)" strokeWidth="1.5">
            <path d="M2.5 3.75L5 6.25L7.5 3.75" />
          </svg>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1, height: 4, background: "rgba(0,0,0,0.06)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${barPct}%`, background: barColor, borderRadius: 999 }} />
        </div>
        <span style={{ fontSize: 9.5, color: "var(--graphite)", fontFamily: "var(--font-mono)", fontWeight: 600, minWidth: 42, textAlign: "right" }}>{scoreText}</span>
      </div>
    </div>
  );
}

export default function PreviewScorecard() {
  const total = 73, grade = "B", siteScore = 65, contentScore = 81;
  const r = 22, c = 2 * Math.PI * r, donutFilled = (total / 100) * c;

  const siteItems = [
    { name: "구조", count: 10, scoreText: "27 / 40", barPct: 67, status: "주의", tone: "caution" },
    { name: "기술", count: 9, scoreText: "30 / 45", barPct: 67, status: "주의", tone: "caution" },
    { name: "권위 마크업", count: 3, scoreText: "8 / 15", barPct: 53, status: "주의", tone: "caution", highlight: true },
  ];
  const contentItems = [
    { name: "인용가능성", count: 9, scoreText: "47 / 60", barPct: 78, status: "양호", tone: "good" },
    { name: "콘텐츠 자산량", count: 2, scoreText: "12 / 15", barPct: 80, status: "양호", tone: "good" },
    { name: "외부 검증", count: 2, scoreText: "22 / 25", barPct: 88, status: "양호", tone: "good" },
  ];

  return (
    <div style={{ background: "var(--snow)", height: "100%", padding: "14px 18px", borderTop: "1px solid var(--silver-mist)", fontSize: 11, display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, paddingBottom: 10, borderBottom: "1px solid var(--silver-mist)" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>로펌 ｜ 변호사 · 법무법인 인앤써</div>
          <div style={{ fontSize: 10, color: "var(--graphite)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            inanswerlaw.com 기준 수집 URL 76개 중 28개 페이지를 v4 기준으로 분석
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
          {["홈페이지", "블로그", "기타"].map((t, i) => (
            <span key={i} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 999, background: i === 0 ? "var(--ink)" : "transparent", color: i === 0 ? "#fff" : "var(--graphite)", border: i === 0 ? "none" : "1px solid var(--silver-mist)", fontWeight: i === 0 ? 600 : 500 }}>
              {t}
            </span>
          ))}
          <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 999, border: "1px solid var(--ink)", color: "var(--ink)", fontWeight: 600, marginLeft: 4 }}>PDF 받기</span>
        </div>
      </div>
      {/* Score overview */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1.2fr", gap: 10 }}>
        <div style={{ padding: "12px 14px", background: "var(--snow)", borderRadius: 10, border: "1px solid var(--silver-mist)", display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="58" height="58" viewBox="0 0 58 58">
            <circle cx="29" cy="29" r={r} fill="none" stroke="var(--fog)" strokeWidth="5" />
            <circle cx="29" cy="29" r={r} fill="none" stroke="var(--ink)" strokeWidth="5" strokeDasharray={`${donutFilled} ${c}`} strokeLinecap="round" transform="rotate(-90 29 29)" />
            <text x="29" y="28" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" fontFamily="var(--font-mono)" dominantBaseline="middle">{total}</text>
            <text x="29" y="40" textAnchor="middle" fontSize="8" fill="var(--graphite)" fontWeight="600">{grade}</text>
          </svg>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 10, color: "var(--graphite)" }}>최근 진단 결과</div>
            <div style={{ fontSize: 9.5, color: "var(--graphite)", marginTop: 8, lineHeight: 1.5 }}>
              사이트 {siteScore}/100<br />콘텐츠 {contentScore}/100<br />실패 0건
            </div>
          </div>
        </div>
        <SummaryCard title="사이트 점수" subtitle="권위 마크업 영역이 가장 낮아 우선 개선 대상입니다." score={siteScore} total={100} status="주의" tone="caution" />
        <SummaryCard title="콘텐츠 점수" subtitle="모든 영역이 양호 수준으로 측정되었습니다." score={contentScore} total={100} status="양호" tone="good" />
      </div>
      {/* Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1, minHeight: 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>사이트 점수</span>
            <span style={{ fontSize: 10, color: "var(--graphite)", fontFamily: "var(--font-mono)" }}>{siteScore} / 100</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {siteItems.map((it, i) => <BreakdownItem key={i} {...it} />)}
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>콘텐츠 점수</span>
            <span style={{ fontSize: 10, color: "var(--graphite)", fontFamily: "var(--font-mono)" }}>{contentScore} / 100</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {contentItems.map((it, i) => <BreakdownItem key={i} {...it} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

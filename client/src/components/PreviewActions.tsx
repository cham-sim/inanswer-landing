type Severity = "심각" | "주의" | "양호";

function ActionItem({ code, title, severity, score, total, action, highlight }: {
  code: string; title: string; severity: Severity; score: number; total: number; action: string; highlight?: boolean;
}) {
  const sevTone: Record<Severity, { bg: string; fg: string }> = {
    "심각": { bg: "rgba(196,88,68,0.12)", fg: "#C45844" },
    "주의": { bg: "rgba(182,68,0,0.12)", fg: "var(--caution)" },
    "양호": { bg: "rgba(31,138,91,0.12)", fg: "#1F8A5B" },
  };
  const tone = sevTone[severity];
  return (
    <div style={{ padding: "10px 12px", background: highlight ? "var(--fog)" : "var(--snow)", border: highlight ? "1px solid var(--ink)" : "1px solid var(--silver-mist)", borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: "var(--ink)", display: "flex", alignItems: "baseline", gap: 6, minWidth: 0, flex: 1 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--ink)", flexShrink: 0 }}>{code}</span>
          <span style={{ color: "var(--graphite)", flexShrink: 0 }}>·</span>
          <span style={{ fontWeight: 600 }}>{title}</span>
        </span>
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 999, background: tone.bg, color: tone.fg, letterSpacing: "0.02em" }}>{severity}</span>
          <span style={{ fontSize: 10, color: "var(--graphite)", fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", minWidth: 36, textAlign: "right" }}>{score} / {total}</span>
        </span>
      </div>
      <div style={{ fontSize: 10, color: "var(--graphite)", lineHeight: 1.5 }}>{action}</div>
    </div>
  );
}

export default function PreviewActions() {
  const siteItems = [
    { code: "TEC-01", title: "AI 봇 접근 허용", severity: "심각" as Severity, score: 0, total: 7, action: "robots.txt에 GPTBot, ClaudeBot, PerplexityBot 등 7개 AI 크롤러 명시적 허용 추가", highlight: true },
    { code: "TEC-09", title: "마크다운 콘텐츠 제공", severity: "심각" as Severity, score: 0, total: 3, action: "주요 페이지에 .md 변환 라우트 또는 LLM이 읽기 쉬운 markdown export 도입" },
    { code: "STR-07", title: "메타 타이틀·디스크립션 품질", severity: "심각" as Severity, score: 0.6, total: 2, action: "30개 페이지의 title/description을 고유하고 검색 의도가 분명한 문장으로 재작성" },
    { code: "AUT-03", title: "작성자 권위 신호", severity: "주의" as Severity, score: 1.2, total: 3, action: "변호사 프로필에 학력·자격·언론 출연·논문 등 E-E-A-T 신호를 구조화 마크업으로 추가" },
  ];
  const contentItems = [
    { code: "CIT-04", title: "Q&A 구조 페이지 비율", severity: "주의" as Severity, score: 1.0, total: 2, action: "사례 콘텐츠 11건을 질문→답변→근거 구조의 Q&A 페이지로 재작성" },
    { code: "AST-01", title: "대표 사례 콘텐츠 발행량", severity: "양호" as Severity, score: 5.2, total: 8, action: "기업자문 분야 핵심 사례 콘텐츠 12건 신규 발행으로 분야 깊이 확보" },
    { code: "AST-04", title: "FAQ Pillar Page", severity: "주의" as Severity, score: 0.5, total: 2, action: "기업자문 FAQ Pillar Page 1건 신설하여 잠재의뢰인 질문을 한 페이지에 집약" },
    { code: "EXT-02", title: "외부 매체 인용", severity: "양호" as Severity, score: 22, total: 25, action: "법률신문·리걸타임즈에 기고 2건 발행하여 외부 권위 신호 보강" },
  ];

  return (
    <div style={{ background: "var(--snow)", height: "100%", padding: "14px 18px", borderTop: "1px solid var(--silver-mist)", fontSize: 11, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid var(--silver-mist)" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>로펌 ｜ 변호사 · 법무법인 인앤써</div>
          <div style={{ fontSize: 10, color: "var(--graphite)", marginTop: 2 }}>GEO·AEO 개선 처방 · 우선순위 36개 항목 · 2026.05 Sprint 1</div>
        </div>
        <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ink)", padding: "3px 10px", borderRadius: 999, border: "1px solid var(--ink)" }}>처방전 PDF</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1, minHeight: 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>사이트 점수 개선책</span>
            <span style={{ fontSize: 10, color: "var(--graphite)", fontFamily: "var(--font-mono)" }}>현재 65 / 100 · {siteItems.length}+ 항목</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {siteItems.map((it, i) => <ActionItem key={i} {...it} />)}
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>콘텐츠 점수 개선책</span>
            <span style={{ fontSize: 10, color: "var(--graphite)", fontFamily: "var(--font-mono)" }}>현재 81 / 100 · {contentItems.length}+ 항목</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {contentItems.map((it, i) => <ActionItem key={i} {...it} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

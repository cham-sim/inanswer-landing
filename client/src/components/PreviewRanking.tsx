export default function PreviewRanking() {
  const cats = ["전체", "가사·이혼", "형사", "부동산·건설", "기업 자문", "노동", "상속", "세무", "IT·콘텐츠"];
  const pills = ["전체", "대표 질문", "회사 설립", "주주·이사 분쟁", "M&A", "계약 분쟁(B2B)", "지식재산권", "영업비밀", "컴플라이언스"];
  const rows: [string, string, string, string, string, string, boolean][] = [
    ["1", "김·장", "1,854회", "10.4%", "—", "var(--graphite)", false],
    ["2", "세종", "1,650회", "9.3%", "—", "var(--graphite)", false],
    ["3", "법무법인 인앤써", "1,553회", "8.7%", "↑2", "#1F8A5B", true],
    ["4", "광장", "1,545회", "8.7%", "↓1", "var(--caution)", false],
    ["5", "율촌", "1,250회", "7.0%", "—", "var(--graphite)", false],
  ];
  const llms = [
    { name: "Claude", rank: 2, citations: "498", trend: "↑1", trendColor: "#1F8A5B", bar: 80, badge: "강점" },
    { name: "Perplexity", rank: 3, citations: "312", trend: "↑3", trendColor: "#1F8A5B", bar: 60, badge: "" },
    { name: "Gemini", rank: 4, citations: "281", trend: "—", trendColor: "var(--graphite)", bar: 40, badge: "" },
    { name: "ChatGPT", rank: 5, citations: "462", trend: "↓2", trendColor: "var(--caution)", bar: 20, badge: "약점" },
  ];

  return (
    <div style={{ background: "var(--snow)", height: "100%", padding: "16px 20px", borderTop: "1px solid var(--silver-mist)", fontSize: 11, display: "flex", flexDirection: "column" }}>
      {/* Category tabs */}
      <div style={{ display: "flex", gap: 14, borderBottom: "1px solid var(--silver-mist)", paddingBottom: 8, overflow: "hidden", whiteSpace: "nowrap" }}>
        {cats.map((c, i) => (
          <span key={i} style={{ fontSize: 11, fontWeight: i === 4 ? 600 : 400, color: i === 4 ? "var(--ink)" : "var(--graphite)", paddingBottom: 4, borderBottom: i === 4 ? "2px solid var(--ink)" : "none" }}>
            {c}
          </span>
        ))}
      </div>
      {/* Sub-pills */}
      <div style={{ display: "flex", gap: 6, marginTop: 10, overflow: "hidden", whiteSpace: "nowrap" }}>
        {pills.map((p, i) => (
          <span key={i} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 999, background: i === 0 ? "var(--ink)" : "var(--fog)", color: i === 0 ? "#fff" : "var(--graphite)", border: i === 0 ? "none" : "1px solid var(--silver-mist)", display: "inline-flex", alignItems: "center" }}>
            {p}
          </span>
        ))}
      </div>
      {/* Main grid */}
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18, flex: 1, minHeight: 0 }}>
        {/* Table */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>기업 자문 전체 AI 인용 순위</div>
              <div style={{ fontSize: 10, color: "var(--graphite)", marginTop: 2 }}>4대 LLM 합산 기준, 로펌명 언급 추출 결과</div>
            </div>
            <div style={{ fontSize: 10, color: "var(--graphite)", fontFamily: "var(--font-mono)" }}>최근 1개월</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "28px 1.5fr 0.9fr 0.7fr 0.6fr", fontSize: 10, color: "var(--graphite)", fontWeight: 500, padding: "6px 0", borderBottom: "1px solid var(--silver-mist)" }}>
            <span>순위</span><span>로펌명</span><span>인용 횟수</span><span>언급률</span><span>변동</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1.5fr 0.9fr 0.7fr 0.6fr", fontSize: 12, padding: "10px 0", borderBottom: "1px solid var(--silver-mist)", color: "var(--ink)", fontVariantNumeric: "tabular-nums", background: r[6] ? "rgba(0,113,227,0.06)" : "transparent", boxShadow: r[6] ? "inset 3px 0 0 var(--azure)" : "none", paddingLeft: r[6] ? 9 : 0 }}>
              <span style={{ fontWeight: r[6] ? 700 : 600 }}>{r[0]}</span>
              <span style={{ fontWeight: r[6] ? 700 : 500 }}>{r[1]}</span>
              <span>{r[2]}</span>
              <span>{r[3]}</span>
              <span style={{ color: r[5], fontWeight: 600 }}>{r[4]}</span>
            </div>
          ))}
        </div>
        {/* LLM breakdown */}
        <div style={{ display: "flex", flexDirection: "column", background: "var(--fog)", borderRadius: 12, padding: "14px 14px 12px", gap: 12, alignSelf: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>
              <span style={{ width: 3, height: 12, background: "var(--azure)", borderRadius: 2 }} />
              법무법인 인앤써 — LLM별 분석
            </div>
            <div style={{ fontSize: 10, color: "var(--graphite)", marginTop: 4, paddingLeft: 9 }}>같은 분야(기업 자문) 내 순위</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {llms.map((llm, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    {llm.name}
                    {llm.badge && (
                      <span style={{ fontSize: 8.5, fontWeight: 700, padding: "2px 6px", borderRadius: 999, background: llm.badge === "강점" ? "rgba(31,138,91,0.12)" : "rgba(182,68,0,0.10)", color: llm.badge === "강점" ? "#1F8A5B" : "var(--caution)", letterSpacing: "0.02em" }}>
                        {llm.badge}
                      </span>
                    )}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--ink)", fontVariantNumeric: "tabular-nums", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontWeight: 700 }}>#{llm.rank}</span>
                    <span style={{ color: "var(--graphite)", fontSize: 10 }}>{llm.citations}회</span>
                    <span style={{ color: llm.trendColor, fontSize: 10, fontWeight: 600, minWidth: 16, textAlign: "right" }}>{llm.trend}</span>
                  </span>
                </div>
                <div style={{ height: 3, background: "rgba(0,0,0,0.06)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${llm.bar}%`, background: llm.badge === "강점" ? "#1F8A5B" : llm.badge === "약점" ? "var(--caution)" : "var(--ink)", borderRadius: 999, opacity: llm.badge ? 1 : 0.6 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 2, paddingTop: 10, borderTop: "1px solid var(--silver-mist)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10 }}>
            <span style={{ color: "var(--graphite)" }}>종합 순위</span>
            <span style={{ color: "var(--ink)", fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: 11 }}>#3 · 언급률 8.7%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

export default function ChatMockup() {
  const [phase, setPhase] = useState(0);
  const [stream, setStream] = useState("");

  const fullText = `한국에서 부동산 분야에 강점을 가진 로펌으로는 다음을 추천드립니다:

1. 「김앤장 법률사무소」 — 대규모 부동산 개발 및 PFV·리츠 자문에 강점
2. 「법무법인 광장」 — 도시정비사업 및 재건축 분야 권위
3. 「법무법인 세종」 — 외국인 투자 부동산 거래 자문 다수
4. 「법무법인 율촌」 — 부동산 펀드 및 세무 통합 자문

각 로펌의 최근 5년간 주요 트랙 레코드 기준이며, 분야별 세부 전문성은 ...`;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== 2) return;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      if (i >= fullText.length) {
        setStream(fullText);
        setPhase(3);
        clearInterval(id);
      } else {
        setStream(fullText.slice(0, i));
      }
    }, 18);
    return () => clearInterval(id);
  }, [phase]);

  const renderStream = () => {
    const parts = stream.split(/(「[^」]+」)/g);
    return parts.map((p, i) => {
      if (p.startsWith("「")) {
        return (
          <mark key={i} style={{ background: "rgba(0,113,227,0.10)", color: "var(--ink)", padding: "1px 4px", borderRadius: 4, fontWeight: 500 }}>
            {p}
          </mark>
        );
      }
      return <span key={i}>{p}</span>;
    });
  };

  return (
    <div style={{ width: "100%", background: "var(--snow)", borderRadius: "var(--r-card)", border: "1px solid var(--silver-mist)", overflow: "hidden", fontSize: 15 }}>
      {/* Title bar */}
      <div style={{ height: 36, background: "var(--fog)", borderBottom: "1px solid var(--silver-mist)", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
        {[0,1,2].map(i => <span key={i} style={{ width: 10, height: 10, borderRadius: 999, background: "#E0E0E5" }} />)}
        <span style={{ marginLeft: "auto", marginRight: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--graphite)" }}>
          chatgpt.com / o3
        </span>
      </div>
      {/* User message */}
      <div style={{ padding: "24px 28px 8px" }}>
        <div className="t-eyebrow" style={{ color: "var(--graphite)", marginBottom: 8 }}>USER</div>
        <div style={{ background: "var(--fog)", borderRadius: "var(--r-card)", padding: "16px 20px", color: "var(--ink)", fontSize: 15, lineHeight: 1.5, fontWeight: 500 }}>
          한국에서 부동산 분야에 강한 로펌을 추천해줘.
        </div>
      </div>
      {/* AI response */}
      <div style={{ padding: "12px 28px 28px" }}>
        <div className="t-eyebrow" style={{ color: "var(--graphite)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 16, height: 16, borderRadius: 999, background: "var(--ink)", display: "inline-block" }} />
          ChatGPT
        </div>
        {phase < 2 && (
          <div style={{ display: "flex", gap: 6, padding: "8px 0" }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ width: 8, height: 8, borderRadius: 999, background: "var(--graphite)", opacity: 0.4, animation: `cm-dot 1.2s ${i * 0.15}s infinite` }} />
            ))}
          </div>
        )}
        {phase >= 2 && (
          <div style={{ color: "var(--ash)", fontSize: 15, lineHeight: 1.6, whiteSpace: "pre-wrap", fontWeight: 400 }}>
            {renderStream()}
            {phase === 2 && (
              <span style={{ display: "inline-block", width: 7, height: 16, marginLeft: 2, background: "var(--ink)", verticalAlign: "-3px", animation: "cm-caret 0.7s steps(1,end) infinite" }} />
            )}
          </div>
        )}
      </div>
      <style>{`
        @keyframes cm-dot {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
        @keyframes cm-caret { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

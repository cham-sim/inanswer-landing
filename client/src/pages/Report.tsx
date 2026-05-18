import { useState } from "react";

const FINDINGS = [
  {
    num: "01",
    tag: "전체 순위",
    headline: "AI 답변 1위는 전통 대형 로펌이 아닌 대륜(40.2%)이었습니다.",
    body: "대륜이 12,135건의 AI 답변에서 등장해 전체 1위를 기록했습니다. 2위 세종(20.2%)의 정확히 두 배입니다. 3위 김·장(19.0%)부터 5위 태평양(17.0%)까지는 17~20% 범위에 밀집되어 있습니다. AI는 기존 법률 시장의 평판 순위와 전혀 다른 기준으로 로펌을 인용하고 있습니다.",
    stat: "40.2%", statLabel: "대륜 AI 언급률 (전체 1위)",
  },
  {
    num: "02",
    tag: "LLM별 분산",
    headline: "동일 로펌도 LLM에 따라 1위와 9위를 오갔습니다.",
    body: "대륜은 Perplexity에서 1위지만 ChatGPT에서는 9위입니다. 태평양은 ChatGPT 1위, Perplexity 6위입니다. 각 LLM은 서로 다른 신호(홈페이지 구조, 콘텐츠, 외부 기사, 수상 등)를 활용해 로펌을 인용합니다. LLM별 전략이 필요한 이유입니다.",
    stat: "8위", statLabel: "동일 로펌의 LLM별 최대 순위 격차",
  },
  {
    num: "03",
    tag: "분야별 잔존",
    headline: "기업·자문과 세무에서는 전통 로펌의 권위가 유지되었습니다.",
    body: "기업·자문 분야에서는 김·장이 49.5%, 세무 분야에서는 율촌이 58.2%로 압도적 1위입니다. 하지만 가사·이혼, IT·콘텐츠 등 신규 분야일수록 격차가 좁고, 콘텐츠 신호의 영향이 커지는 양상입니다. 분야별 맞춤 전략이 중요합니다.",
    stat: "49.5%", statLabel: "기업·자문 분야 김·장 AI 언급률",
  },
];

const TOP10 = [
  { rank: 1, name: "대륜", pct: 40.2 },
  { rank: 2, name: "세종", pct: 20.2 },
  { rank: 3, name: "김·장", pct: 19.0 },
  { rank: 4, name: "율촌", pct: 18.3 },
  { rank: 5, name: "태평양", pct: 17.0 },
  { rank: 6, name: "YK", pct: 15.5 },
  { rank: 7, name: "광장", pct: 15.2 },
  { rank: 8, name: "화우", pct: 9.2 },
  { rank: 9, name: "바른", pct: 8.3 },
  { rank: 10, name: "지평", pct: 7.7 },
];

function DownloadForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "이름을 입력해 주세요.";
    if (!form.company.trim()) e.company = "소속을 입력해 주세요.";
    if (!form.email.trim()) e.email = "이메일을 입력해 주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "올바른 이메일 형식을 입력해 주세요.";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/report-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, reportId: "ai-citation-v1" }),
      });
      const data = await res.json() as { success?: boolean; ok?: boolean; error?: string };
      if (data.success || data.ok) {
        setSubmitted(true);
        const a = document.createElement("a");
        a.href = "/report-ai-citation-v1.pdf";
        a.download = "대한민국로펌AI인용현황리포트_2026.05.pdf";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        setServerError(data.error ?? "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch {
      setServerError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <div style={{ width: 52, height: 52, borderRadius: 999, background: "rgba(27,58,45,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginInline: "auto", marginBottom: 16 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#1B3A2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>다운로드가 시작되었습니다.</div>
        <div style={{ fontSize: 13, color: "var(--graphite)", lineHeight: 1.7 }}>
          자동으로 PDF가 다운로드됩니다.<br />
          시작되지 않으면{" "}
          <a href="/report-ai-citation-v1.pdf" target="_blank" style={{ color: "#1B3A2D", fontWeight: 600 }}>여기를 클릭</a>하세요.
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>전체 리포트 무료 다운로드</div>
      <div style={{ fontSize: 13, color: "var(--graphite)", marginBottom: 24, lineHeight: 1.6 }}>
        아래 정보를 입력하시면 PDF를 즉시 다운로드할 수 있습니다.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { key: "name", label: "이름", placeholder: "홍길동" },
          { key: "company", label: "소속 (로펌명 또는 회사명)", placeholder: "법무법인 OOO" },
          { key: "email", label: "이메일", placeholder: "name@lawfirm.com" },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--graphite)", marginBottom: 5 }}>
              {label} <span style={{ color: "#FF6B6B" }}>*</span>
            </label>
            <input
              type={key === "email" ? "email" : "text"}
              value={form[key as keyof typeof form]}
              onChange={e => { setForm({ ...form, [key]: e.target.value }); if (errors[key]) setErrors({ ...errors, [key]: "" }); }}
              placeholder={placeholder}
              style={{
                width: "100%", padding: "11px 14px", borderRadius: 10,
                border: `1.5px solid ${errors[key] ? "#FF6B6B" : "var(--silver-mist)"}`,
                fontSize: 14, color: "var(--ink)", background: "var(--fog)",
                outline: "none", boxSizing: "border-box" as const,
              }}
            />
            {errors[key] && <div style={{ fontSize: 11, color: "#FF6B6B", marginTop: 4 }}>{errors[key]}</div>}
          </div>
        ))}
      </div>
      {serverError && (
        <div style={{ fontSize: 12, color: "#FF6B6B", marginTop: 12, padding: "10px 14px", background: "rgba(255,107,107,0.08)", borderRadius: 8, border: "1px solid rgba(255,107,107,0.2)" }}>
          {serverError}
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%", marginTop: 18, padding: "14px 24px", borderRadius: 999,
          background: "#1B3A2D", color: "#fff", fontSize: 15, fontWeight: 600,
          border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        {loading ? "처리 중..." : (
          <>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v9M5 7l3 3 3-3M2 13h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            PDF 무료 다운로드
          </>
        )}
      </button>
      <div style={{ marginTop: 10, fontSize: 11, color: "var(--graphite)", textAlign: "center", lineHeight: 1.6 }}>
        수집 정보는 리포트 발송 및 InAnswer 서비스 안내 목적으로만 사용됩니다.
      </div>
    </>
  );
}

export default function Report() {
  return (
    <div style={{ background: "var(--fog)", minHeight: "100vh" }}>
      {/* 심플 헤더 */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(245,245,247,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--silver-mist)", padding: "0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <a href="/" style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)", textDecoration: "none", letterSpacing: "-0.02em" }}>InAnswer</a>
          <a href="/consult" style={{ padding: "8px 18px", borderRadius: 999, background: "#1B3A2D", color: "#fff", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
            무료 컨설팅 신청 →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, #1B3A2D 0%, #0F2318 100%)", padding: "72px 0 80px" }}>
        <div className="wrap">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", borderRadius: 999, padding: "5px 14px", marginBottom: 28 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em" }}>KR-LAW-AI-V1 · 2026.05 · SAMPLE RELEASE</span>
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, color: "#F5F7FA", lineHeight: 1.12, letterSpacing: "-0.022em", maxWidth: 800 }}>
            대한민국 로펌<br />AI 인용 현황 리포트
          </h1>
          <p style={{ marginTop: 24, fontSize: "clamp(15px, 1.6vw, 18px)", color: "rgba(245,247,250,0.75)", lineHeight: 1.7, maxWidth: 600 }}>
            생성형 AI 4종 · 8개 법률 분야 · 30,212건 답변 기반.<br />
            AI는 기존 법률 시장과 전혀 다른 기준으로 로펌을 추천하고 있습니다.
          </p>
          <div style={{ marginTop: 40, display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[
              { v: "30,212건", l: "전체 AI 답변 표본" },
              { v: "4종", l: "측정 LLM" },
              { v: "8개", l: "법률 분야" },
              { v: "10일", l: "측정 기간" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, color: "#F5F7FA", letterSpacing: "-0.02em" }}>{s.v}</div>
                <div style={{ fontSize: 12, color: "rgba(245,247,250,0.5)", marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 발견 3가지 */}
      <section style={{ background: "var(--snow)", padding: "72px 0" }}>
        <div className="wrap">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "var(--graphite)", letterSpacing: "0.12em", marginBottom: 12 }}>EXECUTIVE SUMMARY</div>
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 12 }}>
            이번 리서치의 핵심 발견 3가지
          </h2>
          <p style={{ fontSize: 16, color: "var(--graphite)", marginBottom: 52, lineHeight: 1.7, maxWidth: 680 }}>
            LLM은 기존 법률 시장과 전혀 다른 기준으로 소비자들에게 로펌을 인용·추천하고 있습니다.
          </p>
          <div className="report-findings-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {FINDINGS.map((f, i) => (
              <div key={i} style={{ background: "var(--fog)", borderRadius: 16, padding: "28px 24px", border: "1px solid var(--silver-mist)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "var(--graphite)", letterSpacing: "0.1em" }}>{f.num}</span>
                  <span style={{ padding: "3px 10px", borderRadius: 999, background: "rgba(27,58,45,0.08)", border: "1px solid rgba(27,58,45,0.15)", fontSize: 11, fontWeight: 600, color: "#1B3A2D" }}>{f.tag}</span>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: "#1B3A2D", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 5 }}>{f.stat}</div>
                <div style={{ fontSize: 12, color: "var(--graphite)", marginBottom: 18 }}>{f.statLabel}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", lineHeight: 1.4, marginBottom: 10 }}>{f.headline}</div>
                <div style={{ fontSize: 13, color: "var(--ash)", lineHeight: 1.65 }}>{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP 10 순위 (일부 공개) */}
      <section style={{ background: "var(--fog)", padding: "72px 0" }}>
        <div className="wrap">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "var(--graphite)", letterSpacing: "0.12em", marginBottom: 12 }}>EXHIBIT 1 · 전체 TOP 10</div>
          <h2 style={{ margin: 0, fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.018em", marginBottom: 8 }}>
            전체 8개 분야 통합 AI 인용 순위
          </h2>
          <p style={{ fontSize: 14, color: "var(--graphite)", marginBottom: 36, lineHeight: 1.6 }}>
            ChatGPT · Gemini · Claude · Perplexity 4종 합산 기준, 2026.05.02–05.12 측정 (N=30,212)
          </p>
          <div style={{ background: "var(--snow)", borderRadius: 16, overflow: "hidden", border: "1px solid var(--silver-mist)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 100px 200px", padding: "12px 20px", background: "var(--fog)", borderBottom: "1px solid var(--silver-mist)" }}>
              {["순위", "로펌명", "AI 언급률", ""].map((h, i) => (
                <div key={i} style={{ fontSize: 11, fontWeight: 700, color: "var(--graphite)", letterSpacing: "0.06em", fontFamily: "var(--font-mono)" }}>{h}</div>
              ))}
            </div>
            {TOP10.slice(0, 5).map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "48px 1fr 100px 200px", padding: "14px 20px", borderBottom: "1px solid var(--silver-mist)", alignItems: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: r.rank === 1 ? "#1B3A2D" : "var(--graphite)" }}>0{r.rank}</div>
                <div style={{ fontSize: 15, fontWeight: r.rank === 1 ? 700 : 500, color: "var(--ink)" }}>{r.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: r.rank === 1 ? "#1B3A2D" : "var(--ink)" }}>{r.pct}%</div>
                <div style={{ height: 6, background: "var(--fog)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(r.pct / 40.2) * 100}%`, background: r.rank === 1 ? "#1B3A2D" : "var(--azure)", borderRadius: 999, opacity: r.rank === 1 ? 1 : 0.5 }} />
                </div>
              </div>
            ))}
            <div style={{ position: "relative" }}>
              <div style={{ filter: "blur(5px)", userSelect: "none", pointerEvents: "none" }}>
                {TOP10.slice(5).map((r, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "48px 1fr 100px 200px", padding: "14px 20px", borderBottom: i < 4 ? "1px solid var(--silver-mist)" : "none", alignItems: "center" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--graphite)" }}>0{r.rank}</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>{r.name}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{r.pct}%</div>
                    <div style={{ height: 6, background: "var(--fog)", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(r.pct / 40.2) * 100}%`, background: "var(--azure)", borderRadius: 999, opacity: 0.4 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.96) 70%)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 20 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 3 }}>6~10위 데이터는 전체 리포트에서 확인하세요</div>
                  <div style={{ fontSize: 12, color: "var(--graphite)" }}>LLM별 교차 분석 · 8개 분야 상세 · 방법론 전문 포함</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: "var(--graphite)", lineHeight: 1.6 }}>
            * AI 언급률은 로펌의 법률 역량이나 사건 수행 능력을 평가하는 지표가 아닙니다. AI가 특정 질문에 답변하면서 어떤 로펌명을 함께 제시했는지를 측정한 값입니다.
          </div>
        </div>
      </section>

      {/* 다운로드 CTA */}
      <section style={{ background: "#1B3A2D", padding: "72px 0" }}>
        <div className="wrap report-download-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 700, color: "#F5F7FA", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 24 }}>
              전체 리포트를<br />무료로 받아보세요.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "전체 8개 법률 분야 TOP 10 순위",
                "4개 LLM별 교차 분석 데이터",
                "분야별 1위 로펌 및 격차 분석",
                "AI 언급률 측정 방법론 전문",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 999, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 14, color: "rgba(245,247,250,0.8)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--snow)", borderRadius: 20, padding: "36px 32px" }}>
            <DownloadForm />
          </div>
        </div>
      </section>

      {/* 컨설팅 CTA */}
      <section style={{ background: "var(--fog)", padding: "56px 0", textAlign: "center" }}>
        <div className="wrap">
          <p style={{ fontSize: 16, color: "var(--graphite)", marginBottom: 20, lineHeight: 1.7 }}>
            우리 로펌의 AI 인용 현황이 궁금하신가요?<br />
            30분 무료 컨설팅에서 직접 확인해 드립니다.
          </p>
          <a href="/consult" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 40px", borderRadius: 999, background: "#1B3A2D", color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
            30분 무료 컨설팅 신청<span aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer style={{ background: "var(--ink)", padding: "20px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>© 2026 INANSWER Inc.</div>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="/" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>홈으로</a>
            <a href="/consult" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>상담 신청</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

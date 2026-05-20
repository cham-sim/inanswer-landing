"use client";

import { useState } from "react";

function PrivacyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: 16, padding: "32px 28px", maxWidth: 480, width: "100%", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 8px 48px rgba(0,0,0,0.18)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>개인정보 수집 및 이용</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#999", fontSize: 20, lineHeight: 1 }}>✕</button>
        </div>
        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 20 }}>
          엔유액셀러레이터는 리포트 발송 및 InAnswer(인앤써) 서비스 안내를 위해 아래와 같이 개인정보를 수집하고 이용하고자 합니다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {[
            ["수집 목적", "리포트 발송 및 인앤써 서비스 안내"],
            ["수집 항목", "이메일 주소(필수), 이름(필수), 소속(필수)"],
            ["보유 및 이용 기간", "리포트 신청 후 1년, 이용동의 철회 시 즉시 삭제"],
          ].map(([label, value]) => (
            <div key={label} style={{ background: "#F5F7FA", borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#888", marginBottom: 3 }}>{label}</div>
              <div style={{ fontSize: 13, color: "#333" }}>{value}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#888", lineHeight: 1.7, marginBottom: 20 }}>
          본 개인정보 수집에 동의하지 않을 수 있으며, 동의하지 않는 경우 리포트 수신 및 서비스 안내가 제한됩니다.
        </p>
        <button
          onClick={onClose}
          style={{ width: "100%", padding: "12px", borderRadius: 10, background: "#1B3A2D", color: "#fff", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}
        >
          확인
        </button>
      </div>
    </div>
  );
}

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

function DownloadForm({ reportId }: { reportId: string }) {
  const [form, setForm] = useState({ name: "", company: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const isReady = !!form.name.trim() && !!form.company.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && agreed;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "이름을 입력해 주세요.";
    if (!form.company.trim()) e.company = "소속을 입력해 주세요.";
    if (!form.email.trim()) e.email = "이메일을 입력해 주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "올바른 이메일 형식을 입력해 주세요.";
    if (!agreed) e.agreed = "개인정보 수집 및 이용에 동의해 주세요.";
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
        body: JSON.stringify({ ...form, reportId }),
      });
      const data = await res.json() as { success?: boolean; ok?: boolean; error?: string };
      if (data.success || data.ok) {
        setSubmitted(true);
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
        <div style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>리포트가 발송되었습니다.</div>
        <div style={{ fontSize: 13, color: "var(--graphite)", lineHeight: 1.7 }}>
          입력하신 이메일 주소로 PDF가 첨부된<br />메일이 발송되었습니다.
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>전체 리포트 이메일로 받기</div>
      <div style={{ fontSize: 13, color: "var(--graphite)", marginBottom: 24, lineHeight: 1.6 }}>
        아래 정보를 입력하시면 PDF를 이메일로 보내드립니다.
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
      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            onClick={() => { setAgreed(a => !a); if (errors.agreed) setErrors({ ...errors, agreed: "" }); }}
            style={{ width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${errors.agreed ? "#FF6B6B" : agreed ? "#1B3A2D" : "rgba(168,176,192,0.6)"}`, background: agreed ? "#1B3A2D" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 160ms", cursor: "pointer" }}
          >
            {agreed && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <span
            onClick={() => { setAgreed(a => !a); if (errors.agreed) setErrors({ ...errors, agreed: "" }); }}
            style={{ fontSize: 12, color: "var(--ink)", fontWeight: 500, cursor: "pointer" }}
          >
            (필수)개인정보수집 및 이용에 동의합니다.
          </span>
          <button
            type="button"
            onClick={() => setPrivacyOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "rgba(100,110,130,0.6)", textDecoration: "underline", padding: 0, flexShrink: 0 }}
          >
            자세히 보기
          </button>
        </div>
        {errors.agreed && <div style={{ fontSize: 11, color: "#FF6B6B", marginTop: 4 }}>{errors.agreed}</div>}
      </div>
      {serverError && (
        <div style={{ fontSize: 12, color: "#FF6B6B", marginTop: 12, padding: "10px 14px", background: "rgba(255,107,107,0.08)", borderRadius: 8, border: "1px solid rgba(255,107,107,0.2)" }}>
          {serverError}
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={!isReady || loading}
        style={{
          width: "100%", marginTop: 18, padding: "14px 24px", borderRadius: 999,
          background: !isReady || loading ? "rgba(27,58,45,0.35)" : "#1B3A2D",
          color: "#fff", fontSize: 15, fontWeight: 600,
          border: "none", cursor: !isReady || loading ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "background 200ms",
        }}
      >
        {loading ? "발송 중..." : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            이메일로 리포트 받기
          </>
        )}
      </button>
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
}

export default function LawfirmGeoReport202605({ reportId }: { reportId: string }) {
  return (
    <div style={{ background: "var(--fog)", minHeight: "100vh" }}>
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
            <DownloadForm reportId={reportId} />
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

    </div>
  );
}

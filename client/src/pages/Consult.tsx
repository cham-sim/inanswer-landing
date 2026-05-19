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
          엔유액셀러레이터 주식회사는 상담 신청 및 서비스 안내를 위해 아래와 같이 개인정보를 수집하고 이용하고자 합니다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {[
            ["수집 목적", "상담 신청 접수 및 서비스 안내"],
            ["수집 항목", "로펌명(필수), 담당자명(필수), 연락처(필수), 이메일(필수)"],
            ["이용 목적", "상담 연락"],
            ["보유 및 이용 기간", "상담 완료 후 1년"],
          ].map(([label, value]) => (
            <div key={label} style={{ background: "#F5F7FA", borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#888", marginBottom: 3 }}>{label}</div>
              <div style={{ fontSize: 13, color: "#333" }}>{value}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#888", lineHeight: 1.7, marginBottom: 20 }}>
          본 개인정보 수집에 동의하지 않을 수 있으며, 동의하지 않는 경우 상담 신청 및 서비스 안내가 제한됩니다.
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

export default function Consult() {
  const [form, setForm] = useState({ company: "", name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const isReady = !!form.company.trim() && !!form.name.trim() && /^[0-9\-+\s]{9,15}$/.test(form.phone.trim()) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && agreed;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.company.trim()) e.company = "로펌명을 입력해 주세요.";
    if (!form.name.trim()) e.name = "담당자 이름을 입력해 주세요.";
    if (!form.phone.trim()) e.phone = "연락처를 입력해 주세요.";
    else if (!/^[0-9\-+\s]{9,15}$/.test(form.phone.trim())) e.phone = "올바른 연락처를 입력해 주세요.";
    if (!form.email.trim()) e.email = "이메일을 입력해 주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "올바른 이메일 형식을 입력해 주세요.";
    if (!agreed) e.agreed = "개인정보 수집에 동의해 주세요.";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { success?: boolean; ok?: boolean; error?: string };
      if (data.success || data.ok) setSubmitted(true);
      else setServerError(data.error ?? "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } catch {
      setServerError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--fog)", minHeight: "100vh" }}>
      {/* 심플 헤더 */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(245,245,247,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--silver-mist)", padding: "0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <a href="/" style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)", textDecoration: "none", letterSpacing: "-0.02em" }}>InAnswer</a>
          <a href="/reports/lawfirm-geo-report-202605" style={{ fontSize: 13, color: "var(--graphite)", textDecoration: "none" }}>리포트 보기 →</a>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <section style={{ padding: "64px 0 80px" }}>
        <div className="wrap consult-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 72, alignItems: "start" }}>
          {/* 좌측: 가치 제안 */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(27,58,45,0.08)", borderRadius: 999, padding: "5px 14px", marginBottom: 24, border: "1px solid rgba(27,58,45,0.15)" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1B3A2D", letterSpacing: "0.08em", fontFamily: "var(--font-mono)" }}>FREE · 30MIN</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.12, letterSpacing: "-0.022em", marginBottom: 20 }}>
              지금 우리 로펌이<br />AI에서 어디 있는지<br />보여드립니다.
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.6vw, 17px)", color: "var(--graphite)", lineHeight: 1.75, marginBottom: 40, maxWidth: 440 }}>
              30분 무료 컨설팅에서 귀사 로펌의 AI 인용 현황을 진단하고, 경쟁 로펌 대비 콘텐츠 갭을 파악합니다.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {[
                { icon: "📊", title: "AI 가시성 현황 진단", desc: "ChatGPT·Claude·Gemini·Perplexity 4개 LLM에서 귀사 로펌이 얼마나 인용되는지 초기 데이터를 공유해 드립니다." },
                { icon: "🎯", title: "콘텐츠 기회 발견", desc: "경쟁 로펌 대비 콘텐츠 갭을 파악하고, 인용률을 높일 수 있는 우선순위 높은 콘텐츠 기회를 제안합니다." },
                { icon: "🛡️", title: "준법 리스크 점검", desc: "현재 홈페이지와 콘텐츠의 대한변협 광고 규정 위험 요소를 확인하고 개선 방향을 안내합니다." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px", background: "var(--snow)", borderRadius: 14, border: "1px solid var(--silver-mist)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(27,58,45,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "var(--graphite)", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "16px 20px", background: "var(--snow)", borderRadius: 12, border: "1px solid var(--silver-mist)", fontSize: 13, color: "var(--graphite)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--ink)" }}>비밀유지 보장</strong> · 진단까지 비용 없음 · 평일 48시간 내 회신
            </div>
          </div>

          {/* 우측: 폼 */}
          <div style={{ background: "var(--snow)", borderRadius: 20, padding: "40px 36px", border: "1px solid var(--silver-mist)", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 60, height: 60, borderRadius: 999, background: "rgba(27,58,45,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginInline: "auto", marginBottom: 20 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#1B3A2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>신청이 완료되었습니다.</div>
                <div style={{ fontSize: 14, color: "var(--graphite)", lineHeight: 1.7 }}>
                  입력해주신 연락처로 <strong style={{ color: "var(--ink)" }}>평일 48시간 내</strong>에<br />담당자가 연락드리겠습니다.
                </div>
                <a href="/" style={{ display: "inline-block", marginTop: 28, color: "#1B3A2D", fontSize: 14, fontWeight: 500 }}>← 홈으로 돌아가기</a>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 19, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>30분 무료 컨설팅 신청</div>
                <div style={{ fontSize: 13, color: "var(--graphite)", marginBottom: 28, lineHeight: 1.5 }}>
                  아래 정보를 남겨주시면 평일 48시간 내에 담당자가 연락드립니다.
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  {[
                    { key: "company", label: "로펌(회사)명", type: "text", placeholder: "법무법인 OOO", full: true },
                    { key: "name", label: "담당자", type: "text", placeholder: "홍길동", full: false },
                    { key: "phone", label: "연락처", type: "tel", placeholder: "010-1234-5678", full: false },
                    { key: "email", label: "이메일", type: "email", placeholder: "name@lawfirm.com", full: true },
                  ].map(({ key, label, type, placeholder, full }) => (
                    <div key={key} style={{ gridColumn: full ? "1 / -1" : "auto" }}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--graphite)", marginBottom: 5 }}>
                        {label} <span style={{ color: "#FF6B6B" }}>*</span>
                      </label>
                      <input
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={e => { setForm({ ...form, [key]: e.target.value }); if (errors[key]) setErrors({ ...errors, [key]: "" }); }}
                        onFocus={() => setFocused(key)}
                        onBlur={() => setFocused(null)}
                        placeholder={placeholder}
                        style={{
                          width: "100%", padding: "11px 14px", borderRadius: 10,
                          border: `1.5px solid ${errors[key] ? "#FF6B6B" : focused === key ? "#1B3A2D" : "var(--silver-mist)"}`,
                          fontSize: 14, color: "var(--ink)", background: "var(--fog)",
                          outline: "none", boxSizing: "border-box" as const, transition: "border-color 160ms",
                        }}
                      />
                      {errors[key] && <div style={{ fontSize: 11, color: "#FF6B6B", marginTop: 4 }}>{errors[key]}</div>}
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--graphite)", marginBottom: 5 }}>문의 내용 (선택)</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="궁금한 점이나 현재 상황을 자유롭게 적어주세요."
                    rows={3}
                    style={{
                      width: "100%", padding: "11px 14px", borderRadius: 10,
                      border: `1.5px solid ${focused === "message" ? "#1B3A2D" : "var(--silver-mist)"}`,
                      fontSize: 14, color: "var(--ink)", background: "var(--fog)",
                      outline: "none", resize: "none", boxSizing: "border-box" as const,
                      fontFamily: "inherit", transition: "border-color 160ms",
                    }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div
                    onClick={() => { setAgreed(a => !a); if (errors.agreed) setErrors({ ...errors, agreed: "" }); }}
                    style={{ width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${errors.agreed ? "#FF6B6B" : agreed ? "#1B3A2D" : "rgba(168,176,192,0.4)"}`, background: agreed ? "#1B3A2D" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 160ms", cursor: "pointer" }}
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
                {errors.agreed && <div style={{ fontSize: 11, color: "#FF6B6B", marginBottom: 12 }}>{errors.agreed}</div>}
                <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />

                {serverError && (
                  <div style={{ fontSize: 12, color: "#FF6B6B", marginBottom: 12, padding: "10px 14px", background: "rgba(255,107,107,0.08)", borderRadius: 8, border: "1px solid rgba(255,107,107,0.2)" }}>
                    {serverError}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!isReady || loading}
                  style={{
                    width: "100%", padding: "15px 24px", borderRadius: 999,
                    background: !isReady || loading ? "rgba(27,58,45,0.35)" : "#1B3A2D",
                    color: "#fff", fontSize: 15, fontWeight: 600,
                    border: "none", cursor: !isReady || loading ? "not-allowed" : "pointer",
                    marginTop: 4, transition: "background 200ms",
                  }}
                >
                  {loading ? "제출 중..." : "상담 신청하기 →"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 신뢰 지표 */}
      <section style={{ background: "var(--snow)", padding: "40px 0", borderTop: "1px solid var(--silver-mist)" }}>
        <div className="wrap" style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { stat: "30,212건", label: "월간 AI 답변 측정" },
            { stat: "4종", label: "LLM 동시 모니터링" },
            { stat: "8개", label: "법률 분야 커버리지" },
            { stat: "48h", label: "평균 회신 시간" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 700, color: "#1B3A2D", letterSpacing: "-0.02em" }}>{s.stat}</div>
              <div style={{ fontSize: 12, color: "var(--graphite)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer style={{ background: "var(--ink)", padding: "20px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>© 2026 INANSWER Inc.</div>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="/" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>홈으로</a>
            <a href="/reports/lawfirm-geo-report-202605" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>리포트</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

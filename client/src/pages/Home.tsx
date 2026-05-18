import { useState } from "react";
import SubNav from "@/components/SubNav";
import { CountUp, Reveal, FAQItem } from "@/components/Primitives";
import ChatMockup from "@/components/ChatMockup";
import PreviewRanking from "@/components/PreviewRanking";
import PreviewScorecard from "@/components/PreviewScorecard";
import PreviewActions from "@/components/PreviewActions";

/* ─── Hero Section ─────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="s s-lg"
      data-screen-label="01 Hero"
      style={{ position: "relative", overflow: "hidden", background: "#0A0E1A", minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <video
        id="hero-video"
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none", filter: "brightness(0.65) saturate(0.9)" }}
      >
        <source src="/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/hero-tablet.mp4" type="video/mp4" media="(max-width: 1279px)" />
        <source src="/hero-desktop.mp4" type="video/mp4" />
      </video>
      {/* Gradient overlays */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at center, rgba(10,14,26,0.6) 0%, rgba(10,14,26,0.35) 50%, rgba(10,14,26,0) 100%)" }} />
      <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "40%", pointerEvents: "none", background: "linear-gradient(180deg, rgba(10,14,26,0) 0%, rgba(10,14,26,0.7) 100%)" }} />
      <div className="wrap" style={{ textAlign: "center", position: "relative", zIndex: 1, width: "100%" }}>
        <Reveal>
          <h1 className="t-display-hero" style={{ margin: 0, color: "#F5F7FA", textShadow: "0 2px 32px rgba(0,0,0,0.5)" }}>
            AI가 추천하는<br />로펌이 되세요.
          </h1>
          <p className="t-sub" style={{ marginTop: 28, marginBottom: 40, maxWidth: 560, marginInline: "auto", color: "rgba(245,247,250,0.88)", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}>
            InAnswer는 당신의 로펌을 AI가 신뢰하고,<br />잠재 고객들에게 추천할 수 있도록 돕습니다.
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#cta" className="btn btn-azure">
              무료 상담 신청하기<span className="arrow" aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Problem Section ──────────────────────────────────── */
function ProblemSection() {
  return (
    <section id="problem" className="s bg-snow" data-screen-label="02 Problem">
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 80, alignItems: "center" }}>
        <Reveal>
          <h2 className="t-h1" style={{ margin: 0 }}>
            로펌 고객의{" "}
            <span style={{ color: "var(--azure)" }}>
              <CountUp to={44.5} decimals={1} suffix="%" duration={1600} />
            </span>
            가<br />AI에게 먼저 묻습니다.
          </h2>
          <p className="t-sub" style={{ marginTop: 28, maxWidth: 520 }}>
            2026년 현재 한국인의 44.5%는 검색엔진이 아닌 생성형 AI를 통해 '나와 가장 비슷한 사례를 다룬 실력 있는 로펌'을 추천받습니다.
          </p>
          <p className="t-body" style={{ marginTop: 20, maxWidth: 520, color: "var(--ink)", fontWeight: 500 }}>
            이제 AI 답변 노출도가 로펌의 매출을 결정하는 시대가 왔습니다.
          </p>
          <div style={{ marginTop: 36, paddingTop: 20, borderTop: "1px solid var(--silver-mist)", display: "flex", alignItems: "baseline", gap: 12 }}>
            <span className="t-eyebrow" style={{ color: "var(--graphite)" }}>출처</span>
            <span className="t-caption" style={{ color: "var(--ash)" }}>과학기술정보통신부 · 2025 인터넷이용실태조사</span>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <ChatMockup />
        </Reveal>
      </div>
    </section>
  );
}

/* ─── GEO vs AEO Section ───────────────────────────────── */
function GeoVsSeoSection() {
  const rows: [string, string, string][] = [
    ["타깃 엔진", "ChatGPT, Claude, Perplexity, Gemini", "Google AI Overview, Bing Copilot, 음성 비서"],
    ["의뢰인 질문 유형", "\"강남에서 이혼 잘하는 로펌 추천해줘\"", "\"이혼할 때 재산분할 어떻게 하나요?\""],
    ["핵심 최적화 신호", "권위, 외부 인용, 트랙 레코드", "Q&A 구조, 스키마, 정의 명확성"],
    ["측정 지표", "AI 언급률 (AI Mention Rate)", "Answer Box 노출률"],
  ];
  const insightRow: [string, string, string] = ["로펌에게 의미", "의뢰 직전 추천 받기 — 전환 지표", "전문성 인지 형성 — 브랜드 지표"];
  const [hover, setHover] = useState<number | null>(null);

  const cellHead = (bg: string) => ({
    padding: "20px 24px",
    background: bg,
    borderBottom: "1px solid var(--silver-mist)",
  });
  const cellLabel = () => ({
    padding: "18px 24px",
    borderBottom: "1px solid var(--silver-mist)",
    display: "flex",
    alignItems: "center",
  });
  const cellCol = (isGeo: boolean) => ({
    padding: "18px 24px",
    borderBottom: "1px solid var(--silver-mist)",
    borderLeft: `1px solid ${isGeo ? "rgba(0,113,227,0.15)" : "rgba(74,123,255,0.15)"}`,
  });

  return (
    <section id="geo" className="s bg-fog" data-screen-label="03 GEO & AEO">
      <div className="wrap">
        <Reveal>
          <h2 className="t-h1" style={{ margin: 0 }}>
            AI에게 추천받는 로펌이 되려면<br />GEO·AEO를 지금 시작해야 합니다.
          </h2>
          <p className="t-sub" style={{ marginTop: 24, maxWidth: 940 }}>
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>GEO</strong>(Generative Engine Optimization)는 ChatGPT·Claude 같은 생성형 AI 답변에서 로펌이 추천·인용되도록,{" "}
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>AEO</strong>(Answer Engine Optimization)는 Google AI Overview 같은 AI 답변 박스에 로펌의 콘텐츠가 직접 노출되도록 만드는 전략입니다.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ marginTop: 56, background: "var(--snow)", borderRadius: "var(--r-card)", overflow: "hidden", border: "1px solid var(--silver-mist)" }}>
            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr" }}>
              <div style={cellHead("var(--snow)")} />
              {/* GEO header */}
              <div style={{ ...cellHead("rgba(0,113,227,0.05)"), borderBottom: "2px solid var(--azure)", borderLeft: "1px solid rgba(0,113,227,0.15)" }}>
                <span className="t-eyebrow" style={{ color: "var(--azure)" }}>GEO</span>
                <div className="t-h-sm" style={{ marginTop: 6, color: "var(--ink)" }}>Generative Engine Optimization</div>
                <div className="t-caption" style={{ marginTop: 8, color: "var(--ash)" }}>생성형 AI 답변에서 추천 받기</div>
              </div>
              {/* AEO header */}
              <div style={{ ...cellHead("rgba(74,123,255,0.05)"), borderBottom: "2px solid var(--stage-accent)", borderLeft: "1px solid rgba(74,123,255,0.15)" }}>
                <span className="t-eyebrow" style={{ color: "var(--stage-accent)" }}>AEO</span>
                <div className="t-h-sm" style={{ marginTop: 6, color: "var(--ink)" }}>Answer Engine Optimization</div>
                <div className="t-caption" style={{ marginTop: 8, color: "var(--ash)" }}>AI 답변 박스에 노출되기</div>
              </div>
            </div>

            {/* Data rows */}
            {rows.map(([k, l, r], i) => {
              const isHov = hover === i;
              return (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr" }}
                  onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                  <div style={{ ...cellLabel(), background: isHov ? "var(--fog)" : "var(--snow)" }}>
                    <span className="t-body-sm" style={{ color: isHov ? "var(--ink)" : "var(--graphite)", fontWeight: 500, transition: "color 200ms" }}>{k}</span>
                  </div>
                  <div style={{ ...cellCol(true), background: isHov ? "rgba(0,113,227,0.04)" : "rgba(0,113,227,0.02)" }}>
                    <span className="t-body" style={{ color: "var(--ink)" }}>{l}</span>
                  </div>
                  <div style={{ ...cellCol(false), background: isHov ? "rgba(74,123,255,0.04)" : "rgba(74,123,255,0.02)" }}>
                    <span className="t-body" style={{ color: "var(--ink)" }}>{r}</span>
                  </div>
                </div>
              );
            })}

            {/* Insight row */}
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr" }}>
              <div style={{ ...cellLabel(), background: "var(--fog)", borderBottom: "none" }}>
                <span className="t-body-sm" style={{ color: "var(--ink)", fontWeight: 600 }}>{insightRow[0]}</span>
              </div>
              <div style={{ ...cellCol(true), background: "rgba(0,113,227,0.06)", borderBottom: "none" }}>
                <span className="t-body" style={{ color: "var(--ink)", fontWeight: 500 }}>{insightRow[1]}</span>
              </div>
              <div style={{ ...cellCol(false), background: "rgba(74,123,255,0.06)", borderBottom: "none" }}>
                <span className="t-body" style={{ color: "var(--ink)", fontWeight: 500 }}>{insightRow[2]}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* AI Mention Rate callout */}
        <Reveal delay={300}>
          <div style={{ marginTop: 40, padding: "28px 32px", background: "var(--snow)", borderRadius: "var(--r-card)", border: "1px solid var(--silver-mist)", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: "0 0 auto" }}>
              <div className="t-eyebrow" style={{ color: "var(--azure)", marginBottom: 8 }}>AI Mention Rate</div>
              <div className="t-h-sm" style={{ color: "var(--ink)" }}>AI 언급률</div>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <p className="t-body" style={{ margin: 0, color: "var(--ash)" }}>
                AI 언급률 = (우리 로펌이 언급된 답변 수 / AI가 응답한 전체 질문 수) × 100
              </p>
              <p className="t-body-sm" style={{ marginTop: 12, color: "var(--graphite)" }}>
                예) InAnswer가 매월 모니터링하는 102,000건의 AI 답변 중 우리 로펌이 8,874건에서 언급됐다면 → 언급률 8.7%.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── How It Works (FourLoop) Section ─────────────────── */
function FourLoopSection() {
  const stages = [
    {
      n: "01", kicker: "진단",
      stat: "AI가 여러분의 로펌을 얼마나 인용하는지 매일 기록합니다.",
      body: "4개의 LLM(ChatGPT, Claude, Gemini, Perplexity)에서 클라이언트를 얼마나 언급하는지 매일 데이터베이스를 수집합니다. 클라이언트가 집중하는 법률 시장을 정의하고, 잠재적 고객들이 하게 될 질문을 각 LLM에게 던지면서 그 결과에 클라이언트가 얼마나 인용되는지를 수집합니다. 또한, LLM 별로 그 결과를 따로 분석하며, 어떤 LLM에서 우리가 앞서나가는지, 우리가 개선해야되는지를 명확히 찾아냅니다.",
      Preview: PreviewRanking, url: "inanswer.app / diagnosis",
    },
    {
      n: "02", kicker: "분석",
      stat: "로펌의 GEO·AEO 현황을 정밀분석합니다.",
      body: "클라이언트의 홈페이지와 콘텐츠를 페이지 단위로 수집하여, 사이트 측면(구조·기술·권위 마크업)과 콘텐츠 측면(인용가능성·자산량·외부 검증) 6개 영역 35개 세부 항목 기준으로 채점합니다. 각 항목은 양호·주의·실패로 등급화되어, 어떤 영역이 AI 인용을 가로막고 있는지, 어디부터 개선해야 하는지가 자동으로 도출됩니다.",
      Preview: PreviewScorecard, url: "inanswer.app / geo-score",
    },
    {
      n: "03", kicker: "실행",
      stat: "GEO·AEO를 위한 맞춤형 처방 제시 및 실행합니다.",
      body: "진단에서 드러난 사이트 측면과 콘텐츠 측면의 개선 항목을 각각 분리해, 어떤 항목을 어떻게 고쳐야 하는지가 명시된 단계별 처방으로 정리합니다. 권고에 그치지 않고 robots.txt 설정, 메타 정보 재작성, Q&A 구조 도입, 콘텐츠 신규 발행까지 InAnswer 팀이 실행 단계를 함께 진행합니다.",
      Preview: PreviewActions, url: "inanswer.app / action-plan",
    },
  ];

  return (
    <section id="loop" className="s s-lg bg-snow" data-screen-label="04 Showcase">
      <div className="wrap">
        <Reveal>
          <h2 className="t-h1" style={{ margin: 0, maxWidth: 1000 }}>
            InAnswer는 높은 전문성을 기반으로<br />로펌 GEO·AEO만 전문적으로 관리합니다.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="t-sub" style={{ marginTop: 24, maxWidth: 900 }}>
            로펌 GEO·AEO에 대한 광범위한 데이터베이스와 분석기술로 로펌의 GEO·AEO를 높여나갑니다.
          </p>
        </Reveal>

        {stages.map((s, i) => (
          <Reveal key={i}>
            <div style={{ marginTop: i === 0 ? 80 : 112 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--graphite)", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span>{s.n}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{s.kicker}</span>
              </div>
              <h3 style={{ margin: 0, fontSize: "clamp(28px, 3.4vw, 42px)", fontWeight: 700, letterSpacing: "-0.018em", lineHeight: 1.2, color: "var(--ink)", marginBottom: 20 }}>
                {s.stat}
              </h3>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: "var(--ash)", marginBottom: 40, maxWidth: 800 }}>
                {s.body}
              </p>
              <div style={{ background: "var(--snow)", borderRadius: "var(--r-card)", border: "1px solid var(--silver-mist)", overflow: "hidden" }}>
                <div style={{ height: 40, background: "var(--fog)", borderBottom: "1px solid var(--silver-mist)", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
                  {[0,1,2].map(j => <span key={j} style={{ width: 10, height: 10, borderRadius: 999, background: "#E0E0E5" }} />)}
                  <span style={{ margin: "0 auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--graphite)" }}>{s.url}</span>
                </div>
                <div style={{ minHeight: 480 }}>
                  <s.Preview />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Why Us (OnlyLaw) Section ─────────────────────────── */
function OnlyLawSection() {
  const cards = [
    {
      n: "01", bigStatNum: 5, bigStatSuffix: "", bigStatUnit: "Expert Team",
      bigStatCaption: "테크 · AI · 리서치 · 컨설팅 · 콘텐츠",
      title: "전문성 높은 로펌 전문 GEO·AEO 팀",
      body: "테크팀, AI 전문가, 리서처, 컨설턴트, 콘텐츠 전문가 등 전문인력들이 오직 로펌 GEO·AEO에 집중하고 있습니다. 빠르게 변화하는 GEO·AEO 시장에서, 클라이언트 로펌이 AI 답변에 인용될 수 있도록 전문성을 제공합니다.",
    },
    {
      n: "02", bigStatNum: 102000, bigStatSuffix: "+", bigStatUnit: "DB",
      bigStatCaption: "월간 AI 쿼리 · 52개 분야 · 4대 AI",
      title: "로펌 GEO·AEO에 대한 최고 수준의 DB 보유",
      body: "InAnswer는 매월 102,000번 AI에게 질문합니다. 총 52개 법률 세부분야에 대한 잠재 고객들의 질문리스트를 생성하여 ChatGPT, Gemini, Claude, Perplexity 등에게 매일 쿼리를 던지고 응답을 수집하며 국내 법률 시장 전체에 대한 데이터베이스를 쌓고 있습니다.",
    },
    {
      n: "03", bigStatNum: 600, bigStatSuffix: "+", bigStatUnit: "LawFirm",
      bigStatCaption: "국내 분석 로펌 · LLM별 교차분석",
      title: "국내 주요 로펌에 대한 GEO·AEO 분석 DB",
      body: "InAnswer는 국내 600여개 로펌에 대한 홈페이지 및 콘텐츠들의 GEO·AEO 점수를 분석하고, LLM마다 교차분석을 실시합니다. 클라이언트는 우리 로펌뿐 아니라 경쟁사 로펌의 현황과 경쟁력을 비교하고, 더 나은 전략을 수립할 수 있습니다.",
    },
  ];

  return (
    <section id="only" className="s s-lg bg-stage stage" data-screen-label="06 Why InAnswer">
      <div className="wrap">
        <Reveal>
          <h2 className="t-h1" style={{ margin: 0, color: "var(--stage-text)", textAlign: "center", maxWidth: 1100, marginInline: "auto" }}>
            왜 InAnswer와 GEO·AEO를<br />해야할까요?
          </h2>
        </Reveal>

        <div className="why-us-grid" style={{ marginTop: 72 }}>
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="card card-stage hoverable" style={{ padding: 44, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--stage-text-secondary)", letterSpacing: "0.12em", marginBottom: 24 }}>{c.n}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 52, fontWeight: 700, color: "var(--stage-accent)", letterSpacing: "-0.025em", lineHeight: 1, marginBottom: 8, whiteSpace: "nowrap" }}>
                  <CountUp to={c.bigStatNum} suffix={c.bigStatSuffix} duration={1600} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--stage-accent)", opacity: 0.85, letterSpacing: "-0.005em", marginBottom: 10 }}>{c.bigStatUnit}</div>
                <div style={{ fontSize: 12, color: "var(--stage-text)", opacity: 0.65, letterSpacing: "-0.003em", lineHeight: 1.5, marginBottom: 28 }}>{c.bigStatCaption}</div>
                <div style={{ fontSize: 19, fontWeight: 600, color: "var(--stage-text)", letterSpacing: "-0.012em", lineHeight: 1.35, marginBottom: 16 }}>{c.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--stage-text-secondary)" }}>{c.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Reports Section ──────────────────────────────────── */
function ReportCover({ idx }: { idx: number }) {
  if (idx === 0) {
    return (
      <div style={{ height: 200, background: "linear-gradient(135deg,#0A0E1A 0%,#1A2138 100%)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: 24 }}>
        <svg viewBox="0 0 320 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={i} x1={20 + i * 24} y1={20 + (i % 4) * 12} x2={20 + i * 24} y2={180} stroke="#4A7BFF" strokeWidth="2" opacity={0.35 + (i % 5) * 0.12} />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <circle key={i} cx={20 + i * 24} cy={20 + (i % 4) * 12} r="3" fill="#4A7BFF" opacity="0.85" />
          ))}
        </svg>
        <span style={{ position: "relative", color: "#F5F7FA", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", fontWeight: 600 }}>VOL.02 · 2026.05</span>
      </div>
    );
  }
  if (idx === 1) {
    return (
      <div style={{ height: 200, background: "linear-gradient(135deg,#131826 0%,#0A0E1A 100%)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: 24 }}>
        <svg viewBox="0 0 320 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4A7BFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4A7BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,160 C40,140 80,90 120,100 C160,110 200,60 240,55 C280,50 320,30 320,30" stroke="#4A7BFF" strokeWidth="2.5" fill="none" />
          <path d="M0,160 C40,140 80,90 120,100 C160,110 200,60 240,55 C280,50 320,30 320,30 L320,200 L0,200 Z" fill="url(#g1)" opacity="0.45" />
        </svg>
        <span style={{ position: "relative", color: "#F5F7FA", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", fontWeight: 600 }}>VOL.01 · 2026.04</span>
      </div>
    );
  }
  return (
    <div style={{ height: 200, background: "linear-gradient(135deg,#F5F5F7 0%,#E8E8ED 100%)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: 24 }}>
      <svg viewBox="0 0 320 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={20 + (i % 3) * 100} y={20 + Math.floor(i / 3) * 56} width="80" height="40" rx="6" fill={i === 4 ? "#0A0E1A" : "#FFFFFF"} stroke="#0A0E1A" strokeWidth="1" />
        ))}
      </svg>
      <span style={{ position: "relative", color: "#0A0E1A", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", fontWeight: 600 }}>SERIES · MONTHLY</span>
    </div>
  );
}

function ReportsSection() {
  const reports = [
    { date: "2026.05", title: "한국 로펌 GEO·AEO 준비도 리포트 (Vol.2)", meta: "전 분야 · 48p" },
    { date: "2026.04", title: "한국 로펌 AI 인용 리포트 (Vol.1)", meta: "전 분야 · 64p" },
    { date: "Series", title: "분야별 인용 트렌드 시리즈", meta: "9개 분야 · 매월 발행" },
  ];

  return (
    <section id="reports" className="s s-lg bg-fog" data-screen-label="07 Reports">
      <div className="wrap">
        <Reveal>
          <h2 className="t-h1" style={{ margin: 0, maxWidth: 920 }}>
            앞서나가는 다른 로펌의 전략과<br />우리 로펌의 현황을 살펴보세요.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="t-sub" style={{ marginTop: 24, maxWidth: 760 }}>
            InAnswer만이 보유한 10만개 이상의 독자적인 데이터를 리포트로 매월 공개합니다.
          </p>
        </Reveal>

        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {reports.map((r, i) => (
            <Reveal key={i} delay={i * 100}>
              <a href="#" className="report-card">
                <ReportCover idx={i} />
                <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--graphite)", letterSpacing: "0.08em", fontWeight: 600 }}>{r.date}</div>
                  <div className="t-h-sm" style={{ color: "var(--ink)", margin: 0 }}>{r.title}</div>
                  <div style={{ fontSize: 13, color: "var(--graphite)", marginTop: "auto" }}>{r.meta}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <a href="#" style={{ color: "var(--ink)", fontSize: 17, textDecoration: "underline", textUnderlineOffset: 6, fontWeight: 500 }}>
              전체 리포트 보기 →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FAQ Section ──────────────────────────────────────── */
function FaqSection() {
  const faqs = [
    { q: "어떤 LLM을 분석하나요?", a: "ChatGPT(GPT-4·o3·o4 계열), Gemini(2.5 Pro·Flash), Claude(Sonnet·Opus), Perplexity(Sonar) 4개 모델을 매일 추적합니다. 신규 모델 출시 시 30일 내 분석 파이프라인에 편입됩니다." },
    { q: "GEO를 어떻게 높여주나요?", a: "진단을 통해 클라이언트가 어느 분야·어느 LLM에서 누락되는지 식별하고, 이후 분기마다 SoMV(Share of Model Voice) 개선 목표를 클라이언트와 함께 설정합니다. GEO를 위해 홈페이지와 콘텐츠를 기술적으로 분석하고, 즉각적인 개선책과 장기적인 개선책을 함께 도입하며 AI가 적극적으로 로펌을 추천할 수 있게 만들어냅니다." },
    { q: "기존 SEO 컨설팅과 무엇이 다릅니까?", a: "SEO는 검색 엔진의 SERP 순위를 다루지만, GEO는 LLM의 답변 인용을 다룹니다. 측정 단위·콘텐츠 단위·추적 주기가 모두 다릅니다. INANSWER는 SEO에서 출발하지 않고, 처음부터 4대 LLM 답변 데이터로 설계된 인프라입니다." },
  ];

  return (
    <section id="faq" className="s bg-snow" data-screen-label="FAQ">
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.4fr", gap: 80 }}>
        <Reveal>
          <h2 className="t-h1" style={{ margin: 0 }}>자주 묻는<br />질문.</h2>
          <p className="t-sub" style={{ marginTop: 24, maxWidth: 320 }}>그 외 궁금한 내용은 30분 무료 상담에서 직접 다룹니다.</p>
          <a href="#cta" className="btn btn-ghost" style={{ marginTop: 24, padding: "14px 0" }}>상담 신청 →</a>
        </Reveal>
        <Reveal delay={150}>
          <div style={{ borderTop: "1px solid var(--silver-mist)" }}>
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Final CTA Section ────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ company: "", name: "", phone: "", email: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.company || !form.name || !form.phone || !form.email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("server error");
      setSubmitted(true);
    } catch {
      alert("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ background: "var(--stage-surface)", border: "1px solid var(--stage-border)", borderRadius: "var(--r-card)", padding: 40, maxWidth: 640, marginInline: "auto", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: "var(--stage-text)", marginBottom: 12 }}>신청이 완료되었습니다.</div>
        <div style={{ fontSize: 15, color: "var(--stage-text-secondary)", lineHeight: 1.6 }}>
          입력해주신 연락처로 평일 48시간 내에 담당자가 연락드리겠습니다.<br />
          {form.company} · {form.name}님, 감사합니다.
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--stage-surface)", border: "1px solid var(--stage-border)", borderRadius: "var(--r-card)", padding: 40, maxWidth: 640, marginInline: "auto", textAlign: "left" }}>
      <div style={{ fontSize: 18, fontWeight: 600, color: "var(--stage-text)", marginBottom: 6, letterSpacing: "-0.012em" }}>30분 무료 컨설팅 신청</div>
      <div style={{ fontSize: 13, color: "var(--stage-text-secondary)", marginBottom: 28, lineHeight: 1.5 }}>
        아래 정보를 남겨주시면 평일 48시간 내에 담당자가 연락드립니다.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {[
          { key: "company", label: "로펌(회사)명", type: "text", placeholder: "법무법인 OOO" },
          { key: "name", label: "담당자", type: "text", placeholder: "홍길동" },
          { key: "phone", label: "연락처", type: "tel", placeholder: "010-1234-5678" },
          { key: "email", label: "이메일", type: "email", placeholder: "name@lawfirm.com" },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label className="cta-form-label">{label}</label>
            <input
              type={type}
              value={form[key as keyof typeof form]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              onFocus={() => setFocused(key)}
              onBlur={() => setFocused(null)}
              placeholder={placeholder}
              className="cta-form-field"
              style={{ borderColor: focused === key ? "var(--stage-accent)" : undefined }}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={loading} className="btn btn-azure" style={{ width: "100%", padding: "16px 24px", fontSize: 16, marginTop: 8, opacity: loading ? 0.6 : 1 }}>
        {loading ? "전송 중…" : <>신청하기<span className="arrow" aria-hidden>→</span></>}
      </button>
      <div style={{ marginTop: 18, fontSize: 12, color: "var(--stage-text-secondary)", textAlign: "center", letterSpacing: "0.01em" }}>
        비밀유지 보장 · 본 컨설팅까지 비용 없음 · 평일 48시간 내 회신
      </div>
    </div>
  );
}

function FinalCtaSection() {
  return (
    <section id="cta" className="s s-lg bg-stage stage" data-screen-label="08 Final CTA">
      <div className="wrap" style={{ textAlign: "center", paddingTop: 24, paddingBottom: 24 }}>
        <Reveal>
          <h2 style={{ margin: 0, fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.1, letterSpacing: "-0.022em", fontWeight: 700, color: "var(--stage-text)", maxWidth: 1100, marginInline: "auto" }}>
            의뢰인이 AI에게 물을 때,<br />가장 먼저 인용되는{" "}
            <span style={{ color: "var(--stage-accent)" }}>로펌</span>이 되려면?
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ marginTop: 36, fontSize: 20, fontWeight: 400, lineHeight: 1.6, color: "rgba(245,247,250,0.88)", maxWidth: 720, marginInline: "auto", letterSpacing: "-0.008em" }}>
            귀사의 AI 인용 현황과 로펌 GEO·AEO 분석 리포트를 무료로 제공해 드립니다.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div style={{ marginTop: 48 }}>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="foot">
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1.2fr", gap: 64, paddingTop: 24, paddingBottom: 24 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.015em" }}>INANSWER</div>
          <div style={{ marginTop: 12, color: "var(--graphite)", maxWidth: 320, lineHeight: 1.55, fontSize: 14 }}>
            한국 로펌 전용 GEO·AEO 컨설팅. 매월 102,000건의 LLM 답변을 측정하고, 의뢰인이 가장 먼저 마주치는 로펌으로 설계합니다.
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--graphite)", marginBottom: 16, fontFamily: "var(--font-mono)" }}>Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, color: "var(--ash)", fontSize: 14 }}>
            <a href="mailto:contact@inanswer.kr" style={{ color: "var(--ink)", fontWeight: 500 }}>contact@inanswer.kr</a>
            <a href="mailto:press@inanswer.kr">press@inanswer.kr (보도자료)</a>
            <a href="#cta" style={{ color: "var(--graphite)" }}>30분 무료 상담 →</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--graphite)", marginBottom: 16, fontFamily: "var(--font-mono)" }}>Company</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, color: "var(--ash)", fontSize: 13, lineHeight: 1.55 }}>
            <div><span style={{ color: "var(--graphite)" }}>상호</span> &nbsp; 주식회사 인앤써</div>
            <div><span style={{ color: "var(--graphite)" }}>설립</span> &nbsp; 2024</div>
            <div><span style={{ color: "var(--graphite)" }}>주소</span> &nbsp; 서울특별시 강남구</div>
            <div><span style={{ color: "var(--graphite)" }}>대표</span> &nbsp; <span style={{ color: "var(--graphite)", fontStyle: "italic" }}>발행 시 기재 예정</span></div>
            <div><span style={{ color: "var(--graphite)" }}>사업자등록번호</span> &nbsp; <span style={{ color: "var(--graphite)", fontStyle: "italic" }}>발행 시 기재 예정</span></div>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingTop: 24, paddingBottom: 24, borderTop: "1px solid var(--silver-mist)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, color: "var(--graphite)", fontSize: 12 }}>
        <div>© 2026 INANSWER Inc. All rights reserved.</div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "var(--graphite)" }}>이용약관</a>
          <a href="#" style={{ color: "var(--graphite)" }}>개인정보처리방침</a>
          <a href="#" style={{ color: "var(--graphite)" }}>측정 방법론 (PDF)</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--fog)" }}>
      <SubNav />
      <main>
        <HeroSection />
        <ProblemSection />
        <GeoVsSeoSection />
        <FourLoopSection />
        <OnlyLawSection />
        <ReportsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import { TermsModal } from "@/components/TermsModal";

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

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
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--graphite)", marginBottom: 16, fontFamily: "var(--font-mono)" }}>Company</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, color: "var(--ash)", fontSize: 13, lineHeight: 1.55 }}>
            <div><span style={{ color: "var(--graphite)" }}>상호</span> &nbsp; 엔유액셀러레이터</div>
            <div><span style={{ color: "var(--graphite)" }}>설립</span> &nbsp; 2023</div>
            <div><span style={{ color: "var(--graphite)" }}>주소</span> &nbsp; 서울특별시 강남구 테헤란로 20길, 18</div>
            <div><span style={{ color: "var(--graphite)" }}>대표</span> &nbsp; 장재용</div>
            <div><span style={{ color: "var(--graphite)" }}>사업자등록번호</span> &nbsp; 519-88-02607</div>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingTop: 24, paddingBottom: 24, borderTop: "1px solid var(--silver-mist)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, color: "var(--graphite)", fontSize: 12 }}>
        <div>© 2026 INANSWER Inc. All rights reserved.</div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "var(--graphite)" }} onClick={(e) => { e.preventDefault(); setTermsOpen(true); }}>이용약관</a>
          <a href="#" style={{ color: "var(--graphite)" }} onClick={(e) => { e.preventDefault(); setPrivacyOpen(true); }}>개인정보처리방침</a>
        </div>
      </div>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
}

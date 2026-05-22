export function TermsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
          <div style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>이용약관</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#999", fontSize: 20, lineHeight: 1 }}>✕</button>
        </div>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 20 }}>최초 게시일: 2026년 5월 18일</p>

        {[
          ["제1조 (목적)", "본 약관은 엔유액셀러레이터(이하 \"회사\")가 운영하는 INANSWER 서비스의 이용 조건 및 절차, 회사와 이용자 간의 권리·의무 및 책임 사항을 규정하는 것을 목적으로 합니다."],
          ["제2조 (서비스의 내용)", "회사는 한국 로펌을 대상으로 GEO(Generative Engine Optimization) 및 AEO(Answer Engine Optimization) 컨설팅 서비스를 제공합니다. 서비스의 구체적인 내용은 별도 계약 또는 제안서에 따릅니다."],
          ["제3조 (이용 신청 및 계약 체결)", "서비스 이용은 웹사이트의 문의하기 양식을 통해 신청하며, 회사가 이를 승낙함으로써 계약이 성립됩니다. 회사는 업무상 또는 기술상 지장이 있는 경우 승낙을 유보하거나 거절할 수 있습니다."],
          ["제4조 (이용자의 의무)", "이용자는 본 약관 및 관계 법령을 준수하여야 하며, 회사의 업무를 방해하거나 서비스의 원활한 운영을 저해하는 행위를 하여서는 안 됩니다. 타인의 정보를 도용하거나 허위 정보를 제공해서는 안 됩니다."],
          ["제5조 (서비스 제공의 제한)", "회사는 시스템 점검, 천재지변, 서비스 개선 등 불가피한 사유가 발생한 경우 서비스 제공을 일시 중단하거나 제한할 수 있습니다. 이 경우 사전 또는 사후에 공지합니다."],
          ["제6조 (면책 조항)", "회사는 이용자가 제공한 정보의 부정확성으로 인해 발생한 손해에 대해 책임을 지지 않습니다. 서비스 이용으로 발생한 간접적·부수적 손해에 대해서도 회사의 고의 또는 중과실이 없는 한 책임을 지지 않습니다."],
          ["제7조 (분쟁 해결)", "본 약관과 관련된 분쟁은 서울중앙지방법원을 전속 관할 법원으로 하며, 준거법은 대한민국 법률을 적용합니다."],
          ["제8조 (약관의 변경)", "회사는 필요한 경우 약관을 변경할 수 있으며, 변경 시 웹사이트를 통해 7일 이전에 공지합니다."],
        ].map(([title, content]) => (
          <div key={title} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{content}</div>
          </div>
        ))}

        <p style={{ fontSize: 12, color: "#999", lineHeight: 1.7, marginTop: 8 }}>
          문의: contact@inanswer.kr · 엔유액셀러레이터 · 사업자등록번호 519-88-02607
        </p>
        <button
          onClick={onClose}
          style={{ width: "100%", marginTop: 20, padding: "12px", borderRadius: 10, background: "#1B3A2D", color: "#fff", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}
        >
          확인
        </button>
      </div>
    </div>
  );
}

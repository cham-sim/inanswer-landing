export function PrivacyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
          엔유액셀러레이터는 상담 신청 및 서비스 안내를 위해 아래와 같이 개인정보를 수집하고 이용하고자 합니다.
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

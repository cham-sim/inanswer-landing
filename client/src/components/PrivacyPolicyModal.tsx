export function PrivacyPolicyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: 16, padding: "32px 28px", maxWidth: 520, width: "100%", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 8px 48px rgba(0,0,0,0.18)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>개인정보처리방침</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#999", fontSize: 20, lineHeight: 1 }}>✕</button>
        </div>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 20 }}>최초 게시일: 2026년 5월 18일</p>

        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 20 }}>
          엔유액셀러레이터(이하 &quot;회사&quot;)는 「개인정보 보호법」에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리하기 위하여 다음과 같은 방침을 두고 있습니다.
        </p>

        {[
          [
            "제1조 (개인정보의 처리 목적)",
            "회사는 다음 목적을 위하여 개인정보를 처리하며, 목적이 변경되는 경우에는 사전 동의를 받습니다.\n① 서비스 문의 접수 및 상담 응대\n② 계약 체결 및 서비스 제공\n③ 서비스 관련 공지 및 안내",
          ],
          [
            "제2조 (처리하는 개인정보 항목)",
            "회사는 다음의 개인정보 항목을 처리합니다.\n① 필수: 로펌명, 담당자명, 연락처, 이메일\n② 선택: 문의 내용\n③ 서비스 이용 과정에서 IP 주소, 쿠키, 접속 로그 등이 자동 수집될 수 있습니다.",
          ],
          [
            "제3조 (개인정보의 처리 및 보유 기간)",
            "수집된 개인정보는 수집·이용 목적이 달성된 후 지체 없이 파기합니다. 단, 계약이 체결되는 경우 관계 법령에 따라 계약 종료 후 5년간 보유합니다. 이용자가 삭제를 요청하는 경우 지체 없이 파기합니다.",
          ],
          [
            "제4조 (개인정보의 제3자 제공)",
            "회사는 정보주체의 개인정보를 제1조의 처리 목적 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 제3자에게 제공합니다.",
          ],
          [
            "제5조 (개인정보 처리의 위탁)",
            "회사는 현재 개인정보 처리 업무를 외부에 위탁하지 않습니다. 향후 위탁이 발생할 경우 위탁받는 자, 위탁업무의 내용 등을 본 방침을 통해 공개하겠습니다.",
          ],
          [
            "제6조 (정보주체의 권리·의무 및 행사 방법)",
            "정보주체는 언제든지 다음의 권리를 행사할 수 있습니다.\n① 개인정보 열람 요구\n② 오류 등이 있을 경우 정정 요구\n③ 삭제 요구\n④ 처리 정지 요구\n권리 행사는 개인정보 보호책임자에게 서면, 이메일 등을 통해 요청할 수 있으며, 회사는 지체 없이 조치합니다.",
          ],
          [
            "제7조 (개인정보의 파기)",
            "회사는 보유 기간 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때 지체 없이 파기합니다. 전자적 파일 형태는 복구할 수 없는 방법으로 영구 삭제하며, 종이 문서는 분쇄 또는 소각합니다.",
          ],
          [
            "제8조 (개인정보의 안전성 확보 조치)",
            "회사는 개인정보의 안전성 확보를 위해 다음 조치를 취하고 있습니다.\n① 관리적 조치: 내부 관리계획 수립 및 시행, 정기 점검\n② 기술적 조치: 접근 권한 관리, 암호화 저장, 보안 프로그램 설치\n③ 물리적 조치: 자료 보관 장소 접근 통제",
          ],
          [
            "제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부)",
            "회사는 서비스 이용 편의를 위해 쿠키(cookie)를 사용할 수 있습니다. 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으며, 이 경우 일부 서비스 이용에 제약이 있을 수 있습니다.",
          ],
          [
            "제10조 (개인정보 보호책임자)",
            "성명: 장재용\n직책: 대표\n이메일: contact@inanswer.kr\n주소: 서울특별시 강남구 테헤란로 20길, 18",
          ],
          [
            "제11조 (권익침해 구제 방법)",
            "개인정보 침해로 인한 신고·상담이 필요한 경우 아래 기관에 문의할 수 있습니다.\n① 개인정보분쟁조정위원회 (kopico.go.kr / 1833-6972)\n② 개인정보침해신고센터 (privacy.kisa.or.kr / 118)\n③ 대검찰청 사이버수사과 (spo.go.kr / 1301)\n④ 경찰청 사이버수사국 (ecrm.police.go.kr / 182)",
          ],
          [
            "제12조 (방침의 변경)",
            "본 개인정보처리방침은 법령 또는 서비스 변경 사항을 반영하기 위해 개정될 수 있으며, 변경 시 시행일 7일 전부터 웹사이트를 통해 공지합니다.",
          ],
        ].map(([title, content]) => (
          <div key={title} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, whiteSpace: "pre-line" }}>{content}</div>
          </div>
        ))}

        <p style={{ fontSize: 12, color: "#999", lineHeight: 1.7, marginTop: 8 }}>
          엔유액셀러레이터 · 사업자등록번호 519-88-02607 · contact@inanswer.kr
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

import { useEffect, useState } from "react";

export default function SubNav() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const links: [string, string][] = [
    ["loop", "How It Works"],
    ["only", "Why Us"],
    ["reports", "Reports"],
  ];

  useEffect(() => {
    const ids = ["hero", ...links.map((l) => l[0]), "cta"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -49% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".subnav") && !target.closest(".subnav-mobile-menu")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <div className="subnav">
        <div className="wrap subnav-row">
          <a href="#hero" className="subnav-brand" onClick={handleNavClick}>
            InAnswer
          </a>
          <nav className="subnav-links">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#cta" className="btn btn-azure btn-sm" onClick={handleNavClick}>
            상담 신청
          </a>
          <button
            className={`subnav-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="메뉴 열기"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`subnav-mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={handleNavClick}>
            {label}
          </a>
        ))}
        <a
          href="#cta"
          onClick={handleNavClick}
          style={{ color: "var(--azure)", fontWeight: 600 }}
        >
          상담 신청 →
        </a>
      </div>
    </>
  );
}

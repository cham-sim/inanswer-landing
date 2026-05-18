import React, { useEffect, useMemo, useRef, useState } from "react";

/* ─── CountUp ─────────────────────────────────────────── */
interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  sign?: boolean;
  className?: string;
}
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
  decimals = 0,
  sign = false,
  className = "",
}: CountUpProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setVal(to * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setVal(to);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const formatted = useMemo(() => {
    const num = decimals > 0 ? val.toFixed(decimals) : Math.round(val);
    const withCommas = Number(num).toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return (sign && to > 0 ? "+" : "") + withCommas;
  }, [val, decimals, sign, to]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums lining-nums" }}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

/* ─── Reveal on scroll ────────────────────────────────── */
interface RevealProps {
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export function Reveal({ as: Tag = "div", delay = 0, children, className = "", style = {} }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => el.classList.add("in"), delay);
        });
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("in"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    // @ts-ignore – dynamic tag
    <Tag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}

/* ─── FAQ accordion item ──────────────────────────────── */
interface FAQItemProps {
  q: string;
  a: string;
  defaultOpen?: boolean;
}
export function FAQItem({ q, a, defaultOpen = false }: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid var(--silver-mist)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "28px 0",
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 24,
          cursor: "pointer",
          color: "inherit",
        }}
      >
        <span className="t-h-sm" style={{ paddingRight: 24 }}>{q}</span>
        <span
          aria-hidden
          style={{
            flex: "0 0 auto",
            marginTop: 6,
            width: 28,
            height: 28,
            borderRadius: 999,
            border: "1px solid var(--silver-mist)",
            display: "grid",
            placeItems: "center",
            color: "var(--ash)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 200ms cubic-bezier(0.4,0,0.2,1)",
            fontSize: 16,
            lineHeight: 1,
            fontWeight: 300,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 800 : 0,
          overflow: "hidden",
          transition: "max-height 360ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="t-body" style={{ paddingBottom: 28, paddingRight: 56, color: "var(--ash)" }}>
          {a}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import GitLoader from "@/components/GitLoader";
import ImageCarousel from "@/components/ImageCarousel";
import {
  SiHtml5,
  SiCss,
  SiReact,
  SiTailwindcss,
  SiPhp,
  SiMysql,
  SiNodedotjs,
  SiGithub,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail, MdOpenInNew } from "react-icons/md";


type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
};

type Theme = {
  bg: string;
  bgCard: string;
  border: string;
  borderHover: string;
  text: string;
  textMuted: string;
  textFaint: string;
  gridLine: string;
  glow1: string;
  glow2: string;
  btnHoverBg: string;
  btnHoverText: string;
};

// ── macOS Dock Toolbar ──────────────────────────────────────────────
const DOCK_TOOLS = [
  {
    name: "VS Code", category: "Code Editor", color: "#22d3ee",
    icon: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
        <rect width="100" height="100" rx="22" fill="#007ACC"/>
        <path d="M70 15L25 50l15 11.5L70 38V15z" fill="white" opacity="0.9"/>
        <path d="M70 85L25 50l15-11.5L70 62v23z" fill="white" opacity="0.9"/>
        <path d="M70 15v23L40.5 50.5 70 62v23l18-9V24L70 15z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Visual Studio", category: "IDE", color: "#a855f7",
    icon: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
        <rect width="100" height="100" rx="22" fill="#5C2D91"/>
        <path d="M70 15L25 50l15 11.5L70 38V15z" fill="white" opacity="0.9"/>
        <path d="M70 85L25 50l15-11.5L70 62v23z" fill="white" opacity="0.9"/>
        <path d="M70 15v23L40.5 50.5 70 62v23l18-9V24L70 15z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Excel", category: "Spreadsheets", color: "#22c55e",
    icon: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
        <rect width="100" height="100" rx="22" fill="#217346"/>
        <path d="M58 20H30a4 4 0 00-4 4v52a4 4 0 004 4h40a4 4 0 004-4V36L58 20z" fill="white" opacity="0.15"/>
        <path d="M58 20v16h16" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M38 48l8 12 8-12M54 48l-8 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Word", category: "Documents", color: "#3b82f6",
    icon: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
        <rect width="100" height="100" rx="22" fill="#2B579A"/>
        <path d="M58 20H30a4 4 0 00-4 4v52a4 4 0 004 4h40a4 4 0 004-4V36L58 20z" fill="white" opacity="0.15"/>
        <path d="M58 20v16h16" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M34 45l6 20 6-14 6 14 6-20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Canva", category: "Design", color: "#f97316",
    icon: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
        <rect width="100" height="100" rx="22" fill="#7D2AE8"/>
        <circle cx="50" cy="50" r="28" fill="none" stroke="white" strokeWidth="3" opacity="0.3"/>
        <circle cx="38" cy="42" r="9" fill="#00C4CC"/>
        <circle cx="62" cy="58" r="9" fill="#FF6B6B"/>
        <circle cx="62" cy="42" r="9" fill="#FFE066"/>
        <circle cx="38" cy="58" r="9" fill="#9B59B6"/>
      </svg>
    ),
  },
  {
    name: "CapCut", category: "Video Edit", color: "#e879f9",
    icon: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
        <rect width="100" height="100" rx="22" fill="#000000"/>
        <rect x="18" y="30" width="42" height="40" rx="6" fill="white" opacity="0.9"/>
        <path d="M60 41l22-10v38L60 59" fill="white" opacity="0.9"/>
        <path d="M34 42v16M42 50H26" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "GitHub", category: "Version Control", color: "#e5e5e5",
    icon: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
        <rect width="100" height="100" rx="22" fill="#24292e"/>
        <path d="M50 18a32 32 0 00-10.1 62.4c1.6.3 2.2-.7 2.2-1.5v-5.8c-8.9 1.9-10.8-4.3-10.8-4.3-1.4-3.7-3.5-4.6-3.5-4.6-2.9-2 .2-1.9.2-1.9 3.2.2 4.8 3.3 4.8 3.3 2.8 4.8 7.4 3.4 9.2 2.6.3-2 1.1-3.4 2-4.2-7.1-.8-14.5-3.5-14.5-15.7 0-3.5 1.2-6.3 3.3-8.5-.3-.8-1.4-4 .3-8.4 0 0 2.7-.9 8.8 3.3a30.6 30.6 0 0116 0c6.1-4.2 8.8-3.3 8.8-3.3 1.7 4.4.6 7.6.3 8.4 2.1 2.2 3.3 5 3.3 8.5 0 12.2-7.5 14.9-14.6 15.7 1.2 1 2.2 3 2.2 6v8.9c0 .8.6 1.8 2.2 1.5A32 32 0 0050 18z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Figma", category: "UI Design", color: "#f24e1e",
    icon: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
        <rect width="100" height="100" rx="22" fill="#1e1e1e"/>
        <rect x="30" y="18" width="20" height="20" rx="10" fill="#F24E1E"/>
        <rect x="50" y="18" width="20" height="20" rx="10" fill="#FF7262"/>
        <rect x="30" y="38" width="20" height="20" rx="0" fill="#A259FF"/>
        <circle cx="60" cy="48" r="10" fill="#1ABCFE"/>
        <rect x="30" y="58" width="20" height="20" rx="0 0 10 10" fill="#0ACF83"/>
      </svg>
    ),
  },
];

function DockToolbar({ dark, t }: { dark: boolean; t: Theme }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [mobileScales, setMobileScales] = useState<number[]>(DOCK_TOOLS.map(() => 1));
  const [mobileCentered, setMobileCentered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const BASE = 72;
  const MAX = 120;
  const SPREAD = 160;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Recompute per-icon scale on every scroll tick using live getBoundingClientRect
  useEffect(() => {
    if (!isMobile) return;
    const scrollEl = scrollRef.current;
    const dockEl = dockRef.current;
    if (!scrollEl || !dockEl) return;

    const compute = () => {
      const scrollRect = scrollEl.getBoundingClientRect();
      const viewCenter = scrollRect.left + scrollRect.width / 2;
      const items = dockEl.querySelectorAll<HTMLElement>(".dock-item");
      let closestIdx = -1;
      let minDist = Infinity;
      const scales = Array.from(items).map((item, i) => {
        const r = item.getBoundingClientRect();
        const itemCenter = r.left + r.width / 2;
        const dist = Math.abs(viewCenter - itemCenter);
        if (dist < minDist) { minDist = dist; closestIdx = i; }
        if (dist > SPREAD) return 1;
        const norm = 1 - dist / SPREAD;
        return 1 + (MAX / BASE - 1) * norm * norm;
      });
      setMobileScales(scales);
      setMobileCentered(closestIdx);
    };

    compute();
    scrollEl.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      scrollEl.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [isMobile]);

  const getDesktopScale = (index: number) => {
    if (mouseX === null || hoveredIndex === null) return 1;
    const dockEl = dockRef.current;
    if (!dockEl) return 1;
    const items = dockEl.querySelectorAll<HTMLElement>(".dock-item");
    if (!items[index]) return 1;
    const rect = items[index].getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - itemCenter);
    if (dist > SPREAD) return 1;
    const norm = 1 - dist / SPREAD;
    return 1 + (MAX / BASE - 1) * norm * norm;
  };

  // Shared icon list renderer
  const renderIcons = (getScale: (i: number) => number, isActive: (i: number) => boolean) =>
    DOCK_TOOLS.map((tool, i) => {
      const scale = getScale(i);
      const active = isActive(i);
      return (
        <div
          key={tool.name}
          className="dock-item relative flex flex-col items-center"
          style={{ flexShrink: 0 }}
          onMouseEnter={!isMobile ? () => setHoveredIndex(i) : undefined}
        >
          {/* Tooltip */}
          <div style={{
            position: "absolute", bottom: "100%", left: "50%",
            transform: "translateX(-50%)", marginBottom: 10,
            opacity: active ? 1 : 0, pointerEvents: "none",
            transition: "opacity 0.15s ease", whiteSpace: "nowrap", zIndex: 10,
          }}>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{
              background: "rgba(30,30,30,0.95)",
              color: t.text, border: `1px solid ${t.border}`,
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            }}>
              {tool.name}
              <span className="block text-[10px] font-normal mt-0.5" style={{ color: tool.color }}>
                {tool.category}
              </span>
            </div>
            <div style={{
              width: 8, height: 8,
              background: "rgba(30,30,30,0.95)",
              border: `1px solid ${t.border}`, borderTop: "none", borderLeft: "none",
              transform: "rotate(45deg)", margin: "-4px auto 0",
            }} />
          </div>

          {/* Icon */}
          <div style={{
            width: BASE, height: BASE,
            borderRadius: Math.round(BASE * 0.22), overflow: "hidden",
            transform: `scale(${scale})`, transformOrigin: "bottom center",
            transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
            boxShadow: active
              ? `0 8px 24px ${tool.color}55, 0 2px 8px rgba(0,0,0,0.3)`
              : "0 2px 8px rgba(0,0,0,0.2)",
          }}>
            {tool.icon}
          </div>

          {/* Dot */}
          <div style={{
            width: 4, height: 4, borderRadius: "50%", marginTop: 5,
            backgroundColor: tool.color, opacity: 0.6,
          }} />
        </div>
      );
    });

  const reflection = (width = "100%") => (
    <div style={{
      width, height: 1, marginTop: 2,
      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
    }} />
  );

  const pillStyle: React.CSSProperties = {
    display: "flex", alignItems: "flex-end", gap: 20,
    padding: "16px 24px", borderRadius: 20,
    background: "rgba(255,255,255,0.06)",
    border: `1px solid rgba(255,255,255,0.10)`,
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
  };

  // ── Mobile ────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="flex flex-col items-center mb-16 w-full">
        <div
          ref={scrollRef}
          style={{
            width: "100%",
            overflowX: "auto",
            overflowY: "visible",
            paddingTop: 48,
            paddingBottom: 16,
            scrollbarWidth: "none",
          }}
          className="[&::-webkit-scrollbar]:hidden"
        >
          {/* Pill: left/right margin = half viewport so first/last icon can reach center */}
          <div
            ref={dockRef}
            style={{
              ...pillStyle,
              display: "inline-flex",
              marginLeft: "calc(50vw - 60px)",
              marginRight: "calc(50vw - 60px)",
            }}
          >
            {renderIcons(
              (i) => mobileScales[i] ?? 1,
              (i) => mobileCentered === i,
            )}
          </div>
        </div>
        {reflection("80%")}
      </div>
    );
  }

  // ── Desktop ───────────────────────────────────────────────────────
  return (
    <div
      className="flex flex-col items-center mb-16"
      onMouseLeave={() => { setHoveredIndex(null); setMouseX(null); }}
    >
      <div
        ref={dockRef}
        style={{ ...pillStyle, gap: 20 }}
        className="gap-5"
        onMouseMove={(e) => setMouseX(e.clientX)}
      >
        {renderIcons(getDesktopScale, (i) => hoveredIndex === i)}
      </div>
      {reflection()}
    </div>
  );
}
// ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showCV, setShowCV] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const dark = true;
  const [socialLinks, setSocialLinks] = useState<{ label: string; href: string; icon: React.ReactNode; isEmail?: boolean }[]>([]);
  const [pfpHovered, setPfpHovered] = useState(false);
  const [radialOpen, setRadialOpen] = useState<string | null>(null);
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isTouchRef = useRef(false);
  const mobilePfpRef = useRef<HTMLDivElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const YOUR_EMAIL = "mariel.inoj@gmail.com"; // ← change this to your email

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    let cleanup: (() => void) | undefined;

    const attach = () => {
      // Use the overlay scroller if open, otherwise the window
      const scroller = overlayRef.current ?? (typeof window !== "undefined" ? (document.documentElement as unknown as HTMLDivElement) : null);
      if (!scroller) return;

      let targetProgress = 0;
      let currentProgress = 0;

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const tick = () => {
        // Smooth lerp toward target — 0.12 gives fluid but responsive tracking
        currentProgress = lerp(currentProgress, targetProgress, 0.12);
        if (Math.abs(currentProgress - targetProgress) > 0.1) {
          setScrollProgress(currentProgress);
          rafId = requestAnimationFrame(tick);
        } else {
          currentProgress = targetProgress;
          setScrollProgress(currentProgress);
        }
      };

      const handleScroll = () => {
        const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!steps.length || !timelineRef.current) return;

        const isWindow = scroller === document.documentElement;
        const scrollTop = isWindow ? window.scrollY : (scroller as HTMLDivElement).scrollTop;
        const clientHeight = isWindow ? window.innerHeight : (scroller as HTMLDivElement).clientHeight;

        const toScrollPos = (el: HTMLElement) => {
          if (isWindow) {
            return el.getBoundingClientRect().top + scrollTop;
          }
          const scrollerEl = scroller as HTMLDivElement;
          const r = el.getBoundingClientRect();
          const scrollerRect = scrollerEl.getBoundingClientRect();
          return r.top - scrollerRect.top + scrollerEl.scrollTop;
        };

        const triggerY = scrollTop + clientHeight * 0.4;

        let closestIndex = 0;
        let closestDist = Infinity;
        steps.forEach((el, i) => {
          const mid = toScrollPos(el) + el.offsetHeight / 2;
          const dist = Math.abs(mid - triggerY);
          if (dist < closestDist) { closestDist = dist; closestIndex = i; }
        });
        setActiveStep(closestIndex);

        // Bar height = scroll-relative mid of active step minus scroll-relative top of timeline
        const tlTop = toScrollPos(timelineRef.current);
        const activeEl = steps[closestIndex];
        const activeMid = toScrollPos(activeEl) + activeEl.offsetHeight / 2;
        targetProgress = Math.min(
          timelineRef.current.offsetHeight,
          Math.max(0, activeMid - tlTop)
        );

        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tick);
      };

      handleScroll();
      const eventTarget = scroller === document.documentElement ? window : scroller as HTMLDivElement;
      eventTarget.addEventListener("scroll", handleScroll, { passive: true });
      cleanup = () => {
        eventTarget.removeEventListener("scroll", handleScroll);
        cancelAnimationFrame(rafId);
      };
    };

    const timer = setTimeout(attach, 80);
    return () => {
      clearTimeout(timer);
      cleanup?.();
      cancelAnimationFrame(rafId);
    };
  }, [radialOpen]);
  useEffect(() => {
  setSocialLinks([
    { label: "LinkedIn",  href: "https://www.linkedin.com/in/mariel-inoj/",  icon: <FaLinkedin size={16} />, isEmail: false },
    { label: "GitHub",    href: "https://github.com/Marsinoj",                icon: <SiGithub size={16} />,   isEmail: false },
    { label: "mariel.inoj@gmail.com", href: "mailto:mariel.inoj@gmail.com",   icon: <MdEmail size={16} />,    isEmail: false },
    { label: "Portfolio", href: "https://mars-portfolio-lake.vercel.app/",    icon: <MdOpenInNew size={16} />, isEmail: false },
  ]);
}, []);

  // Touch listeners handled by onClick on the center pfp div in mobile section
  useEffect(() => {
    // No-op: mobile touch is now handled via onClick toggles directly on elements
    return () => {};
  }, []);

  const certificatesData: Certificate[] = [
    { id: 6, title: "Introduction to Computer Networking", issuer: "Simplilearn", date: "April 6, 2026", image: "/Certificate6.png" },
    { id: 5, title: "Introduction to Cyber Security", issuer: "Simplilearn", date: "March 25, 2026", image: "/Certificate5.png" },
    { id: 1, title: "Build Complete CMS Blog in PHP MySQL Bootstrap & PDO", issuer: "Udemy", date: "Dec. 10, 2024", image: "/Certificate1.png" },
    { id: 2, title: "Learn PHP and MySQL for Web Application and Web Development", issuer: "Udemy", date: "Sept. 26, 2024", image: "/Certificate2.png" },
    { id: 3, title: "Introduction to SQL", issuer: "Simplilearn", date: "Sept. 26, 2024", image: "/Certificate3.png" },
    { id: 4, title: "JavaScript Tutorial: Learn JavaScript Just in 1 Hour", issuer: "Learnoverse", date: "April 12, 2023", image: "/Certificate4.png" },
  ];

  const skills = [
    { icon: SiHtml5, label: "HTML", color: "#f97316" },
    { icon: SiCss, label: "CSS", color: "#3b82f6" },
    { icon: SiReact, label: "React", color: "#22d3ee" },
    { icon: SiTailwindcss, label: "Tailwind", color: "#2dd4bf" },
    { icon: SiPhp, label: "PHP", color: "#a855f7" },
    { icon: SiMysql, label: "MySQL", color: "#f97316" },
    { icon: SiNodedotjs, label: "Node.js", color: "#22c55e" },
  ];

  const issuerColor = (issuer: string): string => {
    if (issuer === "Udemy") return "#f97316";
    if (issuer === "Simplilearn") return "#22d3ee";
    return "#a3e635";
  };

  const t: Theme = {
        bg: "#13131a",
        bgCard: "#1a1a24",
        border: "rgba(255,255,255,0.08)",
        borderHover: "rgba(255,255,255,0.22)",
        text: "#e5e5e5",
        textMuted: "#9ca3af",
        textFaint: "#6b7280",
        gridLine: "rgba(255,255,255,0.04)",
        glow1: "rgba(132,204,22,0.05)",
        glow2: "rgba(6,182,212,0.05)",
        btnHoverBg: "#ffffff",
        btnHoverText: "#000000",
      };

  const GridBg = () => (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 20% 10%, rgba(132,204,22,0.10) 0%, transparent 60%),
               radial-gradient(ellipse 60% 40% at 80% 20%, rgba(6,182,212,0.10) 0%, transparent 55%),
               radial-gradient(ellipse 70% 60% at 50% 80%, rgba(168,85,247,0.07) 0%, transparent 60%),
               #13131a`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transform: "perspective(600px) rotateX(20deg) scaleY(2.2)",
          transformOrigin: "top center",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "600px", height: "500px", top: "-10%", left: "5%",
          background: "radial-gradient(circle, rgba(132,204,22,0.13) 0%, transparent 70%)",
          animation: "orbFloat1 18s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "500px", height: "500px", top: "10%", right: "0%",
          background: "radial-gradient(circle, rgba(6,182,212,0.13) 0%, transparent 70%)",
          animation: "orbFloat2 22s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "400px", height: "400px", bottom: "15%", left: "40%",
          background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)",
          animation: "orbFloat3 26s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Floating particles */}
      {[
        { size: 3, top: "12%", left: "8%",  color: "rgba(132,204,22,0.6)",  dur: "8s",  delay: "0s",   drift: "25px" },
        { size: 2, top: "28%", left: "18%", color: "rgba(6,182,212,0.5)",   dur: "11s", delay: "1.5s", drift: "18px" },
        { size: 4, top: "55%", left: "6%",  color: "rgba(168,85,247,0.5)",  dur: "9s",  delay: "3s",   drift: "30px" },
        { size: 2, top: "70%", left: "25%", color: "rgba(132,204,22,0.4)",  dur: "13s", delay: "0.7s", drift: "20px" },
        { size: 3, top: "85%", left: "12%", color: "rgba(6,182,212,0.6)",   dur: "7s",  delay: "2.2s", drift: "22px" },
        { size: 2, top: "18%", left: "88%", color: "rgba(168,85,247,0.6)",  dur: "10s", delay: "0.4s", drift: "28px" },
        { size: 4, top: "40%", left: "92%", color: "rgba(132,204,22,0.5)",  dur: "12s", delay: "1.8s", drift: "15px" },
        { size: 2, top: "62%", left: "85%", color: "rgba(6,182,212,0.4)",   dur: "8.5s",delay: "3.5s", drift: "25px" },
        { size: 3, top: "78%", left: "78%", color: "rgba(168,85,247,0.5)",  dur: "9.5s",delay: "1s",   drift: "20px" },
        { size: 2, top: "90%", left: "65%", color: "rgba(132,204,22,0.6)",  dur: "11s", delay: "2.8s", drift: "18px" },
        { size: 3, top: "35%", left: "50%", color: "rgba(6,182,212,0.35)",  dur: "14s", delay: "0.2s", drift: "35px" },
        { size: 2, top: "5%",  left: "55%", color: "rgba(168,85,247,0.45)", dur: "10s", delay: "4s",   drift: "22px" },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            top: p.top, left: p.left,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `particleFloat ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
            ["--drift" as string]: p.drift,
          }}
        />
      ))}

      {/* Twinkling stars */}
      {[
        { top: "8%",  left: "30%", delay: "0s",   dur: "3s"   },
        { top: "22%", left: "72%", delay: "1.2s", dur: "2.5s" },
        { top: "45%", left: "15%", delay: "0.6s", dur: "4s"   },
        { top: "60%", left: "58%", delay: "2s",   dur: "3.5s" },
        { top: "75%", left: "42%", delay: "0.3s", dur: "2.8s" },
        { top: "15%", left: "48%", delay: "1.7s", dur: "3.2s" },
        { top: "88%", left: "82%", delay: "0.9s", dur: "2.3s" },
        { top: "33%", left: "95%", delay: "2.4s", dur: "3.8s" },
        { top: "52%", left: "35%", delay: "1s",   dur: "4.2s" },
        { top: "95%", left: "20%", delay: "1.5s", dur: "2.7s" },
      ].map((s, i) => (
        <div
          key={`star-${i}`}
          className="absolute"
          style={{
            top: s.top, left: s.left,
            width: 1.5, height: 1.5,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.8)",
            boxShadow: "0 0 4px rgba(255,255,255,0.6)",
            animation: `starTwinkle ${s.dur} ease-in-out infinite`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );

  // All social links pre-rendered as JSX — no component references, safe for TypeScript

  if (loading) return <GitLoader onFinish={() => setLoading(false)} />;

  return (
    <main
      className="relative min-h-screen overflow-x-hidden transition-colors duration-300"
      style={{ backgroundColor: `${t.bg}40`, color: t.text }}
    >
      <GridBg />

      {/* Cursor glow */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(132,204,22,0.07) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.12s ease-out, top 0.12s ease-out",
          filter: "blur(8px)",
        }}
      />

      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.05); }
          66%       { transform: translate(-20px, 15px) scale(0.97); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(-25px, 20px) scale(1.03); }
          66%       { transform: translate(20px, -15px) scale(0.98); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(15px, -25px) scale(1.04); }
        }
        @keyframes particleFloat {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0.7; }
          25%  { transform: translateY(calc(var(--drift) * -1)) translateX(calc(var(--drift) * 0.4)); opacity: 1; }
          50%  { transform: translateY(calc(var(--drift) * -1.6)) translateX(calc(var(--drift) * -0.3)); opacity: 0.5; }
          75%  { transform: translateY(calc(var(--drift) * -0.8)) translateX(calc(var(--drift) * 0.6)); opacity: 0.9; }
          100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.8); }
        }
        @keyframes cursorGlow {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.9; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marquee 38s linear infinite;
          padding: 8px 0 20px 0;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .cert-card-item {
          flex-shrink: 0;
          width: calc((100vw - clamp(64px, 15vw, 384px) * 2 - 32px) / 3);
          min-width: 140px;
        }
        @media (max-width: 640px) {
          .cert-card-item {
            width: calc((100vw - 64px - 24px) / 2);
            min-width: 120px;
          }
        }
        @keyframes pfpCardIn {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pfp-hover-card {
          animation: pfpCardIn 0.22s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toastOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(-8px) scale(0.95); }
        }
        .toast-enter {
          animation: toastIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `}</style>

      {/* ── Navigation ── */}
      <nav
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 sm:px-12 lg:px-[384px] py-5 backdrop-blur-xl transition-colors duration-300"
        style={{ borderBottom: `1px solid ${t.border}`, backgroundColor: `${t.bg}b3` }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm font-semibold tracking-tight rounded-full px-4 py-1.5 cursor-pointer hover:opacity-70 transition-all focus:outline-none"
          style={{ color: t.text, border: `1px solid ${t.border}` }}
        >
          Riri
        </button>

        <div className="hidden md:flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
            style={{ border: `1px solid #1D9E75`, background: '#0f2e25', color: '#4ade80' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
            Available for work
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
        </div>
      </nav>


      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-0 md:min-h-screen flex flex-col justify-start pb-12 md:pb-24 px-6 sm:px-12 lg:px-[384px] pt-20 md:pt-32">
        <div className="mb-8">
          <span
            className="inline-flex items-center gap-2 text-xs rounded-full px-4 py-1.5"
            style={{ border: `1px solid ${t.border}`, color: t.textMuted }}
          >
            <span className="text-lime-400">&#x2736;</span> Information Technology Graduate &#xB7; Frontend Developer &#x2197;
          </span>
        </div>

        <h1
          className="text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.95] tracking-tight mb-8 max-w-5xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
        >
          Turning <br />Concepts<br />
          <span style={{ color: "rgba(255,255,255,0.85)" }}>
            Into <br />Reality
          </span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end gap-8 max-w-5xl">
          <p className="text-sm leading-relaxed max-w-sm" style={{ color: t.textMuted }}>
            <span className="font-semibold" style={{ color: t.text }}>Mariel Inojales</span> is an{" "}
            <span className="font-semibold" style={{ color: t.text }}>Information Technology graduate and Frontend Developer</span>{" "}
            who specializes in building responsive, user-centered web applications that transform ideas into functional, intuitive digital experiences.
          </p>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() => setRadialOpen("Contact")}
              className="flex items-center gap-2 text-sm rounded-full px-5 py-2.5 transition-all duration-200"
              style={{ border: `1px solid ${t.borderHover}`, color: t.text }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = t.btnHoverBg;
                e.currentTarget.style.color = t.btnHoverText;
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = t.text;
              }}
            >
              Get in touch &#x2197;
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 md:mt-12">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xs transition-all"
              style={{ border: `1px solid ${t.border}`, color: t.textMuted }}
            >
              <skill.icon style={{ color: skill.color, width: 14, height: 14 }} />
              {skill.label}
            </div>
          ))}
        </div>

        {/* ── Mobile Profile + Nav (visible on mobile only) ── */}
        <div className="flex md:hidden flex-col items-center gap-10 mt-10 mb-4">
          {/* Touch-driven floating cards — mirrors desktop hover interaction */}
          <div
            style={{ position: "relative", width: 360, height: 360, touchAction: "none" }}
            ref={mobilePfpRef}
            onMouseEnter={() => setPfpHovered(true)}
            onMouseLeave={() => { setPfpHovered(false); setHoveredSlice(null); }}
          >
            {/* Floating GIF cards — tap pfp to reveal, tap card to open */}
            {([
              { label: "Projects",     color: "#f97316", caption: "My work",   image: "/Projects.gif",     pos: "top"    },
              { label: "Certificates", color: "#22d3ee", caption: "My certs",  image: "/Certificates.gif", pos: "right"  },
              { label: "Contact",      color: "#e879f9", caption: "Reach me",  image: "/Contact.gif",      pos: "left"   },
            ] as { label: string; color: string; caption: string; image: string; pos: string }[]).map((item) => {
              const isHov = hoveredSlice === item.label;
              const cardSize = 100;
              // Push cards away from center with explicit inset values (container is 360px, center is 180px)
              const posStyle: React.CSSProperties =
                item.pos === "top"    ? { top: 8,    left: "50%", transform: "translateX(-50%)" } :
                item.pos === "right"  ? { right: 8,  top:  "50%", transform: "translateY(-50%)" } :
                item.pos === "bottom" ? { bottom: 8, left: "50%", transform: "translateX(-50%)" } :
                                       { left: 8,   top:  "50%", transform: "translateY(-50%)" };
              return (
                <button
                  key={item.label}
                  onClick={() => { if (pfpHovered) { setRadialOpen(item.label); setPfpHovered(false); } }}
                  onMouseEnter={() => setHoveredSlice(item.label)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  onTouchStart={(e) => { e.stopPropagation(); setHoveredSlice(item.label); }}
                  onTouchEnd={(e) => {
                    e.stopPropagation();
                    if (pfpHovered) {
                      setRadialOpen(item.label);
                      setPfpHovered(false);
                      setHoveredSlice(null);
                    }
                  }}
                  style={{
                    position: "absolute",
                    ...posStyle,
                    width: cardSize,
                    height: cardSize,
                    borderRadius: 18,
                    overflow: "hidden",
                    border: `1.5px solid ${isHov ? item.color : item.color + "55"}`,
                    boxShadow: isHov ? `0 0 14px ${item.color}55` : "none",
                    opacity: pfpHovered ? 1 : 0,
                    transform: `${posStyle.transform ?? ""} ${
                      !pfpHovered
                        ? item.pos === "top"    ? "translateY(-8px)"
                        : item.pos === "bottom" ? "translateY(8px)"
                        : item.pos === "right"  ? "translateX(8px)"
                        :                         "translateX(-8px)"
                        : ""
                    }`,
                    transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, border-color 0.2s ease",
                    cursor: "pointer",
                    padding: 0,
                    background: "none",
                    pointerEvents: pfpHovered ? "auto" : "none",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "5px 7px",
                    background: isHov ? `${item.color}dd` : "rgba(0,0,0,0.55)",
                    transition: "background 0.2s ease",
                  }}>
                    <p style={{ margin: 0, fontSize: 9, fontWeight: 700, color: isHov ? "#000" : "#fff", letterSpacing: "0.05em" }}>
                      {item.label}
                    </p>
                    <p style={{ margin: 0, fontSize: 8, color: isHov ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.65)" }}>
                      {item.caption}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Centre pfp — tap to toggle cards */}
            <div
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 140, height: 140,
                zIndex: 1,
              }}
              onClick={() => { setPfpHovered(!pfpHovered); setHoveredSlice(null); }}
            >
              <img
                src="/pfp.jpg"
                alt="Mariel Inojales"
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  borderRadius: "50%", objectFit: "cover",
                  border: `2px solid ${pfpHovered ? t.borderHover : t.border}`,
                  boxShadow: pfpHovered
                    ? "0 0 0 4px rgba(163,230,53,0.13), 0 16px 40px rgba(0,0,0,0.5)"
                    : "none",
                  opacity: pfpHovered ? 0 : 1,
                  transition: "opacity 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              />
              <img
                src="/pfp-hover.jpg"
                alt="Mariel Inojales"
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  borderRadius: "50%", objectFit: "cover",
                  border: `2px solid ${t.borderHover}`,
                  boxShadow: "0 0 0 4px rgba(163,230,53,0.13), 0 16px 40px rgba(0,0,0,0.5)",
                  opacity: pfpHovered ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              />
            </div>

            {/* Tap hint */}
            <p
              style={{
                position: "absolute",
                bottom: -24, left: "50%", transform: "translateX(-50%)",
                fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                color: t.textFaint,
                opacity: pfpHovered ? 0 : 0.7,
                transition: "opacity 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              tap me
            </p>
          </div>
        </div>

        {/* ── PFP Floating Cards Menu ── */}
        <div
          className="hidden md:flex absolute items-center justify-center"
          style={{
            bottom: 96,
            right: "clamp(32px, 10vw, 280px)",
            width: "clamp(420px, 45vw, 680px)",
            height: "clamp(420px, 45vw, 680px)",
          }}
          onMouseEnter={() => setPfpHovered(true)}
          onMouseLeave={() => { setPfpHovered(false); setHoveredSlice(null); }}
        >
          {/* Floating GIF cards — top, right, bottom, left */}
          {([
            { label: "Projects",     color: "#f97316", caption: "My work",   image: "/Projects.gif",pos: "top"    },
            { label: "Certificates", color: "#22d3ee", caption: "My certs",  image: "/Certificates.gif",   pos: "right"  },
            { label: "Contact",      color: "#e879f9", caption: "Reach me",  image: "/Contact.gif", pos: "left"   },
          ] as { label: string; color: string; caption: string; image: string; pos: string }[]).map((item) => {
            const isHov = hoveredSlice === item.label;
            const cardSize = "clamp(100px, 25%, 170px)";
            const posStyle: React.CSSProperties =
              item.pos === "top"    ? { top: 0,    left: "50%", transform: "translateX(-50%)" } :
              item.pos === "right"  ? { right: 0,  top:  "50%", transform: "translateY(-50%)" } :
              item.pos === "bottom" ? { bottom: 0, left: "50%", transform: "translateX(-50%)" } :
                                     { left: 0,   top:  "50%", transform: "translateY(-50%)" };
            return (
              <button
                key={item.label}
                onClick={() => setRadialOpen(item.label)}
                onMouseEnter={() => setHoveredSlice(item.label)}
                onMouseLeave={() => setHoveredSlice(null)}
                style={{
                  position: "absolute",
                  ...posStyle,
                  width: cardSize,
                  aspectRatio: "1",
                  height: "auto",
                  borderRadius: 22,
                  overflow: "hidden",
                  border: `1.5px solid ${isHov ? item.color : item.color + "55"}`,
                  boxShadow: isHov ? `0 0 18px ${item.color}55` : "none",
                  opacity: pfpHovered ? 1 : 0,
                  transform: `${posStyle.transform ?? ""} ${
                    !pfpHovered
                      ? item.pos === "top"    ? "translateY(-10px)"
                      : item.pos === "bottom" ? "translateY(10px)"
                      : item.pos === "right"  ? "translateX(10px)"
                      :                         "translateX(-10px)"
                      : ""
                  }`,
                  transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, border-color 0.2s ease",
                  cursor: "pointer",
                  padding: 0,
                  background: "none",
                }}
              >
                {/* GIF fills the card */}
                <img
                  src={item.image}
                  alt={item.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Label overlay at bottom */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "6px 8px",
                  background: isHov ? `${item.color}dd` : "rgba(0,0,0,0.55)",
                  transition: "background 0.2s ease",
                }}>
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: isHov ? "#000" : "#fff", letterSpacing: "0.05em" }}>
                    {item.label}
                  </p>
                  <p style={{ margin: 0, fontSize: 9, color: isHov ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.65)" }}>
                    {item.caption}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Centre: Profile image with hover swap */}
          <div style={{ position: "relative", width: "clamp(200px, 50%, 340px)", aspectRatio: "1", height: "auto", zIndex: 1 }}>
            <img
              src="/pfp.jpg"
              alt="Mariel Inojales"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                borderRadius: "50%", objectFit: "cover",
                border: `2px solid ${pfpHovered ? t.borderHover : t.border}`,
                boxShadow: pfpHovered
                  ? "0 0 0 5px rgba(163,230,53,0.13), 0 24px 64px rgba(0,0,0,0.5)"
                  : "none",
                opacity: pfpHovered ? 0 : 1,
                transition: "opacity 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            />
            <img
              src="/pfp-hover.jpg"
              alt="Mariel Inojales"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                borderRadius: "50%", objectFit: "cover",
                border: `2px solid ${t.borderHover}`,
                boxShadow: "0 0 0 5px rgba(163,230,53,0.13), 0 24px 64px rgba(0,0,0,0.5)",
                opacity: pfpHovered ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
          </div>

          {/* Hover hint */}
          <p
            className="absolute text-[10px] tracking-widest uppercase"
            style={{
              bottom: -28, left: "50%", transform: "translateX(-50%)",
              color: t.textFaint,
              opacity: pfpHovered ? 0 : 0.7,
              transition: "opacity 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            hover me
          </p>
        </div>
      </section>



      {/* ── Tools (with About + Gallery + Journey at top) ── */}
      <section id="tools" className="px-6 sm:px-12 lg:px-[384px] pt-10 pb-16 md:pt-14 md:pb-32" style={{ borderTop: `1px solid ${t.border}` }}>

        {/* ── About ── */}
        <div className="mb-6">
  <p
    className="text-xs uppercase tracking-widest mb-1"
    style={{ color: t.textFaint }}
  >
    About
  </p>

  <h2
    className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-tight mb-2"
    style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
  >
    The Mind Behind
  </h2>

  <p
    className="text-sm max-w-md leading-relaxed"
    style={{ color: t.textMuted }}
  >
    A self-taught learner who started from scratch and grew through consistent hands-on development.
  </p>
</div>

        {/* ── Journey ── */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#a3e635" }}>My Journey</p>
          </div>
          <h3
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight mb-2 leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
          >
            Experience Timeline
          </h3>
          <p className="text-sm mb-10" style={{ color: t.textMuted }}>Insights gained across each stage of growth .</p>

          <div className="relative max-w-2xl mx-auto text-left" ref={timelineRef}>
            {/* Rail track */}
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{ width: 2, backgroundColor: "rgba(255,255,255,0.08)" }}
            />
            {/* Growing progress bar */}
            <div
              className="absolute left-0 top-0"
              style={{
                width: 2,
                height: `${scrollProgress}px`,
                backgroundColor: "#a3e635",
                boxShadow: "0 0 6px rgba(163,230,53,0.5)",
              }}
            />
            {/* Fixed dot at the very top */}
            <div
              className="absolute"
              style={{
                left: -3, top: 0,
                width: 8, height: 8,
                borderRadius: "50%",
                backgroundColor: "#a3e635",
                boxShadow: "0 0 10px rgba(163,230,53,0.7)",
              }}
            />

            <div className="space-y-14 pl-8">
              {([
                {
                  year: "Junior High",
                  badge: "Early Days",
                  title: "The First Line of Code",
                  subtitle: "Self-taught · Online",
                  text: "Before IT was even a career plan, I was already writing HTML and CSS in junior high school. Something about making things appear on a screen just clicked — and that curiosity never left.",
                  badges: ["HTML", "CSS"],
                },
                {
                  year: "Senior High · Dec. 2019",
                  badge: "Certified",
                  title: "TVL – CSS NCII Passer",
                  subtitle: "Davao City, Philippines",
                  text: "Passed the Technical-Vocational-Livelihood track with a Computer Systems Servicing NC2 certification — an early proof that the tech path was always the right one.",
                  badges: ["NCII Certified", "Computer Systems Servicing", "TVL Track"],
                },
                {
                  year: "2022",
                  badge: "Student",
                  title: "Enrolled at HCDC",
                  subtitle: "Holy Cross of Davao College · Davao City",
                  text: "I chose to pursue IT at Holy Cross of Davao College — not by accident, but because I already knew this was the field for me. Formal training gave structure to the curiosity I'd been carrying for years.",
                  badges: ["BS Information Technology", "HCDC", "Davao"],
                },
                {
                  year: "2023–2024",
                  badge: "Self-study",
                  title: "Leveling Up",
                  subtitle: "Remote · Online Platforms",
                  text: "Started going beyond the classroom — picking up React, Next.js, and Tailwind, earning certificates from Udemy and Simplilearn, and building real projects that pushed me further than any assignment could.",
                  badges: ["React", "Next.js", "Tailwind CSS", "Supabase", "Udemy", "Simplilearn"],
                },
                {
                  year: "2025-2026",
                  badge: "4th Year",
                  title: "Capstone/Thesis Phase",
                  subtitle: "Holy Cross of Davao College · Davao City",
                  text: "I contributed to the development of Cross AR: An Augmented Reality Journey Through HCDC’s Legacy, a 4-member capstone project focused on creating an AR-based campus experience. My main responsibility was the project documentation, where I worked on the research papers, system write-ups, and structured the technical and conceptual requirements of the study. I also collaborated with the team throughout the planning phase to ensure the system objectives and scope were clearly defined and aligned with the project goals.",
                  badges: ["Capstone"],
                },
                {
                  year: "2025",
                  badge: "Final Year",
                  title: "Soon-to-be Graduate",
                  subtitle: "Holy Cross of Davao College · Davao City",
                  text: "Almost at the finish line at HCDC — but this isn't the end of the journey, it's the beginning. Looking for opportunities to build real products, grow as a developer, and make a real impact.",
                  badges: ["Capstone", "Available for Work"],
                },
                {
                  year: "2026 →",
                  badge: "Open to Work",
                  title: "The Road to Full Stack",
                  subtitle: "Davao City, Philippines",
                  text: "The goal is clear — become a full stack developer. Every day is another rep: sharpening skills, building projects, and pushing further into both frontend and backend.",
                  badges: ["Full Stack", "Node.js", "PHP", "MySQL"],
                },
              ] as { year: string; badge: string; title: string; subtitle: string; text: string; badges: string[] }[]).map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <div
                    key={step.year}
                    className="relative transition-all duration-500"
                    ref={(el) => { stepRefs.current[i] = el; }}
                    style={{
                      opacity: isActive ? 1 : 0.25,
                      transform: isActive ? "translateX(6px)" : "translateX(0)",
                    }}
                  >
                    {/* Badge chip */}
                    <span
                      className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full mb-3"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(163,230,53,0.12)"
                          : "rgba(255,255,255,0.06)",
                        color: isActive ? "#a3e635" : t.textMuted,
                        border: isActive ? "1px solid rgba(163,230,53,0.3)" : `1px solid ${t.border}`,
                      }}
                    >
                      {step.badge}
                    </span>

                    {/* Big serif title */}
                    <h4
                      className="text-[clamp(1.4rem,3vw,2rem)] font-bold leading-tight mb-1 transition-colors duration-500"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        color: isActive ? t.text : t.textMuted,
                      }}
                    >
                      {step.title}
                    </h4>

                    {/* Subtitle / location */}
                    <p
                      className="text-sm mb-3 font-medium transition-colors duration-500"
                      style={{ color: isActive ? "#a3e635" : t.textFaint }}
                    >
                      {step.subtitle}
                    </p>

                    {/* Year */}
                    <p
                      className="text-xs uppercase tracking-widest mb-3 transition-colors duration-500"
                      style={{ color: isActive ? t.textMuted : t.textFaint }}
                    >
                      {step.year}
                    </p>

                    {/* Body text */}
                    <p
                      className="text-sm leading-relaxed mb-4 transition-colors duration-500"
                      style={{ color: isActive ? t.textMuted : t.textFaint }}
                    >
                      {step.text}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {step.badges.map((badge) => (
                        <span
                          key={badge}
                          className="text-[10px] px-2.5 py-1 rounded-full font-medium transition-all duration-500"
                          style={{
                            backgroundColor: isActive
                              ? "rgba(255,255,255,0.07)"
                              : "transparent",
                            border: `1px solid ${isActive ? t.border : "transparent"}`,
                            color: isActive ? t.textMuted : t.textFaint,
                          }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Gallery ── */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#22d3ee" }}>Gallery</p>
          </div>

          {/* Infinite marquee gallery — both rows scroll left, staggered like kaizenics */}
          <ImageCarousel
            images={[
              { src: "5crgims.png", alt: "5CRG IMS - Inventory Management System" },
              { src: "CrossAR.png", alt: "Cross AR - Augmented Reality Campus Experience" },
              { src: "InojalesPortfolio.png", alt: "Personal Portfolio Website" },
              { src: "75HardChallenge.png", alt: "75 Hard Challenge" },
            ]}
            theme={t}
            dark={dark}
          />
        </div>

        {/* ── Tools Dock ── */}
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: t.textFaint }}>Tools</p>
        <h2
          className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight mb-4"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
        >
          Apps &amp; Tools
        </h2>
        <p className="text-sm max-w-md mb-16 leading-relaxed" style={{ color: t.textMuted }}>
          The software and tools I reach for when building, designing, and creating.
        </p>

        {/* macOS Dock */}
        <DockToolbar dark={dark} t={t} />

        {/* ── Footer ── */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 mt-16 gap-4"
          style={{ borderTop: `1px solid ${t.border}` }}
        >
          <p className="text-xs" style={{ color: t.textFaint }}>© 2026 Mariel Inojales. All rights reserved.</p>
          <p className="text-xs" style={{ color: t.textFaint }}>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </section>

      {/* ── CV Overlay ── */}
      {showCV && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto transition-colors duration-300"
          style={{ backgroundColor: `${t.bg}cc`, color: t.text }}
        >
          <GridBg />
          <div
            className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-12 lg:px-[384px] py-5 backdrop-blur-xl"
            style={{ borderBottom: `1px solid ${t.border}`, backgroundColor: `${t.bg}cc` }}
          >
            <button
              onClick={() => setShowCV(false)}
              className="flex items-center gap-2 text-sm rounded-full px-4 py-2 transition-colors"
              style={{ border: `1px solid ${t.border}`, color: t.textMuted }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = t.text; }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = t.textMuted; }}
            >
              ← Back
            </button>
            <span className="text-xs uppercase tracking-widest" style={{ color: t.textFaint }}>
              Curriculum Vitae
            </span>
          </div>
          <div className="px-6 sm:px-12 lg:px-[384px] py-16">
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: t.textFaint }}>Curriculum Vitae</p>
            <h2
              className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-tight mb-10"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
            >
              Mariel Inojales
            </h2>
            <div className="w-full h-[80vh] rounded-2xl overflow-hidden" style={{ border: `1px solid ${t.border}` }}>
              <iframe src="/Inojales_Resume.pdf" className="w-full h-full" title="Curriculum Vitae" />
            </div>
          </div>
        </div>
      )}

      {/* ── Certificate Detail Overlay ── */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto transition-colors duration-300"
          style={{ backgroundColor: `${t.bg}cc`, color: t.text }}
        >
          <GridBg />
          <div
            className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-12 lg:px-[384px] py-5 backdrop-blur-xl"
            style={{ borderBottom: `1px solid ${t.border}`, backgroundColor: `${t.bg}cc` }}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="flex items-center gap-2 text-sm rounded-full px-4 py-2 transition-colors"
              style={{ border: `1px solid ${t.border}`, color: t.textMuted }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = t.text; }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = t.textMuted; }}
            >
              ← Back
            </button>
            <span className="text-xs uppercase tracking-widest" style={{ color: t.textFaint }}>
              03 — Certifications
            </span>
          </div>

          <div className="px-6 sm:px-12 lg:px-[384px] py-16 flex flex-col lg:flex-row gap-16">
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-widest mb-6" style={{ color: t.textFaint }}>Certificate Details</p>
              <h2
                className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-tight leading-tight mb-10"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
              >
                {selectedCert.title}
              </h2>

              <ul className="space-y-5 mb-12">
                {[
                  { label: "Issuer",       value: selectedCert.issuer, valueColor: issuerColor(selectedCert.issuer), mono: false },
                  { label: "Date Issued",  value: selectedCert.date,   valueColor: t.text, mono: false },
                  {
                    label: "Category",
                    value: selectedCert.issuer === "Simplilearn" ? "IT & Networking" : selectedCert.issuer === "Udemy" ? "Web Development" : "Programming",
                    valueColor: t.text,
                    mono: false,
                  },
                  { label: "Certificate ID", value: `CERT-${String(selectedCert.id).padStart(4, "0")}`, valueColor: t.text, mono: true },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3 text-sm">
                    <span className="text-lime-400 mt-0.5 flex-shrink-0">✶</span>
                    <div>
                      <span className="text-xs uppercase tracking-widest block mb-0.5" style={{ color: t.textFaint }}>{item.label}</span>
                      <span className={item.mono ? "font-mono text-xs font-medium" : "font-medium"} style={{ color: item.valueColor }}>{item.value}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div style={{ borderTop: `1px solid ${t.border}` }} className="pt-8">
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: t.textFaint }}>All Certificates</p>
                <ul className="space-y-3">
                  {certificatesData.map((cert) => (
                    <li key={cert.id}>
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="flex items-start gap-3 text-left w-full transition-all"
                        style={{ opacity: cert.id === selectedCert.id ? 1 : 0.45 }}
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cert.id === selectedCert.id ? "#a3e635" : t.textFaint }} />
                        <div>
                          <p className="text-xs leading-snug" style={{ color: t.text }}>{cert.title}</p>
                          <p className="text-[10px] mt-0.5" style={{ color: t.textFaint }}>{cert.issuer} · {cert.date}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:w-72 flex-shrink-0">
              <div className="sticky top-28">
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: t.textFaint }}>Preview</p>
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: t.bgCard, border: `1px solid ${t.border}` }}>
                  <img src={selectedCert.image} alt={selectedCert.title} className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Socials Overlay ── */}
      {showSocials && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: `${t.bg}cc`, color: t.text }}
        >
          <GridBg />
          <button
            onClick={() => setShowSocials(false)}
            className="absolute top-6 right-6 text-sm px-4 py-2 rounded-full transition-all"
            style={{ border: `1px solid ${t.border}`, color: t.textMuted }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = t.text; }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = t.textMuted; }}
          >
            ✕ Close
          </button>

          <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-sm px-6">
            <img src="/pfp.jpg" alt="Profile" className="w-20 h-20 rounded-full object-cover" />
            <h3 className="text-lg font-semibold">Mariel Inojales</h3>
            <p className="text-sm" style={{ color: t.textMuted }}>connect with me.</p>

            <div className="w-full flex flex-col gap-3 mt-4">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-sm py-3 rounded-lg transition-all"
                  style={{ border: `1px solid ${t.border}`, color: t.text }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.backgroundColor = t.btnHoverBg;
                    e.currentTarget.style.color = t.btnHoverText;
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = t.text;
                  }}
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Radial Section Overlays ── */}
      {radialOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 overflow-y-auto transition-colors duration-300"
          style={{ backgroundColor: `${t.bg}ee`, color: t.text }}
        >
          <GridBg />

          {/* Top bar */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-12 lg:px-[384px] py-5 backdrop-blur-xl"
            style={{ borderBottom: `1px solid ${t.border}`, backgroundColor: `${t.bg}cc` }}
          >
            <button
              onClick={() => setRadialOpen(null)}
              className="flex items-center gap-2 text-sm rounded-full px-4 py-2 transition-colors"
              style={{ border: `1px solid ${t.border}`, color: t.textMuted }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = t.text; }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = t.textMuted; }}
            >
              ← Back
            </button>
            <span className="text-xs uppercase tracking-widest" style={{ color: t.textFaint }}>
              {radialOpen}
            </span>
          </div>

          <div className="px-6 sm:px-12 lg:px-[384px] py-16">
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: t.textFaint }}>{radialOpen}</p>
            <h2
              className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-tight mb-10"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
            >
              {radialOpen}
            </h2>

            {/* About */}
            {radialOpen === "About" && (
              <div className="max-w-2xl">
                <p className="text-sm leading-relaxed mb-6" style={{ color: t.textMuted }}>
                  <span className="font-semibold" style={{ color: t.text }}>Mariel Inojales</span> is an{" "}
                  <span className="font-semibold" style={{ color: t.text }}>IT Student &amp; Frontend Developer</span>{" "}
                  based in Davao, Philippines. I build modern digital systems focused on interaction, functionality, and meaningful user experiences.
                </p>
                <p className="text-sm" style={{ color: t.textFaint }}>
                  Scroll down on the main page to explore my Journey, Gallery, and Tools.
                </p>
              </div>
            )}

            {/* Certificates */}
            {radialOpen === "Certificates" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificatesData.map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => { setRadialOpen(null); setSelectedCert(cert); }}
                    className="rounded-2xl overflow-hidden text-left transition-all duration-200"
                    style={{ backgroundColor: t.bgCard, border: `1px solid ${t.border}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.borderHover; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ height: 160, overflow: "hidden", background: t.bgCard }}>
                      <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-medium leading-snug mb-1" style={{ color: t.text }}>{cert.title}</p>
                      <p className="text-[11px]" style={{ color: issuerColor(cert.issuer) }}>{cert.issuer}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: t.textFaint }}>{cert.date}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Projects */}
            {radialOpen === "Projects" && (() => {
              const projects = [
                {
                  id: 1,
                  title: "5CRG IMS - A Web-Based Inventory Management System",
                  description: "5CRG IMS is a web-based inventory management system designed to streamline and optimize inventory tracking, management, and reporting processes. It provides a user-friendly interface for managing products, suppliers, customers, and transactions, while also offering real-time insights and analytics to help businesses make informed decisions.",
                  tags: ["PHP", "MySQL"],
                  image: "/5crgims.png",
                  github: "https://github.com/kaizerklent/Inventory_System.git",
                },
                {
                  id: 2,
                  title: "Cross AR - An Augment Reality Journey Through HCDC’s Legacy",
                  description: "Capstone project focused on creating an AR-based campus experience.",
                  tags: ["C#", "Objective-C / Objective-C++", "ShaderLab", "HLSL"],
                  image: "CrossAR.png",
                  github: "https://github.com/Marsinoj/repo2",
                },
                {
                  id: 3,
                  title: "Mariel Inojales | Portfolio Website",
                  description: "Personal portfolio website built with Next.js and Tailwind CSS, showcasing my projects, skills, and journey as a developer.",
                  tags: ["Next.js", "Tailwind CSS", "React"],
                  image: "InojalesPortfolio.png",
                  github: "https://github.com/Marsinoj/My-Portfolio.git",
                },
                {
                  id: 4,
                  title: "75 Hard Day Challenge Tracker",
                  description: "A simple tracker for monitoring progress on the 75 Hard day challenge.",
                  tags: ["TypeScript", "CSS", "HTML"],
                  image: "75HardChallenge.png",
                  github: "https://github.com/Marsinoj/75HardChallenge.git",
                },
              ];
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-200"
                      style={{ backgroundColor: t.bgCard, border: `1px solid ${t.border}` }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = t.borderHover;
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = t.border;
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      }}
                    >
                      {/* Thumbnail */}
                      <div
                        style={{
                          height: 180,
                          overflow: "hidden",
                          backgroundColor: t.border,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={proj.image}
                          alt={proj.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            img.onerror = null; // prevent infinite loop
                            img.style.display = "none";
                            const parent = img.parentElement;
                            if (parent && !parent.querySelector(".img-fallback")) {
                              const fallback = document.createElement("span");
                              fallback.className = "img-fallback";
                              fallback.textContent = "No preview yet";
                              fallback.style.cssText = `font-size:11px; color:${t.textFaint}`;
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col gap-4 flex-1">
                      {/* Title */}
                      <div>
                        <p className="text-sm font-semibold mb-1" style={{ color: t.text }}>{proj.title}</p>
                        <p className="text-xs leading-relaxed" style={{ color: t.textMuted }}>{proj.description}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${t.border}`, color: t.textFaint, border: `1px solid ${t.border}` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-2 mt-auto flex-wrap">
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                          style={{ border: `1px solid ${t.border}`, color: t.textMuted }}
                          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.backgroundColor = t.btnHoverBg;
                            e.currentTarget.style.color = t.btnHoverText;
                          }}
                          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = t.textMuted;
                          }}
                        >
                          <SiGithub size={12} />
                          GitHub
                        </a>
                      </div>
                      </div>{/* end content */}
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Contact */}
            {radialOpen === "Contact" && (
              <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto mt-8">

                {/* Toast */}
                {emailCopied && (
                  <div
                    className="toast-enter fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium shadow-xl"
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: `1px solid #a3e635`,
                      color: "#a3e635",
                      boxShadow: "0 8px 32px rgba(163,230,53,0.15)",
                    }}
                  >
                    <span style={{ fontSize: 15 }}>✓</span>
                    Email copied to clipboard!
                  </div>
                )}

                <img src="/pfp.jpg" alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                <h3 className="text-lg font-semibold" style={{ color: t.text }}>Mariel Inojales</h3>
                <p className="text-sm" style={{ color: t.textMuted }}>connect with me.</p>
                <div className="w-full flex flex-col gap-3 mt-4">

                  {socialLinks.map((item, i) =>
                    item.isEmail ? (
                      <button
                        key={i}
                        onClick={() => handleCopyEmail(item.href)}
                        className="w-full flex items-center justify-center gap-2 text-sm py-3 rounded-lg transition-all"
                        style={{ border: `1px solid ${t.border}`, color: t.text, backgroundColor: "transparent" }}
                        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.currentTarget.style.backgroundColor = t.btnHoverBg;
                          e.currentTarget.style.color = t.btnHoverText;
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = t.text;
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        {emailCopied ? "Copied! ✓" : item.href}
                      </button>
                    ) : (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 text-sm py-3 rounded-lg transition-all"
                        style={{ border: `1px solid ${t.border}`, color: t.text }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.currentTarget.style.backgroundColor = t.btnHoverBg;
                          e.currentTarget.style.color = t.btnHoverText;
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = t.text;
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </a>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </main>
  );
}
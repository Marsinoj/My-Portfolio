"use client";

import { useState, useEffect, useRef } from "react";
import GitLoader from "@/components/GitLoader";
import {
  SiHtml5,
  SiCss,
  SiReact,
  SiTailwindcss,
  SiPhp,
  SiMysql,
  SiNodedotjs,
  SiGithub,
  SiTelegram,
  SiDiscord,
  SiX,
  SiInstagram
} from "react-icons/si";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showCV, setShowCV] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [dark, setDark] = useState(true);
  const [socialLinks, setSocialLinks] = useState<{ label: string; href: string; icon: React.ReactNode; isEmail?: boolean }[]>([]);
  const [pfpHovered, setPfpHovered] = useState(false);
  const [radialOpen, setRadialOpen] = useState<string | null>(null);
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const YOUR_EMAIL = "marieljinojales@gmail.com"; // ← change this to your email

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (radialOpen !== "About") return;

    const handleScroll = () => {
      const viewportMid = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDist = Infinity;

      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elMid = rect.top + rect.height / 2;
        const dist = Math.abs(elMid - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });

      setActiveStep(closestIndex);
    };

    // Run once immediately so initial state is correct
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [radialOpen]);
  useEffect(() => {
  supabase
    .from("social_links")
    .select("*")
    .order("sort_order")
    .then(({ data }) => {
      if (!data) return;
      const iconMap: Record<string, React.ReactNode> = {
        FaLinkedin:  <FaLinkedin size={16} />,
        FaFacebook:  <FaFacebook size={16} />,
        SiGithub:    <SiGithub size={16} />,
        SiTelegram:  <SiTelegram size={16} />,
      };
      setSocialLinks(
        data.map((s) => ({
          label: s.label,
          href:  s.href,
          icon:  iconMap[s.icon_name] ?? <span className="text-base leading-none">✉</span>,
          isEmail: s.icon_name === "MdEmail",
        }))
      );
    });
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

  const t: Theme = dark
    ? {
        bg: "#0a0a0a",
        bgCard: "#111111",
        border: "rgba(255,255,255,0.08)",
        borderHover: "rgba(255,255,255,0.22)",
        text: "#e5e5e5",
        textMuted: "#6b7280",
        textFaint: "#374151",
        gridLine: "rgba(255,255,255,0.04)",
        glow1: "rgba(132,204,22,0.05)",
        glow2: "rgba(6,182,212,0.05)",
        btnHoverBg: "#ffffff",
        btnHoverText: "#000000",
      }
    : {
        bg: "#f5f5f0",
        bgCard: "#ffffff",
        border: "rgba(0,0,0,0.10)",
        borderHover: "rgba(0,0,0,0.28)",
        text: "#0a0a0a",
        textMuted: "#52525b",
        textFaint: "#a1a1aa",
        gridLine: "rgba(0,0,0,0.05)",
        glow1: "rgba(132,204,22,0.08)",
        glow2: "rgba(6,182,212,0.08)",
        btnHoverBg: "#0a0a0a",
        btnHoverText: "#ffffff",
      };

  const SunIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );

  const MoonIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  const ThemeButton = () => (
    <button
      onClick={() => setDark(!dark)}
      className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
      style={{ border: `1px solid ${t.border}`, color: t.textMuted }}
      aria-label="Toggle theme"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );

  const GridBg = () => (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? `radial-gradient(ellipse 80% 50% at 20% 10%, rgba(132,204,22,0.06) 0%, transparent 60%),
               radial-gradient(ellipse 60% 40% at 80% 20%, rgba(6,182,212,0.06) 0%, transparent 55%),
               radial-gradient(ellipse 70% 60% at 50% 80%, rgba(168,85,247,0.04) 0%, transparent 60%),
               #0a0a0a`
            : `radial-gradient(ellipse 80% 50% at 20% 10%, rgba(132,204,22,0.09) 0%, transparent 60%),
               radial-gradient(ellipse 60% 40% at 80% 20%, rgba(6,182,212,0.09) 0%, transparent 55%),
               radial-gradient(ellipse 70% 60% at 50% 80%, rgba(168,85,247,0.06) 0%, transparent 60%),
               #f5f5f0`,
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
          background: dark
            ? "radial-gradient(circle, rgba(132,204,22,0.07) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(132,204,22,0.11) 0%, transparent 70%)",
          animation: "orbFloat1 18s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "500px", height: "500px", top: "10%", right: "0%",
          background: dark
            ? "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(6,182,212,0.11) 0%, transparent 70%)",
          animation: "orbFloat2 22s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "400px", height: "400px", bottom: "15%", left: "40%",
          background: dark
            ? "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          animation: "orbFloat3 26s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: dark ? 0.025 : 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
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
          width: calc((100vw - 384px - 32px) / 3);
        }
        @media (max-width: 768px) {
          .cert-card-item {
            width: calc((100vw - 64px - 32px) / 3);
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
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-[192px] py-5 backdrop-blur-xl transition-colors duration-300"
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
            style={{ border: `1px solid #1D9E75`, background: '#E1F5EE', color: '#0F6E56' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
            Available for work
          </div>
          <ThemeButton />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-2 flex flex-col gap-1.5"
            aria-label="Menu"
          >
            <span className="block w-5 h-px" style={{ backgroundColor: t.textMuted }} />
            <span className="block w-5 h-px" style={{ backgroundColor: t.textMuted }} />
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeButton />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5"
            aria-label="Menu"
          >
            <span className="block w-5 h-px" style={{ backgroundColor: t.textMuted }} />
            <span className="block w-5 h-px" style={{ backgroundColor: t.textMuted }} />
          </button>
        </div>
      </nav>

      {/* ── Dropdown Menu ── */}
      {menuOpen && (
        <div
          className="fixed top-16 right-8 md:right-[192px] z-10 rounded-2xl p-4 flex flex-col gap-1 min-w-[180px] shadow-xl"
          style={{ backgroundColor: t.bgCard, border: `1px solid ${t.border}` }}
        >
          <button
            onClick={() => { setShowCV(true); setMenuOpen(false); }}
            className="text-sm text-left px-3 py-2 rounded-lg transition-colors hover:bg-black/5"
            style={{ color: t.textMuted }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#a3e635"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = t.textMuted; }}
          >
            Curriculum Vitae &#x2197;
          </button>
          <a href="#projects" onClick={() => setMenuOpen(false)}
            className="text-sm px-3 py-2 rounded-lg transition-colors hover:bg-black/5"
            style={{ color: t.textMuted }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#22d3ee"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = t.textMuted; }}
          >
            Projects &#x2197;
          </a>
          <a href="#certificates" onClick={() => setMenuOpen(false)}
            className="text-sm px-3 py-2 rounded-lg transition-colors hover:bg-black/5"
            style={{ color: t.textMuted }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#f97316"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = t.textMuted; }}
          >
            Certificates &#x2197;
          </a>
          <a href="#tools" onClick={() => setMenuOpen(false)}
            className="text-sm px-3 py-2 rounded-lg transition-colors hover:bg-black/5"
            style={{ color: t.textMuted }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#e879f9"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = t.textMuted; }}
          >
            Tools &#x2197;
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="text-sm px-3 py-2 rounded-lg transition-colors hover:bg-black/5"
            style={{ color: t.textMuted }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#a3e635"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = t.textMuted; }}
          >
            Contact &#x2197;
          </a>
        </div>
      )}

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-start pb-24 px-8 md:px-[192px] pt-32">
        <div className="mb-8">
          <span
            className="inline-flex items-center gap-2 text-xs rounded-full px-4 py-1.5"
            style={{ border: `1px solid ${t.border}`, color: t.textMuted }}
          >
            <span className="text-lime-400">&#x2736;</span> IT Student &#xB7; Holy Cross of Davao College &#x2197;
          </span>
        </div>

        <h1
          className="text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.95] tracking-tight mb-8 max-w-5xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
        >
          Turning <br />Ideas<br />
          <span style={{ color: dark ? "rgba(255,255,255,0.85)" : "#000000" }}>
            Into <br />Interfaces
          </span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end gap-8 max-w-5xl">
          <p className="text-sm leading-relaxed max-w-sm" style={{ color: t.textMuted }}>
            <span className="font-semibold" style={{ color: t.text }}>Mariel Inojales</span> is an{" "}
            <span className="font-semibold" style={{ color: t.text }}>IT Student &amp; Frontend Developer</span>{" "}
            based in Davao, Philippines. Passionate about building responsive, data-driven web applications.
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

        <div className="flex flex-wrap gap-3 mt-12">
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
        <div className="flex md:hidden flex-col items-center gap-6 mt-14">
          {/* Profile photo */}
          <div
            style={{ position: "relative", width: 140, height: 140 }}
            onMouseEnter={() => setPfpHovered(true)}
            onMouseLeave={() => setPfpHovered(false)}
            onTouchStart={() => setPfpHovered(true)}
            onTouchEnd={() => setPfpHovered(false)}
            onTouchCancel={() => setPfpHovered(false)}
          >
            <img
              src="/pfp.jpg"
              alt="Mariel Inojales"
              style={{
                position: "absolute", inset: 0,
                width: 140, height: 140,
                borderRadius: "50%", objectFit: "cover",
                border: `2px solid ${t.border}`,
                opacity: pfpHovered ? 0 : 1,
                transition: "opacity 0.4s ease",
              }}
            />
            <img
              src="/pfp-hover.jpg"
              alt="Mariel Inojales"
              style={{
                position: "absolute", inset: 0,
                width: 140, height: 140,
                borderRadius: "50%", objectFit: "cover",
                border: `2px solid ${t.borderHover}`,
                opacity: pfpHovered ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
          </div>

          {/* 2×2 nav grid */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            {[
              { label: "About",        color: "#a3e635", caption: "Who I am" },
              { label: "Certificates", color: "#22d3ee", caption: "My certs" },
              { label: "Projects",     color: "#f97316", caption: "My work"  },
              { label: "Contact",      color: "#e879f9", caption: "Reach me" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setRadialOpen(item.label)}
                className="flex flex-col items-start gap-0.5 rounded-2xl px-4 py-3 text-left transition-all duration-200"
                style={{
                  border: `1px solid ${item.color}55`,
                  backgroundColor: dark ? "rgba(15,15,15,0.8)" : "rgba(245,245,240,0.85)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.color + "cc";
                  e.currentTarget.style.backgroundColor = item.color + "18";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = item.color + "55";
                  e.currentTarget.style.backgroundColor = dark ? "rgba(15,15,15,0.8)" : "rgba(245,245,240,0.85)";
                }}
              >
                <span className="text-xs font-bold tracking-wide" style={{ color: item.color }}>{item.label}</span>
                <span className="text-[11px]" style={{ color: t.textMuted }}>{item.caption}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── PFP Floating Cards Menu ── */}
        <div
          className="hidden md:flex absolute bottom-24 right-[192px] items-center justify-center"
          style={{ position: "absolute", width: 680, height: 680 }}
          onMouseEnter={() => setPfpHovered(true)}
          onMouseLeave={() => { setPfpHovered(false); setHoveredSlice(null); }}
        >
          {/* Floating GIF cards — top, right, bottom, left */}
          {([
            { label: "About",        color: "#a3e635", caption: "Who I am",  image: "/About.gif",   pos: "top"    },
            { label: "Certificates", color: "#22d3ee", caption: "My certs",  image: "/Certificates.gif",   pos: "right"  },
            { label: "Projects",     color: "#f97316", caption: "My work",   image: "/Projects.gif",pos: "bottom" },
            { label: "Contact",      color: "#e879f9", caption: "Reach me",  image: "/Contact.gif", pos: "left"   },
          ] as { label: string; color: string; caption: string; image: string; pos: string }[]).map((item) => {
            const isHov = hoveredSlice === item.label;
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
                  width: 170,
                  height: 170,
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
          <div style={{ position: "relative", width: 340, height: 340, zIndex: 1 }}>
            <img
              src="/pfp.jpg"
              alt="Mariel Inojales"
              style={{
                position: "absolute", inset: 0,
                width: 340, height: 340,
                borderRadius: "50%", objectFit: "cover",
                border: `2px solid ${pfpHovered ? t.borderHover : t.border}`,
                boxShadow: pfpHovered
                  ? dark
                    ? "0 0 0 5px rgba(163,230,53,0.13), 0 24px 64px rgba(0,0,0,0.5)"
                    : "0 0 0 5px rgba(163,230,53,0.18), 0 24px 48px rgba(0,0,0,0.18)"
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
                width: 340, height: 340,
                borderRadius: "50%", objectFit: "cover",
                border: `2px solid ${t.borderHover}`,
                boxShadow: dark
                  ? "0 0 0 5px rgba(163,230,53,0.13), 0 24px 64px rgba(0,0,0,0.5)"
                  : "0 0 0 5px rgba(163,230,53,0.18), 0 24px 48px rgba(0,0,0,0.18)",
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



      {/* ── Tools ── */}
      <section id="tools" className="px-8 md:px-[192px] py-32" style={{ borderTop: `1px solid ${t.border}` }}>
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: t.textFaint }}> Tools</p>
        <h2
          className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight mb-4"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
        >
          Apps &amp; Tools
        </h2>
        <p className="text-sm max-w-md mb-16 leading-relaxed" style={{ color: t.textMuted }}>
          The software and tools I reach for when building, designing, and creating.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              name: "Visual Studio Code", category: "Code Editor", desc: "Primary editor for web development", color: "#22d3ee",
              icon: (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                  <path d="M17 1.5L1.5 9l4.25 3.25L17 5.5V1.5z" fill="#22d3ee" opacity="0.9"/>
                  <path d="M17 22.5L1.5 15l4.25-3.25L17 18.5v4z" fill="#22d3ee" opacity="0.9"/>
                  <path d="M17 1.5v4L5.75 12.25 17 18.5v4l5-2.5V4L17 1.5z" fill="#22d3ee"/>
                </svg>
              ),
            },
            {
              name: "Visual Studio 2022", category: "IDE", desc: "Full-featured IDE for larger projects", color: "#a855f7",
              icon: (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                  <path d="M17 1.5L1.5 9l4.25 3.25L17 5.5V1.5z" fill="#a855f7" opacity="0.9"/>
                  <path d="M17 22.5L1.5 15l4.25-3.25L17 18.5v4z" fill="#a855f7" opacity="0.9"/>
                  <path d="M17 1.5v4L5.75 12.25 17 18.5v4l5-2.5V4L17 1.5z" fill="#a855f7"/>
                </svg>
              ),
            },
            {
              name: "Microsoft Excel", category: "Spreadsheets", desc: "Data analysis and reporting", color: "#22c55e",
              icon: (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                  <rect x="2" y="3" width="20" height="18" rx="2" fill="#22c55e" opacity="0.15"/>
                  <rect x="2" y="3" width="20" height="18" rx="2" stroke="#22c55e" strokeWidth="1.5"/>
                  <path d="M8 8l3 4-3 4M16 8l-3 4 3 4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
            {
              name: "Microsoft Word", category: "Documents", desc: "Documentation and reports", color: "#3b82f6",
              icon: (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                  <rect x="2" y="3" width="20" height="18" rx="2" fill="#3b82f6" opacity="0.15"/>
                  <rect x="2" y="3" width="20" height="18" rx="2" stroke="#3b82f6" strokeWidth="1.5"/>
                  <path d="M7 8l2.5 8L12 10l2.5 6L17 8" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
            {
              name: "Canva", category: "Design", desc: "Graphics, posters & presentations", color: "#f97316",
              icon: (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                  <circle cx="12" cy="12" r="9" fill="#f97316" opacity="0.15" stroke="#f97316" strokeWidth="1.5"/>
                  <circle cx="9" cy="10" r="2" fill="#f97316"/>
                  <circle cx="15" cy="14" r="2" fill="#f97316" opacity="0.7"/>
                  <path d="M9 12c0 2 1.5 4 3 4s3-1.5 3-3" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              name: "CapCut", category: "Video Editing", desc: "Video editing and content creation", color: "#e879f9",
              icon: (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                  <rect x="3" y="6" width="14" height="12" rx="2" fill="#e879f9" opacity="0.15" stroke="#e879f9" strokeWidth="1.5"/>
                  <path d="M17 9.5l4-2v9l-4-2" stroke="#e879f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 10v4M10 12H6" stroke="#e879f9" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
            },
          ].map((tool, i) => (
            <div
              key={i}
              className="group rounded-2xl p-6 transition-all duration-300"
              style={{ backgroundColor: t.bgCard, border: `1px solid ${t.border}` }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.borderColor = tool.color + "55";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.borderColor = t.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="mb-4">{tool.icon}</div>
              <p className="text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: tool.color }}>
                {tool.category}
              </p>
              <h3 className="text-sm font-semibold mb-1" style={{ color: t.text }}>{tool.name}</h3>
              <p className="text-xs leading-relaxed" style={{ color: t.textMuted }}>{tool.desc}</p>
            </div>
          ))}
        </div>

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
            className="sticky top-0 z-10 flex items-center justify-between px-8 md:px-[192px] py-5 backdrop-blur-xl"
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
          <div className="px-8 md:px-[192px] py-16">
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
            className="sticky top-0 z-10 flex items-center justify-between px-8 md:px-[192px] py-5 backdrop-blur-xl"
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

          <div className="px-8 md:px-[192px] py-16 flex flex-col lg:flex-row gap-16">
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
          className="fixed inset-0 z-50 overflow-y-auto transition-colors duration-300"
          style={{ backgroundColor: `${t.bg}ee`, color: t.text }}
        >
          <GridBg />

          {/* Top bar */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between px-8 md:px-[192px] py-5 backdrop-blur-xl"
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

          <div className="px-8 md:px-[192px] py-16">
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: t.textFaint }}>{radialOpen}</p>
            <h2
              className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-tight mb-10"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
            >
              {radialOpen}
            </h2>

            {/* About */}
            {radialOpen === "About" && (
              <div className="max-w-2xl space-y-10">

                {/* Profile header */}
                <div className="flex items-center gap-5">
                  <img src="/pfp.jpg" alt="Mariel" className="w-20 h-20 rounded-full object-cover flex-shrink-0" style={{ border: `1px solid ${t.border}` }} />
                  <div>
                    <p className="text-lg font-semibold" style={{ color: t.text }}>Mariel Inojales</p>
                    <p className="text-sm" style={{ color: t.textMuted }}>IT Student · Holy Cross of Davao College</p>
                    <span className="inline-flex items-center gap-1 text-[11px] mt-1 rounded-full px-2 py-0.5" style={{ background: "#E1F5EE", color: "#0F6E56", border: "1px solid #1D9E75" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] inline-block animate-pulse" /> Available for work
                    </span>
                  </div>
                </div>



                {/* Journey Timeline */}
                <div>
                  <p className="text-sm uppercase tracking-widest mb-8" style={{ color: t.textFaint }}>My Journey</p>
                  <div className="relative">

                    {/* Aceternity-style SVG beam rail */}
                    <svg
                      className="absolute left-0 top-0 pointer-events-none"
                      width="20"
                      height="100%"
                      viewBox="0 0 20 900"
                      preserveAspectRatio="none"
                      style={{ overflow: "visible" }}
                    >
                      <defs>
                        <linearGradient id="beamGradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="160">
                          <stop offset="0"    stopColor={dark ? "#ffffff" : "#000000"} stopOpacity="0" />
                          <stop offset="0.3"  stopColor={dark ? "#ffffff" : "#000000"} stopOpacity="0.8" />
                          <stop offset="0.7"  stopColor={dark ? "#ffffff" : "#000000"} stopOpacity="0.8" />
                          <stop offset="1"    stopColor={dark ? "#ffffff" : "#000000"} stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Static faint rail */}
                      <path
                        d="M 10 0 V 900"
                        fill="none"
                        stroke={dark ? "#ffffff" : "#000000"}
                        strokeOpacity="0.08"
                        strokeWidth="1.25"
                      />

                      {/* Beam — travels via strokeDashoffset on scroll */}
                      <path
                        d="M 10 0 V 900"
                        fill="none"
                        stroke="url(#beamGradient)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="160 900"
                        strokeDashoffset={-(activeStep / 5) * 740}
                        className="motion-reduce:hidden"
                        style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }}
                      />
                    </svg>

                    <div className="space-y-12 pl-10">
                      {([
                        {
                          year: "Junior High",
                          title: "The First Line of Code",
                          text: "Before IT was even a career plan, I was already writing HTML and CSS in junior high school. Something about making things appear on a screen just clicked — and that curiosity never left.",
                          badges: ["HTML", "CSS"],
                          detail: "💡 Googling 'how to make a website' before I even knew what a developer was.",
                        },
                        {
                          year: "Senior High · Dec. 2019",
                          title: "TVL – CSS NC2 Passer",
                          text: "Passed the Technical-Vocational-Livelihood track with a Computer Systems Servicing NC2 certification — an early proof that the tech path was always the right one.",
                          badges: ["NC2 Certified", "Computer Systems Servicing", "TVL Track"],
                          detail: "🏅 NC2 certified in Computer Systems Servicing — hardware, networking, and software all in one.",
                        },
                        {
                          year: "2022",
                          title: "Enrolled at HCDC",
                          text: "I chose to pursue IT at Holy Cross of Davao College — not by accident, but because I already knew this was the field for me. Formal training gave structure to the curiosity I'd been carrying for years.",
                          badges: ["BS Information Technology", "HCDC", "Davao"],
                          detail: "🏫 Holy Cross of Davao College, Davao City — where the real grind began.",
                        },
                        {
                          year: "2023–2024",
                          title: "Leveling Up",
                          text: "Started going beyond the classroom — picking up React, Next.js, and Tailwind, earning certificates from Udemy and Simplilearn, and building real projects that pushed me further than any assignment could.",
                          badges: ["React", "Next.js", "Tailwind CSS", "Supabase", "Udemy", "Simplilearn"],
                          detail: "📜 Earned multiple certificates while juggling school — learning doesn't stop at the classroom door.",
                        },
                        {
                          year: "2025",
                          title: "Soon-to-be Graduate",
                          text: "Almost at the finish line at HCDC — but this isn't the end of the journey, it's the beginning. Looking for opportunities to build real products, grow as a developer, and make a real impact.",
                          badges: ["Final Year", "Capstone", "Available for Work"],
                          detail: "🎓 Final year at HCDC — capstone, thesis, and a portfolio that tells the whole story.",
                        },
                        {
                          year: "2026 →",
                          title: "The Road to Full Stack",
                          text: "The goal is clear — become a full stack developer. Every day is another rep: sharpening skills, building projects, and pushing further into both frontend and backend.",
                          badges: ["Full Stack", "Node.js", "PHP", "MySQL", "Open to Work"],
                          detail: "🚀 Looking for a job to turn that practice into real-world experience.",
                        },
                      ] as { year: string; title: string; text: string; badges: string[]; detail: string }[]).map((step, i) => (
                        <div
                          key={step.year}
                          className="relative transition-all duration-500"
                          ref={(el) => { stepRefs.current[i] = el; }}
                          style={{
                            opacity: activeStep === i ? 1 : 0.35,
                            transform: activeStep === i ? "translateX(6px)" : "translateX(0)",
                          }}
                        >
                          {/* Dot */}
                          <div
                            className="absolute -left-10 top-1.5 w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all duration-500"
                            style={{
                              backgroundColor: activeStep === i ? (dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)") : "transparent",
                              borderColor: activeStep === i ? t.borderHover : t.border,
                              boxShadow: activeStep === i ? (dark ? "0 0 10px rgba(255,255,255,0.2)" : "0 0 10px rgba(0,0,0,0.15)") : "none",
                            }}
                          />

                          {/* Year */}
                          <p className="text-sm uppercase tracking-widest font-bold mb-2" style={{ color: t.textMuted }}>{step.year}</p>

                          {/* Title */}
                          <p className="text-xl font-bold mb-2" style={{ color: t.text }}>{step.title}</p>

                          {/* Text */}
                          <p className="text-sm leading-relaxed mb-3" style={{ color: t.textMuted }}>{step.text}</p>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {step.badges.map((badge) => (
                              <span
                                key={badge}
                                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                                style={{
                                  backgroundColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                                  border: `1px solid ${t.border}`,
                                  color: t.textMuted,
                                }}
                              >
                                {badge}
                              </span>
                            ))}
                          </div>

                          {/* Detail */}
                          <p
                            className="text-[11px] leading-relaxed rounded-xl px-3 py-2"
                            style={{
                              color: t.textFaint,
                              backgroundColor: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                              border: `1px dashed ${t.border}`,
                            }}
                          >
                            {step.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

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
            {radialOpen === "Projects" && (
              <div
                className="flex items-center justify-center rounded-2xl h-64 text-sm"
                style={{ border: `1px solid ${t.border}`, color: t.textFaint }}
              >
                Projects coming soon ✦
              </div>
            )}

            {/* Contact */}
            {radialOpen === "Contact" && (
              <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto mt-8">

                {/* Toast */}
                {emailCopied && (
                  <div
                    className="toast-enter fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium shadow-xl"
                    style={{
                      backgroundColor: dark ? "#1a1a1a" : "#ffffff",
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
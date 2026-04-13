"use client";

import { useState, useEffect } from "react";
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
  SiTelegram
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
  const [socialLinks, setSocialLinks] = useState<{ label: string; href: string; icon: React.ReactNode }[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);
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
          <button
            className="px-3 py-1.5 rounded-full text-xs"
            style={{ border: `1px solid ${t.border}`, color: t.text }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Say hello →
          </button>
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
          <span style={{ color: dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.55)" }}>
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
              onClick={() => window.open("/Inojales_Resume.pdf", "_blank")}
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
              Resume &#x2197;
            </button>
            <a
              href="#contact"
              className="flex items-center gap-2 text-sm rounded-full px-5 py-2.5 transition-all duration-200"
              style={{ border: `1px solid ${t.borderHover}`, color: t.text }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.backgroundColor = t.btnHoverBg;
                e.currentTarget.style.color = t.btnHoverText;
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = t.text;
              }}
            >
              Get in touch &#x2197;
            </a>
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

        <div className="hidden md:block absolute bottom-24 right-[192px]">
          <img
            src="/pfp.jpg"
            alt="Mariel Inojales"
            className="w-48 h-48 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            style={{ border: `1px solid ${t.border}` }}
          />
        </div>
      </section>

      {/* ── Projects ── */}
      <section
        id="projects"
        className="min-h-screen flex flex-col justify-center px-8 md:px-[192px] py-32"
        style={{ borderTop: `1px solid ${t.border}` }}
      >
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: t.textFaint }}>02 — Projects</p>
        <h2
          className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight mb-16"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
        >
          Selected Work
        </h2>
        <div
          className="flex items-center justify-center rounded-2xl h-64 text-sm"
          style={{ border: `1px solid ${t.border}`, color: t.textFaint }}
        >
          Projects coming soon
        </div>
      </section>

      {/* ── Certificates ── */}
      <section id="certificates" className="py-32" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="px-8 md:px-[192px] mb-12">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: t.textFaint }}>03 — Certifications</p>
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
          >
            Certificates
          </h2>
          <p className="text-xs mt-3" style={{ color: t.textFaint }}>Click any certificate to view details</p>
        </div>

        <div className="px-8 md:px-[192px]">
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{ width: "80px", background: `linear-gradient(to right, ${t.bg} 30%, transparent)` }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{ width: "80px", background: `linear-gradient(to left, ${t.bg} 30%, transparent)` }}
            />
            <div className="marquee-track">
              {[...certificatesData, ...certificatesData].map((cert, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCert(cert)}
                  className="cert-card-item group rounded-[18px] overflow-hidden transition-all duration-300 text-left focus:outline-none"
                  style={{ backgroundColor: t.bgCard, border: `1px solid ${t.border}`, position: "relative" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = t.borderHover;
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = t.border;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div className="w-full overflow-hidden" style={{ height: "200px", background: t.bgCard }}>
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      style={{ display: "block" }}
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.08"; }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: issuerColor(cert.issuer) }}>
                      {cert.issuer}
                    </p>
                    <h3 className="text-xs font-medium leading-snug line-clamp-2" style={{ color: t.textMuted }}>
                      {cert.title}
                    </h3>
                    <p className="text-[10px] mt-2" style={{ color: t.textFaint }}>{cert.date}</p>
                  </div>
                  <div
                    className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: t.border, border: `1px solid ${t.border}`, color: t.textMuted }}
                  >
                    ↗
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section id="tools" className="px-8 md:px-[192px] py-32" style={{ borderTop: `1px solid ${t.border}` }}>
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: t.textFaint }}>04 — Tools</p>
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
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="px-8 md:px-[192px] py-32" style={{ borderTop: `1px solid ${t.border}` }}>
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: t.textFaint }}>05 — Contact</p>
        <h2
          className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight mb-4"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: t.text }}
        >
          Let&apos;s Connect
        </h2>
        <p className="text-sm max-w-md mb-12 leading-relaxed" style={{ color: t.textMuted }}>
          Open to collaborations, internship opportunities, or just a friendly chat about tech and design.
        </p>

        <div className="flex gap-4 mb-12 items-end">
          {[
            { icon: <span className="text-base leading-none">✉</span>, label: "Email",  href: "mailto:mariel.inoj@gmail.com" },
            { icon: <SiGithub size={16} />,                             label: "GitHub", href: "https://github.com/Marsinoj" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer hover:bg-gray-200"
                style={{ border: `1px solid ${t.border}`, color: t.textMuted }}
              >
                {item.icon}
              </div>
              <span className="text-[10px] uppercase tracking-widest" style={{ color: t.textFaint }}>
                {item.label}
              </span>
            </a>
          ))}

          {/* Contact me — circle button matching the icon row */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setShowSocials(true)}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: `1px solid ${t.borderHover}`, color: t.textMuted }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = t.btnHoverBg;
                e.currentTarget.style.color = t.btnHoverText;
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = t.text;
              }}
            >
              →
            </button>
            <span className="text-[10px] uppercase tracking-widest" style={{ color: t.textFaint }}>
              Contact
            </span>
          </div>
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
    </main>
  );
}
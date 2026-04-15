"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
export const dynamic = "force-dynamic";

type Tab = "certificates" | "projects" | "skills" | "tools" | "socials";

type Certificate = { id: string; title: string; issuer: string; date: string; image: string; sort_order: number };
type Project     = { id: string; title: string; description: string; url: string; image: string; tags: string[]; sort_order: number };
type Skill       = { id: string; label: string; icon_name: string; color: string; sort_order: number };
type Tool        = { id: string; name: string; category: string; description: string; color: string; sort_order: number };
type Social      = { id: string; label: string; href: string; icon_name: string; sort_order: number };

const TABS: { key: Tab; label: string }[] = [
  { key: "certificates", label: "Certificates" },
  { key: "projects",     label: "Projects" },
  { key: "skills",       label: "Skills" },
  { key: "tools",        label: "Tools" },
  { key: "socials",      label: "Socials" },
];

const t = {
  bg: "#0a0a0a", card: "#111111", border: "rgba(255,255,255,0.08)",
  text: "#e5e5e5", muted: "#6b7280", faint: "#374151",
};

const input = "w-full rounded-lg bg-white/5 border border-white/10 text-[#e5e5e5] px-3 py-2 text-sm outline-none focus:border-white/30 placeholder:text-[#4b5563]";
const btn   = "rounded-lg px-4 py-2 text-sm font-medium transition-all";

export default function AdminPanel() {
  const router = useRouter();
  const [tab, setTab]   = useState<Tab>("certificates");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const logout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin/login");
  };

  /* ── Certificates ── */
  const [certs, setCerts]         = useState<Certificate[]>([]);
  const [certForm, setCertForm]   = useState({ title: "", issuer: "", date: "", image: "" });
  const [editCert, setEditCert]   = useState<Certificate | null>(null);

  const loadCerts = useCallback(async () => {
    const { data } = await supabase.from("certificates").select("*").order("sort_order");
    setCerts(data ?? []);
  }, []);

  const saveCert = async () => {
    if (editCert) {
      await supabase.from("certificates").update(certForm).eq("id", editCert.id);
      setEditCert(null);
    } else {
      await supabase.from("certificates").insert({ ...certForm, sort_order: certs.length });
    }
    setCertForm({ title: "", issuer: "", date: "", image: "" });
    loadCerts(); showToast("Certificate saved ✓");
  };

  const deleteCert = async (id: string) => {
    await supabase.from("certificates").delete().eq("id", id);
    loadCerts(); showToast("Deleted.");
  };

  /* ── Projects ── */
  const [projects, setProjects]     = useState<Project[]>([]);
  const [projForm, setProjForm]     = useState({ title: "", description: "", url: "", image: "", tags: "" });
  const [editProj, setEditProj]     = useState<Project | null>(null);

  const loadProjects = useCallback(async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    setProjects(data ?? []);
  }, []);

  const saveProj = async () => {
    const payload = { ...projForm, tags: projForm.tags.split(",").map(s => s.trim()).filter(Boolean) };
    if (editProj) {
      await supabase.from("projects").update(payload).eq("id", editProj.id);
      setEditProj(null);
    } else {
      await supabase.from("projects").insert({ ...payload, sort_order: projects.length });
    }
    setProjForm({ title: "", description: "", url: "", image: "", tags: "" });
    loadProjects(); showToast("Project saved ✓");
  };

  const deleteProj = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    loadProjects(); showToast("Deleted.");
  };

  /* ── Skills ── */
  const [skills, setSkills]       = useState<Skill[]>([]);
  const [skillForm, setSkillForm] = useState({ label: "", icon_name: "", color: "#22d3ee" });
  const [editSkill, setEditSkill] = useState<Skill | null>(null);

  const loadSkills = useCallback(async () => {
    const { data } = await supabase.from("skills").select("*").order("sort_order");
    setSkills(data ?? []);
  }, []);

  const saveSkill = async () => {
    if (editSkill) {
      await supabase.from("skills").update(skillForm).eq("id", editSkill.id);
      setEditSkill(null);
    } else {
      await supabase.from("skills").insert({ ...skillForm, sort_order: skills.length });
    }
    setSkillForm({ label: "", icon_name: "", color: "#22d3ee" });
    loadSkills(); showToast("Skill saved ✓");
  };

  const deleteSkill = async (id: string) => {
    await supabase.from("skills").delete().eq("id", id);
    loadSkills(); showToast("Deleted.");
  };

  /* ── Tools ── */
  const [tools, setTools]       = useState<Tool[]>([]);
  const [toolForm, setToolForm] = useState({ name: "", category: "", description: "", color: "#f97316" });
  const [editTool, setEditTool] = useState<Tool | null>(null);

  const loadTools = useCallback(async () => {
    const { data } = await supabase.from("tools").select("*").order("sort_order");
    setTools(data ?? []);
  }, []);

  const saveTool = async () => {
    if (editTool) {
      await supabase.from("tools").update(toolForm).eq("id", editTool.id);
      setEditTool(null);
    } else {
      await supabase.from("tools").insert({ ...toolForm, sort_order: tools.length });
    }
    setToolForm({ name: "", category: "", description: "", color: "#f97316" });
    loadTools(); showToast("Tool saved ✓");
  };

  const deleteTool = async (id: string) => {
    await supabase.from("tools").delete().eq("id", id);
    loadTools(); showToast("Deleted.");
  };

  /* ── Socials ── */
  const [socials, setSocials]       = useState<Social[]>([]);
  const [socialForm, setSocialForm] = useState({ label: "", href: "", icon_name: "" });
  const [editSocial, setEditSocial] = useState<Social | null>(null);

  const loadSocials = useCallback(async () => {
    const { data } = await supabase.from("social_links").select("*").order("sort_order");
    setSocials(data ?? []);
  }, []);

  const saveSocial = async () => {
    if (editSocial) {
      await supabase.from("social_links").update(socialForm).eq("id", editSocial.id);
      setEditSocial(null);
    } else {
      await supabase.from("social_links").insert({ ...socialForm, sort_order: socials.length });
    }
    setSocialForm({ label: "", href: "", icon_name: "" });
    loadSocials(); showToast("Social link saved ✓");
  };

  const deleteSocial = async (id: string) => {
    await supabase.from("social_links").delete().eq("id", id);
    loadSocials(); showToast("Deleted.");
  };

  useEffect(() => {
    loadCerts(); loadProjects(); loadSkills(); loadTools(); loadSocials();
  }, [loadCerts, loadProjects, loadSkills, loadTools, loadSocials]);

  return (
    <main className="min-h-screen" style={{ backgroundColor: t.bg, color: t.text }}>

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 rounded-xl px-4 py-2.5 text-sm font-medium shadow-lg"
          style={{ backgroundColor: "#1a1a1a", border: `1px solid rgba(255,255,255,0.15)`, color: "#a3e635" }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b" style={{ borderColor: t.border }}>
        <div>
          <h1 className="text-base font-semibold">Admin Panel</h1>
          <p className="text-xs mt-0.5" style={{ color: t.muted }}>Riri's Portfolio</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-xs px-3 py-1.5 rounded-full border transition-all hover:opacity-70"
            style={{ borderColor: t.border, color: t.muted }}>
            View site ↗
          </a>
          <button onClick={logout} className="text-xs px-3 py-1.5 rounded-full border transition-all hover:opacity-70"
            style={{ borderColor: t.border, color: t.muted }}>
            Log out
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-48 shrink-0 border-r min-h-screen pt-8 px-4 flex flex-col gap-1"
          style={{ borderColor: t.border }}>
          {TABS.map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)}
              className="text-left text-sm px-3 py-2 rounded-lg transition-all"
              style={{
                backgroundColor: tab === key ? "rgba(255,255,255,0.06)" : "transparent",
                color: tab === key ? t.text : t.muted,
              }}>
              {label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="flex-1 p-8 max-w-3xl">

          {/* ── CERTIFICATES ── */}
          {tab === "certificates" && (
            <section>
              <h2 className="text-lg font-semibold mb-6">Certificates</h2>
              <div className="rounded-2xl p-5 mb-6 flex flex-col gap-3" style={{ backgroundColor: t.card, border: `1px solid ${t.border}` }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: t.faint }}>{editCert ? "Edit Certificate" : "Add Certificate"}</p>
                <input className={input} placeholder="Title" value={certForm.title}
                  onChange={e => setCertForm(f => ({ ...f, title: e.target.value }))} />
                <input className={input} placeholder="Issuer (e.g. Udemy, Simplilearn)" value={certForm.issuer}
                  onChange={e => setCertForm(f => ({ ...f, issuer: e.target.value }))} />
                <input className={input} placeholder="Date (e.g. April 6, 2026)" value={certForm.date}
                  onChange={e => setCertForm(f => ({ ...f, date: e.target.value }))} />
                <input className={input} placeholder="Image path (e.g. /Certificate7.png)" value={certForm.image}
                  onChange={e => setCertForm(f => ({ ...f, image: e.target.value }))} />
                <div className="flex gap-2 pt-1">
                  <button onClick={saveCert} className={`${btn} bg-white text-black hover:bg-white/90`}>
                    {editCert ? "Update" : "Add Certificate"}
                  </button>
                  {editCert && (
                    <button onClick={() => { setEditCert(null); setCertForm({ title: "", issuer: "", date: "", image: "" }); }}
                      className={`${btn} border text-[#6b7280] hover:text-white`} style={{ borderColor: t.border }}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {certs.map(c => (
                  <div key={c.id} className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{ backgroundColor: t.card, border: `1px solid ${t.border}` }}>
                    <div>
                      <p className="text-sm font-medium">{c.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: t.muted }}>{c.issuer} · {c.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditCert(c); setCertForm({ title: c.title, issuer: c.issuer, date: c.date, image: c.image }); }}
                        className={`${btn} border text-xs`} style={{ borderColor: t.border, color: t.muted }}>Edit</button>
                      <button onClick={() => deleteCert(c.id)}
                        className={`${btn} border text-xs text-red-400 border-red-400/20 hover:bg-red-400/10`}>Delete</button>
                    </div>
                  </div>
                ))}
                {certs.length === 0 && <p className="text-sm" style={{ color: t.muted }}>No certificates yet.</p>}
              </div>
            </section>
          )}

          {/* ── PROJECTS ── */}
          {tab === "projects" && (
            <section>
              <h2 className="text-lg font-semibold mb-6">Projects</h2>
              <div className="rounded-2xl p-5 mb-6 flex flex-col gap-3" style={{ backgroundColor: t.card, border: `1px solid ${t.border}` }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: t.faint }}>{editProj ? "Edit Project" : "Add Project"}</p>
                <input className={input} placeholder="Title" value={projForm.title}
                  onChange={e => setProjForm(f => ({ ...f, title: e.target.value }))} />
                <textarea className={`${input} resize-none`} rows={2} placeholder="Description" value={projForm.description}
                  onChange={e => setProjForm(f => ({ ...f, description: e.target.value }))} />
                <input className={input} placeholder="URL (e.g. https://github.com/...)" value={projForm.url}
                  onChange={e => setProjForm(f => ({ ...f, url: e.target.value }))} />
                <input className={input} placeholder="Image path (e.g. /project1.png)" value={projForm.image}
                  onChange={e => setProjForm(f => ({ ...f, image: e.target.value }))} />
                <input className={input} placeholder="Tags (comma-separated, e.g. React, PHP)" value={projForm.tags}
                  onChange={e => setProjForm(f => ({ ...f, tags: e.target.value }))} />
                <div className="flex gap-2 pt-1">
                  <button onClick={saveProj} className={`${btn} bg-white text-black hover:bg-white/90`}>
                    {editProj ? "Update" : "Add Project"}
                  </button>
                  {editProj && (
                    <button onClick={() => { setEditProj(null); setProjForm({ title: "", description: "", url: "", image: "", tags: "" }); }}
                      className={`${btn} border text-[#6b7280] hover:text-white`} style={{ borderColor: t.border }}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {projects.map(p => (
                  <div key={p.id} className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{ backgroundColor: t.card, border: `1px solid ${t.border}` }}>
                    <div>
                      <p className="text-sm font-medium">{p.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: t.muted }}>{p.tags?.join(", ")}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditProj(p); setProjForm({ title: p.title, description: p.description, url: p.url, image: p.image, tags: p.tags?.join(", ") ?? "" }); }}
                        className={`${btn} border text-xs`} style={{ borderColor: t.border, color: t.muted }}>Edit</button>
                      <button onClick={() => deleteProj(p.id)}
                        className={`${btn} border text-xs text-red-400 border-red-400/20 hover:bg-red-400/10`}>Delete</button>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && <p className="text-sm" style={{ color: t.muted }}>No projects yet.</p>}
              </div>
            </section>
          )}

          {/* ── SKILLS ── */}
          {tab === "skills" && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Skills</h2>
              <p className="text-xs mb-6" style={{ color: t.muted }}>
                Use the exact react-icons name for icon_name, e.g. <code className="font-mono text-[#a3e635]">SiReact</code>, <code className="font-mono text-[#a3e635]">SiPhp</code>
              </p>
              <div className="rounded-2xl p-5 mb-6 flex flex-col gap-3" style={{ backgroundColor: t.card, border: `1px solid ${t.border}` }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: t.faint }}>{editSkill ? "Edit Skill" : "Add Skill"}</p>
                <input className={input} placeholder="Label (e.g. React)" value={skillForm.label}
                  onChange={e => setSkillForm(f => ({ ...f, label: e.target.value }))} />
                <input className={input} placeholder="Icon name (e.g. SiReact)" value={skillForm.icon_name}
                  onChange={e => setSkillForm(f => ({ ...f, icon_name: e.target.value }))} />
                <div className="flex items-center gap-3">
                  <input className={`${input} flex-1`} placeholder="Color (hex)" value={skillForm.color}
                    onChange={e => setSkillForm(f => ({ ...f, color: e.target.value }))} />
                  <input type="color" value={skillForm.color} onChange={e => setSkillForm(f => ({ ...f, color: e.target.value }))}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={saveSkill} className={`${btn} bg-white text-black hover:bg-white/90`}>
                    {editSkill ? "Update" : "Add Skill"}
                  </button>
                  {editSkill && (
                    <button onClick={() => { setEditSkill(null); setSkillForm({ label: "", icon_name: "", color: "#22d3ee" }); }}
                      className={`${btn} border text-[#6b7280] hover:text-white`} style={{ borderColor: t.border }}>Cancel</button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {skills.map(s => (
                  <div key={s.id} className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{ backgroundColor: t.card, border: `1px solid ${t.border}` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                      <div>
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="text-xs font-mono mt-0.5" style={{ color: t.muted }}>{s.icon_name}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditSkill(s); setSkillForm({ label: s.label, icon_name: s.icon_name, color: s.color }); }}
                        className={`${btn} border text-xs`} style={{ borderColor: t.border, color: t.muted }}>Edit</button>
                      <button onClick={() => deleteSkill(s.id)}
                        className={`${btn} border text-xs text-red-400 border-red-400/20 hover:bg-red-400/10`}>Delete</button>
                    </div>
                  </div>
                ))}
                {skills.length === 0 && <p className="text-sm" style={{ color: t.muted }}>No skills yet.</p>}
              </div>
            </section>
          )}

          {/* ── TOOLS ── */}
          {tab === "tools" && (
            <section>
              <h2 className="text-lg font-semibold mb-6">Tools & Apps</h2>
              <div className="rounded-2xl p-5 mb-6 flex flex-col gap-3" style={{ backgroundColor: t.card, border: `1px solid ${t.border}` }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: t.faint }}>{editTool ? "Edit Tool" : "Add Tool"}</p>
                <input className={input} placeholder="Name (e.g. Figma)" value={toolForm.name}
                  onChange={e => setToolForm(f => ({ ...f, name: e.target.value }))} />
                <input className={input} placeholder="Category (e.g. Design)" value={toolForm.category}
                  onChange={e => setToolForm(f => ({ ...f, category: e.target.value }))} />
                <input className={input} placeholder="Description" value={toolForm.description}
                  onChange={e => setToolForm(f => ({ ...f, description: e.target.value }))} />
                <div className="flex items-center gap-3">
                  <input className={`${input} flex-1`} placeholder="Color (hex)" value={toolForm.color}
                    onChange={e => setToolForm(f => ({ ...f, color: e.target.value }))} />
                  <input type="color" value={toolForm.color} onChange={e => setToolForm(f => ({ ...f, color: e.target.value }))}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={saveTool} className={`${btn} bg-white text-black hover:bg-white/90`}>
                    {editTool ? "Update" : "Add Tool"}
                  </button>
                  {editTool && (
                    <button onClick={() => { setEditTool(null); setToolForm({ name: "", category: "", description: "", color: "#f97316" }); }}
                      className={`${btn} border text-[#6b7280] hover:text-white`} style={{ borderColor: t.border }}>Cancel</button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {tools.map(tool => (
                  <div key={tool.id} className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{ backgroundColor: t.card, border: `1px solid ${t.border}` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tool.color }} />
                      <div>
                        <p className="text-sm font-medium">{tool.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: t.muted }}>{tool.category} · {tool.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditTool(tool); setToolForm({ name: tool.name, category: tool.category, description: tool.description, color: tool.color }); }}
                        className={`${btn} border text-xs`} style={{ borderColor: t.border, color: t.muted }}>Edit</button>
                      <button onClick={() => deleteTool(tool.id)}
                        className={`${btn} border text-xs text-red-400 border-red-400/20 hover:bg-red-400/10`}>Delete</button>
                    </div>
                  </div>
                ))}
                {tools.length === 0 && <p className="text-sm" style={{ color: t.muted }}>No tools yet.</p>}
              </div>
            </section>
          )}

          {/* ── SOCIALS ── */}
          {tab === "socials" && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Social Links</h2>
              <p className="text-xs mb-6" style={{ color: t.muted }}>
                icon_name examples: <code className="font-mono text-[#a3e635]">SiGithub</code>, <code className="font-mono text-[#a3e635]">SiTelegram</code>, <code className="font-mono text-[#a3e635]">FaLinkedin</code>, or leave blank for email ✉
              </p>
              <div className="rounded-2xl p-5 mb-6 flex flex-col gap-3" style={{ backgroundColor: t.card, border: `1px solid ${t.border}` }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: t.faint }}>{editSocial ? "Edit Link" : "Add Link"}</p>
                <input className={input} placeholder="Label (e.g. GitHub)" value={socialForm.label}
                  onChange={e => setSocialForm(f => ({ ...f, label: e.target.value }))} />
                <input className={input} placeholder="URL (e.g. https://github.com/...)" value={socialForm.href}
                  onChange={e => setSocialForm(f => ({ ...f, href: e.target.value }))} />
                <input className={input} placeholder="Icon name (e.g. SiGithub)" value={socialForm.icon_name}
                  onChange={e => setSocialForm(f => ({ ...f, icon_name: e.target.value }))} />
                <div className="flex gap-2 pt-1">
                  <button onClick={saveSocial} className={`${btn} bg-white text-black hover:bg-white/90`}>
                    {editSocial ? "Update" : "Add Link"}
                  </button>
                  {editSocial && (
                    <button onClick={() => { setEditSocial(null); setSocialForm({ label: "", href: "", icon_name: "" }); }}
                      className={`${btn} border text-[#6b7280] hover:text-white`} style={{ borderColor: t.border }}>Cancel</button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {socials.map(s => (
                  <div key={s.id} className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{ backgroundColor: t.card, border: `1px solid ${t.border}` }}>
                    <div>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="text-xs mt-0.5 font-mono" style={{ color: t.muted }}>{s.href}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditSocial(s); setSocialForm({ label: s.label, href: s.href, icon_name: s.icon_name }); }}
                        className={`${btn} border text-xs`} style={{ borderColor: t.border, color: t.muted }}>Edit</button>
                      <button onClick={() => deleteSocial(s.id)}
                        className={`${btn} border text-xs text-red-400 border-red-400/20 hover:bg-red-400/10`}>Delete</button>
                    </div>
                  </div>
                ))}
                {socials.length === 0 && <p className="text-sm" style={{ color: t.muted }}>No social links yet.</p>}
              </div>
            </section>
          )}

        </div>
      </div>
    </main>
  );
}
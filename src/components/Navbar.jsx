import { useState } from "react";
import iconsImg from "../assets/hacker_logo.png";

export function Navbar({
  dark,
  setDark,
  lang,
  setLang,
  tx,
  activeSection,
  scrollTo,
  menuOpen,
  setMenuOpen,
  accent,
  textMuted,
  border,
  surface,
  text,
}) {
  const navLinks = [
    { id: "about", label: tx.nav.about },
    { id: "skills", label: tx.nav.skills },
    { id: "experience", label: tx.nav.experience },
    { id: "projects", label: tx.nav.projects },
    { id: "contact", label: tx.nav.contact },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(16px,5vw,80px)",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: dark ? "rgba(10,10,15,0.85)" : "rgba(248,247,244,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${border}40`,
          transition: "background 0.3s",
        }}
      >
        <img
          src={iconsImg}
          alt="Logo"
          onClick={() => scrollTo("hero")}
          style={{ height: 42, width: "auto", objectFit: "contain", cursor: "pointer", display: "block", transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        />
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {navLinks.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", color: activeSection === l.id ? accent : textMuted, fontFamily: "'Play', sans-serif", fontWeight: 500, fontSize: 14, cursor: "pointer", transition: "color 0.2s", padding: "4px 0", borderBottom: activeSection === l.id ? `2px solid ${accent}` : "2px solid transparent" }}>{l.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setLang(lang === "es" ? "en" : "es")} style={{ background: dark ? "#1c1c26" : "#f1f0ed", border: `1px solid ${border}`, borderRadius: 10, padding: "6px 12px", color: text, fontFamily: "'Play', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>{lang === "es" ? "EN" : "ES"}</button>
          <button onClick={() => setDark(!dark)} style={{ background: dark ? "#1c1c26" : "#f1f0ed", border: `1px solid ${border}`, borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, transition: "all 0.2s", color: text }}><i className={dark ? "bi bi-sun" : "bi bi-moon-stars"} /></button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: dark ? "#1c1c26" : "#f1f0ed", border: `1px solid ${border}`, borderRadius: 10, width: 38, height: 38, display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: text }} className="hamburger"><i className={menuOpen ? "bi bi-x-lg" : "bi bi-list"} /></button>
        </div>
        <style>{`@media(max-width:768px) { .desktop-nav { display: none !important; } .hamburger { display: flex !important; } }`}</style>
      </nav>
      {menuOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: surface, borderBottom: `1px solid ${border}`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4, animation: "slideIn 0.2s ease" }}>
          {navLinks.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", color: text, fontFamily: "'Play', sans-serif", fontWeight: 500, fontSize: 15, cursor: "pointer", padding: "12px 0", textAlign: "left", borderBottom: `1px solid ${border}40` }}>{l.label}</button>
          ))}
        </div>
      )}
    </>
  );
}

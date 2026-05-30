import { useState, useEffect } from "react";
import AOS from "aos";
import miFoto from "./assets/mi-foto.jpeg";
import iconsImg from "./assets/icons.jpg";
import { es } from "./translations/es";
import { en } from "./translations/en";
import { AnimSection } from "./components/AnimSection";
import { GlobalParticles } from "./components/GlobalParticles";
import { SocialSidebar } from "./components/SocialSidebar";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ContactSection } from "./sections/ContactSection";

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("es");
  const photo = miFoto;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const tx = lang === "es" ? es : en;

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [dark, lang]);

  useEffect(() => {
    const ids = ["hero", "about", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }), { threshold: 0.4 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  // ── Paleta ──
  // El canvas de GlobalParticles es el fondo real (opaco).
  // Las secciones usan fondos muy semitransparentes para dejar ver el flow field.
  const bg         = dark ? "rgba(6,8,22,0.0)"      : "rgba(240,242,255,0.0)";   // sin fondo propio
  const surface    = dark ? "rgba(14,16,40,0.82)"   : "rgba(255,255,255,0.85)";
  const surfaceAlt = dark ? "rgba(20,24,60,0.80)"   : "rgba(224,228,255,0.82)";
  const border     = dark ? "#1e2460" : "#b8c0f0";
  const text       = dark ? "#e0e4ff" : "#0d1040";
  const textMuted  = dark ? "#7b8cde" : "#4a5ab0";
  const accent     = "#6c8eff";
  const accentAlt  = "#3f5efb";

  return (
    <div style={{ color: text, fontFamily: "'Play', sans-serif", minHeight: "100vh", transition: "color 0.3s", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${accent}; border-radius: 10px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.4);opacity:0} }
        @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        img { max-width: 100%; height: auto; }
        @media(max-width:768px){
          section { overflow-x: hidden; }
        }
      `}</style>

      <GlobalParticles dark={dark} accent={accent} accentAlt={accentAlt} />

      {/* Contenido sobre las partículas */}
      <div style={{ position: "relative", zIndex: 1 }}>
      <SocialSidebar dark={dark} accent={accent} textMuted={textMuted} border={border} />
      <Navbar dark={dark} setDark={setDark} lang={lang} setLang={setLang} tx={tx} activeSection={activeSection} scrollTo={scrollTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} accent={accent} textMuted={textMuted} border={border} surface={surface} text={text} />
      <HeroSection dark={dark} accent={accent} accentAlt={accentAlt} bg={bg} surface={surface} surfaceAlt={surfaceAlt} border={border} text={text} textMuted={textMuted} tx={tx} photo={photo} scrollTo={scrollTo} />
      <AboutSection dark={dark} accent={accent} accentAlt={accentAlt} surface={surface} border={border} text={text} textMuted={textMuted} tx={tx} />
      <SkillsSection dark={dark} accent={accent} accentAlt={accentAlt} surface={surface} border={border} text={text} textMuted={textMuted} tx={tx} />
      <ExperienceSection dark={dark} accent={accent} accentAlt={accentAlt} surface={surface} border={border} text={text} textMuted={textMuted} tx={tx} />
      <ProjectsSection dark={dark} accent={accent} accentAlt={accentAlt} surface={surface} border={border} text={text} textMuted={textMuted} tx={tx} />
      <ContactSection dark={dark} accent={accent} accentAlt={accentAlt} surface={surface} surfaceAlt={surfaceAlt} border={border} text={text} textMuted={textMuted} tx={tx} />
      <footer style={{ padding: "24px clamp(16px,6vw,140px)", borderTop: `1px solid ${border}40` }} />
      </div>{/* fin z-index wrapper */}
    </div>
  );
}

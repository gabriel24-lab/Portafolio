import { AnimSection } from "../components/AnimSection";

export function HeroSection({
  dark,
  accent,
  accentAlt,
  bg,
  surface,
  surfaceAlt,
  border,
  text,
  textMuted,
  tx,
  photo,
  scrollTo,
}) {
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px clamp(16px,6vw,140px) 60px", position: "relative", overflow: "hidden" }}>
      <style>{`
        @media(max-width:768px){
          #hero { padding-top: 90px !important; padding-bottom: 48px !important; min-height: 100svh !important; }
          .hero-inner { flex-direction: column-reverse !important; gap: 32px !important; text-align: center; }
          .hero-photo { width: 150px !important; height: 150px !important; }
          .hero-photo-wrap { justify-content: center !important; }
          .hero-btns { justify-content: center !important; }
          .hero-btns a, .hero-btns button { width: 100% !important; justify-content: center !important; box-sizing: border-box; }
          .hero-subtitle { max-width: 100% !important; }
        }
      `}</style>
      <div style={{ position: "absolute", top: "15%", right: "5%", width: "min(400px,60vw)", height: "min(400px,60vw)", background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "0%", width: "min(300px,50vw)", height: "min(300px,50vw)", background: `radial-gradient(circle, ${accentAlt}10 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

      <div className="hero-inner" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "clamp(32px,8vw,100px)", width: "100%", flexWrap: "wrap" }}>
        {/* Texto */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <div data-aos="fade-right" data-aos-duration="900" data-aos-delay="100">
            <p style={{ fontSize: "clamp(14px,3.5vw,18px)", color: textMuted, marginBottom: 8, fontWeight: 400 }}>{tx.hero.greeting}</p>
            <h1 style={{ fontSize: "clamp(1.2rem,5vw,3rem)", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 16, color: text, fontFamily: "'Press Start 2P', cursive" }}>{tx.hero.name}</h1>
            <h2 style={{ fontSize: "clamp(0.5rem,2.5vw,1rem)", fontWeight: 600, color: accent, marginBottom: 20, letterSpacing: "0.01em", fontFamily: "'Press Start 2P', cursive" }}>{tx.hero.title}<span style={{ display: "inline-block", width: "3px", height: "1em", background: accent, animation: "blink 1s step-end infinite", marginLeft: "2px", verticalAlign: "middle" }} /></h2>
            <p className="hero-subtitle" style={{ fontSize: "clamp(13px,2vw,16px)", lineHeight: 1.75, color: textMuted, maxWidth: 520, marginBottom: 36 }}>{tx.hero.subtitle}</p>
          </div>
          <div className="hero-btns" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/CV-Gabriel-Mejia-Silva.pdf" download="CV-Gabriel-Mejia-Silva.pdf" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: accent, color: "#fff", border: "none", borderRadius: 12, fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "clamp(12px,2.5vw,14px)", cursor: "pointer", transition: "all 0.2s", textDecoration: "none" }} onMouseEnter={e => { e.currentTarget.style.background = "#5a52e0"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(108,99,255,0.35)"; }} onMouseLeave={e => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}><i className="bi bi-download" style={{ marginRight: 4 }} /> {tx.hero.downloadCV}</a>
            <button onClick={() => scrollTo("contact")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "transparent", color: text, border: `1.5px solid ${border}`, borderRadius: 12, fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "clamp(12px,2.5vw,14px)", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = text; e.currentTarget.style.transform = "translateY(0)"; }}><i className="bi bi-chat-dots" style={{ marginRight: 4 }} /> {tx.hero.contact}</button>
          </div>
        </div>

        {/* Foto */}
        <div className="hero-photo-wrap" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative", animation: "float 5s ease-in-out infinite" }}>
            <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: `conic-gradient(${accent}, ${accentAlt}, ${accent})`, animation: "gradient-shift 4s linear infinite", backgroundSize: "200% 200%", zIndex: 0 }} />
            <div style={{ position: "absolute", inset: -2, borderRadius: "50%", background: bg, zIndex: 1 }} />
            <div className="hero-photo" style={{ position: "relative", zIndex: 2, width: 200, height: 200, borderRadius: "50%", overflow: "hidden", background: surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${surface}` }}>
              {photo ? (<img src={photo} alt={tx.hero.photoAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />) : (<div style={{ fontSize: 80, lineHeight: 1 }}>🧑‍💻</div>)}
            </div>
            <div style={{ position: "absolute", inset: -20, borderRadius: "50%", border: `1px solid ${accent}30`, zIndex: 0, animation: "pulse-ring 2.5s ease-out infinite" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

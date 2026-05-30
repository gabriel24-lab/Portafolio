import miFoto from "../assets/mi-foto.jpeg";

export function AboutSection({
  dark,
  accent,
  accentAlt,
  surface,
  border,
  text,
  textMuted,
  tx,
}) {
  return (
    <section id="about" style={{ padding: "80px clamp(16px,6vw,140px)" }}>
      <style>{`
        @media(max-width:768px){
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .about-img { max-width: 100% !important; }
          #about h2 { margin-bottom: 28px !important; }
        }
      `}</style>

      {/* Header */}
      <div data-aos="fade-down" data-aos-duration="700">
        <p style={{ fontFamily: "'Play', sans-serif", fontSize: 12, color: accent, marginBottom: 12, letterSpacing: 2 }}>01. ABOUT_ME</p>
        <h2 style={{ fontSize: "clamp(1rem,3.5vw,2rem)", fontWeight: 800, letterSpacing: "-0.01em", color: text, marginBottom: 48, fontFamily: "'Press Start 2P', cursive", lineHeight: 1.4 }}>{tx.about.title}</h2>
      </div>

      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

        {/* Texto */}
        <div data-aos="fade-right" data-aos-duration="800" data-aos-delay="150">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[tx.about.p1, tx.about.p2, tx.about.p3].map((p, i) => (
              <p key={i} style={{ fontSize: "clamp(13px,2vw,15px)", lineHeight: 1.85, color: i === 0 ? text : textMuted }}>{p}</p>
            ))}
          </div>
        </div>

        {/* Imagen */}
        <div data-aos="fade-left" data-aos-duration="900" data-aos-delay="250">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="about-img" style={{ width: "100%", maxWidth: 420, borderRadius: 30, overflow: "hidden", border: `1px solid ${border}`, background: surface, boxShadow: `0 0 40px ${accent}22` }}>
              <img src={miFoto} alt="Foto de perfil" style={{ width: "100%", display: "block", objectFit: "cover" }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export function ExperienceSection({
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
    <section id="experience" style={{ padding: "80px clamp(16px,6vw,140px)" }}>
      <style>{`
        @media(max-width:768px){
          .exp-item { gap: 16px !important; }
          .exp-card { padding: 18px 16px !important; }
          .exp-tags { grid-template-columns: 1fr 1fr !important; }
          .exp-header { flex-direction: column !important; gap: 4px !important; }
          .exp-role { font-size: 15px !important; }
        }
      `}</style>

      {/* Header */}
      <div data-aos="fade-right" data-aos-duration="700">
        <p style={{ fontFamily: "'Play', sans-serif", fontSize: 12, color: accent, marginBottom: 12, letterSpacing: 2 }}></p>
        <h2 style={{ fontSize: "clamp(1rem,3.5vw,2rem)", fontWeight: 800, letterSpacing: "-0.01em", color: text, fontFamily: "'Press Start 2P', cursive", lineHeight: 1.4 }}>{tx.experience.title}</h2>
        <p style={{ color: textMuted, fontSize: "clamp(13px,2vw,15px)", marginTop: 8, marginBottom: 48 }}>{tx.experience.subtitle}</p>
      </div>

      <div style={{ position: "relative", maxWidth: 800 }}>
        {/* Línea vertical de la timeline */}
        <div
          data-aos="fade-down"
          data-aos-duration="1200"
          data-aos-delay="100"
          style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${accent}, ${accentAlt})`, borderRadius: 2, opacity: 0.3 }}
        />

        {tx.experience.jobs.map((job, ji) => (
          <div
            key={ji}
            data-aos={ji % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-duration="750"
            data-aos-delay={ji * 150}
          >
            <div className="exp-item" style={{ display: "flex", gap: 32, marginBottom: 44 }}>
              {/* Ícono de la timeline */}
              <div style={{ flexShrink: 0, width: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  data-aos="zoom-in"
                  data-aos-duration="500"
                  data-aos-delay={ji * 150 + 100}
                  style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, ${accentAlt})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: `0 0 20px ${accent}40`, zIndex: 1 }}
                >
                  {ji === 0 ? <i className="bi bi-mortarboard-fill" style={{ fontSize: 18 }} /> : <i className="bi bi-book-fill" style={{ fontSize: 18 }} />}
                </div>
              </div>

              {/* Card de contenido */}
              <div className="exp-card" style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, flex: 1, padding: "24px 28px" }}>
                <div className="exp-header" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                  <h3 className="exp-role" style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.01em", color: text }}>{job.role}</h3>
                  <span style={{ fontFamily: "'Play', sans-serif", fontSize: 11, color: accentAlt, fontWeight: 600, whiteSpace: "nowrap" }}>{job.period}</span>
                </div>
                <p style={{ color: accent, fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{job.company}</p>
                <p style={{ color: textMuted, fontSize: 12, marginBottom: 12 }}><i className="bi bi-geo-alt" /> {job.location}</p>
                <p style={{ fontSize: "clamp(12px,2vw,14px)", lineHeight: 1.75, color: textMuted, marginBottom: 16 }}>{job.description}</p>

                {/* Skills grid */}
                <div style={{ marginTop: 4 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accent, opacity: 0.7, fontFamily: "'Play', sans-serif", marginBottom: 12 }}>
                    Aprendizajes clave
                  </p>
                  <div className="exp-tags" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
                    {job.tags.map((tag, ti) => (
                      <div
                        key={ti}
                        data-aos="flip-left"
                        data-aos-duration="400"
                        data-aos-delay={ji * 100 + ti * 60}
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 10, background: dark ? "rgba(255,255,255,0.03)" : "rgba(108,99,255,0.04)", borderLeft: `3px solid ${accent}`, backdropFilter: "blur(4px)", transition: "background 0.2s, transform 0.2s", cursor: "default" }}
                        onMouseEnter={e => { e.currentTarget.style.background = dark ? "rgba(108,99,255,0.12)" : "rgba(108,99,255,0.09)"; e.currentTarget.style.transform = "translateX(3px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "rgba(108,99,255,0.04)"; e.currentTarget.style.transform = "translateX(0)"; }}
                      >
                        <i className="bi bi-check2" style={{ fontSize: 12, color: accent, flexShrink: 0, fontWeight: 700 }} />
                        <span style={{ fontSize: "clamp(10px,2vw,12px)", fontWeight: 600, color: text, fontFamily: "'Play', sans-serif", letterSpacing: "0.01em", lineHeight: 1.2 }}>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── helper: URL del ícono desde simpleicons ─── */
function techIconUrl(tech, dark) {
  const isBlack = tech.color === "#000000" || tech.color === "#181717";
  const isLight = ["#F7DF1E", "#FCC624", "#61DAFB", "#4FC08D"].includes(tech.color);
  let color = tech.color;
  if (dark && isBlack) color = "#ffffff";
  if (!dark && isLight)
    color =
      tech.color === "#F7DF1E" ? "#b8a800"
      : tech.color === "#FCC624" ? "#b08a00"
      : tech.color === "#61DAFB" ? "#0da0c0"
      : "#2a8a5e";
  return `https://cdn.simpleicons.org/${tech.slug}/${color.replace("#", "")}`;
}

export function ProjectsSection({
  dark,
  accent,
  accentAlt,
  surface,
  border,
  text,
  textMuted,
  tx,
}) {
  const bg         = dark ? "rgba(5,8,6,0.0)"    : "rgba(241,240,237,0.0)";
  const frontBg    = dark ? "rgba(11,20,13,0.82)" : "rgba(255,255,255,0.85)";
  const backBg     = dark
    ? "linear-gradient(145deg,rgba(12,18,14,0.92) 0%,rgba(20,28,22,0.92) 100%)"
    : "linear-gradient(145deg,rgba(245,255,247,0.92) 0%,rgba(232,248,235,0.92) 100%)";

  return (
    <section
      id="projects"
      style={{ padding: "80px clamp(16px,6vw,140px)", background: bg }}
    >
      <style>{`
        /* ── Perspectiva ── */
        .ps-scene {
          width: min(380px, 92vw);
          height: auto;
          min-height: 420px;
          perspective: 1200px;
          cursor: pointer;
        }

        /* ── El "libro" que gira ── */
        .ps-card {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 420px;
          transform-style: preserve-3d;
          transition: transform 0.72s cubic-bezier(.4,0,.2,1);
        }
        .ps-scene:hover .ps-card,
        .ps-scene.flipped .ps-card {
          transform: rotateY(180deg);
        }

        /* ── Cara base ── */
        .ps-face {
          position: absolute;
          inset: 0;
          border-radius: 22px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* ── FRENTE ── */
        .ps-front {
          background: ${frontBg};
          border: 1px solid ${border};
          padding: clamp(18px,4vw,30px);
          gap: 16px;
          box-shadow: 0 4px 30px rgba(0,0,0,0.14);
          transition: box-shadow 0.4s;
        }
        .ps-scene:hover .ps-front {
          box-shadow: 0 20px 60px ${accent}30;
        }

        /* ── DORSO ── */
        .ps-back {
          background: ${backBg};
          border: 1px solid ${accent}55;
          transform: rotateY(180deg);
          padding: clamp(16px,4vw,26px) clamp(14px,3vw,22px) clamp(14px,3vw,22px);
          justify-content: space-between;
          box-shadow: 0 20px 60px ${accent}25;
        }

        /* ── Grid de tecnologías ── */
        .ps-tech-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          flex: 1;
          align-content: center;
          margin: 10px 0;
        }
        .ps-chip {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px;
          background: ${dark ? "rgba(255,255,255,0.05)" : "rgba(108,99,255,0.07)"};
          border: 1px solid ${dark ? "rgba(255,255,255,0.09)" : "rgba(108,99,255,0.17)"};
          border-radius: 12px; padding: 11px 4px 9px;
          transition: transform 0.2s, background 0.2s;
        }
        .ps-chip:hover { transform: translateY(-2px) scale(1.04); background: ${dark ? "rgba(108,99,255,0.18)" : "rgba(108,99,255,0.13)"}; }
        .ps-chip img { width: clamp(24px,6vw,34px); height: clamp(24px,6vw,34px); object-fit: contain; display: block; }
        .ps-chip-name {
          font-size: clamp(8px,2vw,9.5px); font-weight: 700;
          font-family: 'Play', sans-serif; color: ${textMuted};
          text-align: center; letter-spacing: 0.04em; white-space: nowrap;
        }

        /* ── Botón CTA ── */
        .ps-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 13px 20px; border-radius: 12px;
          background: linear-gradient(135deg, ${accent}, ${accentAlt || accent}cc);
          color: #fff; font-size: clamp(11px,3vw,13px); font-weight: 700;
          font-family: 'Play', sans-serif; letter-spacing: 0.06em;
          text-decoration: none; border: none; cursor: pointer;
          box-shadow: 0 4px 20px ${accent}50;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          flex-shrink: 0;
        }
        .ps-cta:hover { opacity: 0.85; transform: translateY(-2px); box-shadow: 0 8px 30px ${accent}60; }

        /* ── Badge producción ── */
        .ps-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 20px; font-size: 10.5px; font-weight: 700;
          font-family: 'Play', sans-serif; background: ${accent}18; color: ${accent}; border: 1px solid ${accent}35;
        }
        .ps-dot { width: 6px; height: 6px; border-radius: 50%; background: #4CAF50; box-shadow: 0 0 6px #4CAF5088; flex-shrink: 0; }

        /* ── Hint ── */
        .ps-hint {
          position: absolute; bottom: 11px; right: 15px;
          font-size: 9.5px; font-family: 'Play', sans-serif;
          color: ${textMuted}; letter-spacing: 0.05em;
          display: flex; align-items: center; gap: 4px;
          opacity: 0.5; pointer-events: none; transition: opacity 0.3s;
        }
        .ps-scene:hover .ps-hint { opacity: 0; }

        /* ── Touch tap hint (solo móvil) ── */
        @media(hover:none){
          .ps-tap-hint { display: flex !important; }
        }
        .ps-tap-hint { display: none; }

        /* ── Projects list responsive ── */
        .projects-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
        }
        .project-item {
          width: 100%;
          max-width: 420px;
        }
      `}</style>

      {/* ─── Encabezado ─── */}
      <div data-aos="fade-up" data-aos-duration="700">
        <p style={{ fontFamily: "'Play', sans-serif", fontSize: 12, color: accent, marginBottom: 12, letterSpacing: 2 }}>
          04. PROJECTS
        </p>
        <h2 style={{ fontSize: "clamp(1rem,3.5vw,2rem)", fontWeight: 800, letterSpacing: "-0.01em", color: text, fontFamily: "'Press Start 2P', cursive", lineHeight: 1.4 }}>
          {tx.projects.title}
        </h2>
        <p style={{ color: textMuted, fontSize: "clamp(13px,2vw,15px)", marginTop: 8, marginBottom: 40 }}>
          {tx.projects.subtitle}
        </p>
      </div>

      {/* ─── Tarjetas ─── */}
      <div className="projects-list">
        {tx.projects.items.map((proj, pi) => (
          <div
            key={pi}
            className="project-item"
            data-aos={pi % 2 === 0 ? "zoom-in-up" : "zoom-in-down"}
            data-aos-duration="850"
            data-aos-delay={pi * 120}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* Flip card — en touch se activa con tap via estado */}
              <TapFlipCard
                proj={proj}
                dark={dark}
                accent={accent}
                accentAlt={accentAlt}
                text={text}
                textMuted={textMuted}
                tx={tx}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Sub-componente para manejar tap en móvil ── */
import { useState } from "react";

function TapFlipCard({ proj, dark, accent, accentAlt, text, textMuted, tx }) {
  const [flipped, setFlipped] = useState(false);

  function techIconUrl(tech, dark) {
    const isBlack = tech.color === "#000000" || tech.color === "#181717";
    const isLight = ["#F7DF1E", "#FCC624", "#61DAFB", "#4FC08D"].includes(tech.color);
    let color = tech.color;
    if (dark && isBlack) color = "#ffffff";
    if (!dark && isLight)
      color = tech.color === "#F7DF1E" ? "#b8a800" : tech.color === "#FCC624" ? "#b08a00" : tech.color === "#61DAFB" ? "#0da0c0" : "#2a8a5e";
    return `https://cdn.simpleicons.org/${tech.slug}/${color.replace("#", "")}`;
  }

  return (
    <div
      className={`ps-scene${flipped ? " flipped" : ""}`}
      onClick={() => setFlipped(f => !f)}
    >
      <div className="ps-card">

        {/* ═══ FRENTE ═══ */}
        <div className="ps-face ps-front">
          <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: `linear-gradient(135deg,${accent}20,${accent}38)`, border: `1px solid ${accent}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className={`bi ${proj.icon}`} style={{ fontSize: 24, color: accent }} />
          </div>

          <div style={{ flex: 1, minHeight: 0 }}>
            <h3 style={{ fontWeight: 800, fontSize: "clamp(16px,4vw,20px)", marginBottom: 10, color: text, letterSpacing: "-0.02em" }}>{proj.name}</h3>
            <p style={{ fontSize: "clamp(12px,3vw,13px)", lineHeight: 1.8, color: textMuted }}>{proj.desc}</p>
          </div>

          <div className="ps-badge"><span className="ps-dot" />En producción</div>

          {/* Hint hover */}
          <div className="ps-hint"><i className="bi bi-arrow-repeat" style={{ fontSize: 11 }} />Hover para ver el stack</div>
          {/* Hint tap (móvil) */}
          <div className="ps-tap-hint" style={{ position: "absolute", bottom: 11, right: 15, fontSize: "9.5px", fontFamily: "'Play', sans-serif", color: textMuted, letterSpacing: "0.05em", alignItems: "center", gap: 4, opacity: 0.5, pointerEvents: "none" }}>
            <i className="bi bi-hand-index" style={{ fontSize: 11 }} />Tap para ver el stack
          </div>
        </div>

        {/* ═══ DORSO ═══ */}
        <div className="ps-face ps-back">
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accent, fontFamily: "'Play', sans-serif", marginBottom: 2 }}>Stack tecnológico</p>
            <p style={{ fontSize: "clamp(14px,4vw,17px)", fontWeight: 800, color: text, fontFamily: "'Play', sans-serif" }}>{proj.name}</p>
          </div>

          <div className="ps-tech-grid">
            {proj.techs.map((tech, ti) => (
              <div key={ti} className="ps-chip">
                <img src={techIconUrl(tech, dark)} alt={tech.name} onError={e => { e.target.style.display = "none"; }} />
                <span className="ps-chip-name">{tech.name}</span>
              </div>
            ))}
          </div>

          <a
            className="ps-cta"
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            {tx.projects.cta}&nbsp;<i className="bi bi-arrow-up-right" />
          </a>
        </div>

      </div>
    </div>
  );
}

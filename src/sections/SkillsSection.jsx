import { ParticleCanvas } from "../components/ParticleCanvas";
import { TECHS } from "../constans/techs";

export function SkillsSection({
  dark,
  accent,
  accentAlt,
  surface,
  border,
  text,
  textMuted,
  tx,
}) {
  const bg = dark ? "rgba(5,8,6,0.0)" : "rgba(241,240,237,0.0)";
  const cardBg = dark ? "rgba(11,20,13,0.78)" : "rgba(255,255,255,0.80)";
  const cardBgHover = dark ? "rgba(18,30,20,0.92)" : "rgba(255,255,255,0.95)";

  return (
    <section id="skills" style={{ padding: "80px clamp(16px,6vw,140px)", background: bg, position: "relative", overflow: "hidden" }}>
      <ParticleCanvas dark={dark} accent={accent} accentAlt={accentAlt} />
      <style>{`
        .tech-card2 {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 12px; padding: 20px 10px 16px;
          background: ${cardBg};
          border: 1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"};
          border-radius: 18px; cursor: default;
          backdrop-filter: blur(12px);
          transition: all 0.28s cubic-bezier(.4,0,.2,1);
          position: relative; overflow: hidden;
        }
        .tech-card2::before {
          content: ''; position: absolute; inset: 0; border-radius: 18px;
          background: linear-gradient(135deg, ${accent}00, ${accent}00);
          transition: background 0.3s; pointer-events: none;
        }
        .tech-card2:hover::before {
          background: linear-gradient(135deg, var(--tc, ${accent})12, transparent 70%);
        }
        .tech-card2:hover {
          transform: translateY(-6px) scale(1.04);
          border-color: var(--tc, ${accent})55;
          box-shadow: 0 14px 36px var(--tc, ${accent})20, 0 0 0 1px var(--tc, ${accent})18;
          background: ${cardBgHover};
        }
        .tech-card2 .ti { width: 40px; height: 40px; transition: transform 0.28s; display: flex; align-items: center; justify-content: center; }
        .tech-card2:hover .ti { transform: scale(1.15) rotate(-4deg); }
        .tech-card2 .tname {
          font-size: 10px; font-weight: 600; color: ${textMuted};
          font-family: 'Play', sans-serif; text-align: center; letter-spacing: 0.02em;
          transition: color 0.2s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;
        }
        .tech-card2:hover .tname { color: var(--tc, ${accent}); }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
          gap: 10px;
        }
        @media(max-width:480px){
          .skills-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; }
          .tech-card2 { padding: 16px 6px 12px !important; gap: 8px !important; }
          .tech-card2 .ti { width: 34px !important; height: 34px !important; }
          .tech-card2 .tname { font-size: 9px !important; }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div data-aos="fade-up" data-aos-duration="700">
          <p style={{ fontFamily: "'Play', sans-serif", fontSize: 12, color: accent, marginBottom: 12, letterSpacing: 2 }}>02. SKILLS</p>
          <h2 style={{ fontSize: "clamp(1rem,3.5vw,2rem)", fontWeight: 800, letterSpacing: "-0.01em", color: text, fontFamily: "'Press Start 2P', cursive", lineHeight: 1.4 }}>{tx.skills.title}</h2>
          <p style={{ color: textMuted, fontSize: "clamp(13px,2vw,15px)", marginTop: 8, marginBottom: 40 }}>{tx.skills.subtitle}</p>
        </div>

        {/* Grid de tecnologías */}
        <div className="skills-grid">
          {TECHS.map((tech, i) => {
            const isBlack = tech.color === "#000000" || tech.color === "#181717";
            const isLightColor = ["#F7DF1E", "#FCC624", "#61DAFB", "#4FC08D"].includes(tech.color);
            let iconColor = tech.color;
            if (dark && isBlack) iconColor = "#ffffff";
            if (!dark && isLightColor) iconColor = tech.color === "#F7DF1E" ? "#b8a800" : tech.color === "#FCC624" ? "#b08a00" : tech.color === "#61DAFB" ? "#0da0c0" : "#2a8a5e";
            const iconUrl = `https://cdn.simpleicons.org/${tech.slug}/${iconColor.replace("#", "")}`;
            const hoverColor = isBlack ? (dark ? "#888" : "#333") : (isLightColor && !dark ? iconColor : tech.color);
            return (
              <div
                key={i}
                className="tech-card2"
                style={{ "--tc": hoverColor }}
                title={tech.name}
                data-aos="zoom-in"
                data-aos-duration="500"
                data-aos-delay={Math.min(i * 40, 500)}
              >
                <div className="ti">
                  <img src={iconUrl} alt={tech.name} width={40} height={40} style={{ objectFit: "contain", display: "block" }} onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = `<span style="font-size:24px;line-height:1">⬡</span>`; }} />
                </div>
                <span className="tname">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

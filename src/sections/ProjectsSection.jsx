import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Lightbox: visor de imagen a pantalla completa ─── */
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(0,0,0,0.95)",
        backdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "lbFadeIn 0.2s ease",
      }}
    >
      <style>{`
        @keyframes lbFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes lbImgIn { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }
        .lb-nav {
          position:absolute; top:50%; transform:translateY(-50%);
          width:48px; height:48px; border-radius:50%;
          background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);
          color:#fff; font-size:20px; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:all 0.2s; backdrop-filter:blur(8px);
        }
        .lb-nav:hover { background:rgba(255,255,255,0.22); transform:translateY(-50%) scale(1.1); }
        .lb-dot { width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,0.35); cursor:pointer; transition:all 0.2s; }
        .lb-dot.active { background:#fff; transform:scale(1.3); }
        .lb-dot:hover { background:rgba(255,255,255,0.7); }
      `}</style>

      {/* Imagen principal */}
      <img
        key={current}
        src={images[current]?.src}
        alt={images[current]?.caption || `Imagen ${current + 1}`}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: "90vw", maxHeight: "85vh",
          objectFit: "contain", borderRadius: 12,
          boxShadow: "0 30px 100px rgba(0,0,0,0.8)",
          animation: "lbImgIn 0.25s ease",
          userSelect: "none",
        }}
      />

      {/* Caption */}
      {images[current]?.caption && (
        <div style={{
          position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.7)", color: "#fff",
          padding: "8px 20px", borderRadius: 20, fontSize: 13,
          fontFamily: "'Play',sans-serif", whiteSpace: "nowrap",
          backdropFilter: "blur(8px)",
        }}>
          {images[current].caption}
        </div>
      )}

      {/* Navegación prev/next */}
      {images.length > 1 && <>
        <button className="lb-nav" style={{ left: 20 }} onClick={e => { e.stopPropagation(); prev(); }}>
          <i className="bi bi-chevron-left" />
        </button>
        <button className="lb-nav" style={{ right: 20 }} onClick={e => { e.stopPropagation(); next(); }}>
          <i className="bi bi-chevron-right" />
        </button>
      </>}

      {/* Dots */}
      {images.length > 1 && (
        <div style={{ position: "absolute", bottom: 24, display: "flex", gap: 8 }} onClick={e => e.stopPropagation()}>
          {images.map((_, i) => (
            <div key={i} className={`lb-dot${i === current ? " active" : ""}`} onClick={() => setCurrent(i)} />
          ))}
        </div>
      )}

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 20, right: 20,
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff", fontSize: 20, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
      >
        <i className="bi bi-x" />
      </button>

      {/* Contador */}
      {images.length > 1 && (
        <div style={{
          position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "'Play',sans-serif",
        }}>
          {current + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

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

/* ─── Modal de detalles del proyecto ─── */
function ProjectModal({ proj, dark, accent, accentAlt, text, textMuted, border, surface, tx, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const modalRef = useRef(null);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const details = proj.details || {};
  const images = details.images || [];
  const why = details.why || "";
  const experience = details.experience || "";
  const challenges = details.challenges || [];

  const overlayBg = dark ? "rgba(4,6,20,0.92)" : "rgba(10,12,40,0.85)";
  const cardBg = dark ? "rgba(10,14,36,0.98)" : "rgba(245,247,255,0.98)";
  const tabActiveBg = dark ? `${accent}22` : `${accent}18`;

  const [activeTab, setActiveTab] = useState("overview");
  const m = tx.projects.modal;
  const tabs = [
    { id: "overview", label: m.tabs.overview,   icon: "bi-grid-1x2" },
    { id: "why",      label: m.tabs.why,        icon: "bi-lightbulb" },
    { id: "tech",     label: m.tabs.tech,       icon: "bi-cpu" },
    { id: "challenges", label: m.tabs.challenges, icon: "bi-exclamation-diamond" },
  ];

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: overlayBg,
        backdropFilter: "blur(18px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        animation: "modalFadeIn 0.3s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes modalFadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: ${accent}55; border-radius: 10px; }
        .modal-tab { 
          display:flex; align-items:center; gap:7px; 
          padding:9px 16px; border-radius:10px; border:none; cursor:pointer;
          font-family:'Play',sans-serif; font-size:clamp(10px,2.5vw,12px); font-weight:700;
          letter-spacing:0.04em; transition:all 0.2s; white-space:nowrap;
        }
        .modal-tab:hover { background: ${accent}15; }
        .modal-tab.active { background: ${tabActiveBg}; color: ${accent}; border: 1px solid ${accent}30; }
        .challenge-card {
          display:flex; align-items:flex-start; gap:14px;
          padding:16px 18px; border-radius:14px;
          border: 1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"};
          background: ${dark ? "rgba(255,255,255,0.03)" : "rgba(108,142,255,0.04)"};
          animation: slideUp 0.4s ease both;
        }
        .img-thumb-wrap {
          position:relative; flex-shrink:0; cursor:pointer;
        }
        .img-thumb {
          width:72px; height:50px; border-radius:9px; object-fit:cover;
          border:2px solid transparent; display:block;
          transition:all 0.25s cubic-bezier(.4,0,.2,1);
        }
        .img-thumb-wrap.active .img-thumb { border-color: ${accent}; box-shadow: 0 0 14px ${accent}66; }
        .img-thumb-wrap:hover .img-thumb { transform:scale(1.08); border-color:${accent}88; }
        .img-thumb-zoom {
          position:absolute; bottom:calc(100% + 10px); left:50%; transform:translateX(-50%) scale(0.85);
          width:200px; height:130px; border-radius:12px; overflow:hidden;
          border:2px solid ${accent}; box-shadow:0 12px 40px rgba(0,0,0,0.7);
          opacity:0; pointer-events:none;
          transition:opacity 0.2s, transform 0.2s;
          z-index:10;
        }
        .img-thumb-zoom img { width:100%; height:100%; object-fit:cover; display:block; }
        .img-thumb-wrap:hover .img-thumb-zoom { opacity:1; transform:translateX(-50%) scale(1); }
        .img-thumb-zoom::after {
          content:''; position:absolute; bottom:-8px; left:50%; transform:translateX(-50%);
          border:8px solid transparent; border-top-color:${accent};
          border-bottom:none;
        }
        .main-img-wrap { cursor:zoom-in; }
        .main-img-overlay {
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,0,0.25); opacity:0; transition:opacity 0.2s; border-radius:16px;
        }
        .main-img-wrap:hover .main-img-overlay { opacity:1; }
        @media(max-width:640px){
          .modal-tabs { flex-wrap:wrap !important; }
          .modal-tab { padding:7px 11px !important; font-size:10px !important; }
        }
      `}</style>

      <div
        ref={modalRef}
        style={{
          background: cardBg,
          border: `1px solid ${border}`,
          borderRadius: 24,
          width: "100%", maxWidth: 780,
          maxHeight: "92vh",
          display: "flex", flexDirection: "column",
          boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px ${accent}20`,
          overflow: "hidden",
        }}
      >
        {/* ── Header ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px 16px",
          borderBottom: `1px solid ${border}40`,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: `linear-gradient(135deg,${accent}25,${accent}40)`,
              border: `1px solid ${accent}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <i className={`bi ${proj.icon}`} style={{ fontSize: 20, color: accent }} />
            </div>
            <div>
              <p style={{ fontSize: 10, color: accent, fontFamily: "'Play',sans-serif", letterSpacing: 2, marginBottom: 2 }}>{m.projectLabel}</p>
              <h2 style={{ fontSize: "clamp(16px,4vw,22px)", fontWeight: 800, color: text, fontFamily: "'Press Start 2P',cursive", lineHeight: 1.2 }}>{proj.name}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: 10, border: `1px solid ${border}`,
              background: "transparent", color: textMuted, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = textMuted; }}
          >
            <i className="bi bi-x" />
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="modal-tabs" style={{
          display: "flex", gap: 6, padding: "12px 20px",
          borderBottom: `1px solid ${border}30`,
          flexShrink: 0, overflowX: "auto",
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`modal-tab${activeTab === tab.id ? " active" : ""}`}
              style={{ color: activeTab === tab.id ? accent : textMuted, background: activeTab === tab.id ? tabActiveBg : "transparent" }}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`bi ${tab.icon}`} style={{ fontSize: 13 }} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Contenido scrolleable ── */}
        <div className="modal-scroll" style={{ overflowY: "auto", flex: 1, padding: "24px" }}>

          {/* TAB: overview */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Galería */}
              {images.length > 0 && (
                <div>
                  {/* Imagen principal — clic abre lightbox */}
                  <div
                    className="main-img-wrap"
                    onClick={() => setLightboxOpen(true)}
                    style={{
                      width: "100%", borderRadius: 16, overflow: "hidden",
                      border: `1px solid ${border}`,
                      background: dark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.06)",
                      aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 12, position: "relative",
                    }}
                  >
                    <img
                      src={images[activeImg]?.src}
                      alt={images[activeImg]?.caption || proj.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={e => { e.target.style.display = "none"; }}
                    />
                    {/* Overlay con ícono de lupa */}
                    <div className="main-img-overlay">
                      <div style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "1.5px solid rgba(255,255,255,0.3)",
                      }}>
                        <i className="bi bi-zoom-in" style={{ color: "#fff", fontSize: 20 }} />
                      </div>
                    </div>
                    {images[activeImg]?.caption && (
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                        padding: "28px 16px 12px",
                        color: "#fff", fontSize: 12, fontFamily: "'Play',sans-serif",
                      }}>
                        {images[activeImg].caption}
                      </div>
                    )}
                  </div>

                  {/* Miniaturas con zoom tooltip al hover */}
                  {images.length > 1 && (
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 4 }}>
                      {images.map((img, i) => (
                        <div
                          key={i}
                          className={`img-thumb-wrap${activeImg === i ? " active" : ""}`}
                          onClick={() => setActiveImg(i)}
                        >
                          <img
                            src={img.src}
                            alt={img.caption || `Imagen ${i+1}`}
                            className="img-thumb"
                          />
                          {/* Zoom tooltip al pasar el mouse */}
                          <div className="img-thumb-zoom">
                            <img src={img.src} alt={img.caption || `Imagen ${i+1}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Lightbox */}
              {lightboxOpen && images.length > 0 && (
                <Lightbox
                  images={images}
                  startIndex={activeImg}
                  onClose={() => setLightboxOpen(false)}
                />
              )}

              {/* Descripción */}
              <div style={{
                padding: "20px", borderRadius: 16,
                border: `1px solid ${border}40`,
                background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              }}>
                <p style={{ fontSize: 11, color: accent, fontFamily: "'Play',sans-serif", letterSpacing: 2, marginBottom: 10 }}>{m.descLabel}</p>
                <p style={{ fontSize: "clamp(13px,2vw,14px)", lineHeight: 1.85, color: textMuted }}>{proj.desc}</p>
              </div>

              {/* Experiencia personal */}
              {experience && (
                <div style={{
                  padding: "20px", borderRadius: 16,
                  border: `1px solid ${accent}30`,
                  background: dark ? `${accent}08` : `${accent}06`,
                }}>
                  <p style={{ fontSize: 11, color: accent, fontFamily: "'Play',sans-serif", letterSpacing: 2, marginBottom: 10 }}>{m.experienceLabel}</p>
                  <p style={{ fontSize: "clamp(13px,2vw,14px)", lineHeight: 1.85, color: text }}>{experience}</p>
                </div>
              )}

              {/* Badge + link */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                  fontFamily: "'Play',sans-serif", background: `${accent}18`, color: accent,
                  border: `1px solid ${accent}35`,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4CAF50", boxShadow: "0 0 6px #4CAF5088", display: "inline-block" }} />
                  {m.inProduction}
                </div>
                <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "9px 20px", borderRadius: 12,
                  background: `linear-gradient(135deg, ${accent}, ${accentAlt || accent}cc)`,
                  color: "#fff", fontFamily: "'Play',sans-serif", fontWeight: 700,
                  fontSize: 12, textDecoration: "none", letterSpacing: "0.05em",
                  boxShadow: `0 4px 20px ${accent}50`,
                }}>
                  {m.viewProject} <i className="bi bi-arrow-up-right" />
                </a>
              </div>
            </div>
          )}

          {/* TAB: why */}
          {activeTab === "why" && (
            <div style={{ animation: "slideUp 0.35s ease" }}>
              <div style={{
                padding: "28px", borderRadius: 18,
                border: `1px solid ${border}`,
                background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                marginBottom: 20,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${accent}20`, border: `1px solid ${accent}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="bi bi-lightbulb-fill" style={{ color: "#FFD700", fontSize: 18 }} />
                  </div>
                  <p style={{ fontSize: "clamp(13px,3vw,15px)", fontWeight: 700, color: text, fontFamily: "'Play',sans-serif" }}>{m.motivation}</p>
                </div>
                <p style={{ fontSize: "clamp(13px,2vw,14px)", lineHeight: 2, color: textMuted }}>
                  {why || m.comingSoon}
                </p>
              </div>
            </div>
          )}

          {/* TAB: tech */}
          {activeTab === "tech" && (
            <div style={{ animation: "slideUp 0.35s ease" }}>
              <p style={{ fontSize: 11, color: accent, fontFamily: "'Play',sans-serif", letterSpacing: 2, marginBottom: 20 }}>{m.fullStack}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px,1fr))", gap: 12 }}>
                {proj.techs.map((tech, i) => {
                  const isBlack = tech.color === "#000000" || tech.color === "#181717";
                  const isLight = ["#F7DF1E","#FCC624","#61DAFB","#4FC08D"].includes(tech.color);
                  let iconColor = tech.color;
                  if (dark && isBlack) iconColor = "#ffffff";
                  if (!dark && isLight) iconColor = tech.color === "#F7DF1E" ? "#b8a800" : tech.color === "#FCC624" ? "#b08a00" : tech.color === "#61DAFB" ? "#0da0c0" : "#2a8a5e";
                  const iconUrl = `https://cdn.simpleicons.org/${tech.slug}/${iconColor.replace("#", "")}`;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                        padding: "18px 10px 14px", borderRadius: 16,
                        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)"}`,
                        background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                        transition: "all 0.2s", animation: `slideUp 0.3s ease ${i*60}ms both`,
                      }}
                    >
                      <img src={iconUrl} alt={tech.name} width={36} height={36} style={{ objectFit: "contain" }} onError={e => { e.target.style.display = "none"; }} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: textMuted, fontFamily: "'Play',sans-serif", textAlign: "center" }}>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
              {proj.details?.techNotes && (
                <div style={{ marginTop: 20, padding: "18px 20px", borderRadius: 14, border: `1px solid ${border}40`, background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                  <p style={{ fontSize: "clamp(13px,2vw,14px)", lineHeight: 1.85, color: textMuted }}>{proj.details.techNotes}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: challenges */}
          {activeTab === "challenges" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "slideUp 0.35s ease" }}>
              <p style={{ fontSize: 11, color: accent, fontFamily: "'Play',sans-serif", letterSpacing: 2, marginBottom: 6 }}>{m.technicalChallenges}</p>
              {challenges.length === 0 ? (
                <p style={{ color: textMuted, fontSize: 14 }}>{m.comingSoon}</p>
              ) : challenges.map((ch, i) => (
                <div key={i} className="challenge-card" style={{ animationDelay: `${i*80}ms` }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${ch.color || accent}18`, border: `1px solid ${ch.color || accent}35`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                  }}>
                    <i className={`bi ${ch.icon || "bi-lightning-charge"}`} style={{ fontSize: 18, color: ch.color || accent }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: text, fontFamily: "'Play',sans-serif", marginBottom: 6 }}>{ch.title}</p>
                    <p style={{ fontSize: "clamp(12px,2vw,13px)", lineHeight: 1.8, color: textMuted }}>{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════ */
/*  ProjectsSection                               */
/* ══════════════════════════════════════════════ */
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
  const [modalProj, setModalProj] = useState(null);
  const bg      = dark ? "rgba(5,8,6,0.0)"    : "rgba(241,240,237,0.0)";
  const frontBg = dark ? "rgba(11,20,13,0.82)" : "rgba(255,255,255,0.85)";
  const backBg  = dark
    ? "linear-gradient(145deg,rgba(12,18,14,0.92) 0%,rgba(20,28,22,0.92) 100%)"
    : "linear-gradient(145deg,rgba(245,255,247,0.92) 0%,rgba(232,248,235,0.92) 100%)";

  return (
    <section id="projects" style={{ padding: "80px clamp(16px,6vw,140px)", background: bg }}>
      <style>{`
        .ps-scene {
          width: min(380px, 92vw);
          height: auto;
          min-height: 420px;
          perspective: 1200px;
          cursor: pointer;
        }
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
        .ps-back {
          background: ${backBg};
          border: 1px solid ${accent}55;
          transform: rotateY(180deg);
          padding: clamp(16px,4vw,26px) clamp(14px,3vw,22px) clamp(14px,3vw,22px);
          justify-content: space-between;
          box-shadow: 0 20px 60px ${accent}25;
        }
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

        /* Botones del dorso */
        .ps-btn-row {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        .ps-cta {
          flex: 1;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 12px 16px; border-radius: 12px;
          background: linear-gradient(135deg, ${accent}, ${accentAlt || accent}cc);
          color: #fff; font-size: clamp(10px,3vw,12px); font-weight: 700;
          font-family: 'Play', sans-serif; letter-spacing: 0.05em;
          text-decoration: none; border: none; cursor: pointer;
          box-shadow: 0 4px 20px ${accent}50;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .ps-cta:hover { opacity: 0.85; transform: translateY(-2px); box-shadow: 0 8px 30px ${accent}60; }

        .ps-details-btn {
          flex: 1;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 11px 16px; border-radius: 12px;
          background: transparent;
          color: ${accent}; font-size: clamp(10px,3vw,12px); font-weight: 700;
          font-family: 'Play', sans-serif; letter-spacing: 0.05em;
          border: 1.5px solid ${accent}60; cursor: pointer;
          transition: all 0.2s;
        }
        .ps-details-btn:hover { background: ${accent}15; transform: translateY(-2px); border-color: ${accent}; }

        .ps-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 20px; font-size: 10.5px; font-weight: 700;
          font-family: 'Play', sans-serif; background: ${accent}18; color: ${accent}; border: 1px solid ${accent}35;
        }
        .ps-dot { width: 6px; height: 6px; border-radius: 50%; background: #4CAF50; box-shadow: 0 0 6px #4CAF5088; flex-shrink: 0; }
        .ps-hint {
          position: absolute; bottom: 11px; right: 15px;
          font-size: 9.5px; font-family: 'Play', sans-serif;
          color: ${textMuted}; letter-spacing: 0.05em;
          display: flex; align-items: center; gap: 4px;
          opacity: 0.5; pointer-events: none; transition: opacity 0.3s;
        }
        .ps-scene:hover .ps-hint { opacity: 0; }
        @media(hover:none){
          .ps-tap-hint { display: flex !important; }
        }
        .ps-tap-hint { display: none; }
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
              <TapFlipCard
                proj={proj}
                dark={dark}
                accent={accent}
                accentAlt={accentAlt}
                text={text}
                textMuted={textMuted}
                tx={tx}
                onOpenDetails={() => setModalProj(proj)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ─── Modal de detalles ─── */}
      {modalProj && (
        <ProjectModal
          proj={modalProj}
          dark={dark}
          accent={accent}
          accentAlt={accentAlt}
          text={text}
          textMuted={textMuted}
          border={border}
          surface={surface}
          tx={tx}
          onClose={() => setModalProj(null)}
        />
      )}
    </section>
  );
}

/* ── Sub-componente para manejar tap en móvil ── */
function TapFlipCard({ proj, dark, accent, accentAlt, text, textMuted, tx, onOpenDetails }) {
  const [flipped, setFlipped] = useState(false);

  function techIconUrl(tech, dark) {
    const isBlack = tech.color === "#000000" || tech.color === "#181717";
    const isLight = ["#F7DF1E","#FCC624","#61DAFB","#4FC08D"].includes(tech.color);
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
          <div className="ps-badge"><span className="ps-dot" />{tx.projects.inProduction}</div>
          <div className="ps-hint"><i className="bi bi-arrow-repeat" style={{ fontSize: 11 }} />{tx.projects.hoverHint}</div>
          <div className="ps-tap-hint" style={{ position: "absolute", bottom: 11, right: 15, fontSize: "9.5px", fontFamily: "'Play', sans-serif", color: textMuted, letterSpacing: "0.05em", alignItems: "center", gap: 4, opacity: 0.5, pointerEvents: "none" }}>
            <i className="bi bi-hand-index" style={{ fontSize: 11 }} />{tx.projects.tapHint}
          </div>
        </div>

        {/* ═══ DORSO ═══ */}
        <div className="ps-face ps-back">
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accent, fontFamily: "'Play', sans-serif", marginBottom: 2 }}>{tx.projects.techStack}</p>
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

          {/* Fila de botones */}
          <div className="ps-btn-row" onClick={e => e.stopPropagation()}>
            <button
              className="ps-details-btn"
              onClick={(e) => { e.stopPropagation(); onOpenDetails(); }}
            >
              <i className="bi bi-layout-text-window-reverse" style={{ fontSize: 13 }} />
              {tx.projects.seeDetails}
            </button>
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
    </div>
  );
}
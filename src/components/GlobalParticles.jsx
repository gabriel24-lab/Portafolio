/**
 * GeminiBackground — Fondo estilo Gemini:
 *  • Base casi negra (#060816)
 *  • Resplandor radial azul-índigo centrado que "respira" suavemente
 *  • Un segundo orbe más pequeño desplazado para dar profundidad
 *  • Sin canvas, sin animación de scroll — solo CSS puro y keyframes inline
 */
export function GlobalParticles({ dark }) {
  return (
    <>
      <style>{`
        @keyframes glow-breathe {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 0.80; transform: scale(1.08); }
        }
        @keyframes glow-drift {
          0%, 100% { opacity: 0.30; transform: translate(0, 0) scale(1); }
          33%       { opacity: 0.45; transform: translate(30px, -20px) scale(1.05); }
          66%       { opacity: 0.25; transform: translate(-20px, 15px) scale(0.97); }
        }
      `}</style>

      {/* ── Capa de fondo opaca ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: dark
            ? "radial-gradient(ellipse at 50% 100%, #0a0e2a 0%, #060816 55%, #020409 100%)"
            : "radial-gradient(ellipse at 50% 100%, #e8eaf6 0%, #f0f4ff 55%, #ffffff 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Resplandor central principal (azul-índigo) ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Orbe central grande */}
        <div
          style={{
            position: "absolute",
            width: "min(900px, 130vw)",
            height: "min(700px, 100vh)",
            background: dark
              ? "radial-gradient(ellipse at center, rgba(63,94,251,0.38) 0%, rgba(70,60,220,0.18) 30%, rgba(30,27,120,0.06) 60%, transparent 75%)"
              : "radial-gradient(ellipse at center, rgba(99,102,241,0.22) 0%, rgba(129,140,248,0.10) 35%, transparent 65%)",
            borderRadius: "50%",
            animation: "glow-breathe 7s ease-in-out infinite",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Orbe secundario desplazado arriba-derecha */}
        <div
          style={{
            position: "absolute",
            width: "min(500px, 80vw)",
            height: "min(400px, 60vh)",
            background: dark
              ? "radial-gradient(ellipse at center, rgba(99,60,220,0.22) 0%, rgba(80,40,200,0.08) 45%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(165,180,252,0.18) 0%, transparent 65%)",
            borderRadius: "50%",
            animation: "glow-drift 11s ease-in-out infinite",
            top: "20%",
            left: "65%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Orbe terciario tenue abajo-izquierda */}
        <div
          style={{
            position: "absolute",
            width: "min(400px, 70vw)",
            height: "min(350px, 55vh)",
            background: dark
              ? "radial-gradient(ellipse at center, rgba(30,80,255,0.12) 0%, rgba(20,50,200,0.05) 50%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(196,181,253,0.14) 0%, transparent 65%)",
            borderRadius: "50%",
            animation: "glow-drift 14s ease-in-out infinite reverse",
            top: "75%",
            left: "25%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </>
  );
}

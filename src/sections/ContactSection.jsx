import { useState } from "react";
import { IcMail, IcLinkedIn, IcGitHub2, IcTwitter2, IcWhatsApp, IcLocation } from "../components/icons/SocialIcons";

export function ContactSection({ dark, accent, accentAlt, surface, surfaceAlt, border, text, textMuted, tx }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = true;
    if (form.message.trim().length < 10) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: SERVICE_ID, template_id: TEMPLATE_ID, user_id: PUBLIC_KEY, template_params: { from_name: form.name, from_email: form.email, message: form.message, to_email: "TU_CORREO@gmail.com" } }),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); } else throw new Error();
    } catch { setStatus("error"); }
    setTimeout(() => setStatus("idle"), 5000);
  }

  const inp = { background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: `1.5px solid ${border}`, borderRadius: 12, padding: "12px 14px", color: text, fontFamily: "'Play', sans-serif", fontSize: "clamp(13px,3vw,14px)", width: "100%", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box" };
  const contactLinks = [
    { icon: <IcMail />, label: tx.contact.email, href: "mailto:gabrielmejiasilva5@gmail.com", color: "#6c63ff" },
    { icon: <IcLinkedIn />, label: tx.contact.linkedin, href: "https://www.linkedin.com/in/gabriel-mejia-silva-36a3b4412/?skipRedirect=true", color: "#0A66C2" },
    { icon: <IcGitHub2 />, label: tx.contact.github, href: "https://github.com/gabriel24-lab", color: dark ? "#e0e0e0" : "#181717" },
    { icon: <IcWhatsApp />, label: "WhatsApp", href: "https://wa.me/573243112795?text=Hola%20Gabriel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo%20sobre%20un%20proyecto.", color: "#25D366" },
  ];
  const labelStyle = { fontSize: 12, fontWeight: 600, color: textMuted, marginBottom: 6, display: "block", fontFamily: "'Play', sans-serif", letterSpacing: 0.5 };

  return (
    <section id="contact" style={{ padding: "80px clamp(16px,6vw,140px)" }}>
      <style>{`
        .contact-input:focus { border-color: ${accent} !important; box-shadow: 0 0 0 3px ${accent}18 !important; }
        .contact-input.err { border-color: #ff6b6b !important; }
        .contact-link { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 14px; text-decoration: none; transition: all 0.22s; background: transparent; border: 1px solid transparent; }
        .contact-link:hover { background: ${dark ? "rgba(108,99,255,0.08)" : "rgba(108,99,255,0.06)"}; border-color: ${accent}25; transform: translateX(4px); }
        .contact-link .cl-icon { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.22s; }
        .contact-link:hover .cl-icon { transform: scale(1.08); }
        .contact-link .cl-label { font-size: clamp(12px,3vw,14px); font-weight: 600; font-family: 'Play', sans-serif; transition: color 0.2s; }
        .contact-link:hover .cl-label { color: ${accent}; }

        /* Layout responsive */
        .contact-grid { display: flex; gap: 40px; align-items: flex-start; }
        .contact-divider { width: 1px; align-self: stretch; background: linear-gradient(to bottom, transparent, ${border}, transparent); flex-shrink: 0; }
        .contact-links-col { flex: 0 0 auto; width: 100%; max-width: 300px; }
        .contact-form-col { flex: 1; min-width: 0; }

        /* 2-col form grid → 1-col on mobile */
        .form-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }

        @media(max-width:860px){
          .contact-grid { flex-direction: column !important; gap: 32px !important; }
          .contact-divider { display: none !important; }
          .contact-links-col { max-width: 100% !important; }
        }
        @media(max-width:480px){
          .form-2col { grid-template-columns: 1fr !important; }
          .contact-form-box { padding: 22px 16px !important; }
        }
      `}</style>

      {/* Header */}
      <div data-aos="fade-up" data-aos-duration="700">
        <p style={{ fontFamily: "'Play', sans-serif", fontSize: 12, color: accent, marginBottom: 12, letterSpacing: 2 }}>05. CONTACT</p>
        <h2 style={{ fontSize: "clamp(1rem,3.5vw,2rem)", fontWeight: 800, letterSpacing: "-0.01em", color: text, fontFamily: "'Press Start 2P', cursive", lineHeight: 1.4 }}>{tx.contact.title}</h2>
        <p style={{ color: textMuted, fontSize: "clamp(13px,2vw,15px)", marginTop: 8, marginBottom: 44 }}>{tx.contact.subtitle}</p>
      </div>

      <div className="contact-grid">

        {/* Links de contacto */}
        <div className="contact-links-col" data-aos="fade-right" data-aos-duration="800" data-aos-delay="150">
          <p style={{ fontSize: "clamp(12px,2vw,13px)", color: textMuted, lineHeight: 1.8, marginBottom: 28 }}>{tx.contact.leftDesc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {contactLinks.map((cl, i) => cl.href ? (
              <a
                key={i}
                href={cl.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay={200 + i * 80}
              >
                <div className="cl-icon" style={{ background: cl.color + "1a", color: cl.color }}>{cl.icon}</div>
                <span className="cl-label" style={{ color: text }}>{cl.label}</span>
              </a>
            ) : (
              <div key={i} className="contact-link" style={{ cursor: "default" }}>
                <div className="cl-icon" style={{ background: cl.color + "1a", color: cl.color }}>{cl.icon}</div>
                <span className="cl-label" style={{ color: textMuted }}>{cl.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-divider" />

        {/* Formulario */}
        <div
          className="contact-form-col"
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          <div className="contact-form-box" style={{ background: surface, border: `1px solid ${border}`, borderRadius: 22, padding: "32px 28px" }}>
            <h3 style={{ fontSize: "clamp(10px,2.5vw,13px)", fontWeight: 700, marginBottom: 4, color: text, fontFamily: "'Press Start 2P', cursive", lineHeight: 1.6 }}>{tx.contact.formTitle}</h3>
            <p style={{ fontSize: "clamp(12px,2vw,13px)", color: textMuted, marginBottom: 24 }}>{tx.contact.formSub}</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-2col">
                <div>
                  <label style={labelStyle}>{tx.contact.formName}</label>
                  <input className={`contact-input${errors.name ? " err" : ""}`} style={inp} type="text" placeholder="Tu nombre" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  {errors.name && <p style={{ fontSize: 11, color: "#ff6b6b", marginTop: 4 }}>Requerido</p>}
                </div>
                <div>
                  <label style={labelStyle}>{tx.contact.formEmail}</label>
                  <input className={`contact-input${errors.email ? " err" : ""}`} style={inp} type="email" placeholder="tu@correo.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  {errors.email && <p style={{ fontSize: 11, color: "#ff6b6b", marginTop: 4 }}>Correo inválido</p>}
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>{tx.contact.formMessage}</label>
                <textarea className={`contact-input${errors.message ? " err" : ""}`} style={{ ...inp, minHeight: 120, resize: "vertical", lineHeight: 1.7 }} placeholder="Cuéntame sobre tu proyecto..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                {errors.message && <p style={{ fontSize: 11, color: "#ff6b6b", marginTop: 4 }}>Mínimo 10 caracteres</p>}
              </div>
              <button type="submit" disabled={status === "sending"} style={{ width: "100%", padding: "14px", background: status === "success" ? "#00c896" : status === "error" ? "#ff6b6b" : accent, color: "#fff", border: "none", borderRadius: 12, fontFamily: "'Play', sans-serif", fontWeight: 700, fontSize: "clamp(13px,3vw,15px)", cursor: status === "sending" ? "not-allowed" : "pointer", transition: "all 0.3s", opacity: status === "sending" ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {status === "idle" && <>{tx.contact.formSend} <i className="bi bi-send" /></>}
                {status === "sending" && <><i className="bi bi-hourglass-split" /> {tx.contact.formSending}</>}
                {status === "success" && <><i className="bi bi-check-circle" /> {tx.contact.formSuccess}</>}
                {status === "error" && <><i className="bi bi-x-circle" /> {tx.contact.formError}</>}
              </button>
              <p style={{ fontSize: 11, color: textMuted, textAlign: "center", marginTop: 12, lineHeight: 1.6 }}><i className="bi bi-shield-lock" /> {tx.contact.formNote}</p>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

import {
  IconGitHub,
  IconLinkedIn,
  IconTwitter,
  IconInstagram,
  IconFacebook,
  IconCodepen,
} from "./icons/SocialIcons";

export function SocialSidebar({ dark, accent, textMuted, border }) {
  const socials = [
    { icon: <IconInstagram />, href: "https://www.instagram.com/gabrrlxz.dev/", label: "Instagram" },
    { icon: <IconLinkedIn />, href: "https://www.linkedin.com/in/gabriel-mejia-silva-36a3b4412/?skipRedirect=true", label: "LinkedIn" },
    { icon: <IconGitHub />, href: "https://github.com/gabriel24-lab", label: "GitHub" },
  ];

  return (
    <>
      <style>{`
        .social-sidebar { position: fixed; left: 20px; bottom: 0; z-index: 50; display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .social-sidebar::after { content: ''; display: block; width: 1.5px; height: 80px; background: linear-gradient(to bottom, ${accent}80, transparent); margin-top: 6px; }
        .social-icon-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 10px; background: ${dark ? "rgba(19,19,26,0.85)" : "rgba(255,255,255,0.85)"}; border: 1px solid ${border}; color: ${textMuted}; text-decoration: none; transition: all 0.22s cubic-bezier(.4,0,.2,1); backdrop-filter: blur(8px); }
        .social-icon-btn:hover { color: ${accent}; border-color: ${accent}60; background: ${dark ? "rgba(108,99,255,0.12)" : "rgba(108,99,255,0.08)"}; transform: translateY(-3px) scale(1.08); box-shadow: 0 6px 20px ${accent}25; }
        @media(max-width:900px){ .social-sidebar{ display: none; } }
      `}</style>
      <div className="social-sidebar">
        {socials.map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title={s.label}
            style={{ animationDelay: `${i * 0.07}s` }}>
            {s.icon}
          </a>
        ))}
      </div>
    </>
  );
}

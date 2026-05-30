import { useEffect, useRef } from "react";

const SNIPPETS = ["const", "function", "return", "import", "export", "async", "await", "class", "extends", "=>", "{", "}"];

export function ParticleCanvas({ dark, accent, accentAlt }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    let animId = null;
    const colors = [accent, accentAlt, "#888"];

    class Particle {
      constructor(init = true) { this.reset(init); }
      reset(init = false) {
        this.x = Math.random() * W; this.y = init ? Math.random() * H : H + 20; this.vy = -(0.2 + Math.random() * 0.5);
        this.vx = (Math.random() - 0.5) * 0.3; this.opacity = 0; this.targetOpacity = 0.3 + Math.random() * 0.5;
        this.size = 10 + Math.random() * 10; this.text = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
        this.color = colors[Math.floor(Math.random() * colors.length)]; this.life = 0; this.maxLife = 200 + Math.random() * 300;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.life++;
        if (this.life < 40) this.opacity = (this.life / 40) * this.targetOpacity;
        else if (this.life > this.maxLife - 40) this.opacity = ((this.maxLife - this.life) / 40) * this.targetOpacity;
        if (this.life >= this.maxLife || this.y < -30) this.reset();
      }
      draw() { ctx.save(); ctx.globalAlpha = this.opacity; ctx.font = `${this.size}px 'JetBrains Mono', monospace`; ctx.fillStyle = this.color; ctx.fillText(this.text, this.x, this.y); ctx.restore(); }
    }

    class Orb {
      constructor() { this.x = Math.random() * W; this.y = Math.random() * H; this.r = 60 + Math.random() * 120; this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4; this.hue = Math.random() > 0.5 ? accent : accentAlt; }
      update() { this.x += this.vx; this.y += this.vy; if (this.x < -this.r) this.x = W + this.r; if (this.x > W + this.r) this.x = -this.r; if (this.y < -this.r) this.y = H + this.r; if (this.y > H + this.r) this.y = -this.r; }
      draw() {
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        g.addColorStop(0, this.hue.replace(")", ",0.07)").replace("rgb", "rgba").replace("#6c63ff", "rgba(108,99,255,0.07)").replace("#00d4aa", "rgba(0,212,170,0.05)"));
        g.addColorStop(1, "transparent"); ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      }
    }

    let particles = [], orbs = [];
    function resize() { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W; canvas.height = H; particles = Array.from({ length: 55 }, () => new Particle()); orbs = Array.from({ length: 5 }, () => new Orb()); }
    function draw() { ctx.clearRect(0, 0, W, H); orbs.forEach(o => { o.update(); o.draw(); }); particles.forEach(p => { p.update(); p.draw(); }); animId = requestAnimationFrame(draw); }
    resize(); draw(); const ro = new ResizeObserver(resize); ro.observe(canvas); return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, [dark, accent, accentAlt]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

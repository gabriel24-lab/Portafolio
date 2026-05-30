import { useRef } from "react";
import { useIntersection } from "../hooks/useIntersection";

/**
 * AnimSection — wrapper que combina la animación propia (fade+slide)
 * con soporte completo para atributos data-aos de la librería AOS.
 *
 * Props:
 *   - aosAnim   : string  — animación AOS (e.g. "fade-up", "zoom-in", "flip-left")
 *   - aosDuration: number — ms que dura la animación (default: 800)
 *   - aosDelay  : number  — ms de delay antes de arrancar (default: 0)
 *   - aosEasing : string  — easing AOS (default: "ease-out-cubic")
 *   - aosOffset : number  — px antes de que el elemento active AOS
 *   - aosMirror : bool   — si la animación se repite al salir de la vista
 *   - delay     : number — delay en segundos para la anim CSS fallback
 */
export function AnimSection({
  children,
  className = "",
  style = {},
  // AOS props
  aosAnim = "fade-up",
  aosDuration = 800,
  aosDelay = 0,
  aosEasing = "ease-out-cubic",
  aosOffset = 80,
  aosMirror = true,
  // fallback CSS prop
  delay = 0,
}) {
  const ref = useRef(null);
  const visible = useIntersection(ref);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
      data-aos={aosAnim}
      data-aos-duration={aosDuration}
      data-aos-delay={aosDelay}
      data-aos-easing={aosEasing}
      data-aos-offset={aosOffset}
      data-aos-mirror={aosMirror}
    >
      {children}
    </div>
  );
}

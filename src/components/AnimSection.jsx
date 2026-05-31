import { useRef } from "react";
import { useIntersection } from "../hooks/useIntersection";

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

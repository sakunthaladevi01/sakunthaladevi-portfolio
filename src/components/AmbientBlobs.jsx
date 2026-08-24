import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AmbientBlobs() {
  const refs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          x: `random(-120, 120)`,
          y: `random(-90, 90)`,
          scale: `random(0.9, 1.25)`,
          duration: 10 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="ambient-blobs" aria-hidden="true">
      <div ref={(el) => (refs.current[0] = el)} className="blob blob--gold" />
      <div ref={(el) => (refs.current[1] = el)} className="blob blob--violet" />
      <div ref={(el) => (refs.current[2] = el)} className="blob blob--blue" />
    </div>
  );
}

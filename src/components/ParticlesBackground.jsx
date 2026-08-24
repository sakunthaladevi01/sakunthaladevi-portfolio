import { useEffect, useMemo, useRef, useState } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

let enginePromise = null;
function ensureEngine() {
  if (!enginePromise) enginePromise = loadSlim(tsParticles);
  return enginePromise;
}

export default function ParticlesBackground() {
  const containerRef = useRef(null);
  const [id] = useState(() => `tsparticles-${Math.random().toString(36).slice(2)}`);

  const options = useMemo(() => ({
    fullScreen: { enable: false },
    fpsLimit: 60,
    detectRetina: true,
    background: { color: "transparent" },
    particles: {
      number: { value: 46, density: { enable: true, area: 900 } },
      color: { value: ["#e8c468", "#a855f7", "#4cc9f0"] },
      shape: { type: "circle" },
      opacity: { value: { min: 0.15, max: 0.55 } },
      size: { value: { min: 0.6, max: 2.4 } },
      links: {
        enable: true,
        distance: 130,
        color: "#7c3aed",
        opacity: 0.14,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: { enable: true },
      },
      modes: {
        grab: { distance: 150, links: { opacity: 0.35 } },
      },
    },
  }), []);

  useEffect(() => {
    let container;
    let cancelled = false;
    ensureEngine().then(async () => {
      if (cancelled) return;
      container = await tsParticles.load({ id, element: containerRef.current, options });
      if (cancelled) container?.destroy();
    });
    return () => {
      cancelled = true;
      container?.destroy();
    };
  }, [id, options]);

  return <div id={id} ref={containerRef} className="particles-layer" />;
}

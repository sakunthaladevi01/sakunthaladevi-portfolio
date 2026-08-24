import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });
  const glowX = useSpring(x, { damping: 40, stiffness: 90 });
  const glowY = useSpring(y, { damping: 40, stiffness: 90 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const touchRef = useRef(false);

  useEffect(() => {
    const move = (e) => {
      if (touchRef.current) return;
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const overCheck = (e) => {
      const el = e.target.closest("a, button, .cursor-hover, input, textarea");
      setHovering(!!el);
    };
    const onTouch = () => { touchRef.current = true; setVisible(false); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", overCheck);
    window.addEventListener("touchstart", onTouch);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", overCheck);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [x, y, visible]);

  if (touchRef.current) return null;

  return (
    <div style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className="cursor-glow"
        style={{ translateX: glowX, translateY: glowY }}
      />
      <motion.div
        className="cursor-dot"
        style={{
          translateX: springX,
          translateY: springY,
          scale: hovering ? 2.4 : 1,
        }}
      />
    </div>
  );
}

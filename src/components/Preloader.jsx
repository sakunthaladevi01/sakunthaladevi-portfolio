import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setPct(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setLoading(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="preloader-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: pct / 100 }}
          />
          <div className="preloader-label">
            <span>SK</span>
            <span>{pct}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

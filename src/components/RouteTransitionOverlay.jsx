import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function RouteTransitionOverlay() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => setShow(false), 520);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={location.pathname}
          className="route-overlay"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  );
}

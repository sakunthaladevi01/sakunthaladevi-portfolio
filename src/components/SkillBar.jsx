import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function SkillBar({ name, level, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div className="skillbar" ref={ref}>
      <div className="skillbar-top">
        <span>{name}</span>
        <span className="skillbar-pct">{inView ? level : 0}%</span>
      </div>
      <div className="skillbar-track">
        <motion.div
          className="skillbar-fill"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
        />
      </div>
    </div>
  );
}

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      className="project-card glass-panel cursor-hover"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="project-card-glow" />
      <span className="project-card-cat">{project.category}</span>
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="project-actions">
        <a href={project.demo} className="btn btn-primary cursor-hover" style={{ padding: "0.6rem 1.1rem", fontSize: "0.75rem" }}>
          Live Demo <ExternalLink size={14} />
        </a>
        <a href={project.github} className="btn cursor-hover" style={{ padding: "0.6rem 1.1rem", fontSize: "0.75rem" }}>
          GitHub <GithubIcon size={14} />
        </a>
      </div>
    </motion.div>
  );
}

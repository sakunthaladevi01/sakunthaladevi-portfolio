import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/portfolioData";

export default function Projects() {
  const categories = useMemo(() => {
    const set = new Set(["All"]);
    projects.forEach((p) => set.add(p.category.split(" · ")[0]));
    return Array.from(set);
  }, []);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? projects
    : projects.filter((p) => p.category.startsWith(filter));

  return (
    <PageWrapper>
      <section className="section">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="eyebrow">Projects</div>
          <h2>Things I've <span className="gradient-text">built &amp; shipped.</span></h2>
          <p>A mix of full-stack, AI-powered and frontend projects — from idea to working demo.</p>
        </motion.div>

        <LayoutGroup>
          <div className="project-filters">
            {categories.map((c) => (
              <button
                key={c}
                className={`filter-chip cursor-hover ${filter === c ? "is-active" : ""}`}
                onClick={() => setFilter(c)}
              >
                {filter === c && <motion.span layoutId="filter-pill" className="filter-pill" />}
                <span className="filter-chip-label">{c}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </section>
    </PageWrapper>
  );
}

import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import SkillBar from "../components/SkillBar";
import Counter from "../components/Counter";
import { skills, skillCounters } from "../data/portfolioData";

export default function Skills() {
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
          <div className="eyebrow">Skills</div>
          <h2>Tools I reach for <span className="gradient-text">every day.</span></h2>
          <p>A practical toolkit spanning frontend, backend, database and developer tooling.</p>
        </motion.div>

        <div className="counters-row">
          {skillCounters.map((c, i) => (
            <motion.div
              key={c.label}
              className="glass counter-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Counter value={c.value} suffix={c.label === "Lines Committed" ? "+" : ""} />
              <span>{c.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="skills-grid">
          {Object.entries(skills).map(([category, list], gi) => (
            <motion.div
              key={category}
              className="glass-panel skills-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: gi * 0.06, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <h3>{category}</h3>
              <div className="skills-list">
                {list.map((s, i) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.08} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

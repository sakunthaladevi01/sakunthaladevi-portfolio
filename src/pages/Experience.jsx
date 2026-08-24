import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { experience } from "../data/portfolioData";

export default function Experience() {
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
          <div className="eyebrow">Experience</div>
          <h2>Where I've <span className="gradient-text">learned the craft.</span></h2>
          <p>Roles that shaped how I approach quality, process and problem-solving.</p>
        </motion.div>

        <div className="exp-timeline">
          <div className="exp-spine" />
          {experience.map((e, i) => (
            <motion.div
              key={e.role}
              className={`exp-row ${i % 2 === 0 ? "exp-row--left" : "exp-row--right"}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className="exp-node">
                <Briefcase size={15} />
              </div>
              <div className="glass-panel exp-card">
                <span className="exp-period">{e.period}</span>
                <h3>{e.role}</h3>
                <span className="exp-org">{e.org}</span>
                <div className="exp-tags">
                  {e.points.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

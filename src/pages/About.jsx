import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { about } from "../data/portfolioData";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  viewport: { once: true, amount: 0.3 },
};

export default function About() {
  return (
    <PageWrapper>
      <section className="section about">
        <motion.div className="section-head about-head" {...fadeUp}>
          <div className="eyebrow">About Me</div>
          <h2>Building for the web, <span className="gradient-text">one detail at a time</span></h2>
          <p>
            I'm a BCA graduate and entry-level Python full stack developer, passionate about
            building responsive web applications that feel fast, clear and considered.
          </p>
        </motion.div>

        <div className="about-grid">
          <div className="about-points">
            {about.points.map((p, i) => (
              <motion.div
                key={p}
                className="about-point cursor-hover"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <span className="about-point-dot" />
                {p}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="timeline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {about.timeline.map((t, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="timeline-dot" />
                <div className="timeline-phase">{t.phase}</div>
                <div className="timeline-body">
                  <h4>{t.title}</h4>
                  <span className="timeline-org">{t.org}</span>
                  <p>{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}

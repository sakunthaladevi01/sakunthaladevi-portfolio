import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { articles } from "../data/portfolioData";

export default function Articles() {
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
          <div className="eyebrow">Featured Articles</div>
          <h2>Notes from <span className="gradient-text">the build log.</span></h2>
          <p>Writing about what I learn while shipping — new posts landing soon.</p>
        </motion.div>

        <div className="articles-grid">
          {articles.map((a, i) => (
            <motion.div
              key={a.title}
              className="glass-panel article-card cursor-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="article-top">
                <span className="article-tag">{a.tag}</span>
                <ArrowUpRight size={16} />
              </div>
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <span className="article-date">{a.date}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

import { motion } from "framer-motion";
import { Code2, Trophy, Terminal, ExternalLink } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import { codingProfiles } from "../data/portfolioData";

const icons = { GitHub: GithubIcon, LeetCode: Code2, SkillRack: Terminal, HackerRank: Trophy, LinkedIn: LinkedinIcon };
const glowColor = { GitHub: "var(--gold)", LeetCode: "var(--violet)", SkillRack: "var(--blue)", HackerRank: "var(--gold)", LinkedIn: "var(--blue)" };

export default function CodingProfiles() {
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
          <div className="eyebrow">Coding Profiles</div>
          <h2>Find me <span className="gradient-text">across the web.</span></h2>
          <p>Code, contests and connections — all in one place.</p>
        </motion.div>

        <div className="profiles-grid">
          {codingProfiles.map((p, i) => {
            const Icon = icons[p.name] ?? ExternalLink;
            return (
              <motion.a
                key={p.name}
                href={p.url}
                className="profile-card cursor-hover"
                style={{ "--glow": glowColor[p.name] }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
              >
                <div className="profile-card-border" />
                <Icon size={26} className="profile-card-icon" />
                <h3>{p.name}</h3>
                <span>{p.handle}</span>
                <ExternalLink size={14} className="profile-card-arrow" />
              </motion.a>
            );
          })}
        </div>
      </section>
    </PageWrapper>
  );
}

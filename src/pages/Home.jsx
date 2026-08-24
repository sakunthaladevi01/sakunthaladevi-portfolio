import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FileDown,
  Mail,
  FolderGit2,
  Sparkles,
} from "lucide-react";

import PageWrapper from "../components/PageWrapper";
import HeroScene from "../components/3d/HeroScene";
import TypingRoles from "../components/TypingRoles";
import GsapHeroText from "../components/GsapHeroText";
import ErrorBoundary from "../components/ErrorBoundary";

import { profile, projects, experience } from "../data/portfolioData";

import resumePDF from "../assets/Sakunthaladevi_Resume.pdf";
import profilePhoto from "../assets/profile.jpeg";

const container = {
  animate: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const item = {
  initial: {
    opacity: 0,
    y: 28,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const nameParts = profile.name.split(" ");

const firstName = nameParts.slice(0, -1).join(" ");
const lastName = nameParts[nameParts.length - 1];

const heroStats = [
  {
    value: `${projects.length}+`,
    label: "Shipped Projects",
  },
  {
    value: `${experience.length}`,
    label: "Industry Roles",
  },
  {
    value: "BCA",
    label: "Graduate",
  },
];

const features = [
  {
    title: "Full stack, end to end",
    desc: "Django REST APIs, MySQL schemas and React interfaces built to work together.",
  },
  {
    title: "AI-powered products",
    desc: "Local LLM integration with Ollama for chatbots and support automation.",
  },
  {
    title: "Performance first",
    desc: "Responsive, accessible and fast — mobile-first layouts and 60fps motion.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageWrapper>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="hero">

        {/* 3D Background */}
        <ErrorBoundary>
          <HeroScene />
        </ErrorBoundary>

        {/* =================================================
            PROFILE PHOTO
        ================================================= */}
        <motion.div
          className="hero-photo-wrapper"
          initial={{
            opacity: 0,
            scale: 0.75,
            x: 50,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 1.1,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="hero-photo-glow"></div>

          <div className="hero-photo-ring hero-photo-ring-one"></div>
          <div className="hero-photo-ring hero-photo-ring-two"></div>

          <div className="hero-photo">
            <img
              src={profilePhoto}
              alt="Sakunthaladevi Krishnan"
            />
          </div>

          {/* Floating status */}
          <motion.div
            className="hero-photo-status"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="status-dot"></span>
            Available
          </motion.div>
        </motion.div>

        {/* =================================================
            HERO CONTENT
        ================================================= */}
        <motion.div
          className="hero-content"
          variants={container}
          initial="initial"
          animate="animate"
        >

          <motion.div
            variants={item}
            className="hero-badge"
          >
            <Sparkles size={13} />
            Open to Work
          </motion.div>

          <motion.div variants={item}>

            <GsapHeroText
              text={firstName}
              className="hero-name"
            />

            <h1 className="hero-name hero-name--accent gradient-text">
              {lastName}
            </h1>

          </motion.div>

          <motion.div
            variants={item}
            className="hero-role"
          >
            {profile.title}
          </motion.div>

          <motion.div
            variants={item}
            className="hero-typing"
          >
            <span className="hero-typing-prompt">
              &gt;_
            </span>

            <TypingRoles roles={profile.roles} />
          </motion.div>

          <motion.div
            variants={item}
            className="hero-actions"
          >

            <button
              className="btn btn-primary cursor-hover"
              onClick={() => navigate("/projects")}
            >
              View Projects
              <FolderGit2 size={16} />
            </button>

            <a
              className="btn cursor-hover"
              href={resumePDF}
              download
            >
              Download Resume
              <FileDown size={16} />
            </a>

            <button
              className="btn btn-ghost cursor-hover"
              onClick={() => navigate("/contact")}
            >
              Contact Me
              <Mail size={16} />
            </button>

          </motion.div>

          <motion.div
            variants={item}
            className="hero-stats"
          >
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="hero-stat"
              >
                <span className="hero-stat-value">
                  {s.value}
                </span>

                <span className="hero-stat-label">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="hero-scroll-cue"
          >
            <span className="hero-scroll-line" />
            Scroll to explore
          </motion.div>

        </motion.div>
      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}
      <section className="section features-section">

        <div className="features-grid">

          {features.map((f, i) => (

            <motion.div
              key={f.title}
              className="glass-panel feature-card"

              initial={{
                opacity: 0,
                y: 30,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}

              viewport={{
                once: true,
                amount: 0.4,
              }}
            >

              <h3>
                {f.title}
              </h3>

              <p>
                {f.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

    </PageWrapper>
  );
}
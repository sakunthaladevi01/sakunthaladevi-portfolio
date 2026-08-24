import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
} from "./BrandIcons";
import { profile, socials } from "../data/portfolioData";

const icons = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  Twitter: TwitterIcon,
};

const pages = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/resume", label: "Resume" },
  { to: "/coding-profiles", label: "Profiles" },
  { to: "/articles", label: "Articles" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-grid">

        {/* BRAND */}
        <div className="footer-brand">
          <h3>
            Let's build something{" "}
            <span className="gradient-text">worth shipping</span>
          </h3>

          <p>
            Python Full Stack Developer · open to entry-level and
            internship roles.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="footer-email cursor-hover"
          >
            <Mail size={14} />
            {profile.email}
          </a>
        </div>

        {/* PAGES */}
        <div className="footer-col footer-pages">
          <span className="footer-col-title">Pages</span>

          <div className="footer-pages-grid">

            {/* 5 ITEMS */}
            <ul>
              {pages.slice(0, 5).map((p) => (
                <li key={p.to}>
                  <a href={p.to} className="cursor-hover">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* 4 ITEMS */}
            <ul>
              {pages.slice(5).map((p) => (
                <li key={p.to}>
                  <a href={p.to} className="cursor-hover">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>

          </div>
        </div>

        {/* SOCIAL */}
        <div className="footer-col footer-social-col">
          <span className="footer-col-title">Social</span>

          <div className="footer-socials">
            {socials.map((s) => {
              const Icon = icons[s.name];

              return (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social cursor-hover"
                  whileHover={{
                    y: -6,
                    rotate: -6,
                    scale: 1.08,
                  }}
                  whileTap={{ scale: 0.94 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 12,
                  }}
                  aria-label={s.name}
                >
                  {Icon && <Icon size={16} />}
                </motion.a>
              );
            })}
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Sakunthaladevi Krishnan.
          All rights reserved.
        </span>

        <span>
          Crafted with React, Three.js, GSAP &amp; Framer Motion.
        </span>
      </div>

    </footer>
  );
}
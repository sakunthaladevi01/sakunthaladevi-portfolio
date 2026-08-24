
import { motion } from "framer-motion";
import { Download, Eye, FileText } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import resumePDF from "../assets/sakunthaladevi-krishnan.pdf";

export default function Resume() {
  const resumeDriveLink =
    "https://drive.google.com/file/d/1qkWP1yMRbNcPjH1jLxzK_RJyi-GPKwm1/view?usp=sharing";

  const resumeDownloadLink =
    "https://drive.google.com/uc?export=download&id=1qkWP1yMRbNcPjH1jLxzK_RJyi-GPKwm1";

  return (
    <PageWrapper>
      <section className="section resume-section">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="eyebrow">Resume</div>

          <h2>
            One page.{" "}
            <span className="gradient-text">
              Every detail that matters.
            </span>
          </h2>

          <p>
            A concise overview of my education, skills and experience —
            ready to view or download.
          </p>
        </motion.div>

        <div className="resume-layout">
          <motion.div
            className="resume-doc glass-panel"
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true, amount: 0.2 }}
            animate={{ y: [0, -10, 0] }}
          >
            <FileText size={38} className="resume-doc-icon" />

            <h3>Sakunthaladevi Krishnan</h3>

            <p>Python Full Stack Developer</p>

            <div className="resume-doc-lines">
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: `${70 - i * 5}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <div className="resume-actions">
            {/* View Resume */}
            <a
              className="btn btn-primary cursor-hover glow-hover"
              href={resumeDriveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume <Eye size={16} />
            </a>

            {/* Download Resume */}
            <a
              className="btn cursor-hover glow-hover"
              href={resumeDownloadLink}
            >
              Download Resume <Download size={16} />
            </a>

            <p className="resume-hint">
              View the resume online or download a PDF copy.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}


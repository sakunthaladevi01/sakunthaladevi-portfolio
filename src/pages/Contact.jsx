import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Send,
  Mail,
  MapPin,
  CheckCircle2,
  CalendarCheck,
  Zap,
  HandHeart,
  MessageCircle,
  Clock,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { InstagramIcon } from "../components/BrandIcons";
import { profile } from "../data/portfolioData";

const initial = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
};

const projectTypeOptions = [
  "Job Opportunity",
  "Internship",
  "Freelance Project",
  "Just Saying Hi",
];

const budgetOptions = [
  "Frontend Development",
  "Backend Development",
  "Full-Stack Development",
  "Freelance Work",
  "Software Development",
  "Hiring Opportunity",
  "Let's Discuss",
];

const highlights = [
  {
    icon: CalendarCheck,
    title: "Free Consultation",
    desc: "Discuss your project or role requirements at no cost.",
  },
  {
    icon: Zap,
    title: "Quick Response",
    desc: "I usually reply within 24 hours.",
  },
  {
    icon: HandHeart,
    title: "Open & Flexible",
    desc: "Available for internships, entry-level roles and freelance work.",
  },
];

const infoRows = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with me anytime",
    href: `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`,
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@sakunthaladevi.dev",
    href: "https://www.instagram.com/sktechservice",
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: null,
  },
  {
    icon: Clock,
    label: "Availability",
    value: profile.availability,
    href: null,
  },
];

function Field({
  label,
  name,
  value,
  onChange,
  error,
  textarea,
  half,
  select,
  options,
  required = false,
}) {
  const [focused, setFocused] = useState(false);

  const Comp = textarea ? "textarea" : select ? "select" : "input";

  return (
    <div
      className={`field ${half ? "field--half" : ""} ${
        focused || value ? "field--active" : ""
      } ${error ? "field--error" : ""} ${
        select ? "field--select" : ""
      }`}
    >
      <Comp
        name={name}
        value={value}
        rows={textarea ? 5 : undefined}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
      >
        {select && (
          <>
            <option value="" disabled hidden>
              Select
            </option>

            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </>
        )}
      </Comp>

      <label>{label}</label>

      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onChange = (e) => {
    setValues((v) => ({
      ...v,
      [e.target.name]: e.target.value,
    }));

    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!values.name.trim()) {
      errs.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errs.email = "Enter a valid email address.";
    }

    if (!values.phone.trim()) {
      errs.phone = "Please enter your phone number.";
    }

    if (!values.projectType) {
      errs.projectType = "Please select a project type.";
    }

    if (!values.budget) {
      errs.budget = "Please select a budget.";
    }

    if (!values.message.trim()) {
      errs.message = "Please enter your message.";
    } else if (values.message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters.";
    }

    if (!agreed) {
      errs.agreed = "Please confirm you're okay being contacted.";
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSending(true);
    setSent(false);
    setErrors({});

    // Read EmailJS configuration from .env
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check EmailJS configuration
    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS configuration is missing:", {
        serviceId: !!serviceId,
        templateId: !!templateId,
        publicKey: !!publicKey,
      });

      setErrors({
        submit:
          "Email service is not configured correctly. Please check your EmailJS environment variables.",
      });

      setSending(false);
      return;
    }

    try {
      const form = e.currentTarget;

      console.log("Sending email with EmailJS...");
      console.log("Service ID:", serviceId);
      console.log("Template ID:", templateId);

      const response = await emailjs.sendForm(
        serviceId,
        templateId,
        form,
        {
          publicKey,
        }
      );

      console.log(
        "EmailJS Success:",
        response.status,
        response.text
      );

      // Show success message
      setSent(true);

      // Reset form
      setValues(initial);
      setAgreed(false);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSent(false);
      }, 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      console.error("EmailJS Status:", error?.status);
      console.error("EmailJS Text:", error?.text);

      setErrors({
        submit:
          error?.text ||
          "Message could not be sent. Please try again or contact me directly by email.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <PageWrapper>
      {/* =========================
          INTRO / HIGHLIGHTS
      ========================== */}
      <section className="section contact-intro">
        <motion.div
          className="contact-intro-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div
            className="eyebrow"
            style={{ justifyContent: "center" }}
          >
            Contact
          </div>

          <h2>
            Let's build something{" "}
            <span className="gradient-text">
              worth shipping.
            </span>
          </h2>

          <p>
            Need a developer for your team, project or internship?
            Let's talk through what you're building and how I can
            help.
          </p>
        </motion.div>

        <div className="highlight-grid">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              className="glass-panel highlight-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <span className="highlight-icon">
                <h.icon size={18} />
              </span>

              <div>
                <h4>{h.title}</h4>
                <p>{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="contact-intro-actions"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a
            href="#contact-form"
            className="btn btn-primary cursor-hover"
          >
            <CalendarCheck size={16} />
            Book a Chat
          </a>

          <a
            href={`https://wa.me/${profile.whatsapp.replace(
              /\D/g,
              ""
            )}`}
            className="btn btn-whatsapp cursor-hover"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </motion.div>
      </section>

      {/* =========================
          CONTACT FORM SECTION
      ========================== */}
      <section
        className="section contact-section"
        id="contact-form"
      >
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="eyebrow">
            Let's Work Together
          </div>

          <h2>
            Have a project in mind?{" "}
            <span className="gradient-text">
              I'd love to hear about it.
            </span>
          </h2>

          <p>
            Open to entry-level roles, freelance projects, and
            collaborations.
          </p>
        </motion.div>

        <div className="contact-layout">
          {/* =========================
              CONTACT INFORMATION
          ========================== */}
          <motion.div
            className="contact-info-list"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="info-row info-row--profile">
              <span className="info-avatar">
                SK
              </span>

              <div>
                <h4>{profile.name}</h4>
                <span>{profile.title}</span>
              </div>
            </div>

            {infoRows.map((row) => {
              const Comp = row.href ? "a" : "div";

              return (
                <Comp
                  key={row.label}
                  {...(row.href
                    ? {
                        href: row.href,
                        target: row.href.startsWith("mailto:")
                          ? undefined
                          : "_blank",
                        rel: row.href.startsWith("mailto:")
                          ? undefined
                          : "noreferrer",
                      }
                    : {})}
                  className="info-row cursor-hover"
                >
                  <span className="info-icon">
                    <row.icon size={16} />
                  </span>

                  <div>
                    <h4>{row.label}</h4>
                    <span>{row.value}</span>
                  </div>
                </Comp>
              );
            })}
          </motion.div>

          {/* =========================
              CONTACT FORM
          ========================== */}
          <motion.form
            className="glass-panel contact-form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Full Name */}
            <Field
              label="Full Name"
              name="name"
              value={values.name}
              onChange={onChange}
              error={errors.name}
              required
            />

            {/* Email + Phone */}
            <div className="field-row">
              <Field
                label="Email Address"
                name="email"
                value={values.email}
                onChange={onChange}
                error={errors.email}
                half
                required
              />

              <Field
                label="Phone Number"
                name="phone"
                value={values.phone}
                onChange={onChange}
                error={errors.phone}
                half
                required
              />
            </div>

            {/* Project Type + Budget */}
            <div className="field-row">
              <Field
                label="Project Type"
                name="projectType"
                value={values.projectType}
                onChange={onChange}
                error={errors.projectType}
                half
                select
                options={projectTypeOptions}
                required
              />

              <Field
                label="Budget"
                name="budget"
                value={values.budget}
                onChange={onChange}
                error={errors.budget}
                half
                select
                options={budgetOptions}
                required
              />
            </div>

            {/* Message */}
            <Field
              label="Message"
              name="message"
              value={values.message}
              onChange={onChange}
              error={errors.message}
              textarea
              required
            />

            {/* Consent */}
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);

                  if (errors.agreed) {
                    setErrors((prev) => ({
                      ...prev,
                      agreed: "",
                    }));
                  }
                }}
              />

              <span>
                I agree to be contacted regarding my project.
              </span>
            </label>

            {errors.agreed && (
              <span className="field-error">
                {errors.agreed}
              </span>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <motion.div
                className="form-error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.submit}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="btn btn-primary cursor-hover"
              disabled={sending}
              whileTap={{ scale: 0.97 }}
            >
              {sending ? (
                <>
                  Sending...
                  <span className="button-spinner" />
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} />
                </>
              )}
            </motion.button>

            {/* Trust Information */}
            <div className="form-trust">
              <span>
                <span className="dot" />
                Response time: usually within 24 hours
              </span>

              <span>
                <CheckCircle2 size={13} />
                Free consultation available
              </span>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {sent && (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <CheckCircle2 size={16} />
                  Message sent successfully — thank you!
                  I'll reply soon.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </section>
    </PageWrapper>
  );
}

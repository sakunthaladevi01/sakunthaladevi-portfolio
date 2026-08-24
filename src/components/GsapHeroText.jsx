import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GsapHeroText({ text, className, tag = "h1" }) {
  const ref = useRef(null);
  const Tag = tag;

  useEffect(() => {
    if (!ref.current) return;
    const letters = ref.current.querySelectorAll(".gsap-letter");
    gsap.fromTo(
      letters,
      { yPercent: 120, opacity: 0, rotateZ: 6 },
      {
        yPercent: 0, opacity: 1, rotateZ: 0,
        duration: 0.9, ease: "power4.out",
        stagger: 0.028, delay: 0.15,
      }
    );
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span className="gsap-word" key={wi}>
          {word.split("").map((ch, i) => (
            <span className="gsap-letter-wrap" key={i}>
              <span className="gsap-letter">{ch}</span>
            </span>
          ))}
          {wi < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

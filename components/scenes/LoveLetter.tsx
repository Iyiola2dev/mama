"use client";

import { motion } from "framer-motion";

interface LoveLetterProps {
  onNext: () => void;
}

const LINES = [
  "From the very first moment I saw you,",
  "I knew there was something special about you.",
  "You make ordinary days feel magical.",
  "Every laugh we share, every moment together —",
  "I treasure all of it.",
  "You are kind, beautiful, and endlessly wonderful.",
  "And I want you to know...",
  "I don't take a single second with you for granted.",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.5,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

// 30 twinkling dots — deterministic positions
const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${(i * 31) % 100}%`,
  left: `${(i * 47 + 13) % 100}%`,
  size: `${2 + (i % 3)}px`,
  delay: `${(i * 0.3) % 4}s`,
  duration: `${1.5 + (i % 2)}s`,
}));

export default function LoveLetter({ onNext }: LoveLetterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(160deg, #3d0020 0%, #8B0037 45%, #FFB6C1 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        padding: "2rem",
        overflowY: "auto",
      }}
    >
      {/* Twinkling stars */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {STARS.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "white",
              animationDuration: s.duration,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Letter container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            variants={lineVariants}
            className="font-dancing"
            style={{
              fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
              color: "#FFF5E6",
              marginBottom: "0.6rem",
              lineHeight: 1.6,
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            {line}
          </motion.p>
        ))}

        {/* Next button — delayed past all 8 lines: 0.5 + 7×0.4 + 0.7 ≈ 4.0s, button at 4.5s */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 0.7, ease: "easeOut" }}
          onClick={onNext}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="font-inter"
          style={{
            marginTop: "2.5rem",
            background: "rgba(255,255,255,0.15)",
            border: "2px solid rgba(255,245,230,0.6)",
            color: "#FFF5E6",
            borderRadius: "9999px",
            padding: "0.75rem 2.2rem",
            fontSize: "1rem",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            letterSpacing: "0.05em",
          }}
        >
          Next →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

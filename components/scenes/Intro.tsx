"use client";

import { motion } from "framer-motion";

interface IntroProps {
  onContinue: () => void;
}

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: "easeOut" as const },
});

export default function Intro({ onContinue }: IntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "absolute",
        inset: 0,
        background: "#0a0a1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {/* Pulsing heart */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: "3.5rem", marginBottom: "2rem" }}
        aria-hidden="true"
      >
        💗
      </motion.div>

      {/* "Pearl..." */}
      <motion.h1
        {...fadeIn(0.3)}
        className="font-dancing"
        style={{
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          color: "#FFB6C1",
          marginBottom: "1rem",
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        Pearl...
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        {...fadeIn(1.8)}
        className="font-inter"
        style={{
          fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)",
          color: "rgba(255,245,230,0.75)",
          maxWidth: "480px",
          lineHeight: 1.7,
          marginBottom: "3rem",
        }}
      >
        Before anything else... I want to do this properly.
      </motion.p>

      {/* Continue button — appears at ~4s */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 4, ease: "easeOut" }}
        onClick={onContinue}
        className="glow-button font-inter"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        style={{
          background: "transparent",
          border: "2px solid #FFD700",
          color: "#FFD700",
          borderRadius: "9999px",
          padding: "0.75rem 2.2rem",
          fontSize: "1rem",
          cursor: "pointer",
          letterSpacing: "0.06em",
        }}
      >
        Continue →
      </motion.button>
    </motion.div>
  );
}

"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const HEARTS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${8 + i * 11}%`,
  fontSize: `${1.5 + (i % 3) * 0.5}rem`,
  delay: `${i * 0.4}s`,
  duration: `${3.5 + (i % 2)}s`,
}));

function playCelebrationChime() {
  try {
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.18);

      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.18);
      gain.gain.linearRampToValueAtTime(
        0.3,
        ctx.currentTime + i * 0.18 + 0.05
      );
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + i * 0.18 + 0.5
      );

      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 0.6);
    });

    setTimeout(() => ctx.close(), 1500);
  } catch {
    // AudioContext may be blocked in some environments
  }
}

const textVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Celebration() {
  useEffect(() => {
    import("canvas-confetti").then(({ default: confetti }) => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#FFB6C1", "#8B0037", "#FFF5E6", "#FF69B4"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5, x: 0.3 },
          colors: ["#FFD700", "#FF69B4", "#FFF5E6"],
        });
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5, x: 0.7 },
          colors: ["#FFD700", "#FFB6C1", "#FFF5E6"],
        });
      }, 500);
    });

    playCelebrationChime();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(160deg, #3d0020 0%, #8B0037 35%, #FFD700 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        padding: "2rem",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Rising hearts */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {HEARTS.map((h) => (
          <div
            key={h.id}
            className="rising-heart"
            style={{
              position: "absolute",
              bottom: "-2rem",
              left: h.left,
              fontSize: h.fontSize,
              animationDuration: h.duration,
              animationDelay: h.delay,
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* Text sequence */}
      <div
        style={{ position: "relative", zIndex: 1, maxWidth: "560px" }}
      >
        <motion.h1
          custom={0.2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-dancing"
          style={{
            fontSize: "clamp(3rem, 10vw, 5rem)",
            color: "#FFD700",
            marginBottom: "0.5rem",
            fontWeight: 700,
            textShadow: "0 2px 20px rgba(255,215,0,0.6)",
          }}
        >
          Yayyyy! 🎉
        </motion.h1>

        <motion.h2
          custom={1.0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-dancing glow-text"
          style={{
            fontSize: "clamp(2rem, 7vw, 3.5rem)",
            color: "#FFB6C1",
            marginBottom: "1.5rem",
            fontWeight: 600,
          }}
        >
          She said YES!
        </motion.h2>

        <motion.p
          custom={2.0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-dancing"
          style={{
            fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
            color: "#FFF5E6",
            marginBottom: "1rem",
            lineHeight: 1.5,
          }}
        >
          I&apos;m the luckiest person alive, Pearl. 💖
        </motion.p>

        <motion.p
          custom={3.0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-inter"
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
            color: "rgba(255,245,230,0.85)",
            lineHeight: 1.7,
            maxWidth: "420px",
            margin: "0 auto",
          }}
        >
          Thank you for saying yes. I promise to always make you smile.
        </motion.p>
      </div>
    </motion.div>
  );
}

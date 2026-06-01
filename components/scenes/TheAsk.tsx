"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TheAskProps {
  onYes: () => void;
}

const fadeAt = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: "easeOut" as const },
});

export default function TheAsk({ onYes }: TheAskProps) {
  const [maybeCount, setMaybeCount] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  function handleMaybe() {
    setMaybeCount((c) => c + 1);
    setAnimKey((k) => k + 1);
  }

  const cheekyMessage =
    maybeCount === 1
      ? "I'll ask again... 😄"
      : maybeCount === 2
      ? "Pretty please? 🥺"
      : "I'm not giving up! 💪😄";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(160deg, #FFB6C1 0%, #FFD700 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ maxWidth: "560px", width: "100%" }}
        >
          {/* Cheeky retry message */}
          {maybeCount > 0 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="font-inter"
              style={{
                fontSize: "1rem",
                color: "#8B0037",
                marginBottom: "1.5rem",
                fontStyle: "italic",
              }}
            >
              {cheekyMessage}
            </motion.p>
          )}

          {/* t=0 */}
          <motion.p
            {...fadeAt(0)}
            className="font-inter"
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              fontWeight: 700,
              color: "#3d0020",
              marginBottom: "1.2rem",
            }}
          >
            I want to ask you out... properly.
          </motion.p>

          {/* t=2s */}
          <motion.p
            {...fadeAt(2)}
            className="font-dancing"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              color: "#6b0030",
              marginBottom: "0.5rem",
            }}
          >
            So Pearl...
          </motion.p>

          {/* t=3.5s — the big question */}
          <motion.p
            {...fadeAt(3.5)}
            className="font-dancing glow-text"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: "#8B0037",
              fontWeight: 700,
              marginBottom: "2rem",
              lineHeight: 1.2,
            }}
          >
            Will you be my girlfriend? 💕
          </motion.p>

          {/* Buttons — t=4.5s */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 0.6, ease: "easeOut" }}
            style={{
              display: "flex",
              gap: "1.2rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.button
              onClick={onYes}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="font-inter"
              style={{
                background: "#FFD700",
                color: "#8B0037",
                border: "none",
                borderRadius: "9999px",
                padding: "0.85rem 2.5rem",
                fontSize: "1.1rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(255,215,0,0.5)",
              }}
            >
              Yes! 💖
            </motion.button>

            <motion.button
              onClick={handleMaybe}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-inter"
              style={{
                background: "rgba(139,0,55,0.12)",
                color: "#8B0037",
                border: "2px solid #8B0037",
                borderRadius: "9999px",
                padding: "0.65rem 1.8rem",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Maybe... 😊
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

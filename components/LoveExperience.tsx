"use client";

import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import AudioPlayer, { AudioPlayerHandle } from "./AudioPlayer";
import FloatingPetals from "./FloatingPetals";
import Intro from "./scenes/Intro";
import LoveLetter from "./scenes/LoveLetter";
import TheAsk from "./scenes/TheAsk";
import Celebration from "./scenes/Celebration";

export type Scene = 0 | 1 | 2 | 3;

export default function LoveExperience() {
  const [scene, setScene] = useState<Scene>(0);
  const audioRef = useRef<AudioPlayerHandle>(null);

  function handleContinue() {
    audioRef.current?.unmute();
    setScene(1);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      <AudioPlayer ref={audioRef} />
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {scene === 0 && <Intro key="intro" onContinue={handleContinue} />}
        {scene === 1 && (
          <LoveLetter key="letter" onNext={() => setScene(2)} />
        )}
        {scene === 2 && (
          <TheAsk key="ask" onYes={() => setScene(3)} />
        )}
        {scene === 3 && <Celebration key="celebration" />}
      </AnimatePresence>
    </div>
  );
}

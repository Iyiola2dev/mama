"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const YT_VIDEO_ID = "AXnqkVTFUqY";
const TRACK_LABEL = "All Time Low — Jon Bellion";

export interface AudioPlayerHandle {
  unmute: () => void;
}

const AudioPlayer = forwardRef<AudioPlayerHandle>((_, ref) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  function postToPlayer(message: object) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify(message),
      "*"
    );
  }

  useImperativeHandle(ref, () => ({
    unmute() {
      postToPlayer({ event: "command", func: "unMute", args: [] });
      postToPlayer({ event: "command", func: "setVolume", args: [80] });
      setIsMuted(false);
    },
  }));

  function toggleMute() {
    if (isMuted) {
      postToPlayer({ event: "command", func: "unMute", args: [] });
      postToPlayer({ event: "command", func: "setVolume", args: [80] });
      setIsMuted(false);
    } else {
      postToPlayer({ event: "command", func: "mute", args: [] });
      setIsMuted(true);
    }
  }

  const iframeSrc =
    `https://www.youtube-nocookie.com/embed/${YT_VIDEO_ID}` +
    `?autoplay=1&mute=1&loop=1&playlist=${YT_VIDEO_ID}` +
    `&enablejsapi=1&controls=0&disablekb=1&fs=0&iv_load_policy=3`;

  return (
    <>
      {/* Hidden iframe — off-screen, NOT display:none */}
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        title="background music"
        allow="autoplay; encrypted-media"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: 1,
          height: 1,
          border: "none",
          pointerEvents: "none",
        }}
      />

      {/* Mute toggle — top right */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 9999,
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "9999px",
          width: "2.5rem",
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "1.1rem",
          backdropFilter: "blur(6px)",
          transition: "transform 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isMuted ? "🔇" : "🎵"}
      </button>

      {/* Track label — bottom left (shown when unmuted) */}
      {!isMuted && (
        <div
          style={{
            position: "fixed",
            bottom: "1rem",
            left: "1rem",
            zIndex: 9999,
            background: "rgba(0,0,0,0.5)",
            color: "rgba(255,255,255,0.8)",
            borderRadius: "9999px",
            padding: "0.35rem 0.9rem",
            fontSize: "0.7rem",
            letterSpacing: "0.03em",
            backdropFilter: "blur(6px)",
            whiteSpace: "nowrap",
          }}
        >
          🎵 Playing: {TRACK_LABEL}
        </div>
      )}
    </>
  );
});

AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;

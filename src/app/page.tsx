"use client";

import { ConnectBtn } from "@/app/components/connectButton";
import QuizBubbles from "@/app/components/quizBubbles";

import React, { useEffect, useState } from "react";

const TypewriterTitle: React.FC<{ text: string; onDone?: () => void }> = ({ text, onDone }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < text.length) {
      const timeout = setTimeout(() => setVisibleCount(visibleCount + 1), 60);
      return () => clearTimeout(timeout);
    } else if (onDone) {
      onDone();
    }
  }, [visibleCount, text, onDone]);

  return (
    <h1 className="text-6xl md:text-7xl font-thin text-white drop-shadow-2xl mb-4 text-center tracking-tight select-none">
      {text.slice(0, visibleCount).split("").map((char, i) => (
        <span key={i} className="inline-block animate-fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

export default function Home() {
  const [showLogo, setShowLogo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <p className="text-lg font-semibold">Mobile not supported currently</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <TypewriterTitle text="LayerZero Dungeon" onDone={() => setShowLogo(true)}/>
      <img
  src="/lz_logo.png"
  alt="LayerZero Logo"
  className={`mx-auto mb-1 mt-2 shadow-lg rounded-full border-2 border-white transition-all duration-700
    ${showLogo ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
  `}
  style={{ width: "125px", height: "125px", background: "white" }}
/>
      {/*<ConnectBtn />*/}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <QuizBubbles />
      </div>
    </main>
  );
}
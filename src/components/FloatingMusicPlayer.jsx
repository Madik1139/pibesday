import React, { useState, useEffect } from "react";
import { Disc3, Play, Pause, ArrowUp } from "lucide-react";

export default function FloatingMusicPlayer({ isPlaying, onToggle }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none flex items-center gap-2">
      {/* Tombol Back to Top Halus */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#3A2318]/90 text-amber-100 backdrop-blur-md shadow-xl border border-[#D4A373]/60 hover:bg-[#4A2E1B] active:scale-95 transition-all flex items-center justify-center cursor-pointer animate-[fadeIn_0.3s_ease-out]"
          title="Kembali ke Atas"
          aria-label="Kembali ke Atas"
        >
          <ArrowUp className="w-4 h-4 text-amber-300" />
        </button>
      )}

      {/* Kontrol Musik Minimalis Bulat (Tanpa Teks) */}
      <button
        onClick={onToggle}
        className={`w-11 h-11 rounded-full bg-[#3A2318]/90 text-amber-100 backdrop-blur-md shadow-xl border border-[#D4A373]/60 hover:bg-[#4A2E1B] active:scale-95 transition-all flex items-center justify-center cursor-pointer relative ${
          isPlaying ? "shadow-[0_0_15px_rgba(212,163,115,0.4)] border-amber-300" : ""
        }`}
        title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
      >
        <Disc3
          className={`w-5 h-5 text-amber-300 ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "3s" }}
        />
        {/* Indikator Status Kecil */}
        <span
          className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#2C1810] flex items-center justify-center ${
            isPlaying ? "bg-emerald-500" : "bg-amber-600/80"
          }`}
        >
          {isPlaying ? (
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          ) : (
            <Play className="w-1.5 h-1.5 text-white fill-white translate-x-[0.5px]" />
          )}
        </span>
      </button>
    </div>
  );
}

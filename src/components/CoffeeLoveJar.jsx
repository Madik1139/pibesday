import React, { useState } from "react";
import { loveJarNotes } from "../data/coffeeContent";
import { Sparkles, Heart, RefreshCw, Mail, Coffee } from "lucide-react";
import confetti from "canvas-confetti";
import { playSparkleSound } from "../utils/audio";

export default function CoffeeLoveJar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnCount, setDrawnCount] = useState(1);

  const activeNote = loveJarNotes[currentIndex];

  const handleDrawNote = () => {
    if (isDrawing) return;
    setIsDrawing(true);

    // Audio feedback jika audio sudah diinisialisasi
    try {
      playSparkleSound();
    } catch {
      // safe fallback
    }

    // Animasi kocok toples & confetti mikro
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 },
      colors: ["#C48B47", "#D4A373", "#FAF0CA", "#8C5E28"],
    });

    setTimeout(() => {
      // Ambil indeks acak selain yang sekarang
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * loveJarNotes.length);
      } while (nextIndex === currentIndex && loveJarNotes.length > 1);

      setCurrentIndex(nextIndex);
      setDrawnCount((prev) => prev + 1);
      setIsDrawing(false);
    }, 400);
  };

  return (
    <div className="w-full">
      {/* Header Section sesuai AGENTS.md */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/40 text-[#8C5E28] text-[11px] font-semibold tracking-wider uppercase mb-2">
          <Coffee className="w-3.5 h-3.5 text-[#8C5E28]" />
          <span>Special Daily Brew</span>
        </div>
        <h2 className="font-serif-title text-[24px] sm:text-[30px] font-semibold text-[#2C1810] tracking-tight">
          Toples Pesan Cinta & Kehangatan
        </h2>
        <p className="text-[13px] sm:text-[15px] text-[#6F4E37] max-w-xl mx-auto mt-1 leading-relaxed">
          Setiap hari punya rasa manisnya sendiri. Ketuk toples di bawah ini untuk mengambil satu racikan kata cinta spesial untukmu.
        </p>
      </div>

      {/* Main Container Card Glassmorphism */}
      <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-amber-200/70 rounded-3xl p-6 sm:p-10 md:p-12 pb-8 sm:pb-10 md:pb-12 shadow-[0_12px_40px_-8px_rgba(44,24,16,0.1)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Visual Toples Interaktif (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div
              onClick={handleDrawNote}
              role="button"
              tabIndex={0}
              title="Klik toples untuk mengundi pesan!"
              className={`relative w-48 h-64 sm:w-56 sm:h-68 bg-gradient-to-b from-white/90 via-amber-50/60 to-amber-100/50 backdrop-blur-lg rounded-[32px] border-2 border-amber-200/70 shadow-[0_12px_36px_rgba(44,24,16,0.08)] p-3.5 flex flex-col items-center justify-between cursor-pointer group transition-all duration-300 ${
                isDrawing ? "scale-95 rotate-2" : "hover:scale-[1.02] hover:-translate-y-1"
              }`}
            >
              {/* Tutup Toples Kopi Kayu */}
              <div className="w-28 h-5.5 bg-gradient-to-r from-[#6F4E37] via-[#8C5E28] to-[#5A3825] rounded-t-xl shadow-md flex items-center justify-center -mt-2 border-b border-amber-900/40">
                <div className="w-14 h-1 bg-amber-200/40 rounded-full"></div>
              </div>

              {/* Tali Pita Amber di Leher Toples */}
              <div className="w-20 h-1.5 bg-[#C48B47] rounded-full shadow-xs -mt-1 opacity-80"></div>

              {/* Animasi Catatan Cinta Terapung di Dalam Toples */}
              <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
                {/* Floating Note 1 */}
                <div className="absolute w-10 h-10 rounded-xl bg-amber-100/90 border border-amber-300/50 shadow-sm rotate-12 flex items-center justify-center text-[#8C5E28] top-1 left-4 group-hover:rotate-6 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                {/* Floating Note 2 */}
                <div className="absolute w-11 h-11 rounded-xl bg-rose-100/90 border border-rose-300/50 shadow-sm -rotate-8 flex items-center justify-center text-rose-500 top-8 right-3 group-hover:-rotate-12 transition-transform animate-pulse">
                  <Heart className="w-4 h-4 fill-rose-500/20" />
                </div>
                {/* Floating Note 3 */}
                <div className="absolute w-9 h-9 rounded-xl bg-amber-200/80 border border-amber-400/40 shadow-sm rotate-45 flex items-center justify-center text-[#6F4E37] bottom-2 left-6 group-hover:rotate-30 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                </div>

                {/* Aura Glow */}
                <div className="w-20 h-20 rounded-full bg-amber-300/20 blur-xl pointer-events-none"></div>
              </div>

              {/* Label Dasar Toples */}
              <div className="w-full text-center pb-1">
                <span className="text-[10px] tracking-widest text-[#8C5E28] font-bold uppercase">
                  Toples Kasih Evina
                </span>
                <p className="text-[9px] text-[#A78A7F]">Ketuk toples untuk buka</p>
              </div>
            </div>

            {/* Tombol Taktil Ambil Pesan */}
            <button
              onClick={handleDrawNote}
              disabled={isDrawing}
              type="button"
              className="mt-4 min-h-[44px] px-6 py-2 rounded-full bg-gradient-to-r from-[#8C5E28] to-[#C48B47] text-white font-sans font-semibold text-[13px] shadow-[0_4px_16px_rgba(140,94,40,0.25)] hover:shadow-[0_6px_20px_rgba(140,94,40,0.35)] active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDrawing ? "animate-spin" : ""}`} />
              <span>Ambil 1 Pesan Manis</span>
            </button>
          </div>

          {/* Kolom Kanan: Tampilan Kartu Pesan yang Diambil (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 text-[#8C5E28] font-sans font-semibold text-[13px] mb-2 tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Pesan Pilihan Semesta Hari Ini</span>
            </div>

            {/* Kotak Pesan yang Terbuka */}
            <div
              className={`bg-white/95 rounded-2xl p-5 md:p-6 border border-amber-200/60 shadow-[0_4px_20px_rgba(44,24,16,0.06)] min-h-[200px] flex flex-col justify-between transition-all duration-300 ${
                isDrawing ? "opacity-40 scale-98" : "opacity-100 scale-100"
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-[#8C5E28] text-[11px] font-bold tracking-wider uppercase">
                    {activeNote.badge} • {activeNote.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#A78A7F] shrink-0">
                    <span>Diundi #{drawnCount} kali</span>
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  </div>
                </div>

                <p className="font-serif-title text-[18px] md:text-[21px] text-[#2C1810] italic leading-relaxed my-2">
                  "{activeNote.quote}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-100 flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#8C5E28]">
                <span className="font-medium">Ditulis dari lubuk hati Dika</span>
                <span className="italic text-[#A78A7F]">Edisi Ultah ke-25</span>
              </div>
            </div>

            <p className="text-[12px] text-[#A78A7F] text-center lg:text-left mt-3">
              💡 Toples ini bisa kamu kocok kapan pun kamu butuh suntikan semangat dan pelukan hangat!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

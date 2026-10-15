import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { coffeeLetter } from "../data/coffeeContent";
import { playSealCrackSound, playSparkleSound } from "../utils/audio";
import confetti from "canvas-confetti";
import { Scroll, Coffee, Heart, MailOpen, Sparkles, Feather } from "lucide-react";

export default function CoffeePostcard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSealing, setIsSealing] = useState(false);

  const handleOpenSeal = () => {
    if (isOpen || isSealing) return;
    setIsSealing(true);
    playSealCrackSound();

    // Efek retakan confetti wax emas & amber
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#C48B47", "#D4A373", "#FAF0CA", "#8C5E28"],
    });

    setTimeout(() => {
      setIsOpen(true);
      setIsSealing(false);
      playSparkleSound();

      confetti({
        particleCount: 50,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#C48B47", "#FAF7F2", "#E6CCB2", "#FB7185"],
      });
    }, 450);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Kartu Pos Bergaya Vintage Parchment */}
      <div className="bg-[#FFFDF9] border-2 border-amber-200/80 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_12px_45px_-8px_rgba(44,24,16,0.12)] relative overflow-hidden transition-all duration-500">
        {/* Ornamen Sudut Pita Vintage Kertas */}
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
          <div className="absolute transform rotate-45 bg-gradient-to-r from-amber-200/70 to-amber-300/80 text-[#8C5E28] font-mono text-[9px] font-bold py-1 right-[-35px] top-[18px] w-[120px] text-center shadow-xs">
            CHAPTER 25
          </div>
        </div>

        {/* Header Postcard dengan Cap Pos & Detail Rute */}
        <div className="border-b-2 border-amber-200/60 pb-5 mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100/80 text-[#8C5E28]">
                <Scroll className="w-4 h-4 text-[#8C5E28]" />
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#8C5E28] font-bold font-mono">
                Surat Spesial Bab ke-25
              </span>
            </div>
            <h3 className="font-serif-title text-[24px] sm:text-[28px] font-bold text-[#2C1810] mt-1.5">
              Untuk Evina Dini Anjriani
            </h3>
            <p className="text-[12px] text-[#6F4E37] font-mono mt-0.5 flex items-center gap-1.5">
              <span>📍 Bandung ⇄ Bekasi</span>
              <span>•</span>
              <span>{coffeeLetter.date}</span>
            </p>
          </div>

          {/* Stempel Pos Bergaya Klasik Ekspedisi Cinta */}
          <div className="border-2 border-dashed border-[#8C5E28]/50 rounded-xl p-2.5 text-center bg-amber-50/70 select-none shrink-0 shadow-xs">
            <div className="flex items-center justify-center gap-1 text-[#8C5E28]">
              <Coffee className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                POSTAL SPECIAL BREW
              </span>
            </div>
            <div className="text-[9px] font-mono text-[#A86B32] mt-0.5 font-semibold">
              AIR MAIL • 14 OKT 2026
            </div>
          </div>
        </div>

        {/* State 1: Segel Lilin Tertutup */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-seal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.35 }}
              className="py-12 md:py-16 flex flex-col items-center justify-center text-center select-none"
            >
              {/* Segel Lilin Emas 3D Bergaya Wax Seal */}
              <div className="relative group cursor-pointer" onClick={handleOpenSeal}>
                {/* Efek Aura Lilin Menyala Halus */}
                <div className="absolute -inset-3 rounded-full bg-amber-400/20 blur-md group-hover:bg-amber-400/35 transition-all animate-pulse" />

                <div
                  className={`relative w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#8C5E28] via-[#C48B47] to-[#5A3825] flex flex-col items-center justify-center text-white shadow-[0_10px_25px_rgba(140,94,40,0.45)] border-4 border-[#FAF0CA]/60 active:scale-95 transition-all duration-300 ${
                    isSealing ? "scale-90 rotate-6 filter brightness-125" : "hover:scale-105"
                  }`}
                  title="Sentuh segel lilin untuk membuka surat"
                >
                  {/* Lingkaran Jahitan Putus-putus Segel */}
                  <div className="absolute inset-1.5 rounded-full border border-amber-200/50 border-dashed pointer-events-none" />
                  
                  <span className="font-serif-title text-3xl font-extrabold text-[#FAF7F2] drop-shadow-md">
                    25
                  </span>
                  <span className="text-[8.5px] font-mono tracking-widest text-amber-200 uppercase font-semibold mt-0.5">
                    SEAL OF LOVE
                  </span>
                </div>
              </div>

              {/* Panduan Interaksi */}
              <p className="mt-5 text-[#2C1810] font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5">
                <MailOpen className="w-4 h-4 text-[#8C5E28]" />
                <span>Sentuh segel lilin emas untuk membaca surat</span>
              </p>
              <p className="text-xs text-[#6F4E37] mt-1 max-w-sm italic">
                "Sebuah racikan kata cinta dari lubuk hati untuk hari bahagiamu..."
              </p>
            </motion.div>
          ) : (
            /* State 2: Lembaran Surat Terbuka (Unfolded Parchment) */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 text-[#2C1810] leading-relaxed text-sm sm:text-[15px] font-body relative"
            >
              {/* Tekstur Garis Halus Kertas Surat */}
              <div className="space-y-4 text-justify sm:text-left">
                {coffeeLetter.paragraphs.map((paragraph, idx) => {
                  if (idx === 0) {
                    return (
                      <p
                        key={idx}
                        className="font-serif-title text-base sm:text-lg font-bold text-[#8C5E28] pb-1.5 border-b border-amber-200/60 inline-block leading-normal mb-1"
                      >
                        {paragraph}
                      </p>
                    );
                  }
                  return (
                    <p
                      key={idx}
                      className="leading-relaxed text-[#3A2318] text-justify sm:text-left"
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Signature Area Mas Dika dengan Pena Bulu */}
              <div className="pt-6 border-t-2 border-amber-200/60 flex flex-col items-end">
                <span className="text-xs text-[#8C5E28] italic flex items-center gap-1">
                  <Feather className="w-3.5 h-3.5 text-[#8C5E28]" />
                  <span>Dengan segenap cintaku yang tak pernah pudar,</span>
                </span>
                <span className="font-handwriting text-3xl sm:text-4xl text-[#2C1810] font-bold mt-1 inline-flex items-center gap-2">
                  <span>{coffeeLetter.sender}</span>
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500 inline" />
                </span>
                <span className="text-[10px] font-mono text-[#8C5E28]/70 mt-0.5">
                  Bandung • 14 Oktober
                </span>
              </div>

              {/* Tombol Tutup Kembali Surat */}
              <div className="text-center pt-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-[#8C5E28] hover:text-[#2C1810] underline cursor-pointer font-medium transition-colors"
                >
                  Segel kembali surat ini
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

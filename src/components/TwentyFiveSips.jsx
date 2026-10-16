import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twentyFiveSips } from "../data/coffeeContent";
import { playSparkleSound } from "../utils/audio";
import confetti from "canvas-confetti";
import { Coffee, Sparkles, Heart, CheckCircle2, RotateCcw, Crown, X } from "lucide-react";

export default function TwentyFiveSips() {
  const [flippedCards, setFlippedCards] = useState({});
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [celebratedAll, setCelebratedAll] = useState(false);
  const [activeZoomSip, setActiveZoomSip] = useState(null);

  const handleCardClick = (sip, e) => {
    e?.stopPropagation();
    const id = sip.id;
    const isCurrentlyFlipped = !!flippedCards[id];
    const newFlipped = { ...flippedCards, [id]: !isCurrentlyFlipped };
    setFlippedCards(newFlipped);

    if (!isCurrentlyFlipped) {
      playSparkleSound();
      const currentCount = Object.values(newFlipped).filter(Boolean).length;
      setUnlockedCount(currentCount);

      // Jika kartu ke-25 dibuka atau semua terbuka
      if (id === 25 || currentCount === 25) {
        confetti({
          particleCount: id === 25 ? 60 : 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C48B47", "#D4A373", "#FAF0CA", "#E6CCB2", "#FB7185"],
        });
      }

      if (currentCount === 25 && !celebratedAll) {
        setCelebratedAll(true);
      }
    } else {
      const currentCount = Object.values(newFlipped).filter(Boolean).length;
      setUnlockedCount(currentCount);
    }
  };

  const unlockAll = () => {
    const all = {};
    twentyFiveSips.forEach((s) => {
      all[s.id] = true;
    });
    setFlippedCards(all);
    setUnlockedCount(25);
    setCelebratedAll(true);
    playSparkleSound();
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.55 },
      colors: ["#C48B47", "#D4A373", "#FAF0CA", "#FAF7F2", "#FB7185"],
    });
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300/40 text-[#8C5E28] text-[11px] font-semibold tracking-wider uppercase mb-2.5 shadow-xs">
          <Coffee className="w-3.5 h-3.5 text-[#8C5E28]" />
          <span>25 Sips of Love</span>
        </div>
        <h3 className="font-serif-title text-[24px] sm:text-[32px] font-bold text-[#2C1810]">
          25 Hal yang Bikin Bersyukur Ada Kamu
        </h3>
        <p className="text-[13px] sm:text-[15px] text-[#6F4E37] mt-1.5 max-w-lg mx-auto leading-relaxed">
          Setiap cangkir kopi menyimpan satu alasan mengapa aku selalu jatuh cinta padamu di usia 25 tahun ini ✨
        </p>

        {/* Progress Tracker Bar */}
        <div className="mt-5 bg-[#FFFDF9] p-4 rounded-2xl border border-amber-200/70 shadow-xs max-w-md mx-auto flex flex-col items-center">
          <div className="flex justify-between w-full text-[12px] font-medium text-[#4A2E1B] mb-2 px-1">
            <span className="flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-[#8C5E28]" />
              <span>Diseduh dengan cinta</span>
            </span>
            <span className="font-bold text-[#8C5E28] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 font-mono">
              {unlockedCount} / 25 Cangkir
            </span>
          </div>

          <div className="w-full bg-amber-100/70 rounded-full h-3 overflow-hidden p-0.5 border border-amber-200/50">
            <div
              className="bg-gradient-to-r from-[#8C5E28] via-[#C48B47] to-amber-500 h-full transition-all duration-500 rounded-full shadow-inner"
              style={{ width: `${(unlockedCount / 25) * 100}%` }}
            />
          </div>

          {unlockedCount < 25 ? (
            <button
              type="button"
              onClick={unlockAll}
              className="mt-2.5 text-[11px] text-[#8C5E28] hover:text-[#2C1810] underline cursor-pointer font-semibold flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Buka seluruh 25 cangkir sekaligus</span>
            </button>
          ) : (
            <span className="mt-2.5 text-[12px] font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Semua 25 cangkir cinta telah terbuka sempurna! ☕❤️</span>
            </span>
          )}
        </div>
      </div>

      {/* Grid 25 Cangkir (Mobile: 2 cols, Tablet: 3-4 cols, Desktop: 5 cols) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5">
        {twentyFiveSips.map((sip) => {
          const isFlipped = !!flippedCards[sip.id];
          const isGolden25 = sip.id === 25;

          return (
            <motion.div
              key={sip.id}
              initial={{ opacity: 0, y: 22, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: ((sip.id - 1) % 5) * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`flip-card h-[165px] sm:h-[180px] cursor-pointer select-none rounded-2xl ${
                isFlipped ? "flipped" : ""
              }`}
              onClick={(e) => handleCardClick(sip, e)}
            >
              <div className="flip-card-inner rounded-2xl">
                {/* DEPAN: Cangkir Kopi Tertutup */}
                <div
                  className={`flip-card-front rounded-2xl p-3 sm:p-3.5 flex flex-col items-center justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all ${
                    isGolden25
                      ? "bg-gradient-to-b from-[#FFFDF9] via-[#FAF0CA]/50 to-amber-100/60 border-2 border-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.25)]"
                      : "bg-[#FFFDF9] border border-amber-200/80"
                  }`}
                >
                  {/* Badge Nomor Cangkir */}
                  <div className="w-full flex items-center justify-between">
                    <span
                      className={`text-[9.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isGolden25
                          ? "bg-amber-400/30 text-amber-900 border border-amber-400/50"
                          : "bg-amber-100/70 text-[#8C5E28]"
                      }`}
                    >
                      {sip.title}
                    </span>
                    {isGolden25 && <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />}
                  </div>

                  {/* Ikon Cangkir Kopi dengan Efek Uap Halus */}
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center relative shadow-xs my-auto ${
                      isGolden25
                        ? "bg-gradient-to-tr from-amber-400 to-amber-200 text-white shadow-amber-300/50"
                        : "bg-amber-100/80 border border-amber-200/60 text-[#8C5E28]"
                    }`}
                  >
                    <Coffee className="w-5 h-5" />
                    {/* Steam Micro-animation (Hanya aktif pada kartu emas atau saat hover agar performa 60 FPS) */}
                    {isGolden25 ? (
                      <>
                        <span className="absolute -top-2 left-3 w-1 h-2 bg-amber-400/50 rounded-full animate-ping opacity-60 pointer-events-none" />
                        <span className="absolute -top-3 left-6 w-1 h-2.5 bg-amber-400/40 rounded-full animate-pulse opacity-75 pointer-events-none" />
                      </>
                    ) : (
                      <span className="absolute -top-2 left-4 w-1 h-2 bg-amber-400/30 rounded-full opacity-0 group-hover:opacity-80 transition-opacity pointer-events-none" />
                    )}
                  </div>

                  {/* Keterangan Subtitle */}
                  <div className="w-full text-center">
                    <span className="text-[12px] font-serif-title font-bold text-[#2C1810] block truncate px-1">
                      {sip.subtitle}
                    </span>
                    <span className="text-[9px] text-[#8C5E28]/80 font-medium inline-flex items-center gap-0.5 mt-0.5">
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Sentuh buka</span>
                    </span>
                  </div>
                </div>

                {/* BELAKANG: Pesan Cinta Terbuka */}
                <div
                  className={`flip-card-back rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between text-center shadow-md relative overflow-hidden ${
                    isGolden25
                      ? "bg-gradient-to-br from-[#FFFDF9] via-[#FAF0CA] to-amber-100 border-2 border-amber-400 shadow-[0_6px_24px_rgba(245,158,11,0.3)]"
                      : "bg-gradient-to-br from-[#FFFDF9] to-[#F5EBE0] border-2 border-[#D4A373]"
                  }`}
                >
                  <div className="w-full flex items-center justify-between border-b border-amber-200/60 pb-1">
                    <span className="text-[9px] font-bold text-[#8C5E28] uppercase font-mono tracking-wider">
                      {sip.title}
                    </span>
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  </div>

                  {/* Isi Pesan Singkat */}
                  <p className="text-[11px] sm:text-[12px] text-[#2C1810] font-body leading-relaxed my-auto line-clamp-4 px-0.5">
                    "{sip.message}"
                  </p>

                  <div className="w-full pt-1 border-t border-amber-200/60 flex items-center justify-between text-[8.5px] text-[#8C5E28]/80">
                    <span>{sip.subtitle}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveZoomSip(sip);
                        playSparkleSound();
                      }}
                      className="underline font-semibold hover:text-[#2C1810]"
                      title="Perbesar teks"
                    >
                      Baca detail
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Banner Selebrasi Selesai 25 Cangkir */}
      {celebratedAll && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-[#FAF0CA]/90 via-[#F5EBE0] to-[#E6CCB2]/90 border-2 border-amber-300 text-center shadow-md max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 text-rose-500 mb-1">
            <Heart className="w-5 h-5 fill-rose-500" />
            <Sparkles className="w-5 h-5 text-amber-500" />
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <h4 className="font-serif-title font-bold text-lg sm:text-xl text-[#2C1810]">
            25 Alasan, 1 Hati Selamanya untuk Evina
          </h4>
          <p className="text-xs sm:text-sm text-[#6F4E37] mt-1.5 leading-relaxed font-body">
            "Setiap cangkir kopi mungkin bisa habis, tapi rasa sayang dan syukurku memiliki kamu akan selalu mengalir hangat tanpa henti."
          </p>
        </motion.div>
      )}

      {/* Modal Detail Zoom Sip (Jika Ingin Membaca Teks Ukuran Besar di Layar HP) */}
      <AnimatePresence>
        {activeZoomSip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none"
            onClick={() => setActiveZoomSip(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-amber-300 shadow-2xl relative text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveZoomSip(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#2C1810] text-amber-100 flex items-center justify-center shadow-md hover:bg-[#4A2E1B] active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#8C5E28] font-mono text-xs font-bold uppercase mb-2">
                <Coffee className="w-3.5 h-3.5" />
                <span>{activeZoomSip.title}</span>
              </div>

              <h4 className="font-serif-title text-xl font-bold text-[#2C1810]">
                {activeZoomSip.subtitle}
              </h4>

              <p className="font-body text-base text-[#3A2318] leading-relaxed my-4 px-2">
                "{activeZoomSip.message}"
              </p>

              <div className="pt-3 border-t border-amber-200/70 text-xs text-[#8C5E28] font-medium flex items-center justify-center gap-1">
                <span>With all my love</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

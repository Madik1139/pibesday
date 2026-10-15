import React, { useState, useEffect } from "react";
import InteractiveCake from "../../components/InteractiveCake";
import CoffeePostcard from "../../components/CoffeePostcard";
import TwentyFiveSips from "../../components/TwentyFiveSips";
import PolaroidWall from "../../components/PolaroidWall";
import CoffeeVouchers from "../../components/CoffeeVouchers";
import FloatingMusicPlayer from "../../components/FloatingMusicPlayer";
import ScrollReveal from "../../components/ScrollReveal";
import AmbientParticles from "../../components/AmbientParticles";
import {
  initAudio,
  playBackgroundMusic,
  stopBackgroundMusic,
  playSparkleSound,
  playSealCrackSound,
  playPaperSlideSound,
} from "../../utils/audio";
import confetti from "canvas-confetti";
import { Coffee, Sparkles, BookOpen, Heart, Mail, History } from "lucide-react";

export default function Ultah25({ onGoToUltah24 }) {
  // envelopePhase: "closed" | "opening" | "card_popped" | "zooming" | "opened"
  const [envelopePhase, setEnvelopePhase] = useState("closed");
  const [isPlaying, setIsPlaying] = useState(false);

  // Unmount cleanup: Pastikan musik mati jika berpindah ke halaman lain
  useEffect(() => {
    return () => {
      stopBackgroundMusic();
    };
  }, []);

  const handleOpenEnvelope = async () => {
    if (envelopePhase !== "closed") return;

    // 1. Audio init & mainkan suara segel lilin pecah
    try {
      await initAudio();
    } catch {}

    playSealCrackSound();
    setEnvelopePhase("opening");

    // Efek partikel lilin emas merekah
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.5 },
      colors: ["#C48B47", "#FAF0CA", "#8C5E28"],
    });

    // 2. Setelah 450ms (flap terbuka), kartu undangan meluncur naik keluar dari amplop!
    setTimeout(() => {
      playPaperSlideSound();
      playBackgroundMusic();
      setIsPlaying(true);
      setEnvelopePhase("card_popped");

      // Confetti kecil saat kartu keluar
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.45 },
        colors: ["#D4A373", "#FAF0CA", "#E6CCB2"],
      });
    }, 450);

    // 3. Beri waktu membaca kartu undangan (~2.3s), lalu lakukan zoom-in menembus kartu ke halaman perayaan
    setTimeout(() => {
      setEnvelopePhase("zooming");
    }, 2800);

    // 4. Buka halaman utama perayaan penuh
    setTimeout(() => {
      setEnvelopePhase("opened");
      playSparkleSound();
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.55 },
        colors: ["#C48B47", "#D4A373", "#FAF0CA", "#E6CCB2", "#FAF7F2"],
      });
    }, 3400);
  };

  const handleCloseEnvelope = () => {
    setEnvelopePhase("closed");
    stopBackgroundMusic();
    setIsPlaying(false);
  };

  const toggleMusic = async () => {
    try {
      await initAudio();
      if (isPlaying) {
        stopBackgroundMusic();
        setIsPlaying(false);
      } else {
        playBackgroundMusic();
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn("Audio toggle error:", e);
    }
  };

  // Layar Amplop Awal (Sebelum dibuka penuh)
  if (envelopePhase !== "opened") {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EBE0] via-[#E6CCB2] to-[#D4A373] p-4 select-none overflow-hidden">
        {/* Coffee Shop Stamp Header */}
        <div className={`text-center mb-4 sm:mb-6 transition-opacity duration-500 ${envelopePhase === "zooming" ? "opacity-0" : "opacity-100 animate-[fadeIn_1s_ease-out]"}`}>
          <div className="flex items-center justify-center gap-1.5 text-2xl text-[#8C5E28]">
            <Coffee className="w-6 h-6 text-[#8C5E28]" />
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#3A2318] mt-1">
            Special Brew • Edition 25
          </h2>
          <p className="text-xs sm:text-sm text-[#6F4E37] font-body mt-0.5">
            Sebuah racikan cinta untuk hari ulang tahun Evina Dini Anjriani
          </p>
        </div>

        {/* Vintage Coffee Kraft Envelope - Cinematic 3D Unboxing */}
        <div className={`relative envelope-wrapper-25 mt-16 sm:mt-20 mb-6 ${envelopePhase === "zooming" ? "zoom-transition" : ""}`}>
          <div
            onClick={handleOpenEnvelope}
            className={`envelope-coffee-25 relative rounded-2xl cursor-pointer ${
              envelopePhase !== "closed" ? "open" : ""
            } ${envelopePhase === "card_popped" || envelopePhase === "zooming" ? "card-popped" : ""}`}
          >
            {/* 1. Kantong Belakang Amplop (Back Pocket) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#E6CCB2] to-[#D4A373] rounded-2xl border-2 border-[#C48B47] shadow-2xl z-0 overflow-hidden">
              {/* Inner Lining Pattern (Motif Kopi Elegan di Dalam Amplop) */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#8C5E28_1.5px,transparent_1.5px)] [background-size:8px_8px]" />
              <div className="absolute top-0 inset-x-0 h-10 bg-black/10 blur-xs" />
            </div>

            {/* 2. Kartu Undangan Spesial yang Meluncur Keluar (Slide-Out Letter Card) */}
            <div className="envelope-letter-card flex flex-col justify-between p-3 sm:p-3.5 select-none pointer-events-none">
              {/* Header Kartu */}
              <div className="flex items-center justify-between border-b border-amber-200/70 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-[#8C5E28]" />
                  <span className="font-serif-title text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-[#8C5E28]">
                    Special Brew • 25th Edition
                  </span>
                </div>
                <div className="text-[9px] font-mono text-[#A86B32] font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                  14 OKTOBER
                </div>
              </div>

              {/* Isi Tengah Kartu */}
              <div className="text-center my-0.5">
                <span className="text-[10px] uppercase tracking-wider text-[#A86B32] font-medium">
                  Undangan Perayaan Hari Bahagia
                </span>
                <h3 className="font-serif-title text-[15px] sm:text-base font-bold text-[#2C1810] leading-snug">
                  Happy 25th Birthday ✨
                </h3>
                <h4 className="font-handwriting text-lg sm:text-xl text-[#8C5E28] font-bold leading-tight">
                  Evina Dini Anjriani
                </h4>
                <p className="text-[10.5px] text-[#6F4E37] italic mt-0.5 line-clamp-1">
                  "Sebuah persembahan cinta untuk senyum terindahmu..."
                </p>
              </div>

              {/* Footer Kartu dengan Pita Emas Halus */}
              <div className="flex items-center justify-between border-t border-amber-200/60 pt-1.5 text-[9.5px] text-[#8C5E28]/80">
                <span className="font-mono">From Mas Dika with Love</span>
                <span className="flex items-center gap-1 text-rose-500 font-semibold">
                  <Heart className="w-2.5 h-2.5 fill-rose-500" /> Open Celebration
                </span>
              </div>
            </div>

            {/* 3. Kantong Depan Amplop (Front Pocket / Kraft Pocket) */}
            <div className="absolute bottom-0 inset-x-0 h-[140px] bg-[#FAF7F2] rounded-b-2xl border-b-2 border-x-2 border-[#C48B47] z-20 shadow-md flex items-end justify-center overflow-hidden">
              {/* Lipatan Segitiga Kantong Depan Bergaya Kraft Vintage */}
              <div
                className="absolute inset-0 bg-[#F5EBE0] border-t border-[#E6CCB2]/70"
                style={{
                  clipPath: "polygon(0 100%, 100% 100%, 50% 25%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-1/2 h-full bg-[#FAF7F2]/90 border-r border-[#E6CCB2]/50"
                style={{
                  clipPath: "polygon(0 0, 0 100%, 100% 100%)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-1/2 h-full bg-[#FAF7F2]/90 border-l border-[#E6CCB2]/50"
                style={{
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                }}
              />

              {/* Tombol Buka Amplop */}
              {envelopePhase === "closed" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEnvelope();
                  }}
                  className="relative z-30 mb-3.5 min-h-[44px] px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8C5E28] via-[#C48B47] to-[#8C5E28] text-white font-semibold text-xs sm:text-[13px] shadow-[0_4px_14px_rgba(140,94,40,0.35)] hover:shadow-[0_6px_20px_rgba(140,94,40,0.45)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer select-none animate-pulse"
                >
                  <Mail className="w-4 h-4 text-amber-100" />
                  <span>Buka Amplop</span>
                </button>
              )}
            </div>

            {/* 4. Flap Segitiga Atas Amplop */}
            <div className="envelope-flap-top pointer-events-none" />

            {/* 5. Segel Lilin Emas Estetik di Ujung Flap (Wax Seal 25) */}
            <div className="wax-seal-seal absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-gradient-to-br from-[#E5AD58] via-[#C48B47] to-[#8C5E28] border-2 border-[#FAF0CA] shadow-[0_4px_10px_rgba(44,24,16,0.3)] flex items-center justify-center pointer-events-none">
              <div className="absolute inset-1 rounded-full border border-amber-100/50 border-dashed" />
              <span className="font-serif-title text-white font-bold text-base tracking-wider drop-shadow-xs">25</span>
            </div>
          </div>
        </div>

        <p className={`text-xs text-[#6F4E37]/80 mt-6 tracking-wide text-center transition-opacity duration-300 ${envelopePhase !== "closed" ? "opacity-0" : "opacity-100"}`}>
          Ketuk tombol di atas atau sentuh amplop untuk membuka perayaan spesialmu ✨
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-10 md:py-16 px-4 sm:px-6 bg-gradient-to-b from-[#FAF7F2] via-[#F5EBE0] to-[#E6CCB2]">
      {/* Background Ambient Floating Particles */}
      <AmbientParticles />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center animate-[fadeIn_0.7s_ease-out]">
        
        {/* Header Hero Section (High Contrast & Balanced Spacing) */}
        <header className="w-full text-center pt-4 pb-12 sm:pb-16 md:pb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 text-[#8C5E28] text-[11px] font-bold uppercase tracking-widest mb-3 border border-amber-300/50 shadow-xs">
            <Coffee className="w-3.5 h-3.5 text-[#8C5E28]" />
            <span>Silver Jubilee • 25th Birthday</span>
          </div>

          <h1 className="font-serif-title text-[32px] sm:text-[44px] md:text-[52px] font-bold text-[#2C1810] leading-tight px-2 tracking-tight">
            Selamat Ulang Tahun ke-25, <span className="bg-gradient-to-r from-[#8C5E28] via-[#C48B47] to-[#A86B32] bg-clip-text text-transparent italic">Sayang!</span> ✨
          </h1>

          <h2 className="font-handwriting text-[28px] sm:text-[36px] md:text-[42px] text-[#8C5E28] font-bold mt-1.5">
            Evina Dini Anjriani
          </h2>

          <p className="text-[14px] sm:text-[16px] text-[#6F4E37] max-w-xl mx-auto mt-2 leading-relaxed px-4">
            "Di usia yang ke-25 ini, semoga hidupmu sehangat cangkir kopi favoritmu dan seindah senyum manismu."
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-xl mx-auto px-4 select-none">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF9]/90 border border-amber-200/70 shadow-xs text-[11px] font-medium text-[#4A2E1B]">
              <span className="text-xs">📍</span>
              <span className="font-semibold text-[#8C5E28]">Bandung ⇄ Bekasi</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF9]/90 border border-amber-200/70 shadow-xs text-[11px] font-medium text-[#4A2E1B]">
              <span className="text-xs">🗓️</span>
              <span className="font-semibold text-[#8C5E28]">1+ Tahun Bersama</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF9]/90 border border-amber-200/70 shadow-xs text-[11px] font-medium text-[#4A2E1B]">
              <Coffee className="w-3.5 h-3.5 text-[#8C5E28]" />
              <span className="font-semibold text-[#8C5E28]">Temu Sebulan Sekali</span>
            </div>
          </div>
        </header>

        {/* Fitur 1: 🎂 Interactive Tiramisu Cake & Blow Candle 25 */}
        <ScrollReveal direction="scale" duration={800} className="w-full flex justify-center">
          <InteractiveCake />
        </ScrollReveal>

        {/* Divider Alur Lembut Antar Bab */}
        <ScrollReveal direction="fade" duration={600} className="w-full">
          <div className="w-full max-w-xl mx-auto py-8 sm:py-12 md:py-16 flex items-center justify-center gap-3 select-none">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/40 to-amber-300/10" />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/60 border border-amber-200/50 text-[#8C5E28] text-[10px] font-mono tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Love Letter</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-300/40 to-amber-300/10" />
          </div>
        </ScrollReveal>

        {/* Fitur 2: 📜 Postcard Surat Cinta dengan Segel Emas 25 */}
        <ScrollReveal direction="up" duration={750} className="w-full flex justify-center">
          <CoffeePostcard />
        </ScrollReveal>


        {/* Divider Alur Lembut Antar Bab */}
        <ScrollReveal direction="fade" duration={600} className="w-full">
          <div className="w-full max-w-xl mx-auto py-8 sm:py-12 md:py-16 flex items-center justify-center gap-3 select-none">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/40 to-amber-300/10" />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/60 border border-amber-200/50 text-[#8C5E28] text-[10px] font-mono tracking-widest uppercase">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>25 Reasons</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-300/40 to-amber-300/10" />
          </div>
        </ScrollReveal>

        {/* Fitur 3: ☕ 25 Sips of Love (25 Kartu Alasan Cinta Interaktif) */}
        <ScrollReveal direction="up" duration={750} className="w-full">
          <TwentyFiveSips />
        </ScrollReveal>

        {/* Divider Alur Lembut Antar Bab */}
        <ScrollReveal direction="fade" duration={600} className="w-full">
          <div className="w-full max-w-xl mx-auto py-8 sm:py-12 md:py-16 flex items-center justify-center gap-3 select-none">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/40 to-amber-300/10" />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/60 border border-amber-200/50 text-[#8C5E28] text-[10px] font-mono tracking-widest uppercase">
              <Coffee className="w-3 h-3 text-[#8C5E28]" />
              <span>Photo Memories</span>
              <Coffee className="w-3 h-3 text-[#8C5E28]" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-300/40 to-amber-300/10" />
          </div>
        </ScrollReveal>

        {/* Fitur 4: 📸 Galeri Foto Polaroid Interaktif (dengan Like Counter & Lightbox) */}
        <ScrollReveal direction="scale" duration={800} className="w-full flex justify-center">
          <PolaroidWall />
        </ScrollReveal>

        {/* Divider Alur Lembut Antar Bab */}
        <ScrollReveal direction="fade" duration={600} className="w-full">
          <div className="w-full max-w-xl mx-auto py-8 sm:py-12 md:py-16 flex items-center justify-center gap-3 select-none">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/40 to-amber-300/10" />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/60 border border-amber-200/50 text-[#8C5E28] text-[10px] font-mono tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Secret Gifts</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-300/40 to-amber-300/10" />
          </div>
        </ScrollReveal>

        {/* Fitur 5: 🎁 Kado Rahasia Bersegel Pita & Tiket Kupon */}
        <ScrollReveal direction="up" duration={750} className="w-full">
          <CoffeeVouchers />
        </ScrollReveal>

        {/* Portal Navigasi: 🕰️ Menuju Kenangan Ultah ke-24 */}
        {onGoToUltah24 && (
          <ScrollReveal direction="up" duration={750} className="w-full">
            <div className="w-full max-w-xl mx-auto py-8 sm:py-12 md:py-16 flex items-center justify-center gap-3 select-none">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/40 to-amber-300/10" />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/60 border border-amber-200/50 text-[#8C5E28] text-[10px] font-mono tracking-widest uppercase">
                <History className="w-3 h-3 text-[#8C5E28]" />
                <span>Archive 24</span>
                <History className="w-3 h-3 text-[#8C5E28]" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-300/40 to-amber-300/10" />
            </div>

            <section className="w-full max-w-xl mx-auto px-4">
              <div className="bg-[#FFFDF9]/95 border border-amber-200/70 rounded-3xl p-6 sm:p-10 md:p-12 pb-10 sm:pb-12 md:pb-14 shadow-[0_12px_40px_-8px_rgba(44,24,16,0.1)] text-center relative overflow-hidden">
                <History className="w-8 h-8 text-[#8C5E28] mx-auto mb-2" />
                <h4 className="font-serif-title text-[22px] sm:text-[24px] font-bold text-[#2C1810] mt-1.5">
                  Kenangan Ulang Tahun ke-24
                </h4>
                <p className="text-[13px] sm:text-[14px] text-[#6F4E37] mt-2 leading-relaxed">
                  Mau melihat kembali ucapan dan galeri foto manis kita di tahun sebelumnya?
                </p>

                <button
                  onClick={() => {
                    stopBackgroundMusic();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    onGoToUltah24();
                  }}
                  className="mt-8 mb-2 min-h-[48px] px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8C5E28] to-[#C48B47] text-white font-bold text-[13px] shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Buka Arsip Ulang Tahun ke-24</span>
                </button>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Tombol Tutup Amplop */}
        <ScrollReveal direction="fade" duration={600} className="w-full text-center pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28">
          <button
            className="min-h-[48px] px-9 py-3.5 rounded-full bg-[#FFFDF9] text-[#8C5E28] border border-amber-200/90 text-[13px] font-semibold hover:bg-amber-100/50 active:scale-95 transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
            onClick={handleCloseEnvelope}
          >
            <span>Tutup Amplop</span>
          </button>
        </ScrollReveal>
      </div>

      {/* Floating Music Controller */}
      <FloatingMusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
    </div>
  );
}

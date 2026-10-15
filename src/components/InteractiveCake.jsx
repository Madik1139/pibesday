import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { playBlowSound, playSparkleSound, MicrophoneBlowDetector } from "../utils/audio";
import { Wind, Mic, Sparkles, Flame, RotateCcw, Lock, Edit3, Check, Heart } from "lucide-react";
import { sendWishToEmail } from "../utils/wishNotification";

export default function InteractiveCake({ onWishComplete }) {
  const [isBlown, setIsBlown] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [micError, setMicError] = useState(null);
  const [wishWarning, setWishWarning] = useState(null);
  const micDetectorRef = useRef(null);
  const textareaRef = useRef(null);
  const cakeContainerRef = useRef(null);

  // State Make a Wish Tersimpan Permanen di LocalStorage
  const [savedWish, setSavedWish] = useState(() => {
    try {
      return localStorage.getItem("evina_25th_wish") || "";
    } catch {
      return "";
    }
  });
  const [inputWish, setInputWish] = useState("");
  const [isEditingWish, setIsEditingWish] = useState(false);

  const handleSaveWish = (e) => {
    if (e) e.preventDefault();
    const wishToSave = inputWish.trim() || "Berdoa dalam hati: Semoga selalu sehat, bahagia, dan penuh berkah di usia 25 tahun ini. Aamiin.";

    try {
      localStorage.setItem("evina_25th_wish", wishToSave);
    } catch {
      // fallback
    }

    setSavedWish(wishToSave);
    setIsEditingWish(false);
    setWishWarning(null);
    playSparkleSound();

    // Kirim notifikasi doa ke email Mas Dika secara otomatis di latar belakang (silent background)
    sendWishToEmail(wishToSave);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#C48B47", "#FAF7F2", "#FAF0CA"]
    });
  };

  const handleSilentWish = () => {
    const silentText = "Berdoa dalam hati: Semoga selalu dilimpahi kesehatan, kebahagiaan, kemudahan rezeki, dan selalu bersama orang-orang tersayang. Aamiin ✨";
    setInputWish(silentText);
    try {
      localStorage.setItem("evina_25th_wish", silentText);
    } catch {
      // fallback
    }
    setSavedWish(silentText);
    setIsEditingWish(false);
    setWishWarning(null);
    playSparkleSound();

    // Kirim notifikasi doa ke email Mas Dika secara otomatis di latar belakang (silent background)
    sendWishToEmail(silentText);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#C48B47", "#FAF7F2", "#FAF0CA"]
    });
  };

  const handleCandleClick = () => {
    if (!savedWish || isEditingWish) {
      setWishWarning("Eits, jangan ditiup dulu sayang! Tulis atau kunci harapanmu dulu di bawah yaa 🕯️✨");
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      setTimeout(() => setWishWarning(null), 4500);
      return;
    }
    triggerBlow(false);
  };

  const triggerBlow = (fromButton = false) => {
    if (!savedWish || isEditingWish) {
      setWishWarning("Kunci harapanmu terlebih dahulu sebelum meniup lilin yaa ✨");
      setTimeout(() => setWishWarning(null), 4500);
      return;
    }

    if (isBlown) return;

    // Jika meniup dari tombol manual, scroll layar ke bagian kue terlebih dahulu secara mulus
    if (fromButton && cakeContainerRef.current) {
      cakeContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // Delay: jika dari tombol manual, beri jeda 1200ms (scroll ~450ms + jeda lihat lilin ~750ms).
    // Jika dari tiupan mic atau sentuhan api langsung, layar sudah di kue sehingga langsung padam seketika (delay 60ms).
    const delayBeforeBlow = fromButton ? 1200 : 60;

    setTimeout(() => {
      setIsBlown(true);
      setWishWarning(null);
      playBlowSound();

      if (micDetectorRef.current) {
        micDetectorRef.current.stop();
        setIsListeningMic(false);
      }

      setTimeout(() => {
        playSparkleSound();
        // Golden Champagne & Warm Caramel Confetti
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.55 },
          colors: ["#C48B47", "#D4A373", "#F7F2EB", "#FAF0CA", "#E6CCB2"]
        });

        // Extra bursts for celebration
        setTimeout(() => {
          confetti({
            particleCount: 65,
            angle: 60,
            spread: 60,
            origin: { x: 0.1, y: 0.6 },
            colors: ["#C48B47", "#D4A373", "#E6CCB2"]
          });
          confetti({
            particleCount: 65,
            angle: 120,
            spread: 60,
            origin: { x: 0.9, y: 0.6 },
            colors: ["#C48B47", "#D4A373", "#E6CCB2"]
          });
        }, 300);

        if (onWishComplete) {
          onWishComplete();
        }
      }, 400);
    }, delayBeforeBlow);
  };

  const toggleMicDetection = async () => {
    if (!savedWish || isEditingWish) {
      setWishWarning("Kunci harapanmu terlebih dahulu sebelum meniup dengan mic yaa ✨");
      setTimeout(() => setWishWarning(null), 4500);
      return;
    }

    if (isListeningMic) {
      if (micDetectorRef.current) {
        micDetectorRef.current.stop();
      }
      setIsListeningMic(false);
      return;
    }

    // 1. Scroll terlebih dahulu ke kue saat mengaktifkan mode mic agar pandangan langsung tertuju ke lilin
    if (cakeContainerRef.current) {
      cakeContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    setMicError(null);
    const detector = new MicrophoneBlowDetector(() => {
      // 2. Begitu tiupan nafas terdeteksi, padamkan api seketika (fromButton = false) tanpa delay scroll lagi
      triggerBlow(false);
    }, 80);

    const success = await detector.start();
    if (success) {
      micDetectorRef.current = detector;
      setIsListeningMic(true);
    } else {
      setMicError("Izin mikrofon tidak diberikan. Gunakan tombol 'Tiup Lilin Sekarang' di bawah ya!");
      setTimeout(() => setMicError(null), 4000);
    }
  };

  useEffect(() => {
    return () => {
      if (micDetectorRef.current) {
        micDetectorRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#FFFDF9]/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 md:p-9 pb-8 sm:pb-10 border border-amber-200/70 shadow-[0_12px_40px_-8px_rgba(44,24,16,0.1)] flex flex-col items-center">
      {/* Badge & Title */}
      <div className="text-center mb-5 sm:mb-7">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300/40 text-[#8C5E28] text-[11px] font-semibold tracking-wider uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Ritual Spesial Ulang Tahun ke-25</span>
        </div>
        <h3 className="font-serif-title text-[23px] sm:text-[27px] font-semibold text-[#2C1810]">
          {!isBlown ? (
            !savedWish || isEditingWish ? (
              <span>Langkah 1: Make a Wish (Buat Harapan Dulu) 🕯️</span>
            ) : (
              <span>Langkah 2: Sekarang Tiup Lilinnya! 🎂💨</span>
            )
          ) : (
            <span>Harapan Berhasil Diterbangkan ke Langit! ✨</span>
          )}
        </h3>
        <p className="text-[13.5px] text-[#6F4E37] mt-1 max-w-md mx-auto leading-relaxed">
          {!isBlown ? (
            !savedWish || isEditingWish ? (
              "Sesuai tradisi: pejamkan matamu sejenak, kunci doa terbaikmu, baru kita tiup lilinnya bersama."
            ) : (
              "Doamu sudah terkunci di dalam hati. Sekarang pejamkan mata lalu tiup apinya!"
            )
          ) : (
            "Semoga setiap permohonan tulusmu diijabah oleh Allah SWT. Aamiin."
          )}
        </p>
      </div>

      {/* Container Kue & Lilin Realistis dengan Warm Glow Aura */}
      <div
        ref={cakeContainerRef}
        className="relative w-full max-w-[340px] flex flex-col items-center justify-end select-none my-3 sm:my-4"
      >
        {/* Floating Micro-Hint Sentuh Api Lilin */}
        {!isBlown && savedWish && !isEditingWish && !isListeningMic && (
          <div className="absolute -top-7 px-3 py-1 rounded-full bg-[#2C1810]/85 backdrop-blur-md text-amber-200 text-[10.5px] font-medium tracking-wide flex items-center gap-1.5 shadow-md border border-amber-300/40 animate-bounce pointer-events-none z-30">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
            <span>Sentuh api atau tekan tombol tiup di bawah</span>
          </div>
        )}

        {/* Visualizer Gelombang Tiupan Mic saat Aktif */}
        {isListeningMic && !isBlown && (
          <div className="absolute -top-9 z-30 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500 text-white text-[11px] font-medium shadow-lg backdrop-blur-md animate-pulse">
            <span className="w-1 h-3 bg-white rounded-full animate-bounce [animation-delay:0ms]"></span>
            <span className="w-1 h-5 bg-white rounded-full animate-bounce [animation-delay:150ms]"></span>
            <span className="w-1 h-2.5 bg-white rounded-full animate-bounce [animation-delay:300ms]"></span>
            <span className="ml-1 font-semibold">Dekatkan mic & hembuskan nafasmu... 💨</span>
          </div>
        )}

        {/* Ambient Warm Halo behind the cake - intens saat api menyala, meredup saat padam */}
        <div
          className={`absolute top-2 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
            !isBlown
              ? "bg-amber-300/35 candle-ambient-glow scale-105"
              : "bg-amber-200/10 scale-90"
          }`}
        />

        {/* Lilin Angka 2 & 5 (Sculpted 3D Metallic Gold Candles di Belakang Bulatan Krim) */}
        <div className="flex -space-x-3 sm:-space-x-3.5 -mb-4 sm:-mb-5 z-10 items-end">
          {/* Lilin Angka 2 */}
          <div className="relative w-14 flex flex-col items-center">
            {/* Api & Asap Lilin Angka 2 */}
            {!isBlown ? (
              <div
                className="absolute -top-7 left-1/2 -translate-x-1/2 cursor-pointer group flex flex-col items-center z-20"
                onClick={handleCandleClick}
                title={!savedWish ? "Kunci harapan dulu di bawah ya!" : "Klik untuk tiup lilin"}
              >
                {/* Outer Glow Flame */}
                <div className="absolute -inset-2 bg-amber-400/30 rounded-full blur-md candle-ambient-glow pointer-events-none" />
                {/* Flame Container with Organic Flicker */}
                <div className="relative w-6 h-9 flex items-center justify-center candle-flame">
                  {/* Outer Amber / Orange Flame */}
                  <div className="w-5 h-8 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.9)]" />
                  {/* Inner White-Hot Yellow Core */}
                  <div className="absolute bottom-1 w-2.5 h-5 bg-gradient-to-t from-yellow-300 to-white rounded-full opacity-95" />
                  {/* Blue Base Flame (Zona Pembakaran Lilin Asli) */}
                  <div className="absolute bottom-0 w-3 h-2 bg-gradient-to-t from-sky-400/80 to-transparent rounded-full blur-[0.5px]" />
                </div>
              </div>
            ) : (
              /* Kepulan Asap Meliuk Halus Setelah Lilin Padam */
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
                <div className="smoke-puff-wisp flex flex-col items-center">
                  <svg className="w-8 h-12 text-stone-400/60" viewBox="0 0 32 48" fill="none">
                    <path
                      d="M16 46C15 38 19 32 17 24C15 17 11 13 14 6C15 3 17 1 14 0"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="opacity-70"
                    />
                    <path
                      d="M16 46C17 40 14 34 16 26C18 19 21 14 18 8C16 4 14 2 16 0"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Lilin 3D Angka 2 dengan Sumbu Menancap Kokoh */}
            <svg
              className="w-14 h-auto filter drop-shadow-[0_4px_6px_rgba(44,24,16,0.25)] overflow-visible"
              viewBox="0 -12 52 80"
              fill="none"
            >
              <defs>
                <linearGradient id="goldWax2Front" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7D6" />
                  <stop offset="20%" stopColor="#F5D061" />
                  <stop offset="50%" stopColor="#D49A3D" />
                  <stop offset="80%" stopColor="#A76E24" />
                  <stop offset="100%" stopColor="#6E4110" />
                </linearGradient>
                <linearGradient id="goldWax2Side" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5E360D" />
                  <stop offset="100%" stopColor="#8C5318" />
                </linearGradient>
              </defs>

              {/* Sumbu Lilin yang Menancap ke Dalam Wax Lilin Angka 2 */}
              {/* Lelehan Wax di Pangkal Sumbu */}
              <ellipse cx="28" cy="8.2" rx="3.5" ry="1.4" fill="#A76E24" opacity="0.6" />
              <ellipse cx="28" cy="8.0" rx="2.5" ry="1" fill="#D49A3D" opacity="0.8" />
              {/* Batang Sumbu Bertekstur Arang */}
              <path
                d="M28 8.5 C28 4.5 27.2 0.5 26.5 -4"
                stroke="#1C1917"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Ujung Sumbu Arang & Bara Merah */}
              <circle cx="26.5" cy="-4" r="1.3" fill="#292524" />
              {!isBlown ? (
                <circle cx="26.5" cy="-4" r="1" fill="#EF4444" className="animate-pulse" />
              ) : (
                <circle cx="26.5" cy="-4" r="0.8" fill="#B45309" opacity="0.8" />
              )}

              {/* 3D Depth Extrusion Shadow Behind */}
              <path
                d="M16 19C16 12 21 8 28 8C35 8 40 12 40 19C40 26 31 32 23 41C19 46 17 51 17 57H42V64H13C13 55 17 48 23 41C31 32 35 28 35 20C35 15 32 13 28 13C24 13 21 15 21 19H16Z"
                fill="url(#goldWax2Side)"
                transform="translate(2.5, 3)"
              />
              {/* Front Face Candle */}
              <path
                d="M16 19C16 12 21 8 28 8C35 8 40 12 40 19C40 26 31 32 23 41C19 46 17 51 17 57H42V64H13C13 55 17 48 23 41C31 32 35 28 35 20C35 15 32 13 28 13C24 13 21 15 21 19H16Z"
                fill="url(#goldWax2Front)"
                stroke="#FFF2A3"
                strokeWidth="1.2"
              />
              {/* Glossy Bevel Specular Highlight */}
              <path
                d="M26 10C31 10 36 12.5 37 17"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M17 59H39"
                stroke="#FFFFFF"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Lilin Angka 5 */}
          <div className="relative w-14 flex flex-col items-center">
            {/* Api & Asap Lilin Angka 5 */}
            {!isBlown ? (
              <div
                className="absolute -top-6.5 left-[53%] -translate-x-1/2 cursor-pointer group flex flex-col items-center z-20"
                onClick={handleCandleClick}
                title={!savedWish ? "Kunci harapan dulu di bawah ya!" : "Klik untuk tiup lilin"}
              >
                {/* Outer Glow Flame */}
                <div className="absolute -inset-2 bg-amber-400/30 rounded-full blur-md candle-ambient-glow pointer-events-none" />
                {/* Flame Container with Organic Flicker */}
                <div className="relative w-6 h-9 flex items-center justify-center candle-flame">
                  {/* Outer Amber / Orange Flame */}
                  <div className="w-5 h-8 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.9)]" />
                  {/* Inner White-Hot Yellow Core */}
                  <div className="absolute bottom-1 w-2.5 h-5 bg-gradient-to-t from-yellow-300 to-white rounded-full opacity-95" />
                  {/* Blue Base Flame (Zona Pembakaran Lilin Asli) */}
                  <div className="absolute bottom-0 w-3 h-2 bg-gradient-to-t from-sky-400/80 to-transparent rounded-full blur-[0.5px]" />
                </div>
              </div>
            ) : (
              /* Kepulan Asap Meliuk Halus Setelah Lilin Padam */
              <div className="absolute -top-10 left-[53%] -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
                <div className="smoke-puff-wisp flex flex-col items-center">
                  <svg className="w-8 h-12 text-stone-400/60" viewBox="0 0 32 48" fill="none">
                    <path
                      d="M16 46C15 38 19 32 17 24C15 17 11 13 14 6C15 3 17 1 14 0"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="opacity-70"
                    />
                    <path
                      d="M16 46C17 40 14 34 16 26C18 19 21 14 18 8C16 4 14 2 16 0"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Lilin 3D Angka 5 dengan Sumbu Menancap Kokoh */}
            <svg
              className="w-14 h-auto filter drop-shadow-[0_4px_6px_rgba(44,24,16,0.25)] overflow-visible"
              viewBox="0 -12 52 80"
              fill="none"
            >
              <defs>
                <linearGradient id="goldWax5Front" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7D6" />
                  <stop offset="20%" stopColor="#F5D061" />
                  <stop offset="50%" stopColor="#D49A3D" />
                  <stop offset="80%" stopColor="#A76E24" />
                  <stop offset="100%" stopColor="#6E4110" />
                </linearGradient>
                <linearGradient id="goldWax5Side" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5E360D" />
                  <stop offset="100%" stopColor="#8C5318" />
                </linearGradient>
              </defs>

              {/* Sumbu Lilin yang Menancap ke Dalam Wax Lilin Angka 5 */}
              {/* Lelehan Wax di Tengah Atap Angka 5 */}
              <ellipse cx="27" cy="11.2" rx="3.5" ry="1.4" fill="#A76E24" opacity="0.6" />
              <ellipse cx="27" cy="11.0" rx="2.5" ry="1" fill="#D49A3D" opacity="0.8" />
              {/* Batang Sumbu Bertekstur Arang */}
              <path
                d="M27 11.5 C27 7.5 27.8 2.5 28.5 -2"
                stroke="#1C1917"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Ujung Sumbu Arang & Bara Merah */}
              <circle cx="28.5" cy="-2" r="1.3" fill="#292524" />
              {!isBlown ? (
                <circle cx="28.5" cy="-2" r="1" fill="#EF4444" className="animate-pulse" />
              ) : (
                <circle cx="28.5" cy="-2" r="0.8" fill="#B45309" opacity="0.8" />
              )}

              {/* 3D Depth Extrusion Shadow Behind */}
              <path
                d="M15 11H39V18H22V29C24 27.5 27 26.5 30 26.5C37 26.5 41 31.5 41 39.5C41 48 35.5 58 25 58C18 58 13 53 12 47H18.5C19.5 50 22 52.5 25 52.5C31 52.5 34 47.5 34 39.5C34 33 30.5 30 26 30C23 30 20 31.5 18 34H15V11Z"
                fill="url(#goldWax5Side)"
                transform="translate(2.5, 3)"
              />
              {/* Front Face Candle */}
              <path
                d="M15 11H39V18H22V29C24 27.5 27 26.5 30 26.5C37 26.5 41 31.5 41 39.5C41 48 35.5 58 25 58C18 58 13 53 12 47H18.5C19.5 50 22 52.5 25 52.5C31 52.5 34 47.5 34 39.5C34 33 30.5 30 26 30C23 30 20 31.5 18 34H15V11Z"
                fill="url(#goldWax5Front)"
                stroke="#FFF2A3"
                strokeWidth="1.2"
              />
              {/* Glossy Bevel Specular Highlight */}
              <path
                d="M18 13.5H37"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M26 33C30 33 33 35 34 39"
                stroke="#FFFFFF"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>

        {/* ================= REALISTIC ARTISAN TIRAMISU CAKE ================= */}
        <div className="relative w-72 sm:w-80 flex flex-col items-center z-20">
          {/* Top Layer Cream Dollops (Piped Mascarpone Swirls keliling di depan lilin) */}
          <div className="w-[260px] sm:w-[280px] -mb-3 z-30 flex justify-between px-1 pointer-events-none">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="relative w-6 h-6 rounded-full bg-gradient-to-b from-[#FFFDF9] via-[#FCEFD9] to-[#E8D1B5] shadow-[0_3px_5px_rgba(44,24,16,0.18)] flex items-center justify-center border border-amber-100/60"
              >
                {/* Pucuk Swirl Melingkar */}
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-50 to-[#D4A373]/60 shadow-inner" />
                {/* Dusting Kakao di pucuk krim */}
                <div className="absolute top-1 w-1.5 h-1.5 bg-[#4A2E1B]/70 rounded-full blur-[0.4px]" />
              </div>
            ))}
          </div>

          {/* Garnish Mewah di atas kue: Biji Kopi Panggang & Pirouette Chocolate Curls */}
          <div className="absolute top-1 w-[240px] flex justify-between px-4 z-20 pointer-events-none">
            {/* Biji Kopi Kiri */}
            <div className="w-4 h-2.5 bg-gradient-to-r from-[#2A150C] via-[#4A2818] to-[#1F0E07] rounded-full shadow-md rotate-[-25deg] relative flex items-center justify-center border border-amber-900/40">
              <div className="w-3 h-0.5 bg-[#140804] rounded-full shadow-xs" />
              <div className="absolute top-0.5 right-1 w-1 h-0.5 bg-amber-200/40 rounded-full blur-[0.3px]" />
            </div>

            {/* Biji Kopi Kanan & Cokelat Rol */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-2 bg-gradient-to-r from-[#5A3822] via-[#E8CCB0] to-[#5A3822] rounded-full shadow-sm rotate-[18deg] border border-[#3E2314]/30" />
              <div className="w-4 h-2.5 bg-gradient-to-r from-[#2A150C] via-[#4A2818] to-[#1F0E07] rounded-full shadow-md rotate-[30deg] relative flex items-center justify-center border border-amber-900/40">
                <div className="w-3 h-0.5 bg-[#140804] rounded-full shadow-xs" />
                <div className="absolute top-0.5 right-1 w-1 h-0.5 bg-amber-200/40 rounded-full blur-[0.3px]" />
              </div>
            </div>
          </div>

          {/* TIER 1: Puncak Kue (Velvety Cocoa Top with 3D Depth) */}
          <div className="w-[250px] sm:w-[270px] h-12 bg-gradient-to-b from-[#4A2B19] via-[#3E2315] to-[#341B0E] rounded-t-3xl relative overflow-hidden shadow-[inset_0_4px_8px_rgba(255,255,255,0.1),inset_0_-4px_6px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center border-t border-amber-200/30">
            {/* Tekstur Bubuk Kakao Beludru (Velvety Cocoa Powder Dusting) */}
            <div className="absolute inset-0 opacity-45 bg-[radial-gradient(#1E0F07_1.5px,transparent_1.5px)] [background-size:4px_4px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />

            {/* Edible Gold Leaf Accents */}
            <div className="absolute top-2 left-6 w-1.5 h-1.5 bg-amber-300 rounded-full blur-[0.3px] opacity-80" />
            <div className="absolute top-3 right-8 w-2 h-1 bg-yellow-200 rounded-full blur-[0.4px] opacity-75" />

            {/* Plakat Cokelat Kecil "Tiramisu Special 25" */}
            <div className="relative z-10 px-4 py-0.5 rounded-full bg-gradient-to-r from-[#2A150C]/90 via-[#402213]/95 to-[#2A150C]/90 border border-amber-400/50 shadow-md">
              <span className="text-amber-200 text-[10.5px] font-serif-title tracking-widest uppercase font-semibold drop-shadow-xs">
                ✦ Tiramisu Special 25 ✦
              </span>
            </div>
          </div>

          {/* Lelehan Cokelat Ganache Organik (Ganache Drips) */}
          <div className="w-[250px] sm:w-[270px] h-3.5 -mt-1 relative z-20 overflow-visible pointer-events-none">
            <svg className="w-full h-4 text-[#341B0E]" viewBox="0 0 270 16" fill="currentColor">
              <path d="M0,0 L270,0 L270,3 C255,3 252,11 245,11 C238,11 235,2 225,2 C215,2 212,9 204,9 C196,9 193,1 180,1 C168,1 164,13 155,13 C146,13 143,3 130,3 C117,3 114,10 105,10 C96,10 93,2 80,2 C68,2 64,12 55,12 C46,12 43,1 30,1 C18,1 14,8 0,3 Z" />
            </svg>
          </div>

          {/* TIER 2: Middle Layer - Mascarpone Mousse & Savoiardi Sponge */}
          <div className="w-[264px] sm:w-[286px] h-8 bg-gradient-to-b from-[#FFF9EE] via-[#F7ECE1] to-[#EEDBCE] border-y border-[#C48B47]/40 shadow-inner flex items-center justify-between px-3 relative overflow-hidden">
            {/* Efek Biskuit Savoiardi berpori di balik krim */}
            <div className="absolute inset-x-0 h-2 bg-[#D4A373]/30 blur-[1px] top-3" />
            {/* Cokelat chips & Mascarpone dots */}
            {[...Array(7)].map((_, i) => (
              <div key={i} className="relative flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#8C5E28]/60 to-[#4A2E1B]/80 shadow-xs" />
                <span className="w-1 h-1 rounded-full bg-amber-100/80 absolute top-0.5" />
              </div>
            ))}
          </div>

          {/* TIER 3: Bottom Layer - Rich Espresso Sponge Cake */}
          <div className="w-[276px] sm:w-[300px] h-13 bg-gradient-to-b from-[#3E2315] via-[#2F1A0F] to-[#22120A] rounded-b-2xl shadow-[0_12px_24px_rgba(44,24,16,0.35),inset_0_2px_4px_rgba(255,255,255,0.15)] relative flex items-center justify-center border-t border-[#5E381E] overflow-hidden">
            {/* Shading silinder 3D (gelap di pinggir, terang di tengah) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:6px_6px]" />

            {/* Plakat Cokelat Mewah Bertuliskan Nama */}
            <div className="relative z-10 px-4 sm:px-6 py-1.5 rounded-xl bg-gradient-to-r from-[#200F07]/90 via-[#361B0E]/95 to-[#200F07]/90 border border-amber-300/60 shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,215,0,0.3)]">
              <span className="text-amber-200 font-serif-title text-[11px] sm:text-[12px] tracking-wider font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                ★ FOR EVINA DINI ANJRIANI ★
              </span>
            </div>
          </div>

          {/* Pedestal Stand / Piring Porselen Mewah dengan List Emas */}
          <div className="w-[300px] sm:w-[326px] h-4 bg-gradient-to-r from-[#D4A373] via-[#FFF3D6] to-[#C48B47] rounded-full shadow-[0_8px_20px_rgba(44,24,16,0.25)] mt-1.5 border-t border-white/80 relative flex items-center justify-center">
            {/* Inner Porcelain Rim */}
            <div className="w-[290px] sm:w-[316px] h-2 bg-gradient-to-r from-[#FDFBF7] via-[#FFFDF9] to-[#F3EDE2] rounded-full shadow-inner border border-amber-200/50" />
          </div>

          {/* Kaki Cake Stand (Pedestal Base Shadow) */}
          <div className="w-24 sm:w-28 h-2.5 bg-gradient-to-b from-[#C48B47] to-[#8C5E28] rounded-b-lg shadow-md -mt-0.5 border-t border-amber-200/40" />
          {/* Bayangan Meja Berlapis (Drop Shadow on Table) */}
          <div className="w-[280px] sm:w-[310px] h-3 bg-black/20 rounded-full blur-md -mt-1.5" />
        </div>
      </div>

      {/* Peringatan jika mencoba meniup sebelum mengunci doa */}
      {wishWarning && (
        <div className="w-full max-w-md my-2 p-3 bg-amber-50 border border-amber-300 text-[#8C5E28] rounded-2xl text-[12px] text-center font-medium shadow-sm animate-bounce">
          {wishWarning}
        </div>
      )}

      {/* Kontrol & Petunjuk Interaksi Berdasarkan Urutan */}
      <div className="mt-6 sm:mt-8 mb-2 text-center w-full max-w-md">
        {!isBlown ? (
          /* TAHAP 1 & 2 SEBELUM LILIN PADAM */
          <div className="w-full bg-[#FAF7F2] border border-amber-200/70 rounded-3xl p-5 sm:p-6 shadow-sm animate-[fadeIn_0.5s_ease-out]">
            {!savedWish || isEditingWish ? (
              /* URUTAN 1: TULIS HARAPAN TERLEBIH DAHULU */
              <form onSubmit={handleSaveWish} className="flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-[#8C5E28] text-[11px] font-semibold mb-2 border border-amber-300/40">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tahap 1 dari 2: Buat Harapan (Make a Wish)</span>
                </div>

                <h4 className="font-serif-title font-bold text-[18px] sm:text-[20px] text-[#2C1810]">
                  Apa Doa & Impian Terbesarmu di Usia 25? 🕯️
                </h4>
                <p className="text-[#6F4E37] text-[12px] sm:text-[13px] mt-1 max-w-sm">
                  Pejamkan matamu sejenak. Tuliskan satu atau beberapa impianmu di bawah lalu kunci sebelum kita tiup lilinnya.
                </p>

                <textarea
                  ref={textareaRef}
                  value={inputWish}
                  onChange={(e) => setInputWish(e.target.value)}
                  placeholder="Contoh: Semoga karirku semakin berkah, kita selalu bahagia bareng, dan selalu diberi kesehatan lahir batin..."
                  rows={3}
                  className="w-full mt-3 p-3.5 rounded-2xl bg-[#FFFDF9] border border-amber-300/80 text-[#2C1810] text-[13px] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8C5E28]/50 shadow-inner resize-none font-body"
                />

                <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5 w-full">
                  <button
                    type="submit"
                    className="min-h-[44px] px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8C5E28] to-[#C48B47] text-white text-[12px] font-semibold flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Kunci Doa & Lanjut Tiup Lilin ➔</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSilentWish}
                    className="min-h-[44px] px-4 py-2.5 rounded-full bg-[#FFFDF9] text-[#8C5E28] border border-amber-300/60 hover:bg-amber-50 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    title="Jika ingin berdoa di dalam hati tanpa mengetik panjang"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>Doa dalam Hati</span>
                  </button>
                </div>
              </form>
            ) : (
              /* URUTAN 2: HARAPAN SUDAH TERKUNCI -> SEKARANG TIUP LILINNYA! */
              <div className="flex flex-col items-center text-center animate-[fadeIn_0.4s_ease-out]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-[11px] font-semibold mb-2 border border-emerald-300/40">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tahap 2 dari 2: Doa Terkunci! Sekarang Tiup Lilinnya 🎂💨</span>
                </div>

                <div className="w-full my-2.5 p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-inner">
                  <p className="text-[10.5px] uppercase tracking-wider text-[#A78A7F] font-semibold mb-1">
                    Permohonan Evina di Usia 25:
                  </p>
                  <div className="max-h-24 sm:max-h-32 overflow-y-auto pr-1">
                    <p className="font-handwriting text-xl sm:text-2xl text-[#3A2318] leading-relaxed">
                      "{savedWish}"
                    </p>
                  </div>
                </div>

                <p className="text-[#6F4E37] text-[12px] mb-2">
                  Api lilin masih menyala. Tiup langsung atau gunakan mikrofon ponselmu!
                </p>

                {/* Tombol Tiup Lilin */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-0.5 w-full">
                  <button
                    onClick={() => triggerBlow(true)}
                    type="button"
                    className="min-h-[46px] px-7 py-3 rounded-full bg-gradient-to-r from-[#8C5E28] to-[#C48B47] text-white font-semibold text-[13px] shadow-[0_4px_16px_rgba(140,94,40,0.3)] hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-amber-200/40 animate-pulse"
                  >
                    <Wind className="w-4 h-4" />
                    <span>Tiup Lilin Sekarang</span>
                  </button>

                  <button
                    onClick={toggleMicDetection}
                    type="button"
                    className={`min-h-[46px] px-6 py-3 rounded-full font-semibold text-[13px] transition-all flex items-center gap-2 cursor-pointer border ${
                      isListeningMic
                        ? "bg-rose-500 text-white animate-pulse border-rose-400"
                        : "bg-[#FFFDF9] text-[#4A2E1B] border-amber-300/60 hover:bg-[#E6CCB2]/40"
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    <span>{isListeningMic ? "Mendengarkan Tiupan..." : "Tiup Pakai Mic"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setInputWish(savedWish);
                      setIsEditingWish(true);
                    }}
                    type="button"
                    className="min-h-[42px] px-3.5 py-2 rounded-full text-[#8C5E28]/80 hover:text-[#4A2E1B] text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Ubah Doa</span>
                  </button>
                </div>

                {isListeningMic && (
                  <p className="text-[12px] text-amber-800 animate-pulse mt-2.5 flex items-center justify-center gap-1.5 font-medium">
                    <Wind className="w-3.5 h-3.5 animate-bounce" />
                    Dekatkan mulut ke mikrofon lalu hembuskan nafasmu!
                  </p>
                )}

                {micError && (
                  <p className="text-[12px] text-rose-600 bg-rose-50 p-2.5 rounded-xl mt-2 border border-rose-200">
                    {micError}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          /* TAHAP 3: LILIN PADAM - HORE! SELEBRASI HARAPAN */
          <div className="w-full bg-[#FAF7F2] border border-amber-200/70 rounded-3xl p-5 sm:p-6 shadow-sm animate-[fadeIn_0.5s_ease-out]">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-[11px] font-semibold mb-2 border border-emerald-300/40">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>✨ Lilin Padam & Harapan Dikirim ke Langit! ✨</span>
              </div>

              <h4 className="font-serif-title font-bold text-[20px] sm:text-[22px] text-[#2C1810]">
                Selamat 25 Tahun, Evina Sayang! 🎉
              </h4>

              {savedWish && (
                <div className="w-full my-3.5 p-4 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-inner">
                  <p className="text-[10px] uppercase tracking-wider text-[#A78A7F] font-semibold mb-1">
                    Doa yang Ditiupkan Bersama Lilin:
                  </p>
                  <p className="font-handwriting text-xl sm:text-2xl text-[#3A2318] leading-relaxed">
                    "{savedWish}"
                  </p>
                </div>
              )}

              <p className="text-[#6F4E37] text-[13px] leading-relaxed italic mb-4">
                "Semoga setiap langkahmu di usia 25 tahun ini senantiasa dipeluk keberkahan, hatimu selalu tenang, dan senyummu selalu merekah indah. Aamiin! ❤️"
              </p>

              {/* Tombol Opsi: Nyalakan Lilin Kembali */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
                <button
                  onClick={() => setIsBlown(false)}
                  type="button"
                  className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#FFFDF9] border border-amber-300/70 text-[#8C5E28] hover:bg-amber-100/50 text-[12px] font-semibold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nyalakan lilin lagi</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

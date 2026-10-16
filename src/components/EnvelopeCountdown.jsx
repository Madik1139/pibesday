import React, { useState, useEffect } from "react";
import { Lock, Clock, Heart, Sparkles, Coffee } from "lucide-react";
import { envelopeLockConfig } from "../data/coffeeContent";

/**
 * EnvelopeCountdown Component
 * Menghitung mundur waktu secara real-time menuju jam 00:00 17 Oktober 2026.
 * Dilengkapi visual bergaya Warm Coffee & Vintage Kraft.
 */
export default function EnvelopeCountdown({ targetTime, onUnlock, isLocked }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    return Math.max(0, targetTime - Date.now());
  });

  useEffect(() => {
    // Update setiap detik
    const timer = setInterval(() => {
      const remaining = Math.max(0, targetTime - Date.now());
      setTimeLeft(remaining);

      if (remaining <= 0 && isLocked) {
        if (onUnlock) onUnlock();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime, isLocked, onUnlock]);

  // Jika sudah tidak terkunci
  if (!isLocked || timeLeft <= 0) {
    return (
      <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out] mt-3 mb-1">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/60 shadow-xs text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: "3s" }} />
          <span>{envelopeLockConfig.badgeUnlocked}</span>
        </div>
      </div>
    );
  }

  // Perhitungan unit waktu
  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num) => String(num).padStart(2, "0");

  return (
    <div className="flex flex-col items-center mt-3 mb-2 animate-[fadeIn_0.6s_ease-out]">
      {/* Status Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF7F2]/90 border border-amber-300/60 text-[#8C5E28] text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xs mb-3">
        <Lock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
        <span>{envelopeLockConfig.badgeLocked}</span>
      </div>

      {/* Countdown Card Box */}
      <div className="flex items-center gap-2 sm:gap-3 bg-[#FAF7F2]/95 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-[#C48B47]/35 shadow-[0_8px_25px_-6px_rgba(44,24,16,0.12)]">
        {days > 0 && (
          <>
            <div className="flex flex-col items-center min-w-[46px] sm:min-w-[54px]">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#2C1810] leading-none">
                {pad(days)}
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-[#8C5E28] tracking-widest uppercase mt-1">
                HARI
              </span>
            </div>
            <span className="font-mono text-lg font-bold text-[#8C5E28]/60 pb-3">:</span>
          </>
        )}

        <div className="flex flex-col items-center min-w-[46px] sm:min-w-[54px]">
          <span className="font-mono text-xl sm:text-2xl font-bold text-[#2C1810] leading-none">
            {pad(hours)}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-[#8C5E28] tracking-widest uppercase mt-1">
            JAM
          </span>
        </div>

        <span className="font-mono text-lg font-bold text-[#8C5E28]/60 pb-3 animate-pulse">:</span>

        <div className="flex flex-col items-center min-w-[46px] sm:min-w-[54px]">
          <span className="font-mono text-xl sm:text-2xl font-bold text-[#2C1810] leading-none">
            {pad(minutes)}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-[#8C5E28] tracking-widest uppercase mt-1">
            MENIT
          </span>
        </div>

        <span className="font-mono text-lg font-bold text-[#8C5E28]/60 pb-3 animate-pulse">:</span>

        <div className="flex flex-col items-center min-w-[46px] sm:min-w-[54px]">
          <span className="font-mono text-xl sm:text-2xl font-bold text-rose-700 leading-none">
            {pad(seconds)}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-[#8C5E28] tracking-widest uppercase mt-1">
            DETIK
          </span>
        </div>
      </div>
    </div>
  );
}

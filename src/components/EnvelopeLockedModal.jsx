import React from "react";
import { Lock, Heart, Clock, Sparkles, X } from "lucide-react";
import { envelopeLockConfig } from "../data/coffeeContent";

/**
 * EnvelopeLockedModal Component
 * Dialog romantis yang muncul saat amplop diketuk sebelum jam 00:00 17 Oktober.
 */
export default function EnvelopeLockedModal({ isOpen, onClose, targetTime }) {
  if (!isOpen) return null;

  // Hitung sisa waktu saat modal terbuka
  const remaining = Math.max(0, targetTime - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (num) => String(num).padStart(2, "0");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]">
      {/* Kartu Dialog */}
      <div 
        className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F5EBE0] rounded-3xl p-6 sm:p-7 border-2 border-[#C48B47]/50 shadow-[0_20px_50px_rgba(44,24,16,0.35)] text-center flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup X di Sudut Kanan Atas */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-amber-100/70 hover:bg-amber-200 text-[#8C5E28] flex items-center justify-center transition-all cursor-pointer active:scale-90"
          aria-label="Tutup Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Kapsul Lilin & Gembok Cinta */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E5AD58] via-[#C48B47] to-[#8C5E28] border-2 border-[#FAF0CA] shadow-[0_6px_20px_rgba(140,94,40,0.35)] flex items-center justify-center">
            <Lock className="w-7 h-7 text-white drop-shadow-sm" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center shadow-xs">
            <Heart className="w-3.5 h-3.5 text-white fill-white animate-pulse" />
          </div>
        </div>

        {/* Judul & Sub-judul */}
        <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#2C1810]">
          {envelopeLockConfig.modalTitle}
        </h3>
        <p className="text-xs sm:text-[13px] font-semibold text-[#8C5E28] mt-1 uppercase tracking-wider">
          {envelopeLockConfig.modalSubtitle}
        </p>

        {/* Pesan Romantis dari Mas Dika */}
        <div className="mt-3.5 space-y-2 text-xs sm:text-sm text-[#5C3D28] font-body leading-relaxed bg-[#FAF7F2]/80 p-3.5 rounded-2xl border border-amber-200/50">
          {envelopeLockConfig.modalParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Mini Countdown di dalam Dialog */}
        <div className="mt-4 flex items-center justify-center gap-2 bg-[#E6CCB2]/40 px-4 py-2 rounded-xl border border-[#C48B47]/30">
          <Clock className="w-4 h-4 text-[#8C5E28]" />
          <span className="text-xs text-[#5C3D28] font-medium">Buka otomatis dalam:</span>
          <span className="font-mono text-sm sm:text-base font-bold text-[#2C1810]">
            {pad(hours)} : {pad(minutes)} : {pad(seconds)}
          </span>
        </div>

        {/* Tombol Utama */}
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full min-h-[44px] px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8C5E28] via-[#C48B47] to-[#8C5E28] text-white font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(140,94,40,0.3)] hover:shadow-[0_6px_20px_rgba(140,94,40,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>{envelopeLockConfig.modalCloseText}</span>
        </button>
      </div>
    </div>
  );
}

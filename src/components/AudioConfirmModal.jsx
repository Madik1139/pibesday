import React from "react";
import { Volume2, Sparkles, Heart, Headphones, X, Bell } from "lucide-react";
import { playSparkleSound } from "../utils/audio";

/**
 * AudioConfirmModal Component
 * Konfirmasi manis sebelum amplop dibuka agar Evina memastikan
 * volume perangkat sudah cukup besar atau menggunakan earphone.
 */
export default function AudioConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const handleTestSound = () => {
    try {
      playSparkleSound();
    } catch (e) {
      console.warn("Audio test error:", e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]">
      <div 
        className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F5EBE0] rounded-3xl p-6 sm:p-7 border-2 border-[#C48B47]/50 shadow-[0_20px_50px_rgba(44,24,16,0.35)] text-center flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup X */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-amber-100/70 hover:bg-amber-200 text-[#8C5E28] flex items-center justify-center transition-all cursor-pointer active:scale-90"
          aria-label="Tutup Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ikon Headphone & Volume Berdenyut */}
        <div className="relative mb-3 mt-1">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E5AD58] via-[#C48B47] to-[#8C5E28] border-2 border-[#FAF0CA] shadow-[0_6px_20px_rgba(140,94,40,0.3)] flex items-center justify-center">
            <Volume2 className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center shadow-xs">
            <Headphones className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Judul & Pesan Manis */}
        <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#2C1810]">
          Cek Volume Suaramu Dulu Yaa 🎧💖
        </h3>
        
        <p className="text-xs sm:text-sm text-[#6F4E37] font-body mt-2 leading-relaxed px-2">
          Ada alunan musik romantis dan efek suara spesial yang sudah disiapkan. Pastikan volume HP-mu sudah dinaikkan atau pakai earphone yaa sayang...
        </p>

        {/* Tombol Mini Tes Suara */}
        <button
          type="button"
          onClick={handleTestSound}
          className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100/80 hover:bg-amber-200/90 text-[#8C5E28] text-xs font-semibold border border-amber-300/60 shadow-2xs transition-all active:scale-95 cursor-pointer"
        >
          <Bell className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
          <span>Coba Tes Bunyi Lonceng ✨</span>
        </button>

        {/* Tombol Aksi Utama */}
        <div className="mt-5 w-full flex flex-col gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full min-h-[44px] px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8C5E28] via-[#C48B47] to-[#8C5E28] text-white font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(140,94,40,0.35)] hover:shadow-[0_6px_20px_rgba(140,94,40,0.45)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-100" />
            <span>Volume Sudah Siap, Buka Amplop! ✨</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-1.5 text-xs text-[#8C5E28]/80 hover:text-[#5C3D28] font-medium transition-colors cursor-pointer"
          >
            Sebentar, Mau Pasang Headset Dulu
          </button>
        </div>

      </div>
    </div>
  );
}

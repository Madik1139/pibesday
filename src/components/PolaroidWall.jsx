import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { polaroidMemories } from "../data/coffeeContent";
import { playSparkleSound } from "../utils/audio";
import confetti from "canvas-confetti";
import {
  Camera,
  RotateCcw,
  Heart,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
  Coffee,
  Grid,
  User,
  Smile
} from "lucide-react";

// Kategori Filter Tab Galeri Polaroid
const filterCategories = [
  { id: "all", label: "Semua Momen", icon: Sparkles },
  { id: "solo", label: "Bidadariku", icon: User },
  { id: "grid", label: "Ekspresi Gemas", icon: Grid },
  { id: "couple", label: "Kita Berdua", icon: Heart },
  { id: "kiss", label: "Kecupan Kasih", icon: Smile },
];

export default function PolaroidWall() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [flippedCards, setFlippedCards] = useState({});
  const [likes, setLikes] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalFlipped, setIsModalFlipped] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Touch Swipe Gesture State untuk Navigasi Foto di Layar HP
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Filter foto berdasarkan kategori yang dipilih
  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") return polaroidMemories;
    return polaroidMemories.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Jika di tab 'all', tampilkan 6 foto default atau seluruh 25 foto jika diekspansi.
  // Jika di tab kategori spesifik, tampilkan seluruh foto pada kategori tersebut!
  const displayedPhotos = useMemo(() => {
    if (activeFilter === "all") {
      return showAllPhotos ? filteredPhotos : filteredPhotos.slice(0, 6);
    }
    return filteredPhotos;
  }, [activeFilter, showAllPhotos, filteredPhotos]);

  const handleFilterChange = (catId) => {
    setActiveFilter(catId);
    playSparkleSound();
  };

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    playSparkleSound();
  };

  const triggerHeartBurst = (e) => {
    try {
      const rect = e?.currentTarget?.getBoundingClientRect();
      const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
      const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

      confetti({
        particleCount: 24,
        spread: 55,
        origin: { x, y },
        colors: ["#E11D48", "#FB7185", "#FDA4AF", "#C48B47", "#FAF0CA"],
      });
    } catch {
      // fallback
    }
  };

  const handleLike = (id, e) => {
    e?.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    playSparkleSound();
    triggerHeartBurst(e);
  };

  const openLightbox = (idx, e) => {
    e?.stopPropagation();
    setSelectedIndex(idx);
    setIsModalFlipped(false);
    playSparkleSound();
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setIsModalFlipped(false);
  };

  const handlePrev = useCallback(
    (e) => {
      e?.stopPropagation();
      if (selectedIndex === null || filteredPhotos.length === 0) return;
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
      setIsModalFlipped(false);
      playSparkleSound();
    },
    [selectedIndex, filteredPhotos.length]
  );

  const handleNext = useCallback(
    (e) => {
      e?.stopPropagation();
      if (selectedIndex === null || filteredPhotos.length === 0) return;
      setSelectedIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
      setIsModalFlipped(false);
      playSparkleSound();
    },
    [selectedIndex, filteredPhotos.length]
  );

  // Touch Swipe Gesture Handling untuk Layar HP
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      // Geser ke kiri -> Foto berikutnya
      handleNext();
    } else if (distance < -45) {
      // Geser ke kanan -> Foto sebelumnya
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Dukungan Navigasi Keyboard (Left, Right, Escape, Space to Flip)
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setIsModalFlipped((prev) => !prev);
        playSparkleSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  const currentPhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  return (
    <div className="w-full">
      {/* Header Galeri */}
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300/40 text-[#8C5E28] text-[11px] font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
          <Camera className="w-3.5 h-3.5 text-[#8C5E28]" />
          <span>Momen Hangat Kita</span>
        </div>
        <h3 className="font-serif-title text-[24px] sm:text-[32px] font-bold text-[#2C1810]">
          Galeri Perjalanan Bersamamu
        </h3>
        <p className="text-[13px] sm:text-[15px] text-[#6F4E37] mt-1.5 max-w-lg mx-auto leading-relaxed">
          Sentuh foto untuk membaca pesan rahasia di baliknya, atau pilih kategori di bawah untuk menyusuri setiap babak kenangan ✨
        </p>
      </div>

      {/* Tab Filter Kategori Cantik, Responsif, & Thumb-Friendly */}
      <div className="flex items-center justify-center mb-8 px-2">
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-[#FAF7F2] border border-amber-200/80 shadow-xs max-w-full overflow-x-auto no-scrollbar scroll-smooth">
          {filterCategories.map((cat) => {
            const Icon = cat.icon;
            const count =
              cat.id === "all"
                ? polaroidMemories.length
                : polaroidMemories.filter((p) => p.category === cat.id).length;
            const isActive = activeFilter === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleFilterChange(cat.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer min-h-[38px] select-none ${
                  isActive
                    ? "bg-gradient-to-r from-[#8C5E28] via-[#C48B47] to-[#8C5E28] text-white shadow-md shadow-amber-900/15"
                    : "text-[#6F4E37] hover:text-[#3A2318] hover:bg-amber-100/60"
                } active:scale-95`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-100" : "text-[#8C5E28]"}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-amber-100 text-[#8C5E28]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Polaroids (Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {displayedPhotos.map((item, idx) => {
          const isFlipped = !!flippedCards[item.id];
          return (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.45,
                delay: (idx % 6) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`flip-card h-[380px] sm:h-[410px] max-w-sm mx-auto w-full cursor-pointer select-none rounded-2xl ${
                isFlipped ? "flipped" : ""
              }`}
              onClick={() => handleCardClick(item.id)}
            >
              <div className="flip-card-inner rounded-2xl">
                {/* Sisi Depan: Polaroid Photo Frame */}
                <div className="flip-card-front bg-[#FFFDF9] p-3.5 pb-5 rounded-2xl shadow-[0_8px_30px_-6px_rgba(44,24,16,0.08)] border border-amber-200/60 flex flex-col items-center justify-between hover:shadow-[0_16px_40px_-6px_rgba(44,24,16,0.16)] hover:-translate-y-1 transition-all">
                  {/* Washi Tape Accent */}
                  <div className="w-20 h-5 bg-[#E6CCB2]/80 -mt-5 mb-2 -rotate-1 shadow-xs rounded-xs border border-[#C48B47]/30 flex items-center justify-center">
                    <span className="text-[8.5px] font-mono tracking-widest text-[#8C5E28] uppercase opacity-80">
                      MEMORY
                    </span>
                  </div>

                  {/* Wadah Gambar dengan Aspek Rasio Rapi */}
                  <div className="relative w-full h-56 sm:h-64 bg-amber-50/50 rounded-xl overflow-hidden shadow-inner group">
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Tag Lokasi / Kategori di Pojok Kiri Atas */}
                    {item.tag && (
                      <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2C1810]/75 backdrop-blur-md text-amber-100 text-[10px] font-medium tracking-wide shadow-xs border border-amber-300/20">
                        <Tag className="w-2.5 h-2.5 text-amber-300" />
                        <span>{item.tag}</span>
                      </span>
                    )}

                    {/* Tombol Perbesar Foto (Lightbox Trigger) */}
                    <button
                      type="button"
                      onClick={(e) => openLightbox(idx, e)}
                      className="absolute bottom-2.5 right-2.5 min-w-[40px] min-h-[40px] p-2.5 rounded-full bg-[#2C1810]/80 hover:bg-[#2C1810] text-amber-100 backdrop-blur-md opacity-90 hover:opacity-100 transition-all shadow-md active:scale-90 cursor-pointer z-10 flex items-center justify-center"
                      title="Perbesar foto"
                      aria-label="Perbesar foto"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Keterangan Bawah Polaroid */}
                  <div className="mt-2.5 flex items-center justify-between w-full px-1 gap-2">
                    <div className="text-left min-w-0 flex-1">
                      <p className="font-handwriting text-lg sm:text-xl text-[#2C1810] font-bold truncate leading-tight">
                        {item.caption}
                      </p>
                      <span className="text-[10px] text-[#8C5E28] inline-flex items-center gap-1 mt-0.5">
                        <RotateCcw className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate">Sentuh untuk membalik</span>
                      </span>
                    </div>

                    {/* Tombol Beri Cinta */}
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      type="button"
                      title="Beri cinta untuk kenangan ini"
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-rose-50 border border-amber-200/80 transition-all active:scale-90 cursor-pointer min-h-[36px]"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-colors ${
                          likes[item.id] ? "text-rose-500 fill-rose-500" : "text-[#8C5E28]"
                        }`}
                      />
                      <span className="text-[11px] font-bold text-[#3A2318]">
                        {(likes[item.id] || 0) + 124}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Sisi Belakang: Surat Cinta Polaroid Bergaya Kertas Kraft Pos */}
                <div className="flip-card-back bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl shadow-md border-2 border-[#D4A373] flex flex-col justify-between text-center relative overflow-hidden">
                  {/* Watermark Stempel Kopi Halus */}
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full border-2 border-[#C48B47]/20 flex items-center justify-center pointer-events-none rotate-12">
                    <Coffee className="w-12 h-12 text-[#C48B47]/15" />
                  </div>

                  {/* Header Sisi Belakang: Tag & Tombol Fullscreen Foto */}
                  <div className="w-full flex items-center justify-between border-b border-amber-200/60 pb-2 relative z-10">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#8C5E28]">
                      {item.tag || "LOVE NOTE"}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => openLightbox(idx, e)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-[#8C5E28] text-[10.5px] font-semibold border border-amber-300/60 shadow-xs active:scale-95 transition-all cursor-pointer"
                      title="Lihat foto ukuran penuh"
                    >
                      <Maximize2 className="w-3 h-3 text-[#8C5E28]" />
                      <span>Fullscreen</span>
                    </button>
                  </div>

                  {/* Body Tengah: Teks Cerita Tanpa Ada Tombol Menutupi */}
                  <div className="my-auto py-3 px-1 relative z-10">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C5E28] block mb-1">
                      {item.caption}
                    </span>
                    <p className="font-handwriting text-xl sm:text-2xl text-[#2C1810] leading-relaxed">
                      "{item.backNote}"
                    </p>
                  </div>

                  {/* Footer Sisi Belakang: Tanda Tangan, Tombol Love, & Tombol Balik */}
                  <div className="w-full pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-[#8C5E28] relative z-10">
                    <span className="font-medium">With love, Dika 🤎</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleLike(item.id, e)}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 hover:bg-rose-50 border border-amber-200/80 active:scale-90 transition-all cursor-pointer"
                        title="Beri cinta"
                      >
                        <Heart
                          className={`w-3 h-3 ${
                            likes[item.id] ? "text-rose-500 fill-rose-500" : "text-[#8C5E28]"
                          }`}
                        />
                        <span className="text-[10px] font-bold text-[#3A2318]">
                          {(likes[item.id] || 0) + 124}
                        </span>
                      </button>
                      <span className="inline-flex items-center gap-1 text-[#8C5E28]/80 hover:text-[#2C1810]">
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>Balik</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tombol Tampilkan Lebih Banyak / Sembunyikan (Hanya tampil di tab Semua Momen) */}
      {activeFilter === "all" && filteredPhotos.length > 6 && (
        <div className="text-center mt-8 sm:mt-10">
          <button
            type="button"
            onClick={() => {
              setShowAllPhotos((prev) => !prev);
              playSparkleSound();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-amber-100/70 border border-amber-300/60 text-[#3A2318] text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer min-h-[44px]"
          >
            <Grid className="w-4 h-4 text-[#8C5E28]" />
            <span>
              {showAllPhotos
                ? "Tampilkan 6 Momen Utama Saja"
                : `Buka Seluruh Album Lengkap (${polaroidMemories.length} Kenangan) ✨`}
            </span>
          </button>
        </div>
      )}

      {/* Modal Lightbox Foto HD Interaktif (3D Card & Thumb-Friendly Navigation) */}
      <AnimatePresence>
        {selectedIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md select-none overflow-y-auto"
            onClick={closeLightbox}
          >
            {/* Tombol Tutup Pojok Kanan Atas di Layar Gelap (Desktop Only) */}
            <button
              onClick={closeLightbox}
              type="button"
              className="hidden sm:flex fixed top-4 right-4 sm:top-6 sm:right-6 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#2C1810]/85 hover:bg-[#2C1810] text-amber-100 items-center justify-center shadow-xl border border-amber-300/30 cursor-pointer active:scale-95 transition-all z-[90]"
              title="Tutup (Esc)"
              aria-label="Tutup foto"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tombol Navigasi Sebelumnya (Prev) - Khusus Desktop */}
            <button
              onClick={handlePrev}
              type="button"
              className="hidden sm:flex fixed left-3 md:left-6 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#2C1810]/85 hover:bg-[#2C1810] text-amber-100 items-center justify-center shadow-2xl border border-amber-300/30 cursor-pointer active:scale-90 transition-all z-[90]"
              title="Foto sebelumnya (Panah Kiri)"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Tombol Navigasi Berikutnya (Next) - Khusus Desktop */}
            <button
              onClick={handleNext}
              type="button"
              className="hidden sm:flex fixed right-3 md:right-6 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#2C1810]/85 hover:bg-[#2C1810] text-amber-100 items-center justify-center shadow-2xl border border-amber-300/30 cursor-pointer active:scale-90 transition-all z-[90]"
              title="Foto berikutnya (Panah Kanan)"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Kontainer Kartu Lightbox Modal 3D Interaktif */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              className="relative max-w-lg w-full bg-[#FFFDF9] rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-amber-200/80 my-auto z-[85]"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Header Modal: Indikator, Tag, Format Button, & Tombol Tutup (X) */}
              <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-amber-200/60 mb-2.5 sm:mb-3 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-[#8C5E28] bg-amber-100/90 px-2.5 sm:px-3 py-1 rounded-full border border-amber-300/40 flex items-center gap-1 shrink-0">
                    <Camera className="w-3.5 h-3.5 text-[#8C5E28]" />
                    <span>
                      {selectedIndex + 1} / {filteredPhotos.length}
                    </span>
                  </span>
                  {currentPhoto.tag && (
                    <span className="text-[11px] sm:text-xs font-medium text-amber-900 bg-amber-50 px-2 sm:px-2.5 py-1 rounded-full border border-amber-200/60 truncate max-w-[120px] sm:max-w-none">
                      {currentPhoto.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Tombol Toggle Mode Kartu Pos / Foto */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalFlipped((prev) => !prev);
                      playSparkleSound();
                    }}
                    className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-[#8C5E28] border border-amber-200 flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isModalFlipped ? "Lihat Foto" : "Kartu Pos"}</span>
                  </button>

                  {/* Tombol Tutup (X) Terintegrasi di Header Kartu untuk Mobile */}
                  <button
                    onClick={closeLightbox}
                    type="button"
                    className="sm:hidden w-8 h-8 rounded-full bg-amber-100/80 hover:bg-[#2C1810] text-[#4A2E1B] hover:text-amber-100 flex items-center justify-center border border-amber-300/50 cursor-pointer active:scale-95 transition-all"
                    title="Tutup (Esc)"
                    aria-label="Tutup"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tampilan Konten Modal (Bisa Berubah Mode: Foto Polaroid vs Kartu Pos Cerita) */}
              {!isModalFlipped ? (
                /* Mode 1: Tampilan Polaroid Asli */
                <div className="flex flex-col items-center">
                  <div className="w-full bg-[#2C1810]/5 rounded-2xl p-1.5 sm:p-2 border border-amber-200/50 shadow-inner overflow-hidden">
                    <img
                      src={currentPhoto.src}
                      alt={currentPhoto.caption}
                      className="w-full max-h-[58vh] sm:max-h-[62vh] object-contain rounded-xl mx-auto shadow-xs"
                      decoding="async"
                    />
                  </div>

                  <div className="w-full text-center mt-3 sm:mt-4 px-2">
                    <h4 className="font-handwriting text-2xl sm:text-3xl text-[#2C1810] font-bold">
                      {currentPhoto.caption}
                    </h4>
                    <p className="text-xs text-[#8C5E28] mt-1 flex items-center justify-center gap-1 font-mono">
                      <span>Babak Usia 25</span>
                      <span>•</span>
                      <span>Bandung ⇄ Bekasi</span>
                    </p>
                  </div>
                </div>
              ) : (
                /* Mode 2: Surat Pos Vintage (Lined Paper Effect) */
                <div className="bg-[#FAF7F2] p-5 sm:p-8 rounded-2xl border-2 border-[#D4A373] relative overflow-hidden flex flex-col justify-between min-h-[290px] sm:min-h-[340px] my-1 sm:my-2">
                  <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(#8C5E28_0px,#8C5E28_1px,transparent_1px,transparent_24px)] pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between border-b border-amber-200/80 pb-2.5">
                    <div className="flex items-center gap-1.5 text-[#8C5E28] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                      <Coffee className="w-3.5 h-3.5 text-[#8C5E28]" />
                      <span>SPECIAL BREW • CHAPTER 25</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-rose-500 bg-rose-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-rose-200">
                      {currentPhoto.tag || "Sweet Memory"}
                    </span>
                  </div>

                  <div className="relative z-10 my-auto py-4 sm:py-6 px-1 sm:px-2 text-center">
                    <span className="text-xs uppercase tracking-widest text-[#8C5E28] font-bold block mb-1.5 sm:mb-2">
                      {currentPhoto.caption}
                    </span>
                    <p className="font-handwriting text-xl sm:text-3xl text-[#2C1810] leading-relaxed">
                      "{currentPhoto.backNote}"
                    </p>
                  </div>

                  <div className="relative z-10 pt-2.5 border-t border-amber-200/80 flex items-center justify-between text-xs text-[#8C5E28]">
                    <span className="font-handwriting text-lg sm:text-xl text-[#3A2318] font-bold">
                      Mas Dika 🤎
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#8C5E28]/70">
                      17 Oktober • Bandung ⇄ Bekasi
                    </span>
                  </div>
                </div>
              )}

              {/* Bar Kontrol Navigasi & Aksi Bawah */}
              <div className="mt-3 sm:mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between gap-2">
                {/* Tombol Sebelumnya (Khusus Mobile) */}
                <button
                  onClick={handlePrev}
                  type="button"
                  className="sm:hidden min-h-[42px] px-3.5 py-2 rounded-full bg-amber-100/90 hover:bg-amber-200 text-[#8C5E28] font-semibold text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer border border-amber-300/50 shadow-xs"
                  title="Foto sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {/* Tombol Beri Cinta di Lightbox */}
                <button
                  type="button"
                  onClick={(e) => handleLike(currentPhoto.id, e)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-50 hover:bg-rose-50 border border-amber-200/80 active:scale-90 transition-all cursor-pointer min-h-[42px] shadow-xs mx-auto sm:mx-0 sm:ml-auto"
                  title="Beri cinta untuk kenangan ini"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likes[currentPhoto.id]
                        ? "text-rose-500 fill-rose-500"
                        : "text-[#8C5E28]"
                    }`}
                  />
                  <span className="text-xs font-bold text-[#2C1810]">
                    {(likes[currentPhoto.id] || 0) + 124} Cinta
                  </span>
                </button>

                {/* Tombol Berikutnya (Khusus Mobile) */}
                <button
                  onClick={handleNext}
                  type="button"
                  className="sm:hidden min-h-[42px] px-3.5 py-2 rounded-full bg-gradient-to-r from-[#8C5E28] to-[#C48B47] hover:brightness-110 text-white font-semibold text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer shadow-sm"
                  title="Foto berikutnya"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Petunjuk Navigasi Desktop / Mobile */}
              <div className="hidden sm:flex text-center mt-3 pt-2 text-amber-800/60 text-[11px] font-mono items-center justify-center gap-3">
                <span>← Panah Kiri: Sebelumnya</span>
                <span>•</span>
                <span>Panah Kanan: Berikutnya →</span>
                <span>•</span>
                <span>Spasi: Balik Format</span>
                <span>•</span>
                <span>Esc: Tutup</span>
              </div>
              <p className="sm:hidden text-center text-[10.5px] text-[#8C5E28]/70 mt-2 font-mono">
                💡 Geser (swipe) foto ke samping untuk berpindah kenangan
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

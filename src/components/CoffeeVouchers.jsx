import React, { useState } from "react";
import { motion } from "framer-motion";
import { coffeeVouchers, dikaContactConfig } from "../data/coffeeContent";
import { generateAndDownloadTicketImage } from "../utils/ticketImageGenerator";
import { Gift, Sparkles, Check, ArrowRight, Ticket, MessageCircle, Download, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { playSparkleSound } from "../utils/audio";

export default function CoffeeVouchers() {
  const [openedCards, setOpenedCards] = useState({});
  const [claimedCodes, setClaimedCodes] = useState({});
  const [loadingVoucherId, setLoadingVoucherId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const handleOpenVoucher = (id) => {
    if (openedCards[id]) return;

    setOpenedCards((prev) => ({ ...prev, [id]: true }));

    try {
      playSparkleSound();
    } catch {
      // safe fallback
    }

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#C48B47", "#D4A373", "#FAF0CA", "#8C5E28"],
    });
  };

  const handleCloseVoucher = (id) => {
    setOpenedCards((prev) => ({ ...prev, [id]: false }));
  };

  const handleClaimVoucher = (voucher) => {
    // Set loading state untuk jeda visual yang elegan
    setLoadingVoucherId(voucher.id);
    setClaimedCodes((prev) => ({ ...prev, [voucher.id]: true }));

    // Salin kode ke clipboard jika didukung
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(voucher.code).catch(() => {});
    }

    try {
      playSparkleSound();
    } catch {
      // safe fallback
    }

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#C48B47", "#FAF7F2", "#8C5E28", "#E6CCB2"],
    });

    setToastMessage(`Tiket "${voucher.title}" berhasil diklaim! Menyiapkan WhatsApp... 💕`);

    // Beri jeda loading 1.3 detik agar animasi dinikmati, baru kemudian membuka WhatsApp
    setTimeout(() => {
      setLoadingVoucherId(null);
      handleSendToWA(voucher);
    }, 1300);

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleSendToWA = (voucher) => {
    const rawNumber = dikaContactConfig?.whatsappNumber?.replace(/\D/g, "") || "";
    const rawMessage =
      voucher.waMessage || `Hai sayang! Aku mau klaim tiket ${voucher.title} untuk ultah ke-25 aku!`;
    // Bersihkan Unicode Variation Selector (\uFE0F) yang sering rusak menjadi  di query WhatsApp
    const safeText = rawMessage.replace(/\uFE0F/g, "");
    const encoded = encodeURIComponent(safeText);
    const targetUrl = rawNumber
      ? `https://api.whatsapp.com/send?phone=${rawNumber}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(targetUrl, "_blank");
  };

  const handleDownloadTicket = (voucher) => {
    generateAndDownloadTicketImage(voucher);
    setToastMessage(`Gambar Tiket "${voucher.code}" berhasil diunduh ke perangkatmu! 🎟️✨`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="w-full relative">
      {/* Toast Notification Floating */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2C1810]/95 text-amber-100 px-5 py-3 rounded-full shadow-2xl border border-amber-300/40 text-[13px] font-medium flex items-center gap-2 backdrop-blur-md animate-[bounce_0.6s_ease-out]">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-8 md:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/40 text-[#8C5E28] text-[11px] font-semibold tracking-wider uppercase mb-2">
          <Gift className="w-3.5 h-3.5 text-[#8C5E28]" />
          <span>Special Birthday Treats</span>
        </div>
        <h2 className="font-serif-title text-[24px] sm:text-[30px] font-semibold text-[#2C1810] tracking-tight">
          Kado Rahasia & Kupon Spesial
        </h2>
        <p className="text-[14px] md:text-[15px] text-[#6F4E37] max-w-xl mx-auto mt-1 leading-relaxed">
          Tiga tiket kado istimewa untuk hari bahagiamu. Buka segel pitanya dan klaim untuk jadwal temu Bandung – Bekasi kita nanti! ✨
        </p>
      </div>

      {/* Grid 3 Kartu Voucher */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {coffeeVouchers.map((voucher, idx) => {
          const isOpen = !!openedCards[voucher.id];
          const isClaimed = !!claimedCodes[voucher.id];

          return (
            <motion.div
              key={voucher.id}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative bg-[#FFFDF9] rounded-2xl md:rounded-3xl border border-amber-200/50 shadow-[0_8px_30px_-6px_rgba(44,24,16,0.08)] hover:shadow-[0_16px_40px_-6px_rgba(44,24,16,0.16)] transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[320px] p-5 md:p-6"
            >
              {/* Segel Kotak Kado Mewah Berpita 3D (Belum Dibuka) */}
              <div
                onClick={() => handleOpenVoucher(voucher.id)}
                className={`absolute inset-0 bg-gradient-to-br ${voucher.boxGradient} text-white flex flex-col justify-between items-center text-center p-6 z-20 cursor-pointer transition-all duration-700 ease-out select-none group overflow-hidden border-2 border-amber-300/30 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] ${
                  isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
                }`}
              >
                {/* Tekstur Halus Latar Belakang Kotak Kado */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FAF0CA_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

                {/* PITA SATIN VERTIKAL (Garis Pita Tengah Sumbu Y) */}
                <div
                  style={{ borderColor: voucher.ribbonBorder }}
                  className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-14 bg-gradient-to-r ${voucher.ribbonColor} shadow-[0_0_15px_rgba(0,0,0,0.25)] z-10 flex flex-col justify-between items-center border-x-2 pointer-events-none`}
                >
                  <div className="w-[1px] h-full border-l border-dashed border-amber-900/25"></div>
                </div>

                {/* PITA SATIN HORIZONTAL (Garis Pita Tengah Sumbu X) */}
                <div
                  style={{ borderColor: voucher.ribbonBorder }}
                  className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-12 sm:h-14 bg-gradient-to-b ${voucher.ribbonColor} shadow-[0_0_15px_rgba(0,0,0,0.25)] z-10 flex justify-between items-center border-y-2 pointer-events-none`}
                >
                  <div className="h-[1px] w-full border-t border-dashed border-amber-900/25"></div>
                </div>

                {/* Status Jika Sudah Pernah Diklaim */}
                {isClaimed && (
                  <div className="relative z-20 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold shadow-md mb-2 border border-emerald-300/60">
                    <Check className="w-2.5 h-2.5" />
                    <span>TIKET AKTIF DIKLAIM</span>
                  </div>
                )}

                {/* BAGIAN ATAS: Badge Nomor Kado & Judul */}
                <div className="relative z-20 flex flex-col items-center pt-0.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/25 backdrop-blur-md border border-white/30 text-amber-100 text-[10px] font-bold tracking-widest uppercase mb-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>SPECIAL GIFT #{voucher.numberLabel}</span>
                  </div>
                  <h3 className="font-serif-title text-[19px] sm:text-[21px] font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {voucher.ribbonTitle}
                  </h3>
                </div>

                {/* BAGIAN TENGAH: Medali Wax Seal / Rosette Pita 3D */}
                <div className="relative z-30 my-auto flex items-center justify-center">
                  {/* Glowing Ambient Halo di Belakang Segel */}
                  <div className="absolute w-28 h-28 bg-amber-300/30 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

                  {/* Lencana Segel Bertingkat */}
                  <div
                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${voucher.sealBg} p-1 shadow-[0_10px_25px_rgba(0,0,0,0.4)] border-2 border-white/90 flex flex-col items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <div
                      style={{ color: voucher.sealTextColor }}
                      className="w-full h-full rounded-full border border-amber-800/20 flex flex-col items-center justify-center text-center shadow-inner"
                    >
                      <Gift className="w-8 h-8 drop-shadow-xs" />
                      <span className="text-[8px] font-bold tracking-wider uppercase mt-0.5">
                        TAP TO OPEN
                      </span>
                    </div>
                  </div>
                </div>

                {/* BAGIAN BAWAH: Subtitle & Tombol Buka Kado Mewah */}
                <div className="relative z-20 flex flex-col items-center pb-1 w-full">
                  <span className="text-[11px] text-amber-100 font-medium px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/25 mb-3 shadow-xs">
                    {voucher.ribbonSubtitle}
                  </span>

                  <div className="px-5 py-2.5 bg-gradient-to-r from-[#FAF7F2] via-white to-[#F5EBE0] text-[#2C1810] rounded-full text-[12px] font-bold shadow-[0_8px_20px_rgba(0,0,0,0.3)] border border-amber-300/80 flex items-center gap-2 group-hover:scale-105 group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] active:scale-95 transition-all">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                    <span>Buka Pita Hadiah</span>
                  </div>
                </div>
              </div>

              {/* ISI VOUCHER: TAMPILAN TIKET EMAS DIGITAL RESMI (Boarding Pass / Golden Ticket) */}
              <div className="relative flex flex-col justify-between h-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EB] to-[#F5EBE0] rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-amber-300/60 shadow-inner">
                {/* Lekukan Gerigi Tiket Notch di Sisi Kiri & Kanan */}
                <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FAF7F2] border-r-2 border-amber-300/60 pointer-events-none z-10 shadow-xs"></div>
                <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FAF7F2] border-l-2 border-amber-300/60 pointer-events-none z-10 shadow-xs"></div>

                {/* Header Tiket Emas */}
                <div className="flex flex-col gap-1.5 pb-2.5 border-b border-dashed border-amber-300/80">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#8C5E28] bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300/40">
                      ★ 25TH BIRTHDAY TICKET ★
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseVoucher(voucher.id);
                      }}
                      type="button"
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#8C5E28] hover:text-[#5C3818] bg-amber-100/90 hover:bg-amber-200/90 px-2.5 py-0.5 rounded-full border border-amber-300/50 transition-all active:scale-95 cursor-pointer shadow-2xs"
                      title="Bungkus kembali kado ini"
                    >
                      <Gift className="w-3 h-3 text-amber-700" />
                      <span>Tutup Kado</span>
                    </button>
                  </div>

                  <div className="flex items-start justify-between gap-2 mt-1">
                    <h3 className="font-serif-title text-[18px] sm:text-[20px] font-bold text-[#2C1810] leading-snug">
                      {voucher.title}
                    </h3>
                    <span className="text-[9px] font-semibold tracking-wider text-[#A78A7F] uppercase shrink-0 pt-0.5">
                      {voucher.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#6F4E37] font-medium">
                    <span>Khusus Untuk:</span>
                    <span className="font-bold text-[#8C5E28] font-serif-title">Evina Dini Anjriani</span>
                  </div>
                </div>

                {/* Body Tiket: Deskripsi & Benefit */}
                <div className="py-2.5 flex flex-col gap-2">
                  <p className="text-[12px] sm:text-[13px] text-[#4A2E1B] leading-relaxed italic">
                    "{voucher.description}"
                  </p>

                  <div className="bg-amber-100/70 border border-amber-300/50 p-2 rounded-xl text-[11px] sm:text-[12px] text-[#8C5E28] font-semibold flex items-center gap-1.5 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{voucher.perk}</span>
                  </div>
                </div>

                {/* Box Kode Tiket & Barcode Dekoratif */}
                <div className="pt-2 border-t border-dashed border-amber-300/80 flex flex-col gap-2.5 relative">
                  {/* Stempel Fisik Cap Terklaim (Redeemed Stamp Effect) */}
                  {isClaimed && (
                    <motion.div
                      initial={{ scale: 2, opacity: 0, rotate: -25 }}
                      animate={{ scale: 1, opacity: 1, rotate: -12 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute right-2 -top-12 z-20 pointer-events-none select-none border-4 border-rose-600/80 rounded-xl px-3 py-1 bg-rose-50/90 shadow-md backdrop-blur-2xs"
                    >
                      <span className="font-mono font-extrabold text-rose-700 text-xs sm:text-sm tracking-widest uppercase block">
                        ✓ TERKLAIM
                      </span>
                      <span className="font-mono text-[8px] text-rose-600 tracking-wider block text-center">
                        DATE LOCKED
                      </span>
                    </motion.div>
                  )}

                  <div className="bg-[#FFFDF9] border border-amber-300/80 rounded-xl p-2.5 flex items-center justify-between shadow-xs">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-[#A78A7F] font-bold">
                        KODE RESMI TIKET
                      </span>
                      <span className="font-mono text-[13px] sm:text-[14px] font-bold text-[#2C1810] tracking-wider">
                        {voucher.code}
                      </span>
                    </div>

                    {isClaimed ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300/50">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>TIKET AKTIF</span>
                      </span>
                    ) : (
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-[#A78A7F] block">||| | |||| ||</span>
                        <span className="text-[9px] text-[#8C5E28] font-semibold">100% ALL-INCLUSIVE</span>
                      </div>
                    )}
                  </div>

                  {/* Tombol Aksi */}
                  {loadingVoucherId === voucher.id ? (
                    <div className="w-full min-h-[44px] px-4 py-2.5 rounded-full text-[12px] font-semibold flex items-center justify-center gap-2 bg-amber-100/90 text-[#8C5E28] border border-amber-300/60 shadow-xs animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
                      <span>Menyiapkan Tiket & Membuka WhatsApp...</span>
                    </div>
                  ) : isClaimed ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleSendToWA(voucher)}
                        type="button"
                        className="w-full min-h-[42px] px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-semibold flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95 transition-all cursor-pointer"
                        title="Kirim ulang konfirmasi tiket ke WhatsApp Mas Dika"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0 text-emerald-100" />
                        <span>Buka Chat WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleDownloadTicket(voucher)}
                        type="button"
                        className="w-full min-h-[40px] px-4 py-2 rounded-full text-[12px] font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-[#8C5E28] to-[#C48B47] hover:brightness-105 text-white shadow-xs active:scale-95 transition-all cursor-pointer border border-amber-200/40"
                        title="Unduh gambar tiket emas ke perangkat"
                      >
                        <Download className="w-3.5 h-3.5 shrink-0 text-amber-200" />
                        <span>Simpan Gambar Tiket ke HP</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleClaimVoucher(voucher)}
                      type="button"
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-full text-[13px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 bg-gradient-to-r from-[#8C5E28] to-[#C48B47] hover:from-[#724B1F] hover:to-[#A86B32] text-white shadow-[0_4px_16px_rgba(140,94,40,0.3)] border border-amber-200/40"
                    >
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>Klaim & Konfirmasi Hadiah</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

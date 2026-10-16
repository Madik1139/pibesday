// Utilitas Pengiriman Notifikasi Doa ke Email Mas Dika di Latar Belakang (Silent Background)
import { wishNotificationConfig } from "../data/coffeeContent";

/**
 * Mengirimkan doa & harapan Evina ke email Mas Dika secara otomatis di latar belakang.
 * @param {string} wishText - Teks doa/harapan yang diketik oleh Evina
 */
export async function sendWishToEmail(wishText) {
  if (!wishText || !wishText.trim()) return { success: false, reason: "empty_wish" };

  const config = wishNotificationConfig || {};
  const recipient = config.recipientEmail || "";

  // Jika email belum diisi atau masih placeholder, batalkan pengiriman
  if (!recipient || recipient === "masukkan-email-dika@gmail.com") {
    console.info(
      "ℹ️ [WishNotification] Harap isi email Mas Dika di 'src/data/coffeeContent.js' pada wishNotificationConfig.recipientEmail"
    );
    return { success: false, reason: "email_not_configured" };
  }

  const payload = {
    _subject: "🎂 [PIBESDAY 25] Evina Baru Saja Membuat Harapan & Meniup Lilin! ✨",
    nama: "Evina Dini Anjriani",
    acara: "Ulang Tahun ke-25",
    waktu: new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "medium",
    }),
    doa_harapan: wishText,
    pesan: `Hai Dika! Evina baru saja mengunci doa ini sebelum meniup lilin di website:\n\n"${wishText}"\n\nSemoga doa & impian kalian berdua diijabah Allah SWT. ❤️`,
  };

  try {
    if (config.service === "web3forms" && config.web3formsAccessKey) {
      // Opsi Web3Forms (jika ada key)
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: config.web3formsAccessKey,
          ...payload,
        }),
      });
      return { success: res.ok };
    } else {
      // Default: FormSubmit.co (Gratis, instan, langsung ke inbox Gmail)
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
          _captcha: "false", // Nonaktifkan captcha agar silent
          _template: "table",
        }),
      });
      return { success: res.ok };
    }
  } catch (error) {
    console.warn("Silent wish email dispatch failed (silent fallback):", error);
    return { success: false, error };
  }
}

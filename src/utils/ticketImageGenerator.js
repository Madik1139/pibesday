// Utilitas Pembuat Gambar Tiket Kado Digital Emas Estetik (HTML5 Canvas HD Presisi)

/**
 * Fungsi helper untuk mencetak teks multi-baris otomatis di tengah (Word Wrap)
 */
function drawWrappedCenteredText(ctx, text, x, startY, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  const lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line.trim());
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());

  let currentY = startY;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

export function generateAndDownloadTicketImage(voucher) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Ukuran Canvas Resolusi Tinggi HD (1000 x 560 px)
  canvas.width = 1000;
  canvas.height = 560;

  // 1. Background Luar & Kartu Utama
  const bgGrad = ctx.createLinearGradient(0, 0, 1000, 560);
  bgGrad.addColorStop(0, "#FFFDF9");
  bgGrad.addColorStop(0.5, "#FAF3EB");
  bgGrad.addColorStop(1, "#EEDBC9");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1000, 560);

  // 2. Border Luar Emas Mewah Ganda
  ctx.strokeStyle = "#C48B47";
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, 960, 520);

  ctx.strokeStyle = "#8C5E28";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(28, 28, 944, 504);

  // 3. Gerigi Tiket Notch (Lingkaran Potongan Tiket Kiri & Kanan)
  ctx.fillStyle = "#FAF7F2";
  // Notch Kiri
  ctx.beginPath();
  ctx.arc(20, 280, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#C48B47";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Notch Kanan
  ctx.beginPath();
  ctx.arc(980, 280, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Garis Perforasi Vertikal Kiri (x = 150) & Kanan (x = 850)
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = "#C48B47";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(150, 32);
  ctx.lineTo(150, 528);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(850, 32);
  ctx.lineTo(850, 528);
  ctx.stroke();
  ctx.setLineDash([]); // Reset line dash

  // 4. Stub Kiri (Vertical Text Badge) - Terisolasi Aman di Area x: 30 - 145
  ctx.save();
  ctx.translate(90, 280);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "#8C5E28";
  ctx.font = "bold 15px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("EDITION 25 • SPECIAL TREAT", 0, 0);
  ctx.restore();

  // 5. Stub Kanan (Barcode Dekoratif) - Terisolasi Aman di Area x: 855 - 970
  ctx.save();
  ctx.translate(910, 280);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "#4A2E1B";
  ctx.font = "13px monospace";
  ctx.textAlign = "center";
  ctx.fillText("||| || |||| | |||| ||| ||", 0, -5);
  ctx.font = "bold 11px monospace";
  ctx.fillText("NO-EXPIRE-LIFETIME", 0, 16);
  ctx.restore();

  // -------------------------------------------------------------
  // AREA UTAMA TIKET (Safe Area Tengah: x = 160 s/d 840, Center = 500)
  // Max Safe Width = 640px (tidak akan pernah menabrak tepi mana pun!)
  // -------------------------------------------------------------

  // 6. Header Badge Atas
  ctx.textAlign = "center";
  ctx.fillStyle = "#8C5E28";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("★ OFFICIAL 25TH BIRTHDAY GIFT TICKET ★", 500, 68);

  // Judul Voucher Utama
  ctx.fillStyle = "#2C1810";
  ctx.font = "bold 26px serif";
  const cleanTitle = voucher.title.replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF&-]/g, "").trim();
  ctx.fillText(cleanTitle, 500, 108);

  // Garis Pemisah Emas Lembut
  const sepGrad = ctx.createLinearGradient(280, 0, 720, 0);
  sepGrad.addColorStop(0, "transparent");
  sepGrad.addColorStop(0.5, "#C48B47");
  sepGrad.addColorStop(1, "transparent");
  ctx.strokeStyle = sepGrad;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(280, 124);
  ctx.lineTo(720, 124);
  ctx.stroke();

  // 7. Nama Penerima
  ctx.fillStyle = "#6F4E37";
  ctx.font = "13px sans-serif";
  ctx.fillText("Diberikan Khusus Untuk:", 500, 154);

  ctx.fillStyle = "#8C5E28";
  ctx.font = "bold 22px serif";
  ctx.fillText("Evina Dini Anjriani", 500, 185);

  // 8. Deskripsi Voucher Multi-Baris (Word Wrapped Terkendali, Max Width = 620px)
  ctx.fillStyle = "#3E2415";
  ctx.font = "15px sans-serif";
  const descAfterY = drawWrappedCenteredText(
    ctx,
    `"${voucher.description}"`,
    500,
    224,
    620, // Max width terkunci aman di dalam batas perforasi
    22  // Line height
  );

  // 9. Perk Box (Highlight Keuntungan di Bawah Deskripsi)
  const perkY = Math.max(descAfterY + 4, 276);
  ctx.fillStyle = "#8C5E28";
  ctx.font = "italic bold 14px sans-serif";
  ctx.fillText(`✨ ${voucher.perk}`, 500, perkY);

  // 10. Box Kode Voucher Resmi (Di Tengah Kartu)
  const boxY = perkY + 22;
  ctx.fillStyle = "#FFFDF9";
  ctx.strokeStyle = "#C48B47";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(330, boxY, 340, 58, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#A78A7F";
  ctx.font = "bold 10px sans-serif";
  ctx.fillText("KODE RESMI TIKET", 500, boxY + 20);

  ctx.fillStyle = "#2C1810";
  ctx.font = "bold 21px monospace";
  ctx.fillText(voucher.code, 500, boxY + 45);

  // 11. Stempel & Garansi di Footer
  ctx.fillStyle = "#6F4E37";
  ctx.font = "12px sans-serif";
  ctx.fillText("Valid Anytime & Anywhere • Berlaku Kapan Saja & Di Mana Saja", 500, boxY + 84);

  ctx.fillStyle = "#8C5E28";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("From Dika with Love • 100% Ditanggung Sepenuhnya", 500, boxY + 104);

  // 12. Download Gambar PNG Hasil Render Presisi
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = `Tiket-Ultah-Evina-${voucher.code}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

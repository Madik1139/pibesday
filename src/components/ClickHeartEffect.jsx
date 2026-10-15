import React, { useEffect, useRef } from "react";

// Path Vektor Hati Presisi
const HEART_PATH = new Path2D(
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
);

// Path Vektor Kilau Bintang Emas (Sparkle)
const SPARKLE_PATH = new Path2D(
  "M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
);

// Palet warna romantis hangat (Rose, Crimson, Pink, Amber Gold, Caramel)
const COLORS = [
  "#E11D48", // Rose Red
  "#F43F5E", // Vibrant Pink Rose
  "#FB7185", // Soft Blush
  "#BE123C", // Deep Crimson
  "#D97706", // Amber Gold
  "#F59E0B", // Bright Amber
  "#C48B47", // Warm Caramel
];

export default function ClickHeartEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = null;
    let particles = [];
    let isRunning = false;

    // Resize canvas dengan Device Pixel Ratio (DPR) untuk ketajaman retina
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Loop Animasi Fisika Partikel 60fps - 120fps (Zero React Render Overhead)
    const update = () => {
      if (particles.length === 0) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        isRunning = false;
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update posisi fisika
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity; // gaya apung / hambatan udara
        p.vx *= 0.98; // gesekan horizontal
        p.rotation += p.vRot;
        p.alpha -= p.fadeSpeed;
        p.scale = Math.max(0, p.scale + p.scaleSpeed);

        if (p.alpha <= 0 || p.scale <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Gambar partikel hati / kilau
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(p.scale, p.scale);
        ctx.translate(-12, -12); // Posisikan pivot tepat di tengah path (24x24)

        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.isSparkle ? 6 : 8;

        ctx.fill(p.isSparkle ? SPARKLE_PATH : HEART_PATH);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(update);
    };

    // Fungsi Spawn Partikel Instan (0ms Latency)
    const spawnParticles = (x, y) => {
      const count = Math.floor(Math.random() * 2) + 3; // 3-4 partikel per klik
      for (let i = 0; i < count; i++) {
        const isSparkle = Math.random() < 0.25;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2; // Memancar ke atas
        const speed = Math.random() * 3.5 + 2.5;

        particles.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: 0.08, // mengapung anggun
          rotation: (Math.random() - 0.5) * 0.5,
          vRot: (Math.random() - 0.5) * 0.06,
          scale: Math.random() * 0.3 + 0.7,
          scaleSpeed: 0.008,
          alpha: 1,
          fadeSpeed: Math.random() * 0.018 + 0.016, // bertahan ~0.7s - 1.0s
          color,
          isSparkle,
        });
      }

      // Mulai animation loop jika belum berjalan
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(update);
      }
    };

    // Dengarkan event sentuh / klik instan (Pointerdown paling cepat di browser)
    const handlePointerDown = (e) => {
      // Abaikan jika sedang mengetik di input / textarea
      const targetTag = e.target?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea") {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;

      if (typeof x === "number" && typeof y === "number") {
        spawnParticles(x, y);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999999]"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

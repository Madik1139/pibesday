import React, { useMemo } from "react";

export default function AmbientParticles() {
  // 75 partikel berkilau: Ukuran lebih besar, lebih banyak, dan jelas terlihat mengambang di seluruh layar
  const particles = useMemo(() => {
    const types = ["sparkle", "bokeh", "star", "heart", "glow", "bokeh"];
    return Array.from({ length: 75 }, (_, i) => {
      const type = types[i % types.length];
      // Ukuran lebih besar: Bokeh hingga 36px, sparkle hingga 26px
      const baseSize =
        type === "bokeh"
          ? Math.floor(Math.random() * 20) + 16 // 16px - 36px
          : type === "sparkle"
          ? Math.floor(Math.random() * 12) + 16 // 16px - 28px
          : type === "star"
          ? Math.floor(Math.random() * 10) + 14 // 14px - 24px
          : type === "heart"
          ? Math.floor(Math.random() * 8) + 12  // 12px - 20px
          : Math.floor(Math.random() * 10) + 14;

      return {
        id: i,
        type,
        left: `${(i * 1.33 + Math.random() * 1.5) % 96 + 2}%`,
        size: baseSize,
        duration: Math.floor(Math.random() * 12) + 14, // 14s to 26s
        delay: -(Math.random() * 28), // langsung tersebar di layar seketika
        opacity: Math.random() * 0.35 + 0.45, // Opacity lebih jelas terlihat (0.45 - 0.80)
        color:
          i % 5 === 0
            ? "text-[#C48B47]"
            : i % 5 === 1
            ? "text-[#FAF0CA]"
            : i % 5 === 2
            ? "text-[#F59E0B]"
            : i % 5 === 3
            ? "text-[#D4A373]"
            : "text-[#E6CCB2]",
      };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            left: p.left,
            bottom: "-45px",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
          className={`absolute animate-float-ambient pointer-events-none will-change-transform ${p.color}`}
        >
          {p.type === "sparkle" ? (
            <span
              style={{ fontSize: `${p.size}px` }}
              className="drop-shadow-[0_0_10px_rgba(245,158,11,0.7)] inline-block select-none font-bold"
            >
              ✦
            </span>
          ) : p.type === "star" ? (
            <span
              style={{ fontSize: `${p.size}px` }}
              className="drop-shadow-[0_0_8px_rgba(250,240,202,0.8)] inline-block select-none"
            >
              ★
            </span>
          ) : p.type === "heart" ? (
            <span
              style={{ fontSize: `${p.size}px` }}
              className="text-amber-400/90 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)] inline-block select-none"
            >
              ♥
            </span>
          ) : p.type === "glow" ? (
            <span
              style={{ fontSize: `${p.size}px` }}
              className="drop-shadow-[0_0_10px_rgba(212,163,115,0.8)] inline-block select-none"
            >
              ✧
            </span>
          ) : (
            /* Bokeh Golden Glowing Circle Lebih Besar & Mewah */
            <span
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
              className="block rounded-full bg-gradient-to-tr from-amber-400/50 via-yellow-200/60 to-amber-100/40 blur-[2px] shadow-[0_0_16px_rgba(245,158,11,0.5)]"
            />
          )}
        </span>
      ))}
    </div>
  );
}

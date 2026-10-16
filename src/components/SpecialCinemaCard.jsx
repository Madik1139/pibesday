import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Film, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

/**
 * SpecialCinemaCard Component
 * Desain ringkas, bersih, dan elegan.
 * Memperbaiki rotasi (-90deg) agar tegak lurus dan tidak terpotong.
 */
export default function SpecialCinemaCard() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto my-6 px-4">
      <ScrollReveal direction="scale" duration={700}>
        <div className="bg-[#FAF7F2] rounded-3xl p-4 sm:p-6 border border-[#C48B47]/40 shadow-[0_10px_30px_-6px_rgba(44,24,16,0.12)] flex flex-col items-center text-center">
          
          {/* Header Ringkas */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/50 text-[#8C5E28] text-[11px] font-semibold tracking-wider uppercase mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>Momen Bergerak</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>

          <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#2C1810]">
            Senyum Manis Evina ✨
          </h3>
          <p className="text-xs sm:text-sm text-[#6F4E37] mt-0.5 mb-4 font-body">
            Rekaman yang selalu membuatku tersenyum.
          </p>

          {/* Frame Video: Rasio Landscape (16:9) agar pas setelah video diputar -90deg */}
          <div className="relative w-full max-w-[540px] aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black shadow-lg border-2 border-[#8C5E28]/40 flex items-center justify-center group">
            
            {/* 
              Wrapper rotasi video:
              Video aslinya portrait berorientasi tidur.
              Diputar -90deg agar tegak sempurna. 
              Lebar & tinggi ditukar agar mengisi frame tanpa terpotong.
            */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src="/img 25/vid.mp4"
                loop
                muted={isMuted}
                autoPlay
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="cursor-pointer select-none"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform: "rotate(-90deg) scale(1.75)",
                  transformOrigin: "center center",
                }}
              />
            </div>

            {/* Timestamp Watermark */}
            <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs border border-white/20 text-white text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>17 OKT 2026</span>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 inset-x-0 p-3 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-1.5">
              {/* Progress Bar */}
              <div
                className="w-full h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPct = clickX / rect.width;
                  if (videoRef.current) {
                    videoRef.current.currentTime = newPct * (videoRef.current.duration || 1);
                  }
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-rose-400"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls Action */}
              <div className="flex items-center justify-between text-white pt-0.5">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer active:scale-90"
                  aria-label={isPlaying ? "Jeda" : "Putar"}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer active:scale-90"
                    aria-label={isMuted ? "Bunyikan" : "Bisukan"}
                    title={isMuted ? "Nyalakan Suara" : "Bisukan Suara"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5 text-amber-200" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer active:scale-90"
                    aria-label="Layar Penuh"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}

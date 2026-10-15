import React, { useEffect, useState, useRef } from "react";
import * as Tone from "tone";

function Ultah24({ onGoToUltah25 }) {
  const [showMorePhotos, setShowMorePhotos] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPartRef = useRef(null);
  const synthRef = useRef(null);

  // Unmount cleanup: Pastikan audio & balon/confetti dibersihkan tuntas saat berpindah halaman
  useEffect(() => {
    return () => {
      stopAudio();
      cleanupEffects();
    };
  }, []);

  useEffect(() => {
    if (isEnvelopeOpen) {
      createBalloons();
      createConfetti();
      setupAudio();
      startAudio();
    } else {
      stopAudio();
      cleanupEffects();
    }
    return () => {
      stopAudio();
      cleanupEffects();
    };
  }, [isEnvelopeOpen]);

  const createBalloons = () => {
    const container = document.getElementById("balloons-container-24");
    if (!container) return;
    container.innerHTML = "";
    const colors = ["#ffb6c1", "#e2d1f9", "#d1e8f9", "#d1f9ea", "#ffcccb"];

    for (let i = 0; i < 20; i++) {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      balloon.style.animationName = "float";
      balloon.style.animationDuration = `${Math.random() * 5 + 8}s`;
      balloon.style.animationTimingFunction = "linear";
      balloon.style.animationIterationCount = "infinite";
      balloon.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(balloon);
    }
  };

  const createConfetti = () => {
    const colors = [
      "#ffd6e0",
      "#ffb6c1",
      "#e2d1f9",
      "#d1e8f9",
      "#d1f9ea",
      "#fff6a6",
    ];

    const confettiContainer = document.getElementById("confetti-container-24");
    if (!confettiContainer) return;
    confettiContainer.innerHTML = "";

    for (let i = 0; i < 70; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti confetti-24";
      confetti.style.position = "absolute";
      confetti.style.top = "-10px";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationName = "confettiFall";
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.animationTimingFunction = "linear";
      confetti.style.animationIterationCount = "infinite";
      confetti.style.animationDelay = `${Math.random() * 5}s`;
      confettiContainer.appendChild(confetti);
    }
  };

  const setupAudio = () => {
    if (!audioPartRef.current) {
      try {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        Tone.Transport.bpm.value = 120;

        const synth = new Tone.Synth().toDestination();
        synthRef.current = synth;

        const melody = [
          { note: "C4", duration: "8n", time: 0 },
          { note: "C4", duration: "8n", time: 0.25 },
          { note: "D4", duration: "4n", time: 0.5 },
          { note: "C4", duration: "4n", time: 1 },
          { note: "F4", duration: "4n", time: 1.5 },
          { note: "E4", duration: "2n", time: 2 },
          { note: "C4", duration: "8n", time: 3 },
          { note: "C4", duration: "8n", time: 3.25 },
          { note: "D4", duration: "4n", time: 3.5 },
          { note: "C4", duration: "4n", time: 4 },
          { note: "G4", duration: "4n", time: 4.5 },
          { note: "F4", duration: "2n", time: 5 },
          { note: "C4", duration: "8n", time: 6 },
          { note: "C4", duration: "8n", time: 6.25 },
          { note: "C5", duration: "4n", time: 6.5 },
          { note: "A4", duration: "4n", time: 7 },
          { note: "F4", duration: "4n", time: 7.5 },
          { note: "E4", duration: "4n", time: 8 },
          { note: "D4", duration: "2n", time: 8.5 },
          { note: "Bb4", duration: "8n", time: 9 },
          { note: "Bb4", duration: "8n", time: 9.25 },
          { note: "A4", duration: "4n", time: 9.5 },
          { note: "F4", duration: "4n", time: 10 },
          { note: "G4", duration: "4n", time: 10.5 },
          { note: "F4", duration: "2n", time: 11 },
        ];

        audioPartRef.current = new Tone.Part((time, note) => {
          if (synthRef.current) {
            synthRef.current.triggerAttackRelease(note.note, note.duration, time);
          }
        }, melody).start(0);

        audioPartRef.current.loop = true;
        audioPartRef.current.loopEnd = 12;
      } catch (e) {
        console.warn("Audio init error:", e);
      }
    }
  };

  const startAudio = () => {
    if (!isPlaying) {
      if (!audioPartRef.current) {
        setupAudio();
      }
      Tone.start();
      Tone.Transport.start();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioPartRef.current) {
      try {
        audioPartRef.current.stop();
        audioPartRef.current.dispose();
      } catch (e) {}
      audioPartRef.current = null;
    }
    if (synthRef.current) {
      try {
        synthRef.current.dispose();
      } catch (e) {}
      synthRef.current = null;
    }
    try {
      Tone.Transport.stop();
      Tone.Transport.cancel();
    } catch (e) {}
    setIsPlaying(false);
  };

  const cleanupEffects = () => {
    const balloonsContainer = document.getElementById("balloons-container-24");
    if (balloonsContainer) {
      balloonsContainer.innerHTML = "";
    }
    const confettiContainer = document.getElementById("confetti-container-24");
    if (confettiContainer) {
      confettiContainer.innerHTML = "";
    }
    const oldConfetti = document.querySelectorAll(".confetti-24");
    oldConfetti.forEach((c) => c.remove());
  };

  const handleOpenEnvelope = () => {
    const envelope = document.querySelector(".envelope-original");
    if (envelope) {
      envelope.classList.add("open");
    }
    setTimeout(() => {
      setIsEnvelopeOpen(true);
      startAudio();
    }, 500);
  };

  const handleCloseEnvelope = () => {
    setIsEnvelopeOpen(false);
    stopAudio();
    cleanupEffects();

    const envelope = document.querySelector(".envelope-original");
    if (envelope) {
      envelope.classList.remove("open");
    }
  };

  if (!isEnvelopeOpen) {
    return (
      <div className="ultah-24-scope w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#ffd6e0] to-[#e2d1f9] p-4 select-none">
        <div className="envelope-container !h-auto">
          <div className="envelope envelope-original">
            <div className="envelope-flap"></div>
            <div className="envelope-body"></div>
            <button className="open-button" onClick={handleOpenEnvelope}>
              Open
            </button>
          </div>
        </div>

        <p className="text-xs text-purple-700/70 mt-4">
          Kenangan Arsip Ulang Tahun ke-24 💌
        </p>
      </div>
    );
  }

  return (
    <div className="ultah-24-scope w-full min-h-screen flex flex-col items-center py-6 px-4 bg-gradient-to-br from-[#ffd6e0] via-[#e2d1f9] to-[#d1e8f9] relative overflow-x-hidden">
      {/* Container Background Fixed untuk Balon & Confetti agar tidak menambah tinggi dokumen */}
      <div className="balloons-container" id="balloons-container-24"></div>
      <div id="confetti-container-24" className="fixed inset-0 pointer-events-none overflow-hidden z-20"></div>

      {/* Navigasi ke Ultah 25 */}
      {onGoToUltah25 && (
        <div className="w-full max-w-[800px] mb-4 z-20">
          <button
            onClick={() => {
              stopAudio();
              onGoToUltah25();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4A2E1B] to-[#8C5E28] text-amber-100 font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-200/30"
          >
            <span>☕✨</span>
            <span>Lihat Ucapan Spesial Ulang Tahun ke-25</span>
          </button>
        </div>
      )}

      <div className="container">
        <h1>✨ Selamat Ulang Tahun ke-24, Sayang! ✨</h1>
        <div className="subtitle">Evina Dini Anjriani</div>

        <div className="cake">🎂</div>

        <p className="message">
          Di hari spesial ini, pacar kamu yang ganteng ini mau mengucapkan
          selamat ulang tahun untuk pacar tercinta
          <span className="heart">❤️</span>. Makasih udah jadi pacar aku yang
          baik, penyayang dan selalu mau nyempetin waktu buat aku. Makasih udah
          tetap di sini walau banyak hal yang belum sempurna dari aku. Aku
          sayang kamu bangettt.
        </p>

        <p className="message">
          Semoga di usia barumu ini kamu selalu diberikan
          <span className="highlight">
            {" "}
            kesehatan, kebahagiaan, dan kesuksesan{" "}
          </span>
          dalam segala hal yang kamu lakukan. Aku akan selalu mendukung dan
          mendoakan yang terbaik untukmu. Semoga semua impian dan harapanmu
          tercapai, dan hubungan kita semakin kuat dan penuh cinta.
          <span className="heart">❤️</span>
        </p>

        <p className="signature">
          Dengan penuh cinta, <br />
          Dika<span className="not-italic ">💕</span>
        </p>

        <div className="gallery">
          <div className="photo-frame">
            <img className="photo" src="/img 24/foto 1.jpg" alt="foto 1" />
          </div>
          <div className="photo-frame">
            <img className="photo" src="/img 24/foto 2.jpg" alt="foto 2" />
          </div>
          <div className="photo-frame">
            <img className="photo" src="/img 24/foto 3.jpg" alt="foto 3" />
          </div>
          <div className="photo-frame">
            <img className="photo" src="/img 24/foto 4.jpg" alt="foto 4" />
          </div>
          {[
            "/img 24/foto 5.jpg",
            "/img 24/foto 6.jpg",
            "/img 24/foto 7.jpg",
            "/img 24/foto 8.jpg",
            ...(showMorePhotos
              ? [
                  "/img 24/foto 9.jpg",
                  "/img 24/foto 10.jpg",
                  "/img 24/foto 11.jpg",
                  "/img 24/foto 12.jpg",
                ]
              : []),
          ].map((src) => {
            const match = src.match(/foto (\d+)\.jpg/);
            const fotoNum = match ? match[1] : "";
            return (
              <div className="photo-frame" key={src}>
                <img className="photo" src={src} alt={`foto ${fotoNum}`} />
              </div>
            );
          })}
        </div>

        {!showMorePhotos ? (
          <button
            style={{ padding: "5px 20px" }}
            className="bg-pink-400 hover:bg-pink-500 rounded text-white cursor-pointer"
            onClick={() => setShowMorePhotos(true)}
          >
            Lihat Lebih Banyak Foto
          </button>
        ) : (
          <button
            style={{ padding: "5px 20px" }}
            className="bg-pink-400 hover:bg-pink-500 rounded text-white cursor-pointer"
            onClick={() => setShowMorePhotos(false)}
          >
            Sembunyikan Foto Tambahan
          </button>
        )}

        <div className="fixed bottom-5 right-5 z-40">
          <button
            className="play-button"
            onClick={isPlaying ? stopAudio : startAudio}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>

        {/* Tombol menuju ucapan mylup */}
        <div
          style={{
            margin: "2rem 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            href="https://mylup.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              background: "linear-gradient(90deg, #ffd6e0 60%, #e2d1f9 100%)",
              color: "#a84ca8",
              fontWeight: "bold",
              fontSize: "1.15rem",
              borderRadius: "18px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              padding: "1rem 2.5rem",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              position: "relative",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.07) rotate(-2deg)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(168,76,168,0.18)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)";
            }}
            onClick={() => stopAudio()}
          >
            <span style={{ fontSize: "2rem" }}>💌</span>
            <span>
              Mau baca ucapan yang dulu pernah aku kirim? <br /> Klik di sini sayangg
            </span>
            <span
              style={{
                fontSize: "1.5rem",
                position: "absolute",
                right: "18px",
                bottom: "10px",
              }}
            >
              💕
            </span>
          </a>
        </div>

        <button className="close-button" onClick={handleCloseEnvelope}>
          Tutup Amplop
        </button>
      </div>
    </div>
  );
}

export default Ultah24;

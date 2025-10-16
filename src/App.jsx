import React, { useEffect, useState } from "react";
import * as Tone from "tone";

function App() {
  const [showMorePhotos, setShowMorePhotos] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  let audio;

  useEffect(() => {
    if (isEnvelopeOpen) {
      createBalloons();
      createConfetti();
      setupAudio();
      startAudio();
    }
  }, [isEnvelopeOpen]);

  const createBalloons = () => {
    const container = document.getElementById("balloons-container");
    const colors = ["#ffb6c1", "#e2d1f9", "#d1e8f9", "#d1f9ea"];

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

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
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
      document.body.appendChild(confetti);
    }
  };

  const setupAudio = () => {
    if (!audio) {
      const synth = new Tone.Synth().toDestination();
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

      audio = new Tone.Part((time, note) => {
        synth.triggerAttackRelease(note.note, note.duration, time);
      }, melody).start(0);

      audio.loop = true;
      audio.loopEnd = 12;
    }
  };

  const startAudio = () => {
    if (!isPlaying) {
      Tone.start();
      Tone.Transport.start();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (isPlaying) {
      Tone.Transport.pause();
      setIsPlaying(false);
    }
  };

  const handleOpenEnvelope = () => {
    const envelope = document.querySelector(".envelope");
    envelope.classList.add("open");
    setTimeout(() => {
      setIsEnvelopeOpen(true);
      startAudio();
    }, 500); // Tunggu animasi selesai
  };

  const handleCloseEnvelope = () => {
    setIsEnvelopeOpen(false);

    // Pastikan elemen amplop ada sebelum mengaksesnya
    const envelope = document.querySelector(".envelope");
    if (envelope) {
      envelope.classList.remove("open");
    }

    // Hentikan musik
    stopAudio();

    // Hapus balon
    const balloonsContainer = document.getElementById("balloons-container");
    if (balloonsContainer) {
      while (balloonsContainer.firstChild) {
        balloonsContainer.removeChild(balloonsContainer.firstChild); // Hapus semua balon
      }
    }

    // Hapus confetti
    const confettiElements = document.querySelectorAll(".confetti");
    confettiElements.forEach((confetti) => confetti.remove()); // Hapus semua confetti
  };

  if (!isEnvelopeOpen) {
    return (
      <div className="envelope-container">
        <div className="envelope">
          <div className="envelope-flap"></div>
          <div className="envelope-body"></div>
          <button className="open-button" onClick={handleOpenEnvelope}>
            Open
          </button>
        </div>
      </div>
    );
  }

  const birthDate = new Date(2001, 9, 17); // Bulan dimulai dari 0 (Oktober = 9)
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return (
    <div className="flex justify-center">
      <div className="balloons-container" id="balloons-container"></div>

      <div className="container">
        <h1>✨ Selamat Ulang Tahun ke-{age}, Sayang! ✨</h1>
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
            <img className="photo" src="/foto 1.jpg" alt="foto 1" />
          </div>
          <div className="photo-frame">
            <img className="photo" src="/foto 2.jpg" alt="foto 2" />
          </div>
          <div className="photo-frame">
            <img className="photo" src="/foto 3.jpg" alt="foto 3" />
          </div>
          <div className="photo-frame">
            <img className="photo" src="/foto 4.jpg" alt="foto 4" />
          </div>
          {[
            "/foto 5.jpg",
            "/foto 6.jpg",
            "/foto 7.jpg",
            "/foto 8.jpg",
            ...(showMorePhotos
              ? ["/foto 9.jpg", "/foto 10.jpg", "/foto 11.jpg", "/foto 12.jpg"]
              : []),
          ].map((src) => {
            // Ambil nomor foto dari nama file
            const match = src.match(/foto (\d+)\.jpg/);
            const fotoNum = match ? match[1] : "";
            return (
              <div className="photo-frame" key={src}>
                <img className="photo" src={src} alt={`foto ${fotoNum}`} />
              </div>
            );
          })}
        </div>
        {!showMorePhotos && (
          <button
            style={{ padding: "5px 20px" }}
            className="bg-pink-400 hover:bg-pink-500 rounded text-white cursor-pointer"
            onClick={() => setShowMorePhotos(true)}
          >
            Lihat Lebih Banyak Foto
          </button>
        )}
        {showMorePhotos && (
          <button
            style={{ padding: "5px 20px" }}
            className="bg-pink-400 hover:bg-pink-500 rounded text-white cursor-pointer"
            onClick={() => setShowMorePhotos(false)}
          >
            Sembunyikan Foto Tambahan
          </button>
        )}

        <div className="fixed bottom-5 right-5">
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
              Mau baca ucapan yang dulu pernah aku kirim? <br /> Klik di sini
              sayangg
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

export default App;

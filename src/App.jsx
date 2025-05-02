import React, { useEffect, useState } from "react";
import * as Tone from "tone";

function App() {
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

	return (
		<div className="flex justify-center">
			<div className="balloons-container" id="balloons-container"></div>

			<div className="container">
				<h1>✨ Selamat Ulang Tahun ke-21! ✨</h1>
				<div className="subtitle">Nadia Tersayang</div>

				<div className="cake">🎂</div>

				<p className="message">
					Di hari yang istimewa ini, aku mau mengucapkan selamat ulang tahun
					yang ke-21 untukmu.
					<span className="heart">❤️</span> Terima kasih telah menjadi bagian
					terindah dalam hidupku. Semoga di usia barumu ini kamu selalu
					diberikan
					<span className="highlight">
						{" "}
						kesehatan, kebahagiaan, dan kesuksesan{" "}
					</span>
					dalam semua hal yang kamu lakukan. Aku selalu mendoakan yang terbaik
					untukmu.
				</p>

				<p className="message">
					Semoga semua impian dan harapanmu dapat terwujud.
					<span className="heart">❤️</span>
				</p>

				<div className="gallery">
					<div className="photo-frame">
						<img
							className="photo"
							src="/foto 1.jpg"
							alt="foto 1"
						/>
					</div>
					<div className="photo-frame">
						<img
							className="photo"
							src="/foto 2.jpg"
							alt="foto 2"
						/>
					</div>
					<div className="photo-frame">
						<img
							className="photo"
							src="/foto 3.jpg"
							alt="foto 3"
						/>
					</div>
					<div className="photo-frame">
						<img
							className="photo"
							src="/foto 4.jpg"
							alt="foto 4"
						/>
					</div>
				</div>

				<div className="music-control">
					<button
						className="play-button"
						onClick={isPlaying ? stopAudio : startAudio}
					>
						{isPlaying ? "⏸" : "▶"}
					</button>
					<p className="music-text">{isPlaying ?'Jeda' : 'Mainkan'} musik 🎶</p>
				</div>

				<p className="signature">
					Dengan penuh cinta, <br />
					Mas Dika
				</p>

				<button className="close-button" onClick={handleCloseEnvelope}>
					Tutup Amplop
				</button>
			</div>
		</div>
	);
}

export default App;

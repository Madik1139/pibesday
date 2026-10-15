import * as Tone from "tone";

let bgAudio = null;
let bgMusicPart = null;
let synth = null;
let polySynth = null;
let isAudioInitialized = false;

export async function initAudio() {
  if (!isAudioInitialized) {
    try {
      await Tone.start();
    } catch {}
    isAudioInitialized = true;
  }
}

export function playBackgroundMusic() {
  try {
    // 1. Putar lagu pilihan: Nadhif Basalamah - Penjaga Hati
    if (!bgAudio) {
      bgAudio = new Audio();
      bgAudio.loop = true;
      bgAudio.volume = 0.55;

      // Pilih format yang paling optimal untuk peramban (WebM untuk Chrome/Edge/Android, m4a untuk Safari/iOS)
      if (bgAudio.canPlayType("audio/webm; codecs=opus")) {
        bgAudio.src = "/penjaga-hati.webm";
      } else if (bgAudio.canPlayType("audio/mp4")) {
        bgAudio.src = "/penjaga-hati.m4a";
      } else {
        bgAudio.src = "/romance.mp3";
      }
    }

    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("HTML5 audio playback error, falling back to synth:", err);
        playFallbackSynthMusic();
      });
    }
  } catch (e) {
    console.warn("Play background music error:", e);
    playFallbackSynthMusic();
  }
}

export function stopBackgroundMusic() {
  try {
    if (bgAudio) {
      bgAudio.pause();
    }
    stopFallbackSynthMusic();
  } catch (e) {
    console.warn("Stop background music error:", e);
  }
}

function playFallbackSynthMusic() {
  try {
    Tone.Transport.stop();
    Tone.Transport.cancel();

    if (bgMusicPart) {
      try {
        bgMusicPart.stop();
        bgMusicPart.dispose();
      } catch (e) {}
      bgMusicPart = null;
    }
    if (polySynth) {
      try {
        polySynth.dispose();
      } catch (e) {}
      polySynth = null;
    }

    polySynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 1.2 }
    }).toDestination();
    polySynth.volume.value = -10;

    const loFiChords = [
      { time: "0:0", chord: ["C3", "G3", "B3", "E4"] },
      { time: "1:0", chord: ["A2", "E3", "G3", "C4"] },
      { time: "2:0", chord: ["D3", "A3", "C4", "F4"] },
      { time: "3:0", chord: ["G2", "D3", "F3", "B3"] }
    ];

    bgMusicPart = new Tone.Part((time, value) => {
      if (polySynth) {
        polySynth.triggerAttackRelease(value.chord, "1m", time);
      }
    }, loFiChords);

    bgMusicPart.loop = true;
    bgMusicPart.loopEnd = "4m";
    Tone.Transport.bpm.value = 65;

    bgMusicPart.start(0);
    Tone.Transport.start();
  } catch {}
}

function stopFallbackSynthMusic() {
  try {
    if (bgMusicPart) {
      bgMusicPart.stop();
      bgMusicPart.dispose();
      bgMusicPart = null;
    }
    if (polySynth) {
      polySynth.dispose();
      polySynth = null;
    }
    Tone.Transport.stop();
    Tone.Transport.cancel();
  } catch {}
}

// Sound Effect: Tiup Lilin (Whoosh / Hembusan Angin Lembut & Alami)
let blowNoise = null;
export function playBlowSound() {
  try {
    initAudio();
    if (!blowNoise || blowNoise.disposed) {
      const blowFilter = new Tone.Filter(850, "lowpass").toDestination();
      blowNoise = new Tone.NoiseSynth({
        noise: { type: "pink" },
        envelope: { attack: 0.12, decay: 0.75, sustain: 0 }
      }).connect(blowFilter);
      blowNoise.volume.value = -14;
    }
    blowNoise.triggerAttackRelease("0.75s");
  } catch {
    // fallback safe
  }
}

// Sound Effect: Sparkles / Acoustic Kalimba Chime (Mewah, Hangat, & Syahdu)
// Memainkan interval harmonis nada E5 -> B5 dengan gelombang sine murni & decay bel akustik yang lembut
let bellSynth = null;
export function playSparkleSound() {
  try {
    initAudio();
    if (!bellSynth || bellSynth.disposed) {
      bellSynth = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.003, decay: 0.42, sustain: 0, release: 0.35 }
      }).toDestination();
      bellSynth.volume.value = -19; // Lembut di latar belakang, berpadu manis dengan musik akustik
    }

    bellSynth.triggerAttackRelease("E5", "0.2s");
    setTimeout(() => {
      try {
        if (bellSynth && !bellSynth.disposed) {
          bellSynth.triggerAttackRelease("B5", "0.3s");
        }
      } catch {}
    }, 85);
  } catch {
    // fallback safe
  }
}

// Sound Effect: Wax Seal Crack & Paper Rustle (Retakan Segel Lilin & Serat Kertas Vintage)
let sealSnapNoise = null;
export function playSealCrackSound() {
  try {
    initAudio();
    // 1. Sentuhan retakan wax (crisp snap)
    if (!sealSnapNoise || sealSnapNoise.disposed) {
      const snapFilter = new Tone.Filter(2200, "bandpass").toDestination();
      sealSnapNoise = new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.002, decay: 0.07, sustain: 0 }
      }).connect(snapFilter);
      sealSnapNoise.volume.value = -16;
    }
    sealSnapNoise.triggerAttackRelease("0.07s");

    // 2. Desiran serat kertas vintage saat amplop terbuka
    setTimeout(() => {
      try {
        playPaperSlideSound();
      } catch {}
    }, 50);
  } catch {
    // fallback safe
  }
}

// Sound Effect: Paper Slide (Desiran Kertas Amplop Vintage yang Lembut)
let paperNoise = null;
export function playPaperSlideSound() {
  try {
    initAudio();
    if (!paperNoise || paperNoise.disposed) {
      const paperFilter = new Tone.Filter(1400, "lowpass").toDestination();
      paperNoise = new Tone.NoiseSynth({
        noise: { type: "pink" },
        envelope: { attack: 0.04, decay: 0.28, sustain: 0 }
      }).connect(paperFilter);
      paperNoise.volume.value = -22;
    }
    paperNoise.triggerAttackRelease("0.28s");
  } catch {
    // fallback safe
  }
}

// Helper: Deteksi Tiupan Menggunakan Mikrofon HP/Laptop yang Akurat & Tahan Noise
export class MicrophoneBlowDetector {
  constructor(onBlowCallback, threshold = 80) {
    this.onBlow = onBlowCallback;
    this.threshold = threshold;
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.javascriptNode = null;
    this.stream = null;
    this.isListening = false;
    this.startTime = 0;
    this.consecutiveHits = 0;
  }

  async start() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
        video: false,
      });

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContextClass();
      this.analyser = this.audioContext.createAnalyser();
      this.microphone = this.audioContext.createMediaStreamSource(this.stream);
      this.javascriptNode = this.audioContext.createScriptProcessor(2048, 1, 1);

      this.analyser.smoothingTimeConstant = 0.2;
      this.analyser.fftSize = 512;

      this.microphone.connect(this.analyser);
      this.analyser.connect(this.javascriptNode);

      // Mute gain agar suara hembusan mic tidak bocor atau menimbulkan feedback loop ke speaker HP/laptop
      const muteGain = this.audioContext.createGain();
      muteGain.gain.value = 0;
      this.javascriptNode.connect(muteGain);
      muteGain.connect(this.audioContext.destination);

      this.isListening = true;
      this.startTime = Date.now();
      this.consecutiveHits = 0;

      this.javascriptNode.onaudioprocess = () => {
        if (!this.isListening) return;

        // 1. Grace Period: Abaikan 650ms pertama setelah mic dinyalakan
        // Ini mencegah transien inisialisasi mic dan suara ketukan jari saat menekan tombol mic di layar
        if (Date.now() - this.startTime < 650) {
          return;
        }

        const array = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(array);

        // 2. Analisis Frekuensi Tiupan Nafas:
        // Tiupan nafas menghasilkan desiran udara bertekanan di frekuensi rendah (< 500Hz)
        let lowFreqSum = 0;
        const binCount = Math.min(16, array.length);
        for (let i = 0; i < binCount; i++) {
          lowFreqSum += array[i];
        }
        const average = lowFreqSum / binCount;

        // 3. Sustain Check (Tiupan Harus Kontinu):
        // Suara klik / tap instan hanya berlangsung 1 buffer (~30ms),
        // sedangkan tiupan nafas manusia berlangsung berkelanjutan (minimal 4 frame / ~180-250ms).
        if (average > this.threshold) {
          this.consecutiveHits++;
          if (this.consecutiveHits >= 4) {
            this.stop();
            if (this.onBlow) {
              this.onBlow();
            }
          }
        } else {
          // Turunkan akumulasi jika tiupan terputus
          this.consecutiveHits = Math.max(0, this.consecutiveHits - 1);
        }
      };

      return true;
    } catch (err) {
      console.warn("Microphone access denied or not supported:", err);
      return false;
    }
  }

  stop() {
    this.isListening = false;
    this.consecutiveHits = 0;
    if (this.javascriptNode) {
      this.javascriptNode.onaudioprocess = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close();
    }
  }
}

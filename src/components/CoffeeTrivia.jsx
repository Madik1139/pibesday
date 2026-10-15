import React, { useState } from "react";
import { coffeeTrivia } from "../data/coffeeContent";
import { HelpCircle, CheckCircle2, Heart, Award, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { playSparkleSound } from "../utils/audio";

export default function CoffeeTrivia() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = coffeeTrivia[currentStep];

  const handleSelectOption = (index) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);

    try {
      playSparkleSound();
    } catch {
      // safe fallback
    }

    if (index === question.correctIndex) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#C48B47", "#D4A373", "#FAF0CA", "#8C5E28"],
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowFeedback(false);

    if (currentStep < coffeeTrivia.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#C48B47", "#D4A373", "#FAF0CA", "#E6CCB2", "#FAF7F2"],
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCompleted(false);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-8 md:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/40 text-[#8C5E28] text-[11px] font-semibold tracking-wider uppercase mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#8C5E28]" />
          <span>Love & Memory Trivia</span>
        </div>
        <h2 className="font-serif-title text-[26px] md:text-[34px] font-semibold text-[#2C1810] tracking-tight">
          Kuis Nostalgia Kita
        </h2>
        <p className="text-[14px] md:text-[15px] text-[#6F4E37] max-w-xl mx-auto mt-1 leading-relaxed">
          Uji ingatan manis tentang obrolan, kebiasaan, dan momen terindah yang telah kita lewati bersama.
        </p>
      </div>

      {/* Card Utama Kuis */}
      <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-amber-200/70 rounded-3xl p-6 sm:p-10 md:p-12 pb-8 sm:pb-10 md:pb-12 shadow-[0_12px_40px_-8px_rgba(44,24,16,0.1)]">
        {!isCompleted ? (
          <div>
            {/* Header Kuis: Indikator Step */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-100">
              <span className="text-[12px] font-bold text-[#8C5E28] uppercase tracking-wider">
                Tema: {question.theme}
              </span>
              <div className="flex items-center gap-1.5">
                {coffeeTrivia.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentStep
                        ? "w-6 bg-[#8C5E28]"
                        : idx < currentStep
                        ? "w-2 bg-emerald-500"
                        : "w-2 bg-amber-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Pertanyaan */}
            <h3 className="font-serif-title text-[18px] md:text-[22px] font-semibold text-[#2C1810] mb-6 leading-snug">
              {question.question}
            </h3>

            {/* Pilihan Jawaban (Touch target min 44x44px) */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === question.correctIndex;
                let btnStyle = "bg-white hover:bg-amber-50/70 border-amber-200/70 text-[#3A2318]";

                if (showFeedback) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold shadow-xs";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-50 border-rose-300 text-rose-800";
                  } else {
                    btnStyle = "bg-white/50 border-amber-100 text-gray-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={showFeedback}
                    type="button"
                    className={`min-h-[48px] w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer active:scale-[0.99] ${btnStyle}`}
                  >
                    <span className="text-[14px] md:text-[15px] leading-relaxed">
                      {opt}
                    </span>
                    {showFeedback && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Box & Tombol Lanjut */}
            {showFeedback && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/90 border border-amber-200/60 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center gap-2 text-[#8C5E28] font-bold text-[14px] mb-1">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>{question.feedbackSuccess}</span>
                </div>
                <p className="text-[13px] text-[#6F4E37] leading-relaxed mb-4">
                  {question.feedbackDesc}
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    type="button"
                    className="min-h-[44px] px-6 py-2 rounded-full bg-[#8C5E28] hover:bg-[#724B1F] text-white text-[13px] font-semibold shadow-[0_4px_14px_rgba(140,94,40,0.2)] active:scale-95 transition-all cursor-pointer"
                  >
                    {currentStep < coffeeTrivia.length - 1 ? "Pertanyaan Selanjutnya →" : "Lihat Kesimpulan 🏆"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Layar Selesai Kuis */
          <div className="text-center py-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300/50 flex items-center justify-center text-[#8C5E28] mb-4 shadow-sm">
              <Award className="w-8 h-8 text-[#8C5E28]" />
            </div>
            <h3 className="font-serif-title text-[24px] md:text-[28px] font-bold text-[#2C1810]">
              Skor Sempurna: 100% Cinta Abadi! 💖
            </h3>
            <p className="text-[14px] md:text-[15px] text-[#6F4E37] max-w-lg mt-2 leading-relaxed">
              Semua kenangan dan rasa cinta kita terukir indah. Terima kasih sudah mengingat setiap detail kecil yang kita lewati bersama, Evina!
            </p>

            <button
              onClick={handleRestartQuiz}
              type="button"
              className="mt-6 min-h-[44px] px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8C5E28] to-[#C48B47] text-white font-sans font-semibold text-[13px] shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

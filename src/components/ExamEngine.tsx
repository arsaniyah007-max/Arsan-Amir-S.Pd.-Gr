/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Student, Subject, Question } from "../types";
import { AlertCircle, FileText, ChevronLeft, ChevronRight, HelpCircle, User, Award, PlayCircle, LogOut } from "lucide-react";

interface ExamEngineProps {
  student: Student;
  subject: Subject;
  questions: Question[];
  onFinish: (answers: Record<string, string>, markedForReview: string[]) => void;
  onExit: () => void;
}

export default function ExamEngine({ student, subject, questions, onFinish, onExit }: ExamEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Answers state: questionId -> chosen key ("A", "B", etc.)
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem(`cbt_answers_${student.nisn}_${subject.id}`);
    return saved ? JSON.parse(saved) : {};
  });

  // Marked for Review (Ragu-Ragu) state
  const [markedForReview, setMarkedForReview] = useState<string[]>(() => {
    const saved = localStorage.getItem(`cbt_ragu_${student.nisn}_${subject.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Font size multiplier
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");

  // Timer: Duration in seconds
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedTime = localStorage.getItem(`cbt_timer_${student.nisn}_${subject.id}`);
    if (savedTime) {
      return parseInt(savedTime, 10);
    }
    return subject.durationMinutes * 60;
  });

  // Is modal open
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(`cbt_answers_${student.nisn}_${subject.id}`, JSON.stringify(answers));
  }, [answers, student.nisn, subject.id]);

  useEffect(() => {
    localStorage.setItem(`cbt_ragu_${student.nisn}_${subject.id}`, JSON.stringify(markedForReview));
  }, [markedForReview, student.nisn, subject.id]);

  // Timer interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Submit immediately on timeout
          handleAutoSubmit();
          return 0;
        }
        const updated = prev - 1;
        localStorage.setItem(`cbt_timer_${student.nisn}_${subject.id}`, updated.toString());
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAutoSubmit = () => {
    cleanupStorage();
    onFinish(answers, markedForReview);
  };

  const cleanupStorage = () => {
    localStorage.removeItem(`cbt_answers_${student.nisn}_${subject.id}`);
    localStorage.removeItem(`cbt_ragu_${student.nisn}_${subject.id}`);
    localStorage.removeItem(`cbt_timer_${student.nisn}_${subject.id}`);
  };

  // Click on choice
  const handleSelectOption = (questionId: string, optionKey: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  // Toggle Ragu-Ragu
  const handleToggleRagu = (questionId: string) => {
    setMarkedForReview(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  const fontStyleClass = 
    fontSize === "xlarge" ? "text-xl md:text-2xl" : 
    fontSize === "large" ? "text-lg md:text-xl" : "text-sm md:text-base";

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    const formattedM = m < 10 ? `0${m}` : m;
    const formattedS = s < 10 ? `0${s}` : s;
    
    if (h > 0) {
      return `${h}:${formattedM}:${formattedS}`;
    }
    return `${formattedM}:${formattedS}`;
  };

  const handleManualSubmitAttempt = () => {
    setIsSubmitModalOpen(true);
  };

  const confirmFinalSubmit = () => {
    setIsSubmitModalOpen(false);
    cleanupStorage();
    onFinish(answers, markedForReview);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="exam-engine-root">
      
      {/* Alert if time is low (less than 3 minutes) */}
      {timeLeft < 180 && timeLeft > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 rounded-xl flex items-center gap-3 animate-pulse text-amber-900 shadow-sm" id="time-warning-banner">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div className="text-xs font-semibold">
            WAKTU HAMPIR HABIS! Sisa waktu pengerjaan kurang dari {formatTime(timeLeft)}. Silakan periksa kembali seluruh jawaban Anda.
          </div>
        </div>
      )}

      {/* Main Grid: left for questions, right for panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Question Pane */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden min-h-[500px] flex flex-col justify-between" id="question-workspace-panel">
          
          {/* Panel Header */}
          <div className="bg-stone-50 border-b border-stone-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white font-black px-3 py-1.5 rounded-lg text-sm font-mono tracking-wider">
                SOAL {currentIndex + 1}
              </span>
              <span className="text-stone-300 font-light">|</span>
              <span className="text-xs text-stone-500 font-semibold font-mono">
                Dari {totalQuestions} Soal
              </span>
            </div>

            {/* Font Adjuster Tool */}
            <div className="flex items-center gap-1 bg-stone-200/60 rounded-xl p-1">
              <span className="text-[10px] text-stone-500 font-bold px-2 uppercase font-mono">Ukuran Huruf:</span>
              <button
                type="button"
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${fontSize === "normal" ? "bg-white text-emerald-800 shadow" : "text-stone-600 hover:bg-stone-200"}`}
                onClick={() => setFontSize("normal")}
              >
                A
              </button>
              <button
                type="button"
                className={`px-2.5 py-1 text-sm font-bold rounded-lg transition ${fontSize === "large" ? "bg-white text-emerald-800 shadow" : "text-stone-600 hover:bg-stone-200"}`}
                onClick={() => setFontSize("large")}
              >
                A+
              </button>
              <button
                type="button"
                className={`px-2.5 py-1 text-base font-black rounded-lg transition ${fontSize === "xlarge" ? "bg-white text-emerald-800 shadow" : "text-stone-600 hover:bg-stone-200"}`}
                onClick={() => setFontSize("xlarge")}
              >
                A++
              </button>
            </div>
          </div>

          {/* Panel Content: Core question */}
          <div className="p-6 md:p-8 space-y-6 flex-grow">
            
            {/* If there is a vocational healthcare case study context */}
            {currentQuestion?.caseStudy && (
              <div className="bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-2xl p-4 sm:p-5 text-emerald-950 font-serif leading-relaxed italic relative shadow-sm" id="case-study-card">
                <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-emerald-600/10 text-emerald-800 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full font-sans">
                  <FileText className="w-3.5 h-3.5" />
                  Studi Kasus Klinis
                </div>
                <p className="text-xs sm:text-sm font-semibold mt-2 text-stone-850">
                  {currentQuestion.caseStudy}
                </p>
              </div>
            )}

            {/* Question Text */}
            <div className={`font-medium text-stone-800 leading-relaxed font-sans ${fontStyleClass}`} id="question-text">
              {currentQuestion?.text}
            </div>

            {/* Options Selection */}
            <div className="space-y-3 mt-6">
              {currentQuestion?.options.map((opt) => {
                const isSelected = answers[currentQuestion.id] === opt.key;
                return (
                  <button
                    id={`opt-${opt.key}`}
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectOption(currentQuestion.id, opt.key)}
                    className={`w-full text-left rounded-2xl p-4 border flex items-center gap-4 transition group focus:outline-none cursor-pointer ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-600 text-emerald-900 shadow-sm"
                        : "bg-white hover:bg-stone-50 border-stone-200 text-stone-800"
                    }`}
                  >
                    {/* Option key indicator circle */}
                    <div className={`w-9 h-9 flex items-center justify-center font-bold text-sm rounded-xl shrink-0 border transition ${
                      isSelected
                        ? "bg-emerald-600 text-white border-transparent"
                        : "bg-stone-100 text-stone-600 group-hover:bg-emerald-100 group-hover:text-emerald-800 border-stone-300"
                    }`}>
                      {opt.key}
                    </div>
                    {/* Option Text */}
                    <span className="text-sm sm:text-base font-semibold text-stone-800 leading-snug">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel Footer Navigation */}
          <div className="bg-stone-50 border-t border-stone-200 p-4 flex flex-wrap items-center justify-between gap-4">
            
            {/* Prev button */}
            <button
              id="btn-prev-question"
              type="button"
              className={`flex items-center gap-2 font-bold px-4 py-3 text-sm rounded-xl border border-stone-300 transition shrink-0 cursor-pointer ${
                currentIndex === 0 
                  ? "opacity-40 bg-stone-100 text-stone-400 cursor-not-allowed" 
                  : "bg-white hover:bg-stone-100 text-stone-700"
              }`}
              onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
              SOAL SEBELUMNYA
            </button>

            {/* Ragu-Ragu toggle */}
            <button
              id="btn-toggle-ragu"
              type="button"
              onClick={() => handleToggleRagu(currentQuestion.id)}
              className={`flex items-center gap-2.5 font-extrabold px-5 py-3 text-xs sm:text-sm rounded-xl border transition cursor-pointer shrink-0 ${
                markedForReview.includes(currentQuestion.id)
                  ? "bg-yellow-400 text-amber-950 border-yellow-500 shadow-md transform scale-105"
                  : "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
              }`}
            >
              <input
                type="checkbox"
                checked={markedForReview.includes(currentQuestion.id)}
                onChange={() => {}} // Block normal change since button handles it
                className="w-4 h-4 rounded text-amber-600 accent-amber-600 pointer-events-none"
              />
              RAGU-RAGU
            </button>

            {/* Next button */}
            {currentIndex < totalQuestions - 1 ? (
              <button
                id="btn-next-question"
                type="button"
                className="flex items-center gap-2 font-bold px-5 py-3 text-sm rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white border border-transparent shadow-md select-none cursor-pointer shrink-0 transition"
                onClick={() => setCurrentIndex(currentIndex + 1)}
              >
                SOAL SELANJUTNYA
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="btn-submit-exam-trigger"
                type="button"
                className="flex items-center gap-2 font-extrabold px-5 py-3 text-sm rounded-xl bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/10 cursor-pointer shrink-0 transition"
                onClick={handleManualSubmitAttempt}
              >
                SELESAI UJIAN
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Info Sidebar & Navigation Map */}
        <div className="lg:col-span-4 space-y-6" id="exam-dashboard-sidebar">
          
          {/* Box 1: Student Information card */}
          <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2">
              <User className="w-4.5 h-4.5 text-stone-500" />
              Biodata Peserta Ujian
            </h3>
            <div className="border-t border-stone-100 pt-3 flex flex-col gap-1.5 text-sm font-semibold">
              <div className="flex justify-between">
                <span className="text-stone-500">Nama:</span>
                <span className="text-stone-900 font-extrabold text-right limit-text">{student.nama}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">NISN:</span>
                <span className="text-stone-800 font-mono text-right">{student.nisn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Kelas:</span>
                <span className="text-stone-800 text-right">{student.kelas}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Jurusan:</span>
                <span className="text-stone-800 text-right text-xs max-w-[150px]">{student.jurusan.split(" ")[0]}</span>
              </div>
              <div className="flex justify-between items-center border-t border-stone-100 pt-2.5 mt-1">
                <span className="text-[11px] text-stone-400">Mapel Aktif:</span>
                <span className="text-emerald-800 text-xs font-black truncate max-w-[160px]">{subject.name}</span>
              </div>
            </div>
          </div>

          {/* Box 2: Timer block */}
          <div className="bg-gradient-to-br from-indigo-950 to-teal-950 text-white rounded-2xl shadow-md p-5 text-center flex flex-col items-center justify-center border border-teal-500/20">
            <span className="text-[11px] font-bold tracking-widest uppercase text-teal-300 flex items-center gap-1.5 font-mono">
              SISA WAKTU PENGERJAAN
            </span>
            <div className={`text-4xl font-extrabold font-mono tracking-widest mt-2 ${timeLeft < 180 ? "text-red-400 animate-pulse text-5xl" : "text-white"}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="mt-2 text-[10px] text-slate-300/80 font-medium">
              Ujian otomatis terkumpul saat waktu habis
            </div>
          </div>

          {/* Box 3: Question Number Navigator Map */}
          <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-5">
            <h3 className="text-xs font-bold uppercase text-stone-500 tracking-wider flex items-center gap-1.5 mb-3.5">
              <HelpCircle className="w-4.5 h-4.5 text-emerald-700" />
              Peta Jalan Ujian (Navigator)
            </h3>

            {/* Grid of Number boxes */}
            <div className="grid grid-cols-5 gap-2" id="navigator-number-grid">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isMarkedRagu = markedForReview.includes(q.id);
                const hasAnswer = answers[q.id];

                let boxBg = "bg-white border-stone-300 text-stone-800 hover:bg-stone-50";
                
                if (hasAnswer) {
                  boxBg = isMarkedRagu 
                    ? "bg-yellow-400 hover:bg-yellow-500 border-yellow-500 text-amber-950"
                    : "bg-emerald-600 hover:bg-emerald-700 border-emerald-700 text-white";
                } else if (isMarkedRagu) {
                  boxBg = "bg-yellow-400 hover:bg-yellow-500 border-yellow-500 text-amber-950";
                }

                return (
                  <button
                    id={`nav-num-${idx + 1}`}
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-11 rounded-xl border-2 font-black font-mono text-center relative flex items-center justify-center transition cursor-pointer select-none text-sm group ${boxBg} ${
                      isCurrent ? "ring-4 ring-emerald-500/30 font-bold scale-105" : ""
                    }`}
                  >
                    <span>{idx + 1}</span>
                    
                    {/* Tiny answered indicator letter */}
                    {hasAnswer && (
                      <span className={`absolute bottom-0 right-1 text-[8px] font-extrabold ${
                        isMarkedRagu ? "text-amber-900" : "text-emerald-300"
                      }`}>
                        {answers[q.id]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer indicators checklist summary */}
            <div className="mt-5 pt-4 border-t border-stone-100 grid grid-cols-3 gap-2 text-[10px] uppercase font-mono font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-600 border border-emerald-700 block" />
                <span>Isi: {answeredCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-yellow-400 border border-yellow-500 block" />
                <span>Ragu: {markedForReview.length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-white border border-stone-300 block" />
                <span>Belum: {totalQuestions - answeredCount}</span>
              </div>
            </div>

            {/* Selesai Action explicitly inside the map, matching standard ANBK */}
            <button
              id="sidebar-final-submit"
              type="button"
              className="w-full mt-5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-3.5 px-4 rounded-xl border border-stone-850 hover:border-b-4 tracking-wider uppercase transition cursor-pointer text-center flex items-center justify-center gap-2"
              onClick={handleManualSubmitAttempt}
            >
              Kumpulkan Lembar Jawaban
            </button>
          </div>

          <button
            id="sidebar-emergency-exit"
            type="button"
            className="w-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 border border-red-200 cursor-pointer"
            onClick={() => {
              if (window.confirm("Batal ujian? Seluruh progres saat ini akan dihilangkan laporannya.")) {
                cleanupStorage();
                onExit();
              }
            }}
          >
            <LogOut className="w-4 h-4" />
            Batal & Keluar Ujian
          </button>
        </div>
      </div>

      {/* COMPREHENSIVE SUBMIT DIALOG (MODAL) */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="submit-confirm-modal">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-zoom-in space-y-5">
            <div className="flex items-center gap-3 text-orange-600">
              <div className="bg-orange-100 p-2.5 rounded-full">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                Konfirmasi Selesai Ujian
              </h3>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed font-semibold">
              Apakah Anda benar-benar yakin ingin menyelesaikan ujian <span className="text-stone-900 font-extrabold">{subject.name}</span> ini? Progres dan lembaran jawaban Anda akan langsung dikunci dan dinilai secara otomatis oleh komputer.
            </p>

            {/* Checklist items status */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-stone-500">Total Soal:</span>
                <span className="text-stone-900 font-mono">{totalQuestions} Soal</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-emerald-700">Sudah Dijawab:</span>
                <span className="text-emerald-800 font-mono">{answeredCount} Soal</span>
              </div>
              {totalQuestions - answeredCount > 0 && (
                <div className="flex justify-between font-bold text-red-600 bg-red-50 p-1.5 rounded border border-red-200">
                  <span>🚨 Belum Dijawab:</span>
                  <span className="font-mono">{totalQuestions - answeredCount} Soal tersisa!</span>
                </div>
              )}
              {markedForReview.length > 0 && (
                <div className="flex justify-between font-bold text-amber-700 bg-amber-50 p-1.5 rounded">
                  <span>⚠️ Ditandai Ragu-Ragu:</span>
                  <span className="font-mono">{markedForReview.length} Soal</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-stone-400 font-medium">
              *Setelah mengklik 'Kirim Jawaban Ya', Anda tidak akan bisa melakukan pengerjaan ulang draf lembar jawaban ini lagi dengan NISN yang sama.
            </p>

            {/* Modal Controls */}
            <div className="flex gap-3 pt-2">
              <button
                id="btn-modal-cancel"
                type="button"
                className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 rounded-xl border border-stone-300 transition text-sm cursor-pointer"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                Kembali Menjawab
              </button>
              <button
                id="btn-modal-confirm"
                type="button"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl border-b-4 border-emerald-800 shadow shadow-emerald-600/10 transition text-sm cursor-pointer uppercase tracking-wider"
                onClick={confirmFinalSubmit}
              >
                Kirim Jawaban Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

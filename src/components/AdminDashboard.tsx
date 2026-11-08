/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Subject, Question, StudentResult, Jurusan, Kelas } from "../types";
import { BookOpen, User, Users, ClipboardList, Settings, Award, ArrowLeft, RefreshCw, Trash2, Plus, Edit, Check, Settings2, BarChart3, Pill, ShieldCheck, PlusCircle, ClipboardCheck, FileSpreadsheet, TrendingUp, Printer, Download } from "lucide-react";
import { downloadSingleStudentHTML, downloadSingleStudentCSV, downloadAllStudentsCSV } from "../utils/downloadResults";

interface AdminDashboardProps {
  subjects: Subject[];
  defaultQuestions: Question[];
  onExit: () => void;
  onRefreshQuestions: () => void;
}

export default function AdminDashboard({ subjects, defaultQuestions, onExit, onRefreshQuestions }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"siswa" | "soal" | "input-soal" | "rekap-skor">("siswa");
  
  // Results loaded from localStorage
  const [results, setResults] = useState<StudentResult[]>([]);
  
  // Active selected subject for Question editor
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || "");
  
  // Question manager state
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  
  // Quick inputs to add/edit question
  const [tempQuestionText, setTempQuestionText] = useState("");
  const [tempCaseStudy, setTempCaseStudy] = useState("");
  const [tempCorrectOption, setTempCorrectOption] = useState("A");
  const [tempExplanation, setTempExplanation] = useState("");
  const [tempOptions, setTempOptions] = useState([
    { key: "A", text: "" },
    { key: "B", text: "" },
    { key: "C", text: "" },
    { key: "D", text: "" },
    { key: "E", text: "" }
  ]);

  // Dedicated Form states for MENU INPUT SOAL
  const [inputSubjectId, setInputSubjectId] = useState<string>(subjects[0]?.id || "");
  const [inputQuestionText, setInputQuestionText] = useState("");
  const [inputCaseStudy, setInputCaseStudy] = useState("");
  const [inputCorrectOption, setInputCorrectOption] = useState("A");
  const [inputExplanation, setInputExplanation] = useState("");
  const [inputOptions, setInputOptions] = useState([
    { key: "A", text: "" },
    { key: "B", text: "" },
    { key: "C", text: "" },
    { key: "D", text: "" },
    { key: "E", text: "" }
  ]);

  // Koreksi Jawaban states
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);
  const [manualScoreOverride, setManualScoreOverride] = useState<string>("");
  const [manualCorrectCount, setManualCorrectCount] = useState<string>("");

  // Rekapitulasi Skor states
  const [recapSearch, setRecapSearch] = useState("");
  const [recapJurusan, setRecapJurusan] = useState<string>("all");
  const [recapKelas, setRecapKelas] = useState<string>("all");
  const [recapSubject, setRecapSubject] = useState<string>("all");
  const [recapStatus, setRecapStatus] = useState<string>("all");

  // Load results and questions on mount
  useEffect(() => {
    loadResults();
    loadQuestions();
  }, []);

  const loadResults = async () => {
    try {
      const res = await fetch("/api/results");
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        localStorage.setItem("cbt_all_results", JSON.stringify(data));
        return;
      }
    } catch (err) {
      console.warn("Gagal terhubung ke server untuk mengambil hasil ujian, menggunakan cadangan lokal:", err);
    }

    const saved = localStorage.getItem("cbt_all_results");
    if (saved) {
      setResults(JSON.parse(saved));
    } else {
      setResults([]);
    }
  };

  const loadQuestions = async () => {
    try {
      const res = await fetch("/api/questions");
      if (res.ok) {
        const data = await res.json();
        setAllQuestions(data);
        localStorage.setItem("cbt_custom_questions", JSON.stringify(data));
        return;
      }
    } catch (err) {
      console.warn("Gagal terhubung ke server untuk mengambil soal, menggunakan cadangan lokal:", err);
    }

    const saved = localStorage.getItem("cbt_custom_questions");
    if (saved) {
      setAllQuestions(JSON.parse(saved));
    } else {
      // Initialize with default questions and store
      localStorage.setItem("cbt_custom_questions", JSON.stringify(defaultQuestions));
      setAllQuestions(defaultQuestions);
    }
  };

  const handleDeleteResult = async (id: string) => {
    if (window.confirm("Batal penyerahan ujian siswa ini? Tindakan ini akan memulihkan NISN mereka sehingga dapat mengulang pengerjaan kembali.")) {
      try {
        const res = await fetch(`/api/results/${id}`, { method: "DELETE" });
        if (res.ok) {
          const updated = results.filter(r => r.id !== id);
          localStorage.setItem("cbt_all_results", JSON.stringify(updated));
          setResults(updated);
          return;
        }
      } catch (err) {
        console.error("Gagal menghapus hasil di server:", err);
      }
      
      const updated = results.filter(r => r.id !== id);
      localStorage.setItem("cbt_all_results", JSON.stringify(updated));
      setResults(updated);
    }
  };

  const handleClearAllResults = async () => {
    if (window.confirm("PERINGATAN! Anda akan menghapus SELURUH riwayat nilai dan pengerjaan siswa di sistem lokal ini. Tindakan ini tidak dapat dibatalkan!")) {
      try {
        const res = await fetch("/api/results", { method: "DELETE" });
        if (res.ok) {
          localStorage.removeItem("cbt_all_results");
          setResults([]);
          return;
        }
      } catch (err) {
        console.error("Gagal menghapus semua hasil di server:", err);
      }

      localStorage.removeItem("cbt_all_results");
      setResults([]);
    }
  };

  // Switch to edit question mode
  const startEditQuestion = (q: Question) => {
    setEditingQuestionId(q.id);
    setTempQuestionText(q.text);
    setTempCaseStudy(q.caseStudy || "");
    setTempCorrectOption(q.correctAnswer);
    setTempExplanation(q.explanation);
    setTempOptions(q.options.map(opt => ({ ...opt })));
  };

  const handleSaveEditedQuestion = async (id: string) => {
    if (!tempQuestionText.trim()) {
      alert("Teks Soal tidak boleh kosong!");
      return;
    }
    if (tempOptions.some(opt => !opt.text.trim())) {
      alert("Semua teks pilihan jawaban A sampai E harus diisi!");
      return;
    }

    const updated = allQuestions.map(q => {
      if (q.id === id) {
        return {
          ...q,
          text: tempQuestionText.trim(),
          caseStudy: tempCaseStudy.trim() || undefined,
          correctAnswer: tempCorrectOption,
          explanation: tempExplanation.trim(),
          options: tempOptions.map(opt => ({ key: opt.key, text: opt.text.trim() }))
        };
      }
      return q;
    });

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        localStorage.setItem("cbt_custom_questions", JSON.stringify(updated));
        setAllQuestions(updated);
        setEditingQuestionId(null);
        onRefreshQuestions(); // Trigger re-load in App state
        alert("Berhasil memperbarui soal ujian!");
        return;
      }
    } catch (err) {
      console.error("Gagal menyimpan perubahan ke server:", err);
    }

    localStorage.setItem("cbt_custom_questions", JSON.stringify(updated));
    setAllQuestions(updated);
    setEditingQuestionId(null);
    onRefreshQuestions(); // Trigger re-load in App state
    alert("Berhasil memperbarui soal ujian secara lokal!");
  };

  const handleAddNewQuestion = async () => {
    const defaultNew: Question = {
      id: `custom-${Date.now()}`,
      subjectId: selectedSubjectId,
      text: "Teks pertanyaan soal kesehatan baru...",
      options: [
        { key: "A", text: "Pilihan A" },
        { key: "B", text: "Pilihan B" },
        { key: "C", text: "Pilihan C" },
        { key: "D", text: "Pilihan D" },
        { key: "E", text: "Pilihan E" }
      ],
      correctAnswer: "A",
      explanation: "Penjelasan medis penolong jawaban benar..."
    };

    const updated = [defaultNew, ...allQuestions];

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        localStorage.setItem("cbt_custom_questions", JSON.stringify(updated));
        setAllQuestions(updated);
        onRefreshQuestions();
        startEditQuestion(defaultNew);
        return;
      }
    } catch (err) {
      console.error("Gagal menambahkan soal ke server:", err);
    }

    localStorage.setItem("cbt_custom_questions", JSON.stringify(updated));
    setAllQuestions(updated);
    onRefreshQuestions();
    startEditQuestion(defaultNew);
  };

  const handleDeleteQuestion = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus soal ini secara permanen dari paket ujian active?")) {
      const updated = allQuestions.filter(q => q.id !== id);

      try {
        const res = await fetch("/api/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated)
        });
        if (res.ok) {
          localStorage.setItem("cbt_custom_questions", JSON.stringify(updated));
          setAllQuestions(updated);
          onRefreshQuestions();
          return;
        }
      } catch (err) {
        console.error("Gagal menghapus soal di server:", err);
      }

      localStorage.setItem("cbt_custom_questions", JSON.stringify(updated));
      setAllQuestions(updated);
      onRefreshQuestions();
    }
  };

  // Reset questions back to default database state
  const handleResetToPresets = async () => {
    if (window.confirm("Konfirmasi mengatur ulang seluruh soal ujian ke default bawaan asisten klinis SMKS Kesehatan Unaaha? Perubahan kustom Anda akan dihapus.")) {
      try {
        const res = await fetch("/api/questions/reset", { method: "POST" });
        if (res.ok) {
          localStorage.setItem("cbt_custom_questions", JSON.stringify(defaultQuestions));
          setAllQuestions(defaultQuestions);
          onRefreshQuestions();
          alert("Soal berhasil dikembalikan ke standar!");
          return;
        }
      } catch (err) {
        console.error("Gagal mereset soal ke server:", err);
      }

      localStorage.setItem("cbt_custom_questions", JSON.stringify(defaultQuestions));
      setAllQuestions(defaultQuestions);
      onRefreshQuestions();
      alert("Soal berhasil dikembalikan ke standar!");
    }
  };

  // Dedicated Save Handler for "Input Soal Baru" Custom Panel (Form Submission)
  const handleSaveNewQuestionForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuestionText.trim()) {
      alert("Teks Soal tidak boleh kosong!");
      return;
    }
    if (inputOptions.some(opt => !opt.text.trim())) {
      alert("Semua teks pilihan jawaban A sampai E harus diisi!");
      return;
    }

    const newQuestion: Question = {
      id: `custom-${Date.now()}`,
      subjectId: inputSubjectId,
      text: inputQuestionText.trim(),
      caseStudy: inputCaseStudy.trim() || undefined,
      correctAnswer: inputCorrectOption,
      explanation: inputExplanation.trim(),
      options: inputOptions.map(opt => ({ key: opt.key, text: opt.text.trim() }))
    };

    const updated = [newQuestion, ...allQuestions];

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        localStorage.setItem("cbt_custom_questions", JSON.stringify(updated));
        setAllQuestions(updated);
        onRefreshQuestions();
        
        // Reset form fields
        setInputQuestionText("");
        setInputCaseStudy("");
        setInputCorrectOption("A");
        setInputExplanation("");
        setInputOptions([
          { key: "A", text: "" },
          { key: "B", text: "" },
          { key: "C", text: "" },
          { key: "D", text: "" },
          { key: "E", text: "" }
        ]);
        
        alert("Berhasil menambahkan soal baru ke bank soal!");
        setSelectedSubjectId(inputSubjectId);
        setActiveTab("soal"); // switch to bank soal view
        return;
      }
    } catch (err) {
      console.warn("Gagal terhubung ke server untuk menambahkan soal, menggunakan penyimpanan lokal:", err);
    }

    localStorage.setItem("cbt_custom_questions", JSON.stringify(updated));
    setAllQuestions(updated);
    onRefreshQuestions();
    
    // Reset form fields
    setInputQuestionText("");
    setInputCaseStudy("");
    setInputCorrectOption("A");
    setInputExplanation("");
    setInputOptions([
      { key: "A", text: "" },
      { key: "B", text: "" },
      { key: "C", text: "" },
      { key: "D", text: "" },
      { key: "E", text: "" }
    ]);
    
    alert("Berhasil menyimpan soal secara lokal!");
    setSelectedSubjectId(inputSubjectId);
    setActiveTab("soal"); // switch to bank soal view
  };

  // Dedicated Handler for "Koreksi Jawaban Siswa" (Detailed Item Update)
  const handleUpdateStudentAnswer = async (resultId: string, questionId: string, newAnswerKey: string) => {
    const resultIdx = results.findIndex(r => r.id === resultId);
    if (resultIdx === -1) return;
    const targetResult = { ...results[resultIdx] };

    // Update state
    const updatedAnswers = { ...targetResult.answers, [questionId]: newAnswerKey };
    targetResult.answers = updatedAnswers;

    // Recalculate score
    const subjectQuestions = allQuestions.filter(q => q.subjectId === targetResult.subjectId);
    let correctCount = 0;
    subjectQuestions.forEach((q) => {
      const ans = updatedAnswers[q.id];
      if (ans && ans === q.correctAnswer) {
        correctCount++;
      }
    });

    const totalQ = subjectQuestions.length || targetResult.totalQuestions;
    targetResult.correctAnswers = correctCount;
    targetResult.incorrectAnswers = totalQ - correctCount;
    targetResult.score = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
    targetResult.passed = targetResult.score >= 70;

    const updatedResults = [...results];
    updatedResults[resultIdx] = targetResult;

    // Update lists
    setResults(updatedResults);
    localStorage.setItem("cbt_all_results", JSON.stringify(updatedResults));

    // Post update to Express
    try {
      await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(targetResult)
      });
    } catch (err) {
      console.error("Gagal sinkronisasi data koreksi ke server:", err);
    }
  };

  // Dedicated Handler to Override Total Score/Correct answers manually
  const handleManualOverrideSave = async (resultId: string) => {
    const resultIdx = results.findIndex(r => r.id === resultId);
    if (resultIdx === -1) return;
    
    const parsedScore = parseInt(manualScoreOverride);
    const parsedCorrect = parseInt(manualCorrectCount);
    
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100) {
      alert("Skor manual wajib diisi dengan rentang nilai 0 s.d 100!");
      return;
    }
    
    const targetResult = { ...results[resultIdx] };
    const totalQ = targetResult.totalQuestions;
    
    const finalCorrect = isNaN(parsedCorrect) ? Math.round((parsedScore / 100) * totalQ) : parsedCorrect;
    
    targetResult.score = parsedScore;
    targetResult.correctAnswers = finalCorrect;
    targetResult.incorrectAnswers = Math.max(0, totalQ - finalCorrect);
    targetResult.passed = parsedScore >= 70;
    
    const updatedResults = [...results];
    updatedResults[resultIdx] = targetResult;
    
    setResults(updatedResults);
    localStorage.setItem("cbt_all_results", JSON.stringify(updatedResults));
    
    try {
      await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(targetResult)
      });
      alert("Berhasil meng-override koreksi nilai siswa secara manual!");
    } catch (err) {
      console.warn("Gagal terhubung ke server, meng-override nilai lokal:", err);
      alert("Berhasil meng-override nilai secara lokal!");
    }
    
    // Clear inputs
    setManualScoreOverride("");
    setManualCorrectCount("");
  };

  // Calculations for static analytics
  const filteredQuestions = allQuestions.filter(q => q.subjectId === selectedSubjectId);
  const totalSubmissions = results.length;
  const passedSubmissions = results.filter(r => r.score >= 70).length;
  const passRate = totalSubmissions > 0 ? Math.round((passedSubmissions / totalSubmissions) * 100) : 0;
  
  const averageScore = totalSubmissions > 0 
    ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / totalSubmissions) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6" id="admin-dashboard-root">
      
      {/* Upper Navigation Card */}
      <div className="bg-white rounded-2xl shadow border border-stone-200 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            id="btn-admin-exit"
            type="button"
            className="p-2 hover:bg-stone-100 rounded-xl transition border border-stone-250 cursor-pointer"
            onClick={onExit}
          >
            <ArrowLeft className="w-5 h-5 text-stone-750" />
          </button>
          <div>
            <h2 className="text-xl font-black text-indigo-950 flex items-center gap-1.5 uppercase">
              <Settings className="w-5 h-5 text-indigo-700 animate-spin-slow" />
              Sistem Pengawasan Guru
            </h2>
            <p className="text-xs text-stone-550 font-medium tracking-wide">
              Manajemen Paket Soal, Nilai Portofolio Asesmen, dan Laporan CBT SMKS Kesehatan Unaaha
            </p>
          </div>
        </div>

        {/* Dashboard quick action bar */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            id="btn-admin-refresh"
            type="button"
            className="p-2.5 bg-stone-50 hover:bg-stone-150 border border-stone-250 text-stone-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            onClick={() => {
              loadResults();
              loadQuestions();
            }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Muat Ulang Data
          </button>
          <button
            id="btn-admin-exit-right"
            type="button"
            className="p-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            onClick={onExit}
          >
            Keluar Panel Guru
          </button>
        </div>
      </div>

      {/* Primary Analytics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="dashboard-analytics-row">
        
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-5 flex items-center gap-4">
          <div className="bg-indigo-100 p-3.5 rounded-2xl text-indigo-800">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block font-mono">
              TOTAL SISWA UJIAN
            </span>
            <div className="text-3xl font-black text-indigo-950 mt-1 font-mono">{totalSubmissions}</div>
            <p className="text-[10px] text-stone-500 font-medium">Melakukan submit lembaran jawaban</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-5 flex items-center gap-4">
          <div className="bg-emerald-150 p-3.5 rounded-2xl text-emerald-800">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block font-mono">
              RATA-RATA SKOR KELAS
            </span>
            <div className="text-3xl font-black text-emerald-900 mt-1 font-mono">{averageScore} <span className="text-xs text-stone-400 font-normal">/ 100</span></div>
            <p className="text-[10px] text-stone-500 font-medium">Batas ketuntasan minimal (KKM) adalah 70</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-5 flex items-center gap-4">
          <div className={`p-3.5 rounded-2xl ${passRate >= 70 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block font-mono">
              RATING KETUNTASAN (KKM)
            </span>
            <div className="text-3xl font-black mt-1 font-mono">{passRate}%</div>
            <p className="text-[10px] text-stone-500 font-medium">{passedSubmissions} dari {totalSubmissions} siswa dinyatakan kompeten</p>
          </div>
        </div>
      </div>

      {/* Main Navigation tabs for Guru */}
      <div className="bg-white rounded-3xl shadow-md border border-stone-200 overflow-hidden" id="admin-main-workings">
        
        {/* Inner Tabs selection */}
        <div className="bg-stone-50 border-b border-stone-200 px-6 py-1 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button
              id="admin-tab-siswa"
              type="button"
              className={`py-4 px-1 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
                activeTab === "siswa" 
                  ? "border-indigo-800 text-indigo-950 font-extrabold" 
                  : "border-transparent text-stone-500 hover:text-stone-850"
              }`}
              onClick={() => setActiveTab("siswa")}
            >
              <ClipboardList className="w-4 h-4 text-stone-400" />
              Laporan Hasil Siswa
            </button>
            <button
              id="admin-tab-soal"
              type="button"
              className={`py-4 px-1 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
                activeTab === "soal" 
                  ? "border-indigo-800 text-indigo-950 font-extrabold" 
                  : "border-transparent text-stone-500 hover:text-stone-850"
              }`}
              onClick={() => setActiveTab("soal")}
            >
              <Settings2 className="w-4 h-4 text-stone-400" />
              Kelola Bank Soal CBT
            </button>
            <button
              id="admin-tab-input-soal"
              type="button"
              className={`py-4 px-1 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
                activeTab === "input-soal" 
                  ? "border-emerald-700 text-emerald-955 font-extrabold" 
                  : "border-transparent text-stone-500 hover:text-stone-850"
              }`}
              onClick={() => setActiveTab("input-soal")}
            >
              <PlusCircle className="w-4 h-4 text-emerald-500" />
              MENU INPUT SOAL
            </button>

            <button
              id="admin-tab-rekap-skor"
              type="button"
              className={`py-4 px-1 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
                activeTab === "rekap-skor" 
                  ? "border-amber-600 text-amber-950 font-extrabold" 
                  : "border-transparent text-stone-500 hover:text-stone-850"
              }`}
              onClick={() => setActiveTab("rekap-skor")}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-650" />
              REKAPITULASI SKOR
            </button>
          </div>
          
          {/* Custom helper stats indicator in top right of tabs */}
          <div className="text-xs text-stone-500 font-semibold font-mono hidden md:block">
            Hak Cipta SMKS Kesehatan Unaaha - Arsan Amir
          </div>
        </div>

        {/* Tab CONTENT: LAPORAN NILAI SISWA */}
        {activeTab === "siswa" && (
          <div className="p-6 space-y-4" id="admin-siswa-report">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Arsip Hasil Ujian Siswa</h3>
                <p className="text-xs text-stone-500">
                  Berikut merupakan daftar siswa-siswi yang telah menyelesaikan ujian beserta skor grading otomatis.
                </p>
              </div>

              {results.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    id="btn-admin-download-all-csv"
                    type="button"
                    onClick={() => downloadAllStudentsCSV(results)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 px-3.5 rounded-xl text-xs transition shadow cursor-pointer flex items-center gap-1.5"
                    title="Download seluruh data hasil ujian siswa dalam format file Excel / CSV"
                  >
                    <Download className="w-4 h-4" />
                    Download Semua Hasil (Excel / CSV)
                  </button>

                  <button
                    id="btn-admin-clear-all"
                    type="button"
                    onClick={handleClearAllResults}
                    className="bg-red-50 hover:bg-red-100 text-red-700 font-bold py-2 px-3.5 rounded-xl text-xs transition border border-red-200 cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Kosongkan Semua Arsip
                  </button>
                </div>
              )}
            </div>

            {results.length === 0 ? (
              <div className="text-center py-16 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
                <ClipboardList className="w-12 h-12 text-stone-300 mx-auto" />
                <h4 className="text-md font-bold text-stone-700 mt-4">Belum Ada Riwayat Nilai</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  Siswa yang login, mengororganisasikan token, dan merampungkan ujian akan otomatis terekam disini secara lokal.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-stone-200 rounded-2xl shadow-sm">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-stone-550/5 text-stone-700 font-bold border-b border-stone-200 py-3 uppercase text-[11px] tracking-wider">
                      <th className="px-4 py-3">Nama Siswa / NISN</th>
                      <th className="px-4 py-3">Kelas & Jurusan</th>
                      <th className="px-4 py-3">Mata Pelajaran</th>
                      <th className="px-4 py-3 text-center">Jawaban (B/S)</th>
                      <th className="px-4 py-3 text-center">Skor Akhir</th>
                      <th className="px-4 py-3 text-center">Kelulusan</th>
                      <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 font-semibold text-stone-850">
                    {results.map((res) => {
                      const isLulusItem = res.score >= 70;
                      return (
                        <tr key={res.id} className="hover:bg-indigo-50/20 transition">
                          <td className="px-4 py-3">
                            <div className="font-extrabold text-stone-900">{res.student.nama}</div>
                            <div className="text-[10px] text-stone-500 font-mono mt-0.5">NISN: {res.student.nisn}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div>{res.student.kelas}</div>
                            <div className="text-[10px] text-stone-500 truncate max-w-[130px] font-medium">{res.student.jurusan.split(" ")[0]}</div>
                          </td>
                          <td className="px-4 py-3 text-indigo-900 font-extrabold">
                            {res.subjectName}
                          </td>
                          <td className="px-4 py-3 text-center font-mono whitespace-nowrap">
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded mr-1">B:{res.correctAnswers}</span>
                            <span className="text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">S:{res.incorrectAnswers}</span>
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-md font-mono">
                            {res.score}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              isLulusItem 
                                ? "bg-emerald-100 text-emerald-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {isLulusItem ? "KOMPETEN" : "REMEDIAL"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Download Official Document (HTML/PDF) */}
                              <button
                                id={`download-html-${res.id}`}
                                type="button"
                                onClick={() => downloadSingleStudentHTML(res, allQuestions)}
                                className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition border border-emerald-300 focus:outline-none cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                                title="Download Lembar Laporan Hasil Lengkap Siswa Ini (Format HTML/PDF)"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Download</span>
                              </button>

                              {/* Download CSV / Excel */}
                              <button
                                id={`download-csv-${res.id}`}
                                type="button"
                                onClick={() => downloadSingleStudentCSV(res)}
                                className="p-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg transition border border-teal-300 focus:outline-none cursor-pointer"
                                title="Download Nilai Siswa Ini Format CSV / Excel"
                              >
                                <FileSpreadsheet className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Action */}
                              <button
                                id={`delete-res-${res.id}`}
                                type="button"
                                onClick={() => handleDeleteResult(res.id)}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition border border-red-200 focus:outline-none cursor-pointer"
                                title="Hapus / Reset"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab CONTENT: KELOLA BANK SOAL */}
        {activeTab === "soal" && (
          <div className="p-6 space-y-6" id="admin-questions-list">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
              <div className="space-y-1">
                <h4 className="font-extrabold text-indigo-900 text-sm sm:text-base">Pengendali Soal CBT Kustom</h4>
                <p className="text-xs text-indigo-800">
                  Pilihlah salah satu Mata Pelajaran ujian aktif di samping untuk memodifikasi pertanyaan, deskripsi jawaban, atau menambahkan soal baru!
                </p>
              </div>

              {/* Subject Selector within Question Editor */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <label className="text-xs font-bold text-stone-700 uppercase" htmlFor="admin-select-subj">
                  Paket Soal:
                </label>
                <select
                  id="admin-select-subj"
                  className="bg-white border-2 border-indigo-200 rounded-xl py-2 px-3 text-xs font-bold text-indigo-900 outline-none"
                  value={selectedSubjectId}
                  onChange={(e) => {
                    setSelectedSubjectId(e.target.value);
                    setEditingQuestionId(null);
                  }}
                >
                  {subjects.map((sub) => {
                    const classLabel = sub.kelas ? ` [${sub.kelas}]` : "";
                    const majorLabel = sub.majorRequirement 
                      ? sub.majorRequirement === Jurusan.FARMASI ? " (Farmasi)" : " (Perawat)" 
                      : " (Umum)";
                    return (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}{classLabel}{majorLabel}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Quick action bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
              <div className="text-xs font-semibold text-stone-500">
                Menampilkan <span className="text-stone-950 font-black">{filteredQuestions.length} Soal</span> untuk mata pelajaran ini.
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  id="btn-admin-reset-presets"
                  type="button"
                  onClick={handleResetToPresets}
                  className="bg-stone-100 hover:bg-stone-200 border border-stone-350 text-stone-700 font-bold py-2 px-4 rounded-xl text-xs transition cursor-pointer"
                >
                  Reset ke Semua Soal Preset
                </button>
                <button
                  id="btn-admin-add-question"
                  type="button"
                  onClick={handleAddNewQuestion}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 px-4 rounded-xl text-xs transition border bg-opacity-95 shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Soal Baru
                </button>
              </div>
            </div>

            {/* Questions accordions / cards */}
            <div className="space-y-4" id="questions-list-root">
              {filteredQuestions.map((q, qIndex) => {
                const isEditing = editingQuestionId === q.id;

                return (
                  <div key={q.id} className="bg-stone-50 border border-stone-250 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                    
                    {/* Header: Number in list & Controls */}
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2 flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="bg-stone-900 text-white font-black px-2.5 py-1 rounded-lg text-[10px] font-mono">
                          SOAL {qIndex + 1}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">ID: {q.id}</span>
                      </div>

                      {/* Controls button */}
                      {!isEditing ? (
                        <div className="flex items-center gap-1">
                          <button
                            id={`edit-q-${q.id}`}
                            type="button"
                            onClick={() => startEditQuestion(q)}
                            className="bg-white hover:bg-indigo-50 border border-stone-300 text-indigo-900 font-bold py-1.5 px-3 rounded-lg text-[11px] transition flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-3 h-3" />
                            Ubah
                          </button>
                          <button
                            id={`delete-q-${q.id}`}
                            type="button"
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="bg-white hover:bg-red-50 border border-stone-300 text-red-600 font-bold py-1.5 px-2 rounded-lg text-[11px] transition cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button
                            id={`save-q-${q.id}`}
                            type="button"
                            onClick={() => handleSaveEditedQuestion(q.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg text-[11px] transition flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                            Simpan Perubahan
                          </button>
                          <button
                            id={`cancel-q-${q.id}`}
                            type="button"
                            onClick={() => setEditingQuestionId(null)}
                            className="bg-white hover:bg-stone-150 border border-stone-300 text-stone-600 font-bold py-1.5 px-2.5 rounded-lg text-[11px] transition cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Body: Card Question contents depending on Edit mode */}
                    {!isEditing ? (
                      <div className="space-y-3">
                        {/* Case Study */}
                        {q.caseStudy && (
                          <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-500 italic font-mono">
                            <span className="font-bold underline block not-italic uppercase text-[9px] tracking-wider mb-1 text-emerald-800">
                              Studi Kasus Klinis:
                            </span>
                            {q.caseStudy}
                          </div>
                        )}

                        {/* Question */}
                        <div className="font-extrabold text-sm sm:text-base text-stone-900">
                          {q.text}
                        </div>

                        {/* Options A - E as standard layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.options.map((opt) => {
                            const isCorrect = q.correctAnswer === opt.key;
                            return (
                              <div
                                key={opt.key}
                                className={`p-2.5 rounded-xl border flex items-center gap-2 font-medium ${
                                  isCorrect 
                                    ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold" 
                                    : "bg-white border-stone-200 text-stone-750"
                                }`}
                              >
                                <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[9px] shrink-0 border ${
                                  isCorrect ? "bg-emerald-600 text-white border-transparent" : "bg-stone-100 text-stone-500"
                                }`}>
                                  {opt.key}
                                </span>
                                <span className="truncate">{opt.text}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation block */}
                        <div className="bg-yellow-50 text-amber-950 p-3 rounded-xl border border-yellow-200 text-xs">
                          <span className="font-extrabold text-amber-900 uppercase block text-[10px] tracking-wider mb-1">
                            Latar Belakang / Pembahasan:
                          </span>
                          {q.explanation}
                        </div>
                      </div>
                    ) : (
                      // QUESTION EDITOR FORM
                      <div className="space-y-4 text-xs font-semibold text-stone-700">
                        
                        {/* Case Study path */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase mb-1" htmlFor={`edit-case-${q.id}`}>
                            Konteks Studi Kasus Klinis (Opsional)
                          </label>
                          <textarea
                            id={`edit-case-${q.id}`}
                            className="w-full bg-white border-2 border-stone-200 rounded-xl py-2 px-3 text-sm text-stone-850 outline-none focus:border-indigo-600"
                            rows={3}
                            placeholder="Contoh: Seorang pasien laki-laki berumur 45 tahun dirawat dengan keluhan..."
                            value={tempCaseStudy}
                            onChange={(e) => setTempCaseStudy(e.target.value)}
                          />
                        </div>

                        {/* Question Text */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase mb-1" htmlFor={`edit-text-${q.id}`}>
                            Teks Pertanyaan Soal (Wajib)
                          </label>
                          <textarea
                            id={`edit-text-${q.id}`}
                            className="w-full bg-white border-2 border-stone-200 rounded-xl py-2 px-3 text-sm text-stone-850 font-bold outline-none focus:border-indigo-600"
                            rows={2}
                            value={tempQuestionText}
                            onChange={(e) => setTempQuestionText(e.target.value)}
                          />
                        </div>

                        {/* Options A to E Inputs */}
                        <div className="space-y-2 mt-3 p-3 bg-white border border-stone-200 rounded-2xl">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-900 mb-1">
                            Pilihan Jawaban (Isi Semua A Sampa E)
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            {tempOptions.map((opt, optIdx) => (
                              <div key={opt.key} className="flex items-center gap-2">
                                <span className="w-7 h-7 bg-stone-100 font-extrabold flex items-center justify-center rounded-lg text-stone-600 border border-stone-300">
                                  {opt.key}
                                </span>
                                <input
                                  id={`edit-opt-${opt.key}-${q.id}`}
                                  type="text"
                                  className="flex-grow bg-stone-50 border border-stone-300 rounded-lg py-1.5 px-3 text-xs text-stone-800"
                                  placeholder={`Masukkan teks jawaban pilihan ${opt.key}...`}
                                  value={opt.text}
                                  onChange={(e) => {
                                    const copy = [...tempOptions];
                                    copy[optIdx].text = e.target.value;
                                    setTempOptions(copy);
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Correct Key Picker & Explanation */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase mb-1" htmlFor={`edit-key-${q.id}`}>
                              Kunci Jawaban yang Benar
                            </label>
                            <select
                              id={`edit-key-${q.id}`}
                              className="w-full bg-white border-2 border-stone-200 rounded-xl py-2 px-3 text-sm font-bold text-emerald-800 outline-none"
                              value={tempCorrectOption}
                              onChange={(e) => setTempCorrectOption(e.target.value)}
                            >
                              <option value="A">Pilihan A</option>
                              <option value="B">Pilihan B</option>
                              <option value="C">Pilihan C</option>
                              <option value="D">Pilihan D</option>
                              <option value="E">Pilihan E</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase mb-1" htmlFor={`edit-exp-${q.id}`}>
                              Latar Belakang / Pembahasan Ilmiah
                            </label>
                            <input
                              id={`edit-exp-${q.id}`}
                              type="text"
                              className="w-full bg-white border-2 border-stone-200 rounded-xl py-2 px-3 text-sm text-stone-850 outline-none focus:border-indigo-600"
                              value={tempExplanation}
                              onChange={(e) => setTempExplanation(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab CONTENT: MENU INPUT SOAL */}
        {activeTab === "input-soal" && (
          <div className="p-6 space-y-6" id="admin-input-soal-form-view">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600 animate-pulse" />
                MENU INPUT BUTIR SOAL BARU (CBT)
              </h3>
              <p className="text-xs text-stone-500">
                Formulir input mandiri asisten klinis. Isilah data di bawah ini untuk didaftarkan langsung ke server basis data ujian.
              </p>
            </div>

            <form onSubmit={handleSaveNewQuestionForm} className="space-y-5 bg-stone-50 p-6 rounded-2xl border border-stone-200">
              {/* Subject Selector */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-stone-700 tracking-wider mb-2" htmlFor="input-select-subj">
                  Mata Pelajaran / Paket Soal Ujian
                </label>
                <select
                  id="input-select-subj"
                  className="w-full bg-white border-2 border-stone-200 rounded-xl py-2.5 px-4 text-xs font-bold text-indigo-950 outline-none focus:border-indigo-600"
                  value={inputSubjectId}
                  onChange={(e) => setInputSubjectId(e.target.value)}
                >
                  {subjects.map((sub) => {
                    const classLabel = sub.kelas ? ` [${sub.kelas}]` : "";
                    const majorLabel = sub.majorRequirement 
                      ? sub.majorRequirement === Jurusan.FARMASI ? " (Farmasi)" : " (Perawat)" 
                      : " (Umum)";
                    return (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}{classLabel}{majorLabel}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Case Study (Optional) */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-stone-700 tracking-wider mb-2" htmlFor="input-case">
                  Konteks Kasus Klinis / Deskripsi Skenario Medis (Opsional)
                </label>
                <textarea
                  id="input-case"
                  className="w-full bg-white border-2 border-stone-200 rounded-xl py-3 px-4 text-xs text-stone-800 outline-none focus:border-indigo-600"
                  rows={3}
                  placeholder="Contoh: Seorang asisten keperawatan mandiri berkeinginan menawarkan jasa pelayanan asuhan geriatri untuk lansia pasca stroke..."
                  value={inputCaseStudy}
                  onChange={(e) => setInputCaseStudy(e.target.value)}
                />
              </div>

              {/* Question Text (Required) */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-stone-700 tracking-wider mb-2" htmlFor="input-text">
                  Teks Butir Pertanyaan Utama (Wajib)
                </label>
                <textarea
                  id="input-text"
                  className="w-full bg-white border-2 border-stone-200 rounded-xl py-3 px-4 text-xs font-extrabold text-stone-900 outline-none focus:border-indigo-600"
                  rows={2}
                  placeholder="Contoh: Manakah strategi bauran pemasaran (Marketing Mix) yang paling tepat sasaran?"
                  value={inputQuestionText}
                  onChange={(e) => setInputQuestionText(e.target.value)}
                  required
                />
              </div>

              {/* Options A - E Inputs */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-200">
                <span className="block text-xs font-black uppercase text-indigo-900 tracking-wide">
                  Opsi Pilihan Jawaban Ganda (Harap isi A sampai E)
                </span>
                <div className="grid grid-cols-1 gap-3">
                  {inputOptions.map((opt, optIdx) => (
                    <div key={opt.key} className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-stone-100 font-black flex items-center justify-center rounded-xl text-stone-600 border border-stone-300">
                        {opt.key}
                      </span>
                      <input
                        id={`input-opt-${opt.key}`}
                        type="text"
                        className="flex-grow bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs text-stone-850 font-medium focus:bg-white outline-none focus:border-indigo-600"
                        placeholder={`Teks alternatif jawaban untuk opsi ${opt.key}...`}
                        value={opt.text}
                        onChange={(e) => {
                          const copy = [...inputOptions];
                          copy[optIdx].text = e.target.value;
                          setInputOptions(copy);
                        }}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Correct Key Picker & Explanation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-stone-700 tracking-wider mb-2" htmlFor="input-key">
                    Kunci Jawaban Benar
                  </label>
                  <select
                    id="input-key"
                    className="w-full bg-white border-2 border-stone-200 rounded-xl py-2.5 px-4 text-xs font-bold text-emerald-850 outline-none focus:border-indigo-600"
                    value={inputCorrectOption}
                    onChange={(e) => setInputCorrectOption(e.target.value)}
                  >
                    <option value="A">Opsi A</option>
                    <option value="B">Opsi B</option>
                    <option value="C">Opsi C</option>
                    <option value="D">Opsi D</option>
                    <option value="E">Opsi E</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-stone-700 tracking-wider mb-2" htmlFor="input-exp">
                    Latar Belakang / Penjelasan Ilmiah Jawaban Benar
                  </label>
                  <input
                    id="input-exp"
                    type="text"
                    className="w-full bg-white border-2 border-stone-200 rounded-xl py-2.5 px-4 text-xs text-stone-800 outline-none focus:border-indigo-600 font-semibold"
                    placeholder="Contoh: Partnering formal dengan Klinik dan Puskesmas melahirkan rujukan terpercaya..."
                    value={inputExplanation}
                    onChange={(e) => setInputExplanation(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setInputQuestionText("");
                    setInputCaseStudy("");
                    setInputCorrectOption("A");
                    setInputExplanation("");
                    setInputOptions([
                      { key: "A", text: "" },
                      { key: "B", text: "" },
                      { key: "C", text: "" },
                      { key: "D", text: "" },
                      { key: "E", text: "" }
                    ]);
                  }}
                  className="bg-stone-200 hover:bg-stone-300 text-stone-750 font-bold py-2.5 px-5 rounded-xl text-xs transition cursor-pointer"
                >
                  Bersihkan Form
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-6 rounded-xl text-xs transition shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Simpan Soal Berbaris Baru
                </button>
              </div>
            </form>
          </div>
        )}



        {/* Tab CONTENT: REKAPITULASI SKOR SISWA */}
        {activeTab === "rekap-skor" && (
          <div className="p-6 space-y-6" id="admin-rekap-skor-view">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  REKAPITULASI HASIL & SKOR KELULUSAN SISWA
                </h3>
                <p className="text-xs text-stone-500">
                  Ringkasan nilai komprehensif, filtering cerdas berdasarkan jurusan, kelas, mapel, serta ekspor data siap pakai ke Excel.
                </p>
              </div>

              {/* Utility actions */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    // Generate TSV content
                    const headers = ["No", "NISN", "Nama Siswa", "Kelas", "Jurusan", "Mata Pelajaran", "Benar", "Total Soal", "Skor", "Status"];
                    const rows = results.map((res, index) => {
                      const matchesSearch = 
                        res.student.nama.toLowerCase().includes(recapSearch.toLowerCase()) ||
                        res.student.nisn.toLowerCase().includes(recapSearch.toLowerCase());
                      const matchesJurusan = recapJurusan === "all" || res.student.jurusan.toLowerCase() === recapJurusan.toLowerCase();
                      const matchesKelas = recapKelas === "all" || res.student.kelas.toLowerCase() === recapKelas.toLowerCase();
                      const matchesSubject = recapSubject === "all" || res.subjectId === recapSubject;
                      const matchesStatus =
                        recapStatus === "all" ||
                        (recapStatus === "lulus" && res.score >= 70) ||
                        (recapStatus === "remedi" && res.score < 70);
                      
                      if (matchesSearch && matchesJurusan && matchesKelas && matchesSubject && matchesStatus) {
                        return [
                          index + 1,
                          res.student.nisn,
                          res.student.nama,
                          res.student.kelas,
                          res.student.jurusan,
                          res.subjectName,
                          res.correctAnswers,
                          res.totalQuestions,
                          res.score,
                          res.score >= 70 ? "KOMPETEN" : "REMEDIAL"
                        ];
                      }
                      return null;
                    }).filter(Boolean);

                    if (rows.length === 0) {
                      alert("Tidak ada data rekapitulasi yang cocok dengan filter aktif untuk disalin.");
                      return;
                    }

                    const tsvContent = [headers.join("\t"), ...rows.map(row => row!.join("\t"))].join("\n");
                    navigator.clipboard.writeText(tsvContent)
                      .then(() => alert("Berhasil menyalin data rekapitulasi ke klipbor! Buka Excel atau Google Sheets dan tekan Ctrl+V (Paste)."))
                      .catch((err) => {
                        console.error(err);
                        alert("Gagal menyalin, mohon seksi tabel di bawah secara manual.");
                      });
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2 px-4 rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Salin Rekap (Format Excel)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const filteredData = results.filter((res) => {
                      const matchesSearch = 
                        res.student.nama.toLowerCase().includes(recapSearch.toLowerCase()) ||
                        res.student.nisn.toLowerCase().includes(recapSearch.toLowerCase());
                      const matchesJurusan = recapJurusan === "all" || res.student.jurusan.toLowerCase() === recapJurusan.toLowerCase();
                      const matchesKelas = recapKelas === "all" || res.student.kelas.toLowerCase() === recapKelas.toLowerCase();
                      const matchesSubject = recapSubject === "all" || res.subjectId === recapSubject;
                      const matchesStatus =
                        recapStatus === "all" ||
                        (recapStatus === "lulus" && res.score >= 70) ||
                        (recapStatus === "remedi" && res.score < 70);
                      return matchesSearch && matchesJurusan && matchesKelas && matchesSubject && matchesStatus;
                    });
                    if (filteredData.length === 0) {
                      alert("Tidak ada data hasil siswa yang sesuai dengan filter untuk didownload.");
                      return;
                    }
                    downloadAllStudentsCSV(filteredData);
                  }}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs py-2 px-4 rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  Download Rekap (File CSV/Excel)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const printWindow = window.open("", "_blank");
                    if (!printWindow) {
                      alert("Tolong izinkan akses popup peramban Anda untuk mencetak rekapitulasi.");
                      return;
                    }
                    
                    const filteredData = results.filter((res) => {
                      const matchesSearch = 
                        res.student.nama.toLowerCase().includes(recapSearch.toLowerCase()) ||
                        res.student.nisn.toLowerCase().includes(recapSearch.toLowerCase());
                      const matchesJurusan = recapJurusan === "all" || res.student.jurusan.toLowerCase() === recapJurusan.toLowerCase();
                      const matchesKelas = recapKelas === "all" || res.student.kelas.toLowerCase() === recapKelas.toLowerCase();
                      const matchesSubject = recapSubject === "all" || res.subjectId === recapSubject;
                      const matchesStatus =
                        recapStatus === "all" ||
                        (recapStatus === "lulus" && res.score >= 70) ||
                        (recapStatus === "remedi" && res.score < 70);
                      return matchesSearch && matchesJurusan && matchesKelas && matchesSubject && matchesStatus;
                    });

                    const rowsHTML = filteredData.map((res, index) => `
                      <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px; font-family: monospace;">${index + 1}</td>
                        <td style="padding: 10px; font-family: monospace;">${res.student.nisn}</td>
                        <td style="padding: 10px; font-weight: bold;">${res.student.nama}</td>
                        <td style="padding: 10px;">${res.student.kelas} - ${res.student.jurusan}</td>
                        <td style="padding: 10px;">${res.subjectName}</td>
                        <td style="padding: 10px; text-align: center;">${res.correctAnswers} / ${res.totalQuestions}</td>
                        <td style="padding: 10px; text-align: center; font-family: monospace; font-weight: bold; color: ${res.score >= 70 ? "green" : "red"};">${res.score}</td>
                        <td style="padding: 10px; font-weight: bold; color: ${res.score >= 70 ? "green" : "red"};">${res.score >= 70 ? "KOMPETEN" : "REMEDIAL"}</td>
                      </tr>
                    `).join("");

                    const nowStr = new Date().toLocaleString("id-ID");

                    printWindow.document.write(`
                      <html>
                        <head>
                          <title>Rekapitulasi Nilai CBT SMKS Kesehatan Unaaha</title>
                          <style>
                            body { font-family: sans-serif; padding: 30px; color: #333; }
                            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                            th { background-color: #f2f2f2; text-align: left; padding: 12px; }
                            .header { text-align: center; border-bottom: 3px double #333; padding-bottom: 15px; margin-bottom: 25px; }
                            .logo-sub { font-size: 14px; color: #555; }
                            .summary { margin-top: 30px; display: flex; justify-content: space-between; font-size: 13px; }
                          </style>
                        </head>
                        <body>
                          <div class="header" style="display: flex; align-items: center; justify-content: center; gap: 18px; text-align: left;">
                            <img src="/logo-smk.png" alt="Logo SMKS Kesehatan Unaaha" style="width: 70px; height: 70px; object-fit: contain;" />
                            <div>
                              <h2 style="margin: 0; text-transform: uppercase;">SMKS Kesehatan Unaaha</h2>
                              <p style="margin: 4px 0 0 0;" class="logo-sub">Jl. Edi Sabara, Kelurahan Asinua, Kecamatan Unaaha, Kabupaten Konawe, Sulawesi Tenggara</p>
                              <h3 style="margin: 10px 0 0 0; text-decoration: underline;">REKAPITULASI DAFTAR NILAI KOMPETENSI SISWA</h3>
                            </div>
                          </div>
                          <p style="font-size: 12px; color: #666;">Dicetak pada: ${nowStr}</p>
                          <table>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>NISN</th>
                                <th>Nama Siswa</th>
                                <th>Kelas & Jurusan</th>
                                <th>Mata Pelajaran</th>
                                <th>Jawaban Benar</th>
                                <th>Skor</th>
                                <th>Status Kelulusan</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${rowsHTML || '<tr><td colspan="8" style="text-align: center; padding: 20px;">Tidak ada data hasil ujian yang sesuai dengan filter cetak.</td></tr>'}
                            </tbody>
                          </table>
                          <div class="summary">
                            <div>
                              <p>Mengetahui,</p>
                              <p style="margin-top: 60px; font-weight: bold;">Kepala Sekolah SMKS Kesehatan Unaaha</p>
                            </div>
                            <div>
                              <p>Unaaha, ${new Date().toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                              <p style="margin-top: 60px; font-weight: bold;">Asisten Pengawas CBT</p>
                            </div>
                          </div>
                          <script>
                            window.onload = function() { window.print(); }
                          </script>
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                  }}
                  className="bg-stone-800 hover:bg-stone-900 text-stone-100 font-extrabold text-xs py-2 px-4 rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  Cetak Berkas Rekap (PDF)
                </button>
              </div>
            </div>

            {/* Live interactive filtering controls container */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <span className="block text-[10px] font-mono font-black text-indigo-955 uppercase tracking-widest">
                ⚙ CONTROL FILTERING REKAPITULASI INTERAKTIF:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {/* Search field */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider mb-1" htmlFor="recap-search-input">Cari Nama / NISN</label>
                  <input
                    id="recap-search-input"
                    type="text"
                    className="bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs text-stone-800 font-semibold focus:bg-white outline-none focus:border-indigo-600"
                    placeholder="Tulis nama siswa..."
                    value={recapSearch}
                    onChange={(e) => setRecapSearch(e.target.value)}
                  />
                </div>

                {/* Filter Jurusan */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider mb-1" htmlFor="recap-jurusan-select">Jurusan</label>
                  <select
                    id="recap-jurusan-select"
                    className="bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs text-stone-800 font-bold outline-none focus:bg-white focus:border-indigo-600"
                    value={recapJurusan}
                    onChange={(e) => setRecapJurusan(e.target.value)}
                  >
                    <option value="all">Semua Jurusan</option>
                    <option value="keperawatan">Keperawatan</option>
                    <option value="farmasi">Kefarmasian</option>
                  </select>
                </div>

                {/* Filter Kelas */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider mb-1" htmlFor="recap-kelas-select">Kelas Tingkat</label>
                  <select
                    id="recap-kelas-select"
                    className="bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs text-stone-800 font-bold outline-none focus:bg-white focus:border-indigo-600"
                    value={recapKelas}
                    onChange={(e) => setRecapKelas(e.target.value)}
                  >
                    <option value="all">Semua Tingkat</option>
                    <option value="X">Kelas X</option>
                    <option value="XI">Kelas XI</option>
                    <option value="XII">Kelas XII</option>
                  </select>
                </div>

                {/* Filter Mapel */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider mb-1" htmlFor="recap-subject-select">Mata Pelajaran</label>
                  <select
                    id="recap-subject-select"
                    className="bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs text-stone-800 font-semibold outline-none focus:bg-white focus:border-indigo-600"
                    value={recapSubject}
                    onChange={(e) => setRecapSubject(e.target.value)}
                  >
                    <option value="all">Semua Mata Pelajaran</option>
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.kelas})</option>
                    ))}
                  </select>
                </div>

                {/* Filter Status */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider mb-1" htmlFor="recap-status-select">Status Kompetensi</label>
                  <select
                    id="recap-status-select"
                    className="bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs text-stone-800 font-bold outline-none focus:bg-white focus:border-indigo-600"
                    value={recapStatus}
                    onChange={(e) => setRecapStatus(e.target.value)}
                  >
                    <option value="all">Semua Hasil</option>
                    <option value="lulus">Kompeten (≥ 70)</option>
                    <option value="remedi">Remedial (&lt; 70)</option>
                  </select>
                </div>
              </div>

              {/* Reset Filters button */}
              {(recapSearch || recapJurusan !== "all" || recapKelas !== "all" || recapSubject !== "all" || recapStatus !== "all") && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setRecapSearch("");
                      setRecapJurusan("all");
                      setRecapKelas("all");
                      setRecapSubject("all");
                      setRecapStatus("all");
                    }}
                    className="text-stone-500 hover:text-stone-800 text-[11px] font-bold underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset Semua Parameter Saringan
                  </button>
                </div>
              )}
            </div>

            {/* Aggregated KPIs widgets */}
            {(() => {
              const filteredData = results.filter((res) => {
                const matchesSearch = 
                  res.student.nama.toLowerCase().includes(recapSearch.toLowerCase()) ||
                  res.student.nisn.toLowerCase().includes(recapSearch.toLowerCase());
                const matchesJurusan = recapJurusan === "all" || res.student.jurusan.toLowerCase() === recapJurusan.toLowerCase();
                const matchesKelas = recapKelas === "all" || res.student.kelas.toLowerCase() === recapKelas.toLowerCase();
                  const matchesSubject = recapSubject === "all" || res.subjectId === recapSubject;
                const matchesStatus =
                  recapStatus === "all" ||
                  (recapStatus === "lulus" && res.score >= 70) ||
                  (recapStatus === "remedi" && res.score < 70);
                return matchesSearch && matchesJurusan && matchesKelas && matchesSubject && matchesStatus;
              });

              const count = filteredData.length;
              const scores = filteredData.map(r => r.score);
              const avg = count > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / count) : 0;
              const maxVal = count > 0 ? Math.max(...scores) : 0;
              const minVal = count > 0 ? Math.min(...scores) : 0;
              const passedCount = filteredData.filter(r => r.score >= 70).length;
              const passedPercent = count > 0 ? Math.round((passedCount / count) * 100) : 0;

              return (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-4 rounded-2xl border border-stone-200">
                    <span className="text-[10px] font-black text-stone-400 block uppercase tracking-wider">TOTAL PESERTA</span>
                    <span className="text-3xl font-black text-stone-900 font-mono block mt-1">{count}</span>
                    <span className="text-[10px] text-stone-500 font-medium">Sebab filter aktif</span>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/70 p-4 rounded-2xl border border-indigo-100">
                    <span className="text-[10px] font-black text-indigo-500 block uppercase tracking-wider">RATA-RATA (MEAN)</span>
                    <span className="text-3xl font-black text-indigo-900 font-mono block mt-1">{avg}</span>
                    <span className="text-[10px] text-indigo-600 font-medium">KKM Sekolah: 70</span>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/70 p-4 rounded-2xl border border-emerald-100">
                    <span className="text-[10px] font-black text-emerald-600 block uppercase tracking-wider">PERSENTASE KELULUSAN</span>
                    <span className="text-3xl font-black text-emerald-900 font-mono block mt-1">{passedPercent}%</span>
                    <span className="text-[10px] text-emerald-700 font-medium">{passedCount} dari {count} kompeten</span>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/70 p-4 rounded-2xl border border-amber-100">
                    <span className="text-[10px] font-black text-amber-600 block uppercase tracking-wider">SKOR TERTINGGI / TERENDAH</span>
                    <span className="text-xl font-black text-amber-900 font-mono block mt-2">
                      Max: {maxVal} | Min: {minVal}
                    </span>
                    <span className="text-[10px] text-amber-700 font-medium">Rentang nilai 0-100</span>
                  </div>
                </div>
              );
            })()}

            {/* TABULAR REKAPITULASI LIST */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-[10px] font-black uppercase text-stone-600 tracking-wider">
                      <th className="py-3 px-4 font-mono">No</th>
                      <th className="py-3 px-4 font-mono">NISN</th>
                      <th className="py-3 px-4">Nama Lengkap Siswa</th>
                      <th className="py-3 px-4">Kelas & Jurusan</th>
                      <th className="py-3 px-4">Mata Pelajaran</th>
                      <th className="py-3 px-4 text-center">Metrik Benar</th>
                      <th className="py-3 px-4 text-center">Skor Akhir</th>
                      <th className="py-3 px-4">Klasifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-150 text-xs text-stone-800">
                    {(() => {
                      const filteredData = results.filter((res) => {
                        const matchesSearch = 
                          res.student.nama.toLowerCase().includes(recapSearch.toLowerCase()) ||
                          res.student.nisn.toLowerCase().includes(recapSearch.toLowerCase());
                        const matchesJurusan = recapJurusan === "all" || res.student.jurusan.toLowerCase() === recapJurusan.toLowerCase();
                        const matchesKelas = recapKelas === "all" || res.student.kelas.toLowerCase() === recapKelas.toLowerCase();
                        const matchesSubject = recapSubject === "all" || res.subjectId === recapSubject;
                        const matchesStatus =
                          recapStatus === "all" ||
                          (recapStatus === "lulus" && res.score >= 70) ||
                          (recapStatus === "remedi" && res.score < 70);
                        return matchesSearch && matchesJurusan && matchesKelas && matchesSubject && matchesStatus;
                      });

                      if (filteredData.length === 0) {
                        return (
                          <tr>
                            <td colSpan={8} className="py-12 text-center text-stone-400 font-medium">
                              Tidak ada siswa atau lembaran hasil ujian yang sesuai dengan filter saringan tersebut.
                            </td>
                          </tr>
                        );
                      }

                      return filteredData.map((res, index) => (
                        <tr key={res.id} className="hover:bg-stone-50 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-stone-400">{index + 1}</td>
                          <td className="py-3.5 px-4 font-mono text-stone-600">{res.student.nisn}</td>
                          <td className="py-3.5 px-4 font-black text-stone-900">{res.student.nama}</td>
                          <td className="py-3.5 px-4 uppercase font-bold text-stone-600">
                            {res.student.kelas} {res.student.jurusan}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-stone-700">{res.subjectName}</td>
                          <td className="py-3.5 px-4 text-center font-bold text-stone-500 font-mono">
                            {res.correctAnswers} <span className="text-stone-300">/</span> {res.totalQuestions}
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono font-black text-sm text-indigo-900">
                            {res.score}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider inline-block ${
                              res.score >= 70 
                                ? "bg-emerald-100 text-emerald-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {res.score >= 70 ? "KOMPETEN (LULUS)" : "REMEDIAL"}
                            </span>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

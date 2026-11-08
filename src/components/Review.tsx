/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { StudentResult, Question } from "../types";
import { Award, Printer, LogOut, CheckCircle2, XCircle, HelpCircle, FileText, ChevronDown, ChevronUp, ShieldCheck, Download, FileSpreadsheet } from "lucide-react";
import { downloadSingleStudentHTML, downloadSingleStudentCSV } from "../utils/downloadResults";

interface ReviewProps {
  result: StudentResult;
  questions: Question[];
  onExit: () => void;
}

export default function Review({ result, questions, onExit }: ReviewProps) {
  const [showDetailedReview, setShowDetailedReview] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // KKM standard is 70 in SMKS Kesehatan Unaaha
  const KKM = 70;
  const isLulus = result.score >= KKM;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHTML = () => {
    downloadSingleStudentHTML(result, questions);
    setShowDownloadMenu(false);
  };

  const handleDownloadCSV = () => {
    downloadSingleStudentCSV(result);
    setShowDownloadMenu(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0 py-6 space-y-8" id="review-root">
      
      {/* SECTION 1: Scorecard summary */}
      <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden" id="scorecard-panel">
        <div className={`p-6 sm:p-8 text-center text-white ${
          isLulus 
            ? "bg-gradient-to-br from-emerald-800 to-teal-950" 
            : "bg-gradient-to-br from-rose-800 to-stone-900"
        }`}>
          <div className="max-w-md mx-auto space-y-4">
            <span className="bg-white/10 text-white text-xs font-bold font-mono tracking-widest px-3 py-1 rounded-full uppercase border border-white/10">
              HASIL EVALUASI KOMPUTERISASI
            </span>
            
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              {isLulus ? "Selamat, Anda Kompeten!" : "Tetap Semangat & Belajar Lagi!"}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
              Anda telah merampungkan lembar pengerjaan <span className="font-bold underline text-white">{result.subjectName}</span> sesuai tata tertib asisten klinis SMKS Kesehatan Unaaha.
            </p>

            {/* Score Big Display */}
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32 bg-white/5 rounded-full flex flex-col items-center justify-center border-4 border-yellow-400 shadow-lg shrink-0">
                <span className="text-4xl sm:text-5xl font-black text-yellow-300 font-mono">
                  {result.score}
                </span>
                <span className="text-[10px] text-slate-300 font-bold tracking-widest uppercase border-t border-white/10 pt-1 mt-1 font-mono">
                  SKOR / 100
                </span>
              </div>
            </div>

            {/* Graduation status badge */}
            <div className="flex justify-center">
              <div className={`px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-wider border flex items-center gap-2 ${
                isLulus 
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40" 
                  : "bg-red-500/20 text-red-300 border-red-500/40"
              }`}>
                {isLulus ? (
                  <>
                    <CheckCircle2 className="w-4.5 h-4.5" />
                    STATUS: LULUS (KOMPETEN)
                  </>
                ) : (
                  <>
                    <XCircle className="w-4.5 h-4.5" />
                    STATUS: BELUM LULUS (BUTUH REMEDIAL)
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Counter quick metrics */}
        <div className="grid grid-cols-3 gap-px bg-stone-200 text-center font-mono">
          <div className="bg-white p-4">
            <div className="text-xl sm:text-2xl font-black text-emerald-600">{result.correctAnswers}</div>
            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-1">BENAR</div>
          </div>
          <div className="bg-white p-4">
            <div className="text-xl sm:text-2xl font-black text-red-500">{result.incorrectAnswers}</div>
            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-1">SALAH / KOSONG</div>
          </div>
          <div className="bg-white p-4">
            <div className="text-xl sm:text-2xl font-black text-stone-900">{result.totalQuestions}</div>
            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-1">DIUJI</div>
          </div>
        </div>

        {/* Action Controls & Download Menu */}
        <div className="bg-stone-50 p-4 sm:p-6 border-t border-stone-200 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] font-black uppercase text-stone-500 tracking-wider font-mono flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-600" />
              MENU DOWNLOAD & DOKUMEN HASIL SISWA:
            </span>
            <span className="text-[10px] text-stone-400 font-medium">
              Simpan laporan hasil ujian ini ke perangkat Anda
            </span>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 items-center justify-between">
            <button
              id="btn-back-to-portal"
              type="button"
              className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 px-4 rounded-xl border border-stone-300 transition text-xs flex items-center justify-center gap-2 cursor-pointer order-last sm:order-first"
              onClick={onExit}
            >
              <LogOut className="w-4 h-4" />
              KEMBALI KE BERANDA
            </button>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* Button: Download HTML/PDF */}
              <button
                id="btn-download-hasil-html"
                type="button"
                className="bg-emerald-650 hover:bg-emerald-750 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-md border-b-2 border-emerald-850 transition text-xs flex items-center justify-center gap-2 cursor-pointer"
                onClick={handleDownloadHTML}
                title="Download Laporan Resmi Lengkap Beserta Kop Surat dan Kunci Jawaban (Format HTML/PDF)"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD HASIL (DOKUMEN / PDF)
              </button>

              {/* Button: Download CSV/Excel */}
              <button
                id="btn-download-hasil-csv"
                type="button"
                className="bg-teal-700 hover:bg-teal-800 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-md border-b-2 border-teal-900 transition text-xs flex items-center justify-center gap-2 cursor-pointer"
                onClick={handleDownloadCSV}
                title="Download Rekapitulasi Nilai Siswa untuk Microsoft Excel / Spreadsheet (Format CSV)"
              >
                <FileSpreadsheet className="w-4 h-4" />
                DOWNLOAD HASIL (EXCEL / CSV)
              </button>

              {/* Button: Print Certificate */}
              <button
                id="btn-print-certificate"
                type="button"
                className="bg-stone-850 hover:bg-stone-900 text-white font-extrabold py-2.5 px-4 rounded-xl shadow border-b-2 border-stone-950 transition text-xs flex items-center justify-center gap-2 cursor-pointer"
                onClick={handlePrint}
              >
                <Printer className="w-4 h-4" />
                CETAK SERTIFIKAT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Official Attestation Piagam certificate (Print Optimized) */}
      <div 
        id="print-area-certificate" 
        className="bg-white border-8 border-double border-emerald-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-stone-850 select-none print:border-emerald-800 print:shadow-none print:m-0 print:p-8"
      >
        {/* Classical layout top frames */}
        <div className="absolute top-2 left-2 right-2 bottom-2 border border-emerald-200 rounded-2xl pointer-events-none" />

        {/* Header containing Emblem copy */}
        <div className="text-center space-y-2 border-b-2 border-slate-300 pb-4 relative z-10">
          <div className="flex items-center justify-center gap-4">
            {/* Official School Logo */}
            <img
              src="/logo-smk.png"
              alt="Logo SMKS Kesehatan Unaaha"
              className="w-16 h-16 object-contain shrink-0"
            />
            <div>
              <h3 className="text-xs font-bold tracking-widest text-emerald-800 font-mono">
                KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
              </h3>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-teal-950 uppercase">
                SMKS KESEHATAN UNAAHA
              </h2>
              <p className="text-[10px] text-stone-500">
                Alamat: Jl. Edi Sabara, Kelurahan Asinua, Kecamatan Unaaha • NPSN: 69888924 • Terakreditasi
              </p>
            </div>
          </div>
        </div>

        {/* Piagam Title */}
        <div className="text-center my-6 space-y-1 relative z-10">
          <span className="text-[11px] font-black tracking-widest text-emerald-900 bg-emerald-50 border border-emerald-100 px-3 py-0.5 rounded-full uppercase font-mono">
            PIAGAM HASIL ASESMEN DIGITAL
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-wide font-serif">
            SERTIFIKAT KELULUSAN CBT
          </h1>
          <p className="text-[10px] text-stone-400 font-mono uppercase">
            Nomor: SMKS-KU/CBT/{new Date().getFullYear()}/{Math.random().toString(36).substring(3, 9).toUpperCase()}
          </p>
        </div>

        {/* Body describing achievement */}
        <div className="space-y-4 my-6 text-sm leading-relaxed text-center max-w-2xl mx-auto relative z-10 font-sans">
          <p className="font-light italic">Menyatakan secara sah dari pengawas asisten pengukur ujian bahwa:</p>
          
          <div className="py-2.5 bg-stone-50 rounded-2xl border border-stone-200">
            <h3 className="text-lg sm:text-xl font-black text-teal-900 tracking-wide uppercase">
              {result.student.nama}
            </h3>
            <p className="text-xs text-stone-500 font-bold font-mono tracking-widest mt-1">
              NISN: {result.student.nisn} • {result.student.kelas}
            </p>
            <p className="text-xs text-stone-600 font-semibold mt-0.5">
              Kompetensi Keahlian: <span className="text-stone-900">{result.student.jurusan}</span>
            </p>
          </div>

          <p className="text-xs sm:text-sm font-light px-4">
            Dinyatakan <span className={`font-black uppercase tracking-wider ${isLulus ? "text-emerald-700 underline" : "text-stone-700"}`}>
              {isLulus ? "MEMENUHI SYARAT KELULUSAN (KOMPETEN)" : "SELESAI MENGERJAKAN ASESMEN"}
            </span> pada mata pelajaran teori kejuruan kesehatan:
          </p>

          <div className="py-2 px-4 bg-emerald-50 rounded-xl border border-emerald-100 font-extrabold text-emerald-900 inline-block font-serif">
            {result.subjectName}
          </div>

          {/* Table representing academic grade */}
          <div className="max-w-md mx-auto border border-stone-250 rounded-xl overflow-hidden text-xs">
            <div className="grid grid-cols-2 bg-stone-100 font-bold border-b border-stone-250 text-stone-900 py-2">
              <span>NILAI KELULUSAN KKM</span>
              <span>NILAI YANG DICAPAI</span>
            </div>
            <div className="grid grid-cols-2 py-2 font-mono font-extrabold text-stone-900">
              <span className="text-stone-500">{KKM}</span>
              <span className={`text-md ${isLulus ? "text-emerald-700" : "text-rose-600"}`}>
                {result.score} ( {isLulus ? "KOMPETEN" : "REMEDIAL"} )
              </span>
            </div>
          </div>
        </div>

        {/* Certification stamps and signatures mock */}
        <div className="mt-8 pt-4 border-t border-dashed border-stone-200 flex flex-col sm:flex-row justify-between items-center text-xs gap-6 relative z-10 font-sans">
          
          {/* Virtual Seal and verification */}
          <div className="flex items-center gap-3">
            {/* Clean SVG Mock Stamp */}
            <div className="w-16 h-16 border-4 border-dashed border-blue-600 rounded-full flex flex-col items-center justify-center rotate-12 relative opacity-85 text-blue-600 select-none shrink-0 font-extrabold">
              <span className="text-[6px] text-center leading-none tracking-widest font-mono">SEAL</span>
              <span className="text-[5px] text-center tracking-widest uppercase font-mono mt-0.5">SMKS KORPRI</span>
              <span className="text-[8px] font-black font-serif mt-0.5">LULUS</span>
              <span className="text-[6px] text-center leading-none tracking-widest font-mono">KONAWE</span>
            </div>
            <div className="text-left font-mono text-[9px] text-stone-400 space-y-0.5">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="text-stone-600 font-bold">Terverifikasi CBT Portalv2</span>
              </div>
              <div>Timestamp: {result.date}</div>
              <div>Sistem Validasi Tanda Tangan Digital</div>
            </div>
          </div>

          {/* Principal sign box */}
          <div className="text-center space-y-1 sm:text-right">
            <p className="font-light text-stone-500">Konawe, {result.date.split(",")[0] || "Juni 2026"}</p>
            <p className="font-bold text-stone-800">Kepala SMKS Kesehatan Unaaha,</p>
            
            {/* Custom SVG handwriting-like visual representation of Principal signature */}
            <div className="py-2.5 h-10 flex items-center justify-center sm:justify-end">
              <svg viewBox="0 0 100 30" className="w-24 h-8 select-none opacity-80">
                <path d="M10 20 Q15 5 25 22 T40 10 T55 18 T70 8 T85 15" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 15 Q35 25 55 12" fill="none" stroke="#2563eb" strokeWidth="1.5" />
              </svg>
            </div>

            <p className="font-extrabold text-stone-900 underline uppercase text-xs">
              Mursalim, S.Kep., Ns., M.Kes
            </p>
            <p className="text-[10px] text-stone-400 font-mono">NIP. 19840214 200903 1 002</p>
          </div>
        </div>

        {/* Certificate copyright footer */}
        <div className="mt-6 pt-3 border-t border-emerald-100 text-[10px] text-stone-400 font-mono text-center">
          HAK CIPTA SMKS KESEHATAN UNAAHA - Arsan Amir
        </div>
      </div>

      {/* SECTION 3: Question review and Explanations sheets */}
      <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden" id="explanations-review-panel">
        
        {/* Toggle bar */}
        <button
          id="btn-toggle-detailed-review"
          type="button"
          className="w-full flex items-center justify-between p-5 bg-stone-50 hover:bg-stone-100 border-b border-stone-200 transition font-extrabold text-sm sm:text-base text-stone-900 outline-none cursor-pointer"
          onClick={() => setShowDetailedReview(!showDetailedReview)}
        >
          <div className="flex items-center gap-2">
            <FileText className="text-emerald-700 w-5 h-5 shrink-0" />
            <span>PEMBAHASAN SOAL & KUNCI JAWABAN ({questions.length} SOAL)</span>
          </div>
          {showDetailedReview ? <ChevronUp className="w-5 h-5 text-stone-500" /> : <ChevronDown className="w-5 h-5 text-stone-500" />}
        </button>

        {showDetailedReview && (
          <div className="p-4 sm:p-6 divide-y divide-stone-200 space-y-6" id="explanations-list">
            {questions.map((q, idx) => {
              const studentChoice = result.answers[q.id];
              const isCorrect = studentChoice === q.correctAnswer;
              
              const chosenOptionText = q.options.find(opt => opt.key === studentChoice)?.text || "(Tidak Dijawab)";
              const correctOptionText = q.options.find(opt => opt.key === q.correctAnswer)?.text;

              return (
                <div key={q.id} className="pt-6 first:pt-0 space-y-3">
                  
                  {/* Subject and indicator */}
                  <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono font-bold">
                    <span className="bg-stone-150 text-stone-600 px-2.5 py-0.5 rounded-md">
                      Soal Nomor {idx + 1}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-md flex items-center gap-1 ${
                      isCorrect 
                        ? "bg-emerald-100 text-emerald-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {isCorrect ? "✓ JAWABAN BENAR" : "✗ JAWABAN SALAH / KOSONG"}
                    </span>
                  </div>

                  {/* Case study helper */}
                  {q.caseStudy && (
                    <div className="bg-stone-50 p-3 sm:p-4 rounded-xl border border-stone-200 text-xs italic font-semibold text-stone-600 leading-relaxed font-serif">
                      {q.caseStudy}
                    </div>
                  )}

                  {/* Question */}
                  <div className="font-semibold text-sm sm:text-base text-stone-900 leading-relaxed">
                    {q.text}
                  </div>

                  {/* Options analysis list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-2 font-semibold">
                    
                    {/* Student Choice display */}
                    <div className={`p-3 rounded-xl border ${
                      isCorrect 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900" 
                        : "bg-red-50 border-red-200 text-red-900"
                    }`}>
                      <span className="block font-bold text-[10px] tracking-wider uppercase mb-1 text-stone-400">
                        Pilihan Anda:
                      </span>
                      <div className="flex items-start gap-2">
                        <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${
                          isCorrect ? "bg-emerald-600 text-white" : "bg-red-500 text-white"
                        }`}>
                          {studentChoice || "-"}
                        </span>
                        <span className="leading-snug">{chosenOptionText}</span>
                      </div>
                    </div>

                    {/* True Correct Answer display */}
                    {!isCorrect && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl">
                        <span className="block font-bold text-[10px] tracking-wider uppercase mb-1 text-stone-400">
                          Jawaban Kunci:
                        </span>
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                            {q.correctAnswer}
                          </span>
                          <span className="leading-snug">{correctOptionText}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Diagnostic Explanation box (Indonesian: Pembahasan Medis Klinis) */}
                  <div className="bg-yellow-50/70 border border-yellow-250 p-4 rounded-2xl text-xs text-amber-950 font-medium leading-relaxed font-sans mt-3">
                    <span className="font-extrabold text-amber-900 block uppercase mb-1 font-mono tracking-wide">
                      💡 Pembahasan Kejuruan Medis / Farmasi:
                    </span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

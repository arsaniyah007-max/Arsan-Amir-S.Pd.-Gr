/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Student, Jurusan, Kelas, Subject } from "../types";
import { KeyRound, User, BookOpen, GraduationCap, ArrowRight, ShieldCheck, Heart, Pill, Sparkles, Building2 } from "lucide-react";

interface LoginProps {
  onLogin: (student: Student, selectedSubjectId: string) => void;
  onAdminLogin: () => void;
  subjects: Subject[];
}

export default function Login({ onLogin, onAdminLogin, subjects }: LoginProps) {
  const [activeTab, setActiveTab] = useState<"siswa" | "guru">("siswa");
  
  // Student Login States
  const [nama, setNama] = useState("");
  const [nisn, setNisn] = useState("");
  const [kelas, setKelas] = useState<Kelas>(Kelas.XII);
  const [jurusan, setJurusan] = useState<Jurusan>(Jurusan.KEPERAWATAN);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [tokenInput, setTokenInput] = useState("");
  
  // Teacher Admin PIN State
  const [adminPin, setAdminPin] = useState("");

  // Error Messages
  const [studentError, setStudentError] = useState("");
  const [adminError, setAdminError] = useState("");

  // Handle student major changes
  const handleJurusanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as Jurusan;
    setJurusan(val);
    setStudentError("");
  };

  // Auto set first matched subject if selectedSubjectId is not in filtered list
  React.useEffect(() => {
    const classMatch = (sub: any) => !sub.kelas || sub.kelas === kelas;
    const majorMatch = (sub: any) => !sub.majorRequirement || sub.majorRequirement === jurusan;
    const currentFiltered = subjects.filter(sub => classMatch(sub) && majorMatch(sub));

    if (currentFiltered.length > 0) {
      const exists = currentFiltered.some(s => s.id === selectedSubjectId);
      if (!exists) {
        setSelectedSubjectId(currentFiltered[0].id);
      }
    } else {
      setSelectedSubjectId("");
    }
  }, [kelas, jurusan, subjects, selectedSubjectId]);

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError("");

    if (!nama.trim()) {
      setStudentError("Nama lengkap siswa harus diisi!");
      return;
    }
    if (!nisn.trim() || nisn.length < 5) {
      setStudentError("NISN tidak valid! Masukkan nomor induk yang benar.");
      return;
    }
    if (!selectedSubjectId) {
      setStudentError("Silakan pilih mata pelajaran ujian yang akan ditempuh.");
      return;
    }

    const selectedSubject = subjects.find(s => s.id === selectedSubjectId);
    if (!selectedSubject) {
      setStudentError("Mata pelajaran tidak ditemukan.");
      return;
    }

    // Verify token
    if (tokenInput.toUpperCase() !== selectedSubject.token) {
      setStudentError(`Token Ujian tidak cocok! Hubungi pengawas untuk mendapatkan token '${selectedSubject.name}'.`);
      return;
    }

    // Call login
    onLogin(
      {
        nama: nama.trim(),
        nisn: nisn.trim(),
        kelas,
        jurusan,
        examToken: tokenInput.toUpperCase()
      },
      selectedSubjectId
    );
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");

    if (adminPin === "1234") {
      onAdminLogin();
    } else {
      setAdminError("PIN otentikasi salah! Silakan masukkan PIN yang benar.");
    }
  };

  // Filter subject based on selected major and class, or allow all
  const filteredSubjects = subjects.filter(sub => {
    const classMatch = !sub.kelas || sub.kelas === kelas;
    const majorMatch = !sub.majorRequirement || sub.majorRequirement === jurusan;
    return classMatch && majorMatch;
  });

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 px-4 md:px-0" id="login-container">
      {/* Left Column: School Information and Instructions */}
      <div className="lg:col-span-5 bg-gradient-to-br from-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-emerald-500/20">
        
        {/* Subtle glowing circular overlays */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-500 rounded-full blur-3xl opacity-20" />

        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-14 h-14 bg-white rounded-2xl p-1 shadow-xl border-2 border-yellow-400 flex items-center justify-center shrink-0">
              <img
                src="/logo-smk.png"
                alt="Logo SMKS Kesehatan Unaaha"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold text-[10px] uppercase tracking-widest text-emerald-300 font-mono block">
                YAYASAN KESEHATAN NASIONAL
              </span>
              <span className="font-black text-sm uppercase tracking-wider text-white">
                SMKS KESEHATAN UNAAHA
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Selamat Datang di Portal Asesmen CBT
          </h2>
          <p className="mt-3 text-sm text-emerald-100/90 leading-relaxed font-light">
            Sistem evaluasi akademik terkomputerisasi mandiri milik SMKS Kesehatan Unaaha. Jl. Edi Sabara, Kelurahan Asinua, Kecamatan Unaaha. Dirancang untuk menguji kompetensi klinis keperawatan dan sains farmasi secara objektif, transparan, dan berstandar nasional.
          </p>

          <div className="mt-8 space-y-4">
            <div className="p-3.5 bg-white/5 backdrop-blur-sm rounded-xl flex items-start gap-3 border border-white/10">
              <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-300 shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-yellow-300">Asisten Keperawatan</h4>
                <p className="text-xs text-slate-300 mt-1">Uji klinis tanda-tanda vital, asuhan sanitasi pasien, pemosisian higienis tubuh, dan asuhan paliatif medis.</p>
              </div>
            </div>

            <div className="p-3.5 bg-white/5 backdrop-blur-sm rounded-xl flex items-start gap-3 border border-white/10">
              <div className="bg-indigo-500/20 p-2 rounded-lg text-teal-300 shrink-0">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-teal-200">Farmasi Klinis & Komunitas</h4>
                <p className="text-xs text-slate-300 mt-1">Evaluasi peracikan obat, konversi materi dosis resep latin, prinsip ketenagakerjaan apotek, serta farmakognosi.</p>
              </div>
            </div>

            <div className="p-3.5 bg-white/5 backdrop-blur-sm rounded-xl flex items-start gap-3 border border-white/10">
              <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-300 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-yellow-200">Sistem Pintar & Alih Hasil</h4>
                <p className="text-xs text-slate-300 mt-1">Hasil ujian tergradasi otomatis beserta lembar review komprehensif penjelas jawaban klinis medis.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-emerald-200/50 flex justify-between items-center relative z-10 font-mono">
          <span>Jl. Edi Sabara, Kel. Asinua, Kec. Unaaha</span>
          <span>v2.0 (Stable-2026)</span>
        </div>
      </div>

      {/* Right Column: Dynamic Login Card */}
      <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Tab Selector */}
          <div className="flex bg-stone-100 p-1.5 rounded-2xl gap-1 mb-6">
            <button
              id="tab-login-siswa"
              type="button"
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 ${
                activeTab === "siswa"
                  ? "bg-white text-emerald-800 shadow-md border-b-2 border-emerald-600"
                  : "text-stone-500 hover:text-stone-800"
              }`}
              onClick={() => {
                setActiveTab("siswa");
                setStudentError("");
              }}
            >
              <User className="w-4 h-4" />
              Gerbang Siswa
            </button>
            <button
              id="tab-login-guru"
              type="button"
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 ${
                activeTab === "guru"
                  ? "bg-white text-indigo-900 shadow-md border-b-2 border-indigo-700"
                  : "text-stone-500 hover:text-stone-800"
              }`}
              onClick={() => {
                setActiveTab("guru");
                setAdminError("");
              }}
            >
              <KeyRound className="w-4 h-4" />
              Akses Guru (PIN)
            </button>
          </div>

          {/* Tab CONTENT: STUDENT */}
          {activeTab === "siswa" && (
            <form onSubmit={handleStudentSubmit} className="space-y-4" id="student-login-form">
              <div className="text-center md:text-left mb-4">
                <h3 className="text-lg font-extrabold text-stone-900 flex items-center gap-2 justify-center md:justify-start">
                  <GraduationCap className="text-emerald-700 w-5 h-5" />
                  Pendaftaran Peserta Ujian
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Isilah biodata Anda sesuai data resmi DAPODIK sekolah untuk kelancaran sertifikasi hasil.
                </p>
              </div>

              {studentError && (
                <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl p-3.5 text-xs font-semibold flex items-start gap-2 animate-shake" id="student-error-box">
                  <span className="text-lg leading-none shrink-0">⚠️</span>
                  <span>{studentError}</span>
                </div>
              )}

              {/* Form Input fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nama Lengkap */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5" htmlFor="input-nama">
                    Nama Lengkap Siswa
                  </label>
                  <div className="relative">
                    <input
                      id="input-nama"
                      type="text"
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl py-2.5 px-3.5 pl-10 text-sm font-semibold text-stone-850 focus:border-emerald-600 focus:bg-white outline-none transition"
                      placeholder="Contoh: Andi Wijaya"
                      value={nama}
                      onChange={(e) => {
                        setNama(e.target.value);
                        setStudentError("");
                      }}
                    />
                    <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-stone-400" />
                  </div>
                </div>

                {/* NISN */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5" htmlFor="input-nisn">
                    NISN (10 Digit)
                  </label>
                  <div className="relative">
                    <input
                      id="input-nisn"
                      type="text"
                      maxLength={10}
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl py-2.5 px-3.5 pl-10 text-sm font-mono font-semibold text-stone-850 focus:border-emerald-600 focus:bg-white outline-none transition"
                      placeholder="007xxxxxxx"
                      value={nisn}
                      onChange={(e) => {
                        setNisn(e.target.value.replace(/\D/g, ""));
                        setStudentError("");
                      }}
                    />
                    <span className="absolute left-3.5 top-3.5 text-stone-400 font-bold text-[11px] font-mono select-none">ID</span>
                  </div>
                </div>

                {/* Tingkat Kelas */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5" htmlFor="select-kelas">
                    Tingkat Kelas
                  </label>
                  <select
                    id="select-kelas"
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-stone-850 focus:border-emerald-600 focus:bg-white outline-none transition"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value as Kelas)}
                  >
                    <option value={Kelas.X}>{Kelas.X}</option>
                    <option value={Kelas.XI}>{Kelas.XI}</option>
                    <option value={Kelas.XII}>{Kelas.XII}</option>
                  </select>
                </div>

                {/* Kompetensi Jurusan */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5" htmlFor="select-jurusan">
                    Kompetensi Keahlian
                  </label>
                  <select
                    id="select-jurusan"
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-stone-850 focus:border-emerald-600 focus:bg-white outline-none transition"
                    value={jurusan}
                    onChange={handleJurusanChange}
                  >
                    <option value={Jurusan.KEPERAWATAN}>Asisten Keperawatan</option>
                    <option value={Jurusan.FARMASI}>Farmasi / Kefarmasian</option>
                  </select>
                </div>
              </div>

              {/* Select Exam Subject */}
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mt-2">
                <label className="block text-xs font-bold text-emerald-800 uppercase mb-1.5" htmlFor="select-subject">
                  Mata Pelajaran Ujian Aktif
                </label>
                <select
                  id="select-subject"
                  className="w-full bg-white border-2 border-emerald-200 rounded-xl py-2.5 px-3 text-sm font-bold text-emerald-900 focus:border-emerald-600 outline-none transition"
                  value={selectedSubjectId}
                  onChange={(e) => {
                    setSelectedSubjectId(e.target.value);
                    setStudentError("");
                  }}
                >
                  <option value="">-- Pilih Mata Pelajaran --</option>
                  {filteredSubjects.map((s) => {
                    const displayLabel = s.name;
                    return (
                      <option key={s.id} value={s.id}>
                        {displayLabel}
                      </option>
                    );
                  })}
                </select>

                {selectedSubjectId && (
                  <div className="mt-2 text-[11px] text-emerald-700/90 leading-relaxed font-medium">
                    {subjects.find(s => s.id === selectedSubjectId)?.description}
                    <div className="mt-1 font-mono text-[10px] bg-white border border-emerald-100 rounded px-2 py-0.5 inline-block text-emerald-800">
                      Durasi: {subjects.find(s => s.id === selectedSubjectId)?.durationMinutes} Menit • KKM: 70
                    </div>
                  </div>
                )}
              </div>

              {/* Exam Token input and hints */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-stone-700 uppercase" htmlFor="input-token">
                    Token Ujian Sekolah
                  </label>
                  <span className="text-[10px] text-stone-400 font-mono italic">Perhatikan huruf kapital</span>
                </div>
                <div className="relative">
                  <input
                    id="input-token"
                    type="text"
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl py-2.5 px-3.5 pl-10 text-sm font-mono font-bold tracking-widest text-stone-850 uppercase placeholder-stone-400 focus:border-emerald-600 focus:bg-white outline-none transition"
                    placeholder="Masukkan 7-digit Token..."
                    value={tokenInput}
                    onChange={(e) => {
                      setTokenInput(e.target.value);
                      setStudentError("");
                    }}
                  />
                  <ShieldCheck className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-emerald-600" />
                </div>

                {/* Interactive Token helper to reduce visual friction */}
                <div className="mt-3 flex flex-wrap items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 font-bold uppercase font-mono tracking-wider shrink-0">
                    Bantuan Token:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[9px] font-mono">
                    {subjects.map(sub => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          setSelectedSubjectId(sub.id);
                          setTokenInput(sub.token);
                          // Auto set jurusan matching that subject if strictly restricted
                          if (sub.majorRequirement) {
                            setJurusan(sub.majorRequirement);
                          }
                          setStudentError("");
                        }}
                        className="bg-white border border-stone-200 hover:border-emerald-600 rounded px-2 py-1 text-stone-700 hover:bg-emerald-50 font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>{sub.id === "kep-dasar" ? "🏥" : sub.id === "farmasi-dasar" ? "🧪" : "🧠"}</span>
                        <span>{sub.token}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                id="btn-start-exam"
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 active:translate-y-0.5 border-b-4 border-emerald-800 transition flex items-center justify-center gap-2 text-sm uppercase tracking-wide cursor-pointer mt-4"
              >
                Mulai Ujian Sekarang
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* Tab CONTENT: TEACHER (ADMIN) */}
          {activeTab === "guru" && (
            <form onSubmit={handleAdminSubmit} className="space-y-4 py-4" id="admin-login-form">
              <div className="text-center md:text-left mb-4">
                <h3 className="text-lg font-extrabold text-indigo-900 flex items-center gap-2 justify-center md:justify-start">
                  <KeyRound className="text-indigo-700 w-5 h-5" />
                  Portal Analitik & Manajemen Guru
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Gunakan halaman ini untuk memantau nilai siswa, mengonfigurasi soal ujian, dan menelisik statistik ketuntasan CBT.
                </p>
              </div>

              {adminError && (
                <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl p-3 text-xs font-semibold animate-shake" id="admin-error-box">
                  ⚠️ {adminError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5" htmlFor="input-pin">
                  Masukkan PIN Otentikasi Guru
                </label>
                <input
                  id="input-pin"
                  type="password"
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl py-3 px-4 text-center text-lg font-bold font-mono tracking-widest text-stone-800 focus:border-indigo-600 focus:bg-white outline-none transition"
                  placeholder="••••"
                  value={adminPin}
                  onChange={(e) => {
                    setAdminPin(e.target.value);
                    setAdminError("");
                  }}
                />
              </div>

              {/* PIN Helper for demonstration */}
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-800 leading-relaxed font-semibold text-center select-none">
                💡 PIN Otentikasi Guru:{" "}
                <span className="font-mono bg-white px-2 py-0.5 rounded border border-indigo-200 font-black tracking-widest text-stone-900 text-sm">****</span>
              </div>

              <button
                id="btn-admin-login"
                type="submit"
                className="w-full bg-indigo-800 hover:bg-indigo-900 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-indigo-600/20 active:translate-y-0.5 border-b-4 border-indigo-950 transition flex items-center justify-center gap-2 text-sm uppercase tracking-wide cursor-pointer"
              >
                Masuk Dasbor Analitik
                <ShieldCheck className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
        
        {/* Footer info inside the login box */}
        <div className="mt-8 pt-4 border-t border-stone-100 text-[11px] text-stone-400 text-center flex flex-col sm:flex-row justify-between gap-2">
          <span className="font-semibold text-stone-600">Hak Cipta © SMKS Kesehatan Unaaha - Arsan Amir. All Rights Reserved.</span>
          <span>Sistem CBT Teruji Keamanan Lapis Lokal</span>
        </div>
      </div>
    </div>
  );
}

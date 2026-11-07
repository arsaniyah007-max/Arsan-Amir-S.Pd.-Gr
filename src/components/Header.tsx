/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ShieldAlert, Clock, Calendar, GraduationCap, Award } from "lucide-react";

interface HeaderProps {
  currentStudent?: { nama: string; nisn: string; jurusan: string; kelas: string } | null;
  isAdmin?: boolean;
}

export default function Header({ currentStudent, isAdmin }: HeaderProps) {
  const [time, setTime] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
      
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDateStr(now.toLocaleDateString("id-ID", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-r from-emerald-800 via-teal-900 to-indigo-950 text-white shadow-xl" id="school-main-header">
      {/* Decorative top strip */}
      <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-emerald-400 to-indigo-500 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: School Emblem & Name */}
        <div className="flex items-center gap-4 text-center md:text-left">
          {/* Circular SVG school emblem - highly detailed healthcare & education hybrid */}
          <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-400 flex-shrink-0 animate-pulse-slow">
            <svg viewBox="0 0 100 100" className="w-14 h-14">
              {/* Outer circle with dots */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#047857" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="39" fill="none" stroke="#1e1b4b" strokeWidth="1" strokeDasharray="3,3" />
              
              {/* Green star shape or cross backdrop */}
              <path d="M50 8 L54 35 L80 30 L60 50 L78 72 L50 62 L22 72 L40 50 L20 30 L46 35 Z" fill="#ecfdf5" opacity="0.6"/>
              
              {/* Red/Green Medical Cross indicating Health school */}
              <rect x="44" y="28" width="12" height="34" rx="2" fill="#10b981" />
              <rect x="33" y="39" width="34" height="12" rx="2" fill="#10b981" />
              <rect x="46" y="30" width="8" height="30" rx="1" fill="#047857" />
              <rect x="35" y="41" width="30" height="8" rx="1" fill="#047857" />

              {/* Opened book vector at base */}
              <path d="M28 64 C35 60 45 61 50 65 C55 61 65 60 72 64 L72 74 C65 70 55 71 50 75 C45 71 35 70 28 74 Z" fill="#1e1b4b" />
              <path d="M30 66 C36 63 44 64 48 67 L48 73 C44 70 36 69 30 72 Z" fill="#ffffff" />
              <path d="M70 66 C64 63 56 64 52 67 L52 73 C56 70 64 69 70 72 Z" fill="#ffffff" />

              {/* Caduceus snake / leaf silhouette subtle in center */}
              <circle cx="50" cy="45" r="4.5" fill="#f59e0b" />
            </svg>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-teal-950 font-bold text-[8px] px-1 rounded-full border border-white">
              SMK
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-emerald-500/30 text-emerald-300 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-widest font-mono">
                Asesmen Sekolah
              </span>
              <span className="bg-yellow-400 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                CBT Portal
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
              SMKS KESEHATAN UNAAHA
            </h1>
            <p className="text-xs text-emerald-100 font-medium tracking-wide">
              Membina Tenaga Asisten Keperawatan & Farmasi Unggul • Konawe, Sulawesi Tenggara
            </p>
          </div>
        </div>

        {/* Right Side: Clock & Status Indicators */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
          {/* Live digital clock card */}
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-2.5 px-4 flex items-center gap-3 border border-white/10 w-full sm:w-auto justify-center sm:justify-start">
            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
              <Clock className="w-5 h-5 animate-pulse-slow" />
            </div>
            <div>
              <div className="text-xs text-slate-300 font-mono flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                {dateStr || "Loading Tanggal..."}
              </div>
              <div className="text-md font-bold font-mono tracking-wider text-white">
                {time || "00:00:00"} <span className="text-xs text-emerald-400">WITA</span>
              </div>
            </div>
          </div>

          {/* User Specific Status Badge */}
          {currentStudent && (
            <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-2 px-3 text-xs w-full sm:w-auto text-center sm:text-left flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping-slow" />
              <div>
                <div className="font-semibold text-emerald-300 limit-text">
                  {currentStudent.nama}
                </div>
                <div className="text-slate-300 text-[10px] uppercase font-mono">
                  {currentStudent.kelas} • {currentStudent.jurusan.split(" ")[0]}
                </div>
              </div>
            </div>
          )}

          {isAdmin && (
            <div className="bg-indigo-400/10 border border-indigo-400/20 rounded-xl p-2 px-3 text-xs w-full sm:w-auto text-center sm:text-left flex items-center gap-2 justify-center sm:justify-start text-indigo-300">
              <Award className="w-4 h-4 text-yellow-400" />
              <div>
                <div className="font-bold uppercase tracking-wider">Mode Pendidik (Guru)</div>
                <div className="text-[10px] text-slate-300">Hak Akses Manajemen & Analitik</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

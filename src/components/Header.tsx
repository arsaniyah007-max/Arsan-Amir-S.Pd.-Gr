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
          {/* School Emblem Logo */}
          <div className="relative w-16 h-16 bg-white rounded-2xl p-1.5 flex items-center justify-center shadow-xl border-2 border-yellow-400 flex-shrink-0">
            <img
              src="/logo-smk.png"
              alt="Logo SMKS Kesehatan Unaaha"
              className="w-full h-full object-contain"
            />
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-teal-950 font-black text-[8px] px-1.5 py-0.2 rounded-full border border-white shadow-sm font-mono">
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
              Membina Tenaga Asisten Keperawatan & Farmasi Unggul • Jl. Edi Sabara, Kel. Asinua, Kec. Unaaha
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudentResult, Question } from "../types";
import { SCHOOL_LOGO_BASE64 } from "./logoBase64";

/**
 * Downloads a single student's complete official result sheet as an offline-ready,
 * printable HTML report with complete letterhead, scorecard, and answer key breakdown.
 */
export function downloadSingleStudentHTML(result: StudentResult, questions: Question[] = []): void {
  const isLulus = result.score >= 70;
  const filteredQuestions = questions.filter(q => q.subjectId === result.subjectId);
  const qList = filteredQuestions.length > 0 ? filteredQuestions : questions;

  const questionsHTML = qList.length > 0 ? `
    <div style="margin-top: 25px;">
      <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; border-bottom: 2px solid #047857; padding-bottom: 6px; margin-bottom: 14px;">
        ★ Rincian Jawaban Siswa & Pembahasan Soal
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
        <thead>
          <tr style="background: #f1f5f9; text-align: left; border-bottom: 2px solid #cbd5e1;">
            <th style="padding: 8px 10px; width: 40px; text-align: center;">No</th>
            <th style="padding: 8px 10px;">Pertanyaan & Skenario Klinis</th>
            <th style="padding: 8px 10px; width: 90px; text-align: center;">Pilihan Siswa</th>
            <th style="padding: 8px 10px; width: 80px; text-align: center;">Kunci</th>
            <th style="padding: 8px 10px; width: 90px; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${qList.map((q, idx) => {
            const studentAns = result.answers[q.id] || "-";
            const isCorrect = studentAns === q.correctAnswer;
            const studentOptText = q.options.find(o => o.key === studentAns)?.text || "(Tidak Dijawab)";
            const correctOptText = q.options.find(o => o.key === q.correctAnswer)?.text || "";

            return `
              <tr style="border-bottom: 1px solid #e2e8f0; background: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
                <td style="padding: 10px; text-align: center; font-weight: bold; font-family: monospace;">${idx + 1}</td>
                <td style="padding: 10px;">
                  ${q.caseStudy ? `<div style="font-style: italic; color: #475569; margin-bottom: 4px; background: #f8fafc; padding: 4px 8px; border-left: 3px solid #10b981; font-size: 10px;">${escapeHtml(q.caseStudy)}</div>` : ''}
                  <div style="font-weight: 600; color: #1e293b;">${escapeHtml(q.text)}</div>
                  <div style="font-size: 10px; color: #64748b; margin-top: 4px; line-height: 1.4;">
                    <strong style="color: #047857;">Pembahasan:</strong> ${escapeHtml(q.explanation)}
                  </div>
                </td>
                <td style="padding: 10px; text-align: center;">
                  <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-family: monospace; background: ${isCorrect ? '#dcfce7; color: #166534;' : '#fee2e2; color: #991b1b;'}">
                    ${escapeHtml(studentAns)}
                  </span>
                  <div style="font-size: 9px; color: #64748b; margin-top: 2px;">${escapeHtml(studentOptText)}</div>
                </td>
                <td style="padding: 10px; text-align: center; font-family: monospace; font-weight: bold; color: #047857;">
                  ${escapeHtml(q.correctAnswer)}
                  <div style="font-size: 9px; color: #64748b; margin-top: 2px;">${escapeHtml(correctOptText)}</div>
                </td>
                <td style="padding: 10px; text-align: center;">
                  <span style="display: inline-block; padding: 3px 8px; border-radius: 9999px; font-size: 9px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; ${isCorrect ? 'background: #dcfce7; color: #15803d;' : 'background: #fee2e2; color: #b91c1c;'}">
                    ${isCorrect ? '✓ Benar' : '✗ Salah'}
                  </span>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  ` : '';

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan Hasil Ujian - ${escapeHtml(result.student.nama)} (${escapeHtml(result.student.nisn)})</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      margin: 0;
      padding: 24px;
      line-height: 1.5;
    }
    .container {
      max-width: 850px;
      margin: 0 auto;
      background: #ffffff;
      padding: 36px 40px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
    }
    .header-kop {
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 3px double #0f172a;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .kop-text {
      flex: 1;
      text-align: center;
    }
    .kop-text h2 {
      margin: 0;
      font-size: 18px;
      text-transform: uppercase;
      font-weight: 900;
      letter-spacing: 0.5px;
      color: #064e3b;
    }
    .kop-text h4 {
      margin: 3px 0;
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
    }
    .kop-text p {
      margin: 0;
      font-size: 11px;
      color: #64748b;
    }
    .doc-title {
      text-align: center;
      margin: 20px 0 24px;
    }
    .doc-title h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #047857;
      text-decoration: underline;
    }
    .doc-title p {
      margin: 4px 0 0;
      font-size: 11px;
      color: #64748b;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px;
      font-size: 12px;
      margin-bottom: 20px;
    }
    .info-row {
      display: flex;
    }
    .info-label {
      width: 140px;
      font-weight: 600;
      color: #64748b;
    }
    .info-val {
      flex: 1;
      font-weight: 700;
      color: #0f172a;
    }
    .scorecard {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 24px;
      text-align: center;
    }
    .score-box {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px 10px;
      background: #ffffff;
    }
    .score-box.highlight {
      background: ${isLulus ? '#f0fdf4' : '#fef2f2'};
      border-color: ${isLulus ? '#86efac' : '#fca5a5'};
    }
    .score-label {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .score-val {
      font-size: 26px;
      font-weight: 900;
      font-family: monospace;
      color: #0f172a;
    }
    .signature-area {
      margin-top: 36px;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
    }
    .sig-box {
      text-align: center;
      width: 220px;
    }
    .sig-space {
      height: 60px;
    }
    .action-bar {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    .btn {
      padding: 9px 16px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn-print {
      background: #047857;
      color: #ffffff;
    }
    @media print {
      body {
        background: #ffffff;
        padding: 0;
      }
      .container {
        border: none;
        box-shadow: none;
        padding: 0;
      }
      .action-bar {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="action-bar">
      <button class="btn btn-print" onclick="window.print()">
        🖨️ Cetak / Simpan sebagai PDF
      </button>
    </div>

    <!-- KOP SURAT -->
    <div class="header-kop">
      <div style="width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; shrink-0;">
        <img src="${SCHOOL_LOGO_BASE64}" alt="Logo SMKS Kesehatan Unaaha" style="width: 100%; height: 100%; object-fit: contain;" />
      </div>
      <div class="kop-text">
        <h2>SMKS KESEHATAN UNAAHA</h2>
        <h4>SISTEM ASESMEN KOMPUTERISASI MANDIRI (CBT)</h4>
        <p>Jl. Edi Sabara, Kelurahan Asinua, Kecamatan Unaaha, Kabupaten Konawe, Sulawesi Tenggara</p>
        <p style="font-size: 10px; color: #94a3b8;">NPSN: 69888924 • Terakreditasi • Asisten Keperawatan & Farmasi Klinis</p>
      </div>
    </div>

    <!-- DOKUMEN JUDUL -->
    <div class="doc-title">
      <h3>LEMBAR HASIL UJIAN SISWA</h3>
      <p>ID Transaksi: ${escapeHtml(result.id)} • Dicetak: ${escapeHtml(new Date().toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))}</p>
    </div>

    <!-- IDENTITAS SISWA -->
    <div class="info-grid">
      <div class="info-row"><span class="info-label">Nama Siswa:</span><span class="info-val">${escapeHtml(result.student.nama)}</span></div>
      <div class="info-row"><span class="info-label">NISN:</span><span class="info-val" style="font-family: monospace;">${escapeHtml(result.student.nisn)}</span></div>
      <div class="info-row"><span class="info-label">Tingkat Kelas:</span><span class="info-val">${escapeHtml(result.student.kelas)}</span></div>
      <div class="info-row"><span class="info-label">Jurusan / Keahlian:</span><span class="info-val">${escapeHtml(result.student.jurusan)}</span></div>
      <div class="info-row"><span class="info-label">Mata Pelajaran:</span><span class="info-val" style="color: #047857;">${escapeHtml(result.subjectName)}</span></div>
      <div class="info-row"><span class="info-label">Waktu Selesai:</span><span class="info-val">${escapeHtml(result.date)}</span></div>
    </div>

    <!-- METRIK SCORECARD -->
    <div class="scorecard">
      <div class="score-box highlight">
        <div class="score-label">SKOR AKHIR</div>
        <div class="score-val" style="color: ${isLulus ? '#047857' : '#b91c1c'};">${result.score}</div>
        <div style="font-size: 10px; color: #64748b; font-weight: 600;">Skala 0 - 100</div>
      </div>
      <div class="score-box highlight">
        <div class="score-label">STATUS KELULUSAN</div>
        <div style="font-size: 16px; font-weight: 900; margin-top: 6px; color: ${isLulus ? '#047857' : '#b91c1c'};">
          ${isLulus ? 'KOMPETEN' : 'REMEDIAL'}
        </div>
        <div style="font-size: 10px; color: #64748b; font-weight: 600; margin-top: 4px;">KKM Sekolah: 70</div>
      </div>
      <div class="score-box">
        <div class="score-label">JAWABAN BENAR</div>
        <div class="score-val" style="color: #047857;">${result.correctAnswers}</div>
        <div style="font-size: 10px; color: #64748b; font-weight: 600;">Dari ${result.totalQuestions} Soal</div>
      </div>
      <div class="score-box">
        <div class="score-label">SALAH / KOSONG</div>
        <div class="score-val" style="color: #b91c1c;">${result.incorrectAnswers}</div>
        <div style="font-size: 10px; color: #64748b; font-weight: 600;">Kurang Tepat</div>
      </div>
    </div>

    <!-- RINCIAN BUTIR SOAL -->
    ${questionsHTML}

    <!-- TANDA TANGAN -->
    <div class="signature-area">
      <div class="sig-box">
        <p style="margin: 0; color: #64748b;">Peserta Ujian,</p>
        <div class="sig-space"></div>
        <p style="margin: 0; font-weight: 800; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">${escapeHtml(result.student.nama)}</p>
        <p style="margin: 2px 0 0; color: #64748b; font-size: 10px; font-family: monospace;">NISN: ${escapeHtml(result.student.nisn)}</p>
      </div>

      <div class="sig-box">
        <p style="margin: 0; color: #64748b;">Unaaha, ${escapeHtml(new Date().toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' }))}</p>
        <p style="margin: 2px 0 0; font-weight: 700;">Kepala SMKS Kesehatan Unaaha,</p>
        <div class="sig-space" style="display: flex; align-items: center; justify-content: center;">
          <span style="color: #2563eb; font-family: cursive; font-size: 18px; opacity: 0.85;">Mursalim</span>
        </div>
        <p style="margin: 0; font-weight: 800; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; text-transform: uppercase;">Mursalim, S.Kep., Ns., M.Kes</p>
        <p style="margin: 2px 0 0; color: #64748b; font-size: 10px; font-family: monospace;">NIP. 19840214 200903 1 002</p>
      </div>
    </div>

    <!-- HAK CIPTA -->
    <div style="margin-top: 30px; padding-top: 14px; border-top: 1px dashed #cbd5e1; text-align: center; font-size: 10px; color: #64748b; font-family: monospace; font-weight: bold;">
      HAK CIPTA SMKS KESEHATAN UNAAHA - Arsan Amir
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const filename = `Laporan_Hasil_${safeFilename(result.student.nisn)}_${safeFilename(result.student.nama)}_${safeFilename(result.subjectName)}.html`;
  triggerDownload(blob, filename);
}

/**
 * Downloads a single student's result as CSV format.
 */
export function downloadSingleStudentCSV(result: StudentResult): void {
  const headers = [
    "ID Hasil",
    "NISN",
    "Nama Siswa",
    "Kelas",
    "Jurusan",
    "Mata Pelajaran",
    "Tanggal Selesai",
    "Jawaban Benar",
    "Jawaban Salah",
    "Total Soal",
    "Skor Akhir",
    "KKM",
    "Status Kelulusan"
  ];

  const row = [
    result.id,
    result.student.nisn,
    result.student.nama,
    result.student.kelas,
    result.student.jurusan,
    result.subjectName,
    result.date,
    result.correctAnswers,
    result.incorrectAnswers,
    result.totalQuestions,
    result.score,
    70,
    result.score >= 70 ? "KOMPETEN" : "REMEDIAL"
  ];

  const csvContent = "\uFEFF" + [
    headers.map(escapeCsv).join(","),
    row.map(escapeCsv).join(",")
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const filename = `Hasil_${safeFilename(result.student.nisn)}_${safeFilename(result.student.nama)}.csv`;
  triggerDownload(blob, filename);
}

/**
 * Downloads all students' results as a clean spreadsheet CSV format.
 */
export function downloadAllStudentsCSV(results: StudentResult[]): void {
  const headers = [
    "No",
    "NISN",
    "Nama Lengkap Siswa",
    "Tingkat Kelas",
    "Kompetensi Keahlian",
    "Mata Pelajaran Ujian",
    "Jawaban Benar",
    "Jawaban Salah",
    "Total Soal",
    "Skor Akhir",
    "Standar KKM",
    "Status Kelulusan",
    "Waktu Selesai Ujian"
  ];

  const rows = results.map((res, index) => [
    index + 1,
    res.student.nisn,
    res.student.nama,
    res.student.kelas,
    res.student.jurusan,
    res.subjectName,
    res.correctAnswers,
    res.incorrectAnswers,
    res.totalQuestions,
    res.score,
    70,
    res.score >= 70 ? "KOMPETEN" : "REMEDIAL",
    res.date
  ]);

  const csvContent = "\uFEFF" + [
    headers.map(escapeCsv).join(","),
    ...rows.map(r => r.map(escapeCsv).join(","))
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const filename = `Rekap_Hasil_Ujian_SMKS_Kesehatan_Unaaha_${new Date().toISOString().slice(0, 10)}.csv`;
  triggerDownload(blob, filename);
}

// Helpers
function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function safeFilename(str: string): string {
  return (str || "").trim().replace(/[^a-zA-Z0-9_-]/g, "_");
}

function escapeHtml(str: string = ""): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeCsv(val: any): string {
  const str = String(val ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

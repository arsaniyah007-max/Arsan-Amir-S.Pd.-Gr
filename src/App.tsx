/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Student, Subject, Question, StudentResult } from "./types";
import { SUBJECTS, QUESTIONS } from "./data/questions";
import Header from "./components/Header";
import Login from "./components/Login";
import ExamEngine from "./components/ExamEngine";
import Review from "./components/Review";
import AdminDashboard from "./components/AdminDashboard";
import { AlertTriangle, BookOpen, GraduationCap, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

export default function App() {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [currentSubjectId, setCurrentSubjectId] = useState<string | null>(null);
  
  // Navigation states
  const [isExamActive, setIsExamActive] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Live results
  const [activeResult, setActiveResult] = useState<StudentResult | null>(null);
  
  // Custom Dynamic Questions
  const [questions, setQuestions] = useState<Question[]>([]);

  // On mount, load questions and check if there's any active state
  useEffect(() => {
    refreshQuestions();
  }, []);

  const refreshQuestions = async () => {
    try {
      const res = await fetch("/api/questions");
      if (res.ok) {
        const data = await res.json();
        setQuestions(data);
        localStorage.setItem("cbt_custom_questions", JSON.stringify(data));
        return;
      }
    } catch (err) {
      console.warn("Gagal terhubung ke server untuk mengambil soal, menggunakan cadangan lokal:", err);
    }

    const saved = localStorage.getItem("cbt_custom_questions");
    if (saved) {
      setQuestions(JSON.parse(saved));
    } else {
      // Direct load and cache on first boot
      localStorage.setItem("cbt_custom_questions", JSON.stringify(QUESTIONS));
      setQuestions(QUESTIONS);
    }
  };

  // Login handler
  const handleStudentLogin = (student: Student, selectedSubjectId: string) => {
    setCurrentStudent(student);
    setCurrentSubjectId(selectedSubjectId);
    setIsExamActive(true);
    setIsReviewMode(false);
    setIsAdminMode(false);
  };

  const handleAdminAccess = () => {
    setIsAdminMode(true);
    setCurrentStudent(null);
    setCurrentSubjectId(null);
    setIsExamActive(false);
    setIsReviewMode(false);
  };

  // Exam finisher (grading calculations and storage)
  const handleExamFinish = (answers: Record<string, string>, markedForReview: string[]) => {
    if (!currentStudent || !currentSubjectId) return;

    const selectedSubject = SUBJECTS.find(s => s.id === currentSubjectId);
    if (!selectedSubject) return;

    // Filter questions by subject
    const subjectQuestions = questions.filter(q => q.subjectId === currentSubjectId);
    const totalQuestions = subjectQuestions.length;

    // Evaluate answers
    let correctCount = 0;
    subjectQuestions.forEach((q) => {
      const studentAns = answers[q.id];
      if (studentAns && studentAns === q.correctAnswer) {
        correctCount++;
      }
    });

    const incorrectCount = totalQuestions - correctCount;
    // Calculate Score (range 0 to 100)
    const scoreVal = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const isPassed = scoreVal >= 70; // KKM threshold (70)

    const newResult: StudentResult = {
      id: `res-${Date.now()}-${currentStudent.nisn}`,
      student: currentStudent,
      subjectId: currentSubjectId,
      subjectName: selectedSubject.name,
      score: scoreVal,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      totalQuestions: totalQuestions,
      date: new Date().toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
      }),
      answers,
      markedForReview,
      passed: isPassed
    };

    // Save result to global array in localStorage
    const savedAll = localStorage.getItem("cbt_all_results");
    const existingList = savedAll ? JSON.parse(savedAll) : [];
    
    // Safety check to prevent duplicate submission rows
    const filteredList = existingList.filter((r: StudentResult) => 
      !(r.student.nisn === currentStudent.nisn && r.subjectId === currentSubjectId)
    );
    const updatedList = [newResult, ...filteredList];
    localStorage.setItem("cbt_all_results", JSON.stringify(updatedList));

    // Send to central Express server
    fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newResult)
    }).catch(err => console.error("Gagal sinkronisasi hasil ujian ke server admin:", err));

    // Transition to Review page
    setActiveResult(newResult);
    setIsExamActive(false);
    setIsReviewMode(true);
  };

  const handleResetApp = () => {
    setCurrentStudent(null);
    setCurrentSubjectId(null);
    setIsExamActive(false);
    setIsReviewMode(false);
    setIsAdminMode(false);
    setActiveResult(null);
  };

  // Filter subject-specific questions for active student
  const activeSubjectQuestions = currentSubjectId 
    ? questions.filter(q => q.subjectId === currentSubjectId)
    : [];
  
  const activeSubject = currentSubjectId 
    ? SUBJECTS.find(s => s.id === currentSubjectId) 
    : null;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-between text-stone-900 selection:bg-emerald-600 selection:text-white" id="app-root-wrapper">
      
      {/* Dynamic Header */}
      <Header currentStudent={currentStudent} isAdmin={isAdminMode} />

      {/* Main Container */}
      <main className="flex-grow py-6 sm:py-8">
        
        {/* VIEW 1: LOGIN PORTAL */}
        {!isExamActive && !isReviewMode && !isAdminMode && (
          <Login
            onLogin={handleStudentLogin}
            onAdminLogin={handleAdminAccess}
            subjects={SUBJECTS}
          />
        )}

        {/* VIEW 2: CBT EXAM ACTIVE SESSION */}
        {isExamActive && currentStudent && activeSubject && (
          <ExamEngine
            student={currentStudent}
            subject={activeSubject}
            questions={activeSubjectQuestions}
            onFinish={handleExamFinish}
            onExit={handleResetApp}
          />
        )}

        {/* VIEW 3: REPORT SCORECARD & OFFICIATING REVIEW */}
        {isReviewMode && activeResult && (
          <Review
            result={activeResult}
            questions={activeSubjectQuestions}
            onExit={handleResetApp}
          />
        )}

        {/* VIEW 4: MASTER GURU CONTROL PLATFORM */}
        {isAdminMode && (
          <AdminDashboard
            subjects={SUBJECTS}
            defaultQuestions={QUESTIONS}
            onExit={handleResetApp}
            onRefreshQuestions={refreshQuestions}
          />
        )}
      </main>

      {/* Corporate footer */}
      <footer className="bg-stone-900 text-stone-400 py-6 border-t border-stone-850 mt-12 print:hidden" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <div className="flex justify-center items-center gap-2 text-stone-100 flex-wrap">
            <span className="font-extrabold text-xs uppercase tracking-widest font-mono text-emerald-400">
              SMKS KESEHATAN UNAAHA
            </span>
            <span className="text-stone-700">|</span>
            <span className="text-xs font-medium text-stone-300">
              Sistem Penyelenggara Ujian Kredensial Asisten Medis Mandiri
            </span>
          </div>
          <div className="text-xs font-bold text-emerald-400 font-mono tracking-wide py-0.5">
            HAK CIPTA SMKS KESEHATAN UNAAHA - Arsan Amir
          </div>
          <p className="text-[10px] text-stone-500 font-mono">
            Didukung oleh Platform Digital CBT Pendidikan Tinggi Sulawesi Tenggara • Kategori Aman SSL & Enkripsi Sidang Lokal
          </p>
        </div>
      </footer>
    </div>
  );
}

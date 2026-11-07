/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Jurusan {
  KEPERAWATAN = "Keperawatan (Asisten Keperawatan)",
  FARMASI = "Farmasi (Farmasi Klinis dan Komunitas)",
}

export enum Kelas {
  X = "Kelas X",
  XI = "Kelas XI",
  XII = "Kelas XII",
}

export interface Student {
  nama: string;
  nisn: string;
  kelas: Kelas;
  jurusan: Jurusan;
  examToken: string;
}

export interface Question {
  id: string;
  subjectId: string;
  text: string;
  options: {
    key: string; // A, B, C, D, E
    text: string;
  }[];
  correctAnswer: string; // "A" | "B" | "C" | "D" | "E"
  explanation: string;
  caseStudy?: string; // Standard Indonesian nursing case context
}

export interface Subject {
  id: string;
  name: string;
  durationMinutes: number;
  token: string;
  description: string;
  majorRequirement?: Jurusan; // Optional constraint
  kelas?: Kelas; // Optional constraint for specific grade levels
}

export interface StudentResult {
  id: string;
  student: Student;
  subjectId: string;
  subjectName: string;
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  date: string;
  answers: Record<string, string>; // questionId -> chosen answer
  markedForReview: string[]; // list of questionIds
  passed: boolean;
}

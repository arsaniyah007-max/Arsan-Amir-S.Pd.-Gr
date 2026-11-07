/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { QUESTIONS } from "./src/data/questions";

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json({ limit: "15mb" }));

// Ensure data store directory exists
const DATA_DIR = path.join(process.cwd(), "data-store");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const RESULTS_FILE = path.join(DATA_DIR, "results.json");
const QUESTIONS_FILE = path.join(DATA_DIR, "questions.json");

// Helper to read results
function readResults(): any[] {
  try {
    if (fs.existsSync(RESULTS_FILE)) {
      const data = fs.readFileSync(RESULTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading results file, resetting...", error);
  }
  return [];
}

// Helper to write results
function writeResults(results: any[]): void {
  try {
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing results file:", error);
  }
}

// Helper to read questions
function readQuestions(): any[] {
  try {
    if (fs.existsSync(QUESTIONS_FILE)) {
      const data = fs.readFileSync(QUESTIONS_FILE, "utf-8");
      const parsed = JSON.parse(data);
      
      // Auto-update stored questions if they are missing any of our new defaults
      const missingAny = QUESTIONS.some(q => !parsed.some((pq: any) => pq.id === q.id));
      if (missingAny) {
        console.log("Detecting new default questions in questions.ts, merging into the database...");
        const merged = [...parsed];
        QUESTIONS.forEach(q => {
          if (!merged.some(m => m.id === q.id)) {
            merged.push(q);
          }
        });
        writeQuestions(merged);
        return merged;
      }
      return parsed;
    }
  } catch (error) {
    console.error("Error reading questions file, resetting to default...", error);
  }
  // Initialize and save with defaults if file doesn't exist
  writeQuestions(QUESTIONS);
  return QUESTIONS;
}

// Helper to write questions
function writeQuestions(questions: any[]): void {
  try {
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(questions, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing questions file:", error);
  }
}

// API Routes FIRST

// 1. GET ALL RESULTS
app.get("/api/results", (req, res) => {
  const results = readResults();
  res.json(results);
});

// 2. CREATE / UPDATE RESULT
app.post("/api/results", (req, res) => {
  const newResult = req.body;
  if (!newResult || !newResult.student || !newResult.student.nisn) {
    return res.status(400).json({ error: "Data hasil ujian tidak valid" });
  }

  const results = readResults();
  
  // Filter out any existing result for this student and subject to avoid duplication
  const filtered = results.filter(
    (r) => !(r.student.nisn === newResult.student.nisn && r.subjectId === newResult.subjectId)
  );
  
  const updated = [newResult, ...filtered];
  writeResults(updated);
  res.json({ success: true, result: newResult });
});

// 3. DELETE SPECIFIC RESULT (RECOVERY ACTION)
app.delete("/api/results/:id", (req, res) => {
  const { id } = req.params;
  const results = readResults();
  const updated = results.filter((r) => r.id !== id);
  writeResults(updated);
  res.json({ success: true, id });
});

// 4. CLEAR ALL RESULTS
app.delete("/api/results", (req, res) => {
  writeResults([]);
  res.json({ success: true });
});

// 5. GET ALL QUESTIONS
app.get("/api/questions", (req, res) => {
  const questions = readQuestions();
  res.json(questions);
});

// 6. UPDATE ALL QUESTIONS (BANK SOAL EDITOR)
app.post("/api/questions", (req, res) => {
  const questionsList = req.body;
  if (!Array.isArray(questionsList)) {
    return res.status(400).json({ error: "Paket soal tidak valid" });
  }
  writeQuestions(questionsList);
  res.json({ success: true });
});

// 7. RESET QUESTIONS TO PRESET
app.post("/api/questions/reset", (req, res) => {
  writeQuestions(QUESTIONS);
  res.json({ success: true, questions: QUESTIONS });
});


// Configure Vite middleware or Static files depending on environment
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static server mounted for dist/ directory.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CBT Server running at http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start fullstack server", err);
});

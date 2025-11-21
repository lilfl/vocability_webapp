// app/words/page.tsx
"use client";

import { useEffect, useState } from "react";
import type { Word } from "./types";

export default function WordsPage() {
  const [words, setWords] = useState<Word[] | null>(null);

  useEffect(() => {
    fetch("/api/notion/words")
      .then((res) => res.json())
      .then((data) => setWords(data));
  }, []);

  if (!words) return <p>Loading...</p>;

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Word List (Notion)
      </h1>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Word</th>
            <th>Meaning</th>
            <th>Difficulty</th>
            <th>Usage</th>
            <th>Core Image</th>
          </tr>
        </thead>
        <tbody>
          {words.map((w) => (
            <tr key={w.id}>
              <td>{w.word}</td>
              <td>{w.meaning}</td>
              <td>{w.difficulty ?? "-"}</td>
              <td>{w.usage ?? "-"}</td>
              <td>{w.coreImage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

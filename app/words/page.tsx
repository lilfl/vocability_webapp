// app/words/page.tsx
"use client";

import { useEffect, useState } from "react";

type Word = {
  id: string;
  word: string;
  meaning: string;
  pos: string;
  example: string;
};

export default function WordsPage() {
  const [words, setWords] = useState<Word[] | null>(null);

  useEffect(() => {
    fetch("/api/notion/words")
      .then((res) => res.json())
      .then((data) => setWords(data));
  }, []);

  if (!words) return <p>Loading...</p>;

  return (
    <main style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        Word List (Notion)
      </h1>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Word</th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Meaning</th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>POS</th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {words.map((w) => (
            <tr key={w.id}>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{w.word}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{w.meaning}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{w.pos}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{w.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

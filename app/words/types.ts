// app/words/types.ts みたいなファイルに切り出してもOK

export type Difficulty = "Easy" | "Normal" | "Challenging" | "Difficult";
export type Usage = "Written" | "Spoken" | "Both";
export type CasualLevel =
  | "VeryFormal"
  | "Formal"
  | "Neutral"
  | "Casual"
  | "Slang/VeryInformal";
export type Frequency = "VeryCommon" | "Common" | "Occasionally" | "Rare";
export type TypeTag =
  | "Neutral"
  | "Childlike"
  | "YouthSlang"
  | "OlderAdults"
  | "Literary"
  | "Academic"
  | "Feminine"
  | "Masculine";

export type Word = {
  id: string;
  word: string;
  meaning: string;
  pos: string;
  example: string;

  memo: string;
  phonetic: string;
  audioUrl: string;

  rootWordIds: string[];      // RootWord relation のページID
  derivedWordIds: string[];   // DerivedWords relation のページID

  nextReviewDate: string | null; // ISO 文字列 or null

  difficulty: Difficulty | null;
  coreImage: string;
  usage: Usage | null;
  casualLevel: CasualLevel | null;
  frequency: Frequency | null;
  typeTags: TypeTag[];

  paraphrase: string;
  similarSpelling: string;

  // ここに EF / Interval / Repetitions も載せたいなら追加
  // ef: number | null;
  // interval: number | null;
  // repetitions: number | null;
};

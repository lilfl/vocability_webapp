// app/api/notion/words/route.ts
import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

import type {
  Word,
  Difficulty,
  Usage,
  CasualLevel,
  Frequency,
  TypeTag,
} from "@/app/words/types"; // パスはプロジェクト構成に合わせて調整

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: "2025-09-03", // 新APIバージョンを明示
});

const dataSourceId = process.env.NOTION_DATA_SOURCE_ID!;

export async function GET() {
  console.log("NOTION_TOKEN prefix:", (process.env.NOTION_TOKEN || "").slice(0, 10));
  try {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 100, // 必要に応じて
    });

    const words = response.results.map((item: any) => {
      const props = item.properties;

      const rootWordIds =
        props.RootWord?.relation?.map((rel: any) => rel.id) ?? [];

      const derivedWordIds =
        props.DerivedWords?.relation?.map((rel: any) => rel.id) ?? [];

      const typeTags: TypeTag[] =
        props.Type?.multi_select?.map((t: any) => t.name) ?? [];

      return {
        id: item.id,
        word: props.Vocabulary?.title?.[0]?.plain_text ?? "",
        meaning: props.Meaning?.rich_text?.[0]?.plain_text ?? "",
        pos: props.POS?.select?.name ?? "",
        example: props.Example?.rich_text?.[0]?.plain_text ?? "",
        memo: props.Memo?.rich_text?.[0]?.plain_text ?? "",
        phonetic: props.Phonetic?.rich_text?.[0]?.plain_text ?? "",
        audioUrl: props.AudioURL?.url ?? "",

        rootWordIds,
        derivedWordIds,

        nextReviewDate: props.NextReviewDate?.date?.start ?? null,

        difficulty: (props.Difficulty?.select?.name ?? null) as
          | Difficulty
          | null,
        coreImage: props.CoreImage?.rich_text?.[0]?.plain_text ?? "",
        usage: (props.Usage?.select?.name ?? null) as Usage | null,
        casualLevel: (props.CasualLevel?.select?.name ?? null) as
          | CasualLevel
          | null,
        frequency: (props.Frequency?.select?.name ?? null) as
          | Frequency
          | null,
        typeTags,

        paraphrase: props.Paraphrase?.rich_text?.[0]?.plain_text ?? "",
        similarSpelling:
          props.SimilarSpelling?.rich_text?.[0]?.plain_text ?? "",
        // 忘却曲線用の項目（まだ未使用なら optional でOK）
        ef: props.EF?.number ?? null,
        interval: props.Interval?.number ?? null,
        repetitions: props.Repetitions?.number ?? null,
        lastReviewedAt: props.LastReviewedAt?.date?.start ?? null,
      };
    });

    return NextResponse.json(words);
  } catch (error) {
    console.error("Notion query error:", error);
    return NextResponse.json(
      { error: "Failed to fetch words from Notion" },
      { status: 500 }
    );
  }
}

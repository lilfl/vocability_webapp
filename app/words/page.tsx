// app/words/page.tsx

type Word = {
    id: number;
    word: string;
    meaning: string;
    pos: string; // part of speech（品詞）
    example: string;
};
  
const mockWords: Word[] = [
    {
        id: 1,
        word: "accommodate",
        meaning: "収容する；（要求などに）応じる",
        pos: "verb",
        example: "The hotel can accommodate up to 500 guests.",
    },
    {
        id: 2,
        word: "accurate",
        meaning: "正確な",
        pos: "adjective",
        example: "The data in this report is highly accurate.",
    },
    {
        id: 3,
        word: "allocate",
        meaning: "割り当てる",
        pos: "verb",
        example: "The company allocated more funds to research.",
    },
];


  
export default function WordsPage() {
    return (
        <main style={{ padding: "24px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
            Word List (Mock)
            </h1>
    
            <table
            style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "800px",
            }}
            >
            <thead>
                <tr>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>
                    Word
                </th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>
                    Meaning
                </th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>
                    POS
                </th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>
                    Example
                </th>
                </tr>
            </thead>
            <tbody>
                {mockWords.map((w) => (
                <tr key={w.id}>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{w.word}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{w.meaning}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{w.pos}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{w.example}</td>
                </tr>
                ))}
            </tbody>
            </table>
            
        </main>
    );
}


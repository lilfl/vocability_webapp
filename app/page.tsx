import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        Vocab App
      </h1>

      <p style={{ marginBottom: "16px" }}>
        Welcome to your English vocabulary practice app.
      </p>

      <ul>
        <li>
          <Link href="/words">Go to word list</Link>
        </li>
      </ul>
    </main>
  );
}

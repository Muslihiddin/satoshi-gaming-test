import Link from "next/link";
import { Button } from "antd";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
          This is a test project of Muslikhiddin.
        </h2>

        <Link href={"/projects"}>
          <Button type="primary">Project</Button>
        </Link>
      </div>
    </main>
  );
}

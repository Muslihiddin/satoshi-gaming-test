import { Button } from "antd";

export default function Projects() {
  return (
    <main>
      <header className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-4xl">
          Projects
        </h1>
        <Button color="primary" variant="solid">
          Create Project
        </Button>
      </header>
    </main>
  );
}

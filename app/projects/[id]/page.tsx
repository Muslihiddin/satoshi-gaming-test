import Link from "next/link";
import { Button } from "antd";
import { StarFilled } from "@ant-design/icons";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <main>
      <header className="flex items-center justify-between mb-10">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-4xl">
          Project {id}
        </h1>
        <Button icon={<StarFilled className="text-4xl text-yellow-400" />} />
      </header>

      <div className="flex flex-col gap-y-4 max-w-[600px]">
        <div>
          <h4 className="font-semibold">Project ID</h4>
          <p>project_a</p>
        </div>
        <div>
          <h4 className="font-semibold">Project name</h4>
          <p>Some project</p>
        </div>
        <div>
          <h4 className="font-semibold">Description</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
            expedita deserunt sunt odit fugiat harum nesciunt molestiae impedit
            incidunt dignissimos.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Start date</h4>
          <p>2025 10 20</p>
        </div>
        <div>
          <p className="font-semibold">End date</p>
          <p>2025 91 01</p>
        </div>
        <div>
          <h4 className="font-semibold">Project manager</h4>
          <p>John Doe</p>
        </div>

        <div className="mt-10 flex gap-2">
          <Link href={"/projects"}>
            <Button type="default">Back</Button>
          </Link>
          <Link href={"/projects/:id/edit"}>
            <Button type="primary">Edit</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

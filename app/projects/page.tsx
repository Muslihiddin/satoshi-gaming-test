"use client";
import React from "react";
import Link from "next/link";
import { StarFilled } from "@ant-design/icons";
import { Button, Table } from "antd";

import type { TableProps } from "antd";
interface DataType {
  key: string;
  projectId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  projectManager: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Project ID",
    dataIndex: "projectId",
    key: "projectId",
  },
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    key: "endDate",
    dataIndex: "endDate",
  },
  {
    title: "Project Manager",
    key: "projectManager",
    dataIndex: "projectManager",
  },
  {
    title: "",
    key: "action",
    render: () => (
      <div className="flex items-center gap-x-2">
        <Button type="text" icon={<StarFilled className="text-yellow-400" />} />
        <Button>Edit</Button>
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    projectId: "project_a",
    projectName: "Project A",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    key: "2",
    projectId: "project_b",
    projectName: "Project B",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    key: "3",
    projectId: "project_c",
    projectName: "Project C",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
];

export default function Projects() {
  return (
    <main>
      <header className="flex items-center justify-between mb-10">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-4xl">
          Projects
        </h1>
        <Link href="/projects/new">
          <Button color="primary" variant="solid">
            Create Project
          </Button>
        </Link>
      </header>

      <Table<DataType> columns={columns} dataSource={data} />
    </main>
  );
}

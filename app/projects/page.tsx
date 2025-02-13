"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProjects, updateFavorite } from "@/api";

import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";

import type { TableProps } from "antd";
import type { Project } from "@/types";

export default function Projects() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const favoriteMutation = useMutation({
    mutationFn: updateFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleFavoriteClick = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    favoriteMutation.mutate(projectId);
  };

  const columns: TableProps<Project>["columns"] = [
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
      render: (_, record) => (
        <div className="flex items-center gap-x-2">
          <Button
            type="text"
            icon={
              record.isFavorite ? (
                <StarFilled className="text-yellow-400" />
              ) : (
                <StarOutlined />
              )
            }
            onClick={(e) => handleFavoriteClick(record.projectId, e)}
            loading={
              favoriteMutation.isPending &&
              favoriteMutation.variables === record.projectId
            }
          />
          <Link
            href={`/projects/${record.projectId}/edit`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button>Edit</Button>
          </Link>
        </div>
      ),
    },
  ];

  const handleTableChange: TableProps<Project>["onChange"] = (pagination) => {
    setPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["projects", { page, size: pageSize }],
    queryFn: fetchProjects,
  });

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

      <Table<Project>
        columns={columns}
        dataSource={data?.data}
        rowKey="projectId"
        rowClassName={() => "cursor-pointer"}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: data?.totalItems,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: () => {
            router.push(`/projects/${record.projectId}`);
          },
        })}
        scroll={{ y: "calc(88vh - 200px", x: "max-content" }}
        sticky={{ offsetHeader: 0 }}
      />
    </main>
  );
}

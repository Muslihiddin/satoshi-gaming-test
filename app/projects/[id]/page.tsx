"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProject, updateFavorite } from "@/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, Spin } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";

export default function DetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: getProject,
  });

  const favoriteMutation = useMutation({
    mutationFn: updateFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
  });

  return (
    <main>
      <header className="flex items-center justify-between mb-10">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-4xl">
          Project {id}
        </h1>
        {data && (
          <Button
            loading={favoriteMutation.isPending}
            icon={
              data.isFavorite ? (
                <StarFilled className="text-4xl text-yellow-400" />
              ) : (
                <StarOutlined className="text-4xl" />
              )
            }
            onClick={() => {
              favoriteMutation.mutate(id as string);
            }}
          />
        )}
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 max-w-[600px]">
          <div>
            <h4 className="font-semibold">Project ID</h4>
            <p>{data?.projectId}</p>
          </div>
          <div>
            <h4 className="font-semibold">Project name</h4>
            <p>{data?.projectName}</p>
          </div>
          <div>
            <h4 className="font-semibold">Description</h4>
            <p>{data?.description}</p>
          </div>
          <div>
            <h4 className="font-semibold">Start date</h4>
            <p>{data?.startDate}</p>
          </div>
          <div>
            <p className="font-semibold">End date</p>
            <p>{data?.endDate}</p>
          </div>
          <div>
            <h4 className="font-semibold">Project manager</h4>
            <p>{data?.projectManager}</p>
          </div>

          <div className="mt-10 flex gap-2">
            <Link href={"/projects"}>
              <Button type="default">Back</Button>
            </Link>
            <Link href={`/projects/${id}/edit`}>
              <Button type="primary">Edit</Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

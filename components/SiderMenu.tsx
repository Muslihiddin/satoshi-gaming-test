"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/api";

import { Menu } from "antd";

import type { MenuProps } from "antd";

type SiderMenuProps = {
  onNavigate?: () => void;
};

export default function SiderMenu({ onNavigate }: SiderMenuProps) {
  const router = useRouter();
  const handleNavigation: MenuProps["onClick"] = (e) => {
    router.push(`/projects/${e.key}`);
    if (onNavigate) {
      onNavigate();
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["projects", { favourites: true }],
    queryFn: fetchProjects,
    select: (data) => {
      return data.data.map((el) => ({
        key: el.projectId,
        label: el.projectName,
      }));
    },
  });

  const { id } = useParams();
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  useEffect(() => {
    if (id && typeof id === "string") {
      setSelectedRoutes([id]);
    } else {
      setSelectedRoutes([]);
    }
  }, [id]);

  if (isLoading) {
    return <p className="text-slate-100 italic m-1 pl-6 pr-4">Loading...</p>;
  }
  if (!data || data.length === 0) {
    return <p className="text-slate-100 italic m-1 pl-6 pr-4">No favorites</p>;
  }
  return (
    <Menu
      onClick={handleNavigation}
      theme="light"
      mode="inline"
      items={data}
      selectedKeys={selectedRoutes}
      defaultSelectedKeys={selectedRoutes}
    />
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Menu } from "antd";

import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    key: "project_1",
    label: "Project A",
  },
];

export default function SiderMenu() {
  const router = useRouter();
  const handleNavigation: MenuProps["onClick"] = (e) => {
    router.push(`/projects/${e.key}`);
  };

  const { id } = useParams();
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  useEffect(() => {
    if (id && typeof id === "string") {
      setSelectedRoutes([id]);
    } else {
      setSelectedRoutes([]);
    }
  }, [id]);

  return (
    <Menu
      onClick={handleNavigation}
      theme="dark"
      mode="inline"
      items={items}
      selectedKeys={selectedRoutes}
      defaultSelectedKeys={selectedRoutes}
    />
  );
}

"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Layout, theme } from "antd";

import SiderMenu from "@/components/SiderMenu";

const { Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  paddingTop: "20px",
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { id } = useParams();
  useEffect(() => {}, [id]);

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <SiderMenu />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

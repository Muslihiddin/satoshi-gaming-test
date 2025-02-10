"use client";
import React from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";

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

const items: MenuProps["items"] = [
  {
    key: "project_1",
    label: "Project A",
  },
];

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <Menu theme="dark" mode="inline" items={items} />
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

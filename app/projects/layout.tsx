"use client";
import React from "react";
import { Layout, theme, Grid, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

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
  background: "white",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const screens = Grid.useBreakpoint();
  const isMd = screens.md;
  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const handleNavigation = () => {
    if (!isMd) {
      setDrawerVisible(false);
    }
  };

  return (
    <Layout hasSider>
      {isMd ? (
        <Sider style={siderStyle} className="hidden md:block">
          <SiderMenu />
        </Sider>
      ) : (
        <Drawer
          title="Menu"
          placement="left"
          closable
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width="100%"
          styles={{
            body: { padding: 0 },
          }}
        >
          <SiderMenu onNavigate={handleNavigation} />
        </Drawer>
      )}

      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {!isMd && (
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              style={{ marginBottom: 16 }}
            >
              Menu
            </Button>
          )}
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

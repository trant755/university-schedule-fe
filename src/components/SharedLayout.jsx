import React, { useState, useEffect } from "react";
import { UserOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import { Layout, Menu, Typography, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { UserBar } from "./UserBar";
const { Header, Content, Sider } = Layout;

export const SharedLayout = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const MenuItems = [
    {
      label: <Link to={"/my-schedule"}>Мій Розклад</Link>,
      icon: <UserOutlined />,
    },
    {
      label: <Link to={"/search-schedule"}>Пошук Розкладу</Link>,
      icon: <SearchOutlined />,
    },
    {
      label: <Link to={"/edit-schedule"}>Редагування Розкладу</Link>,
      icon: <EditOutlined />,
      role: "Teacher",
    },
    {
      label: <Link to={"/edit-subjects"}>Редагування Предметів</Link>,
      icon: <EditOutlined />,
      role: "Teacher",
    },
  ].map((item, index) => {
    if (item.role && user?.role?.name !== item.role) {
      return null;
    }
    return {
      ...item,
      key: String(index + 1),
    };
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider breakpoint="lg" collapsedWidth="0" width={300}>
        <div
          className="demo-logo-vertical"
          style={{
            // height: "32px",
            background: "rgba(255, 255, 255, 0.2)",
            margin: "16px",
            borderRadius: "8px",
            padding: "8px 12px",
          }}
        >
          <Typography.Title level={5} style={{ color: "white", margin: 0 }}>
            University Schedule System
          </Typography.Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={MenuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            background: colorBgContainer,
          }}
        >
          <UserBar />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

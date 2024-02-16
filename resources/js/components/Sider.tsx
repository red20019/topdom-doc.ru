import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, ConfigProvider, Image } from "antd";
import type { MenuProps } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import picLogo from "/images/logo-topdom-pic-white.svg";
import textLogo from "/images/logo-topdom-text-white.svg";

const siderStyle: React.CSSProperties = {
  textAlign: "left",
  color: "white",
};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link to="/create-doc">Добавить документ</Link>,
    "1",
    <FileOutlined />
  ),
  getItem(<Link to="/profile">Профиль</Link>, "2", <UserOutlined />),
];

const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (flag: boolean) => {
    setCollapsed(flag)
  }

  return (
    <Layout.Sider
      width="15%"
      style={siderStyle}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className="demo-logo-vertical" />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedBg: "transparent",
            },
          },
        }}
      >
        <Link to="/" className="flex items-center my-4 px-3 w- h-22">
          <img width={60} src={picLogo} className="mr-1 min-w-[60px]" />
          <img src={textLogo} className="h-[50px] overflow-x-hidden" />
        </Link>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </ConfigProvider>
    </Layout.Sider>
  );
};

export default Sider;

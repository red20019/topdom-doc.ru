import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MenuClickEventHandler } from "rc-menu/lib/interface"; //
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
import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changeMenuItem } from "../redux/sider/siderSlice";

const siderStyle: React.CSSProperties = {
  textAlign: "left",
  color: "white",
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
};

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  getItem(
    <Link to="/create-doc">Добавить документ</Link>,
    "1",
    <FileOutlined />
  ),
  getItem(<Link to="/profile">Профиль</Link>, "2", <UserOutlined />),
];

const Sider = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const { selectedKeys } = useAppSelector((state: RootState) => state.sider);

  const [collapsed, setCollapsed] = useState(false);

  const onSetMain = () => {
    dispatch(changeMenuItem(["0"]));
  };

  // TODO: transform into redux state
  const handleMenuClick: MenuClickEventHandler = (e) => {
    dispatch(changeMenuItem([e.key]));
  };

  return (
    <Layout.Sider
      width="15%"
      style={siderStyle}
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <div className="demo-logo-vertical" />

      <Link
        onClick={onSetMain}
        to="/"
        className="flex items-center mt-7 mb-4 px-3 h-22"
      >
        <img width={60} src={picLogo} className="mr-1 min-w-[60px]" />
        <img src={textLogo} className="h-[50px] overflow-x-hidden" />
      </Link>
      {user.currentUser && (
        <Menu
          theme="dark"
          defaultSelectedKeys={["0"]}
          selectedKeys={selectedKeys}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      )}
    </Layout.Sider>
  );
};

export default Sider;

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

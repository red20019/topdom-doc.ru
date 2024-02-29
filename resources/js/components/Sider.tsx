import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/user/userSlice";
import { authAPI } from "../api/api";
import { emptyDocs } from "../redux/docs/docsSlice";

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
  getItem(<Link to="/create-doc">Добавить документ</Link>, "1"),
  getItem(<Link to="/documents">Мои документы</Link>, "2", <FileOutlined />),
  getItem(<Link to="/profile">Профиль</Link>, "3", <UserOutlined />),
];

const Sider = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await authAPI.me();
        if (response.data && !user.currentUser) {
          handleSignOut();
        }
      } catch (error) {
        handleSignOut();
      }
    };
    getUser();
  }, []);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const response = await authAPI.signOut();

      if (response.success === false) {
        dispatch(signOutFailure(response.message));
        return;
      }
      dispatch(emptyDocs());
      dispatch(changeMenuItem(["0"]));
      dispatch(signOutSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(signOutFailure((error as Record<string, string>).message));
    }
  };

  return (
    <Layout.Sider
      width="15%"
      style={siderStyle}
      // collapsible
      // collapsed={collapsed}
      // onCollapse={() => setCollapsed(!collapsed)}
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
      <div className="flex justify-center w-[15%] lg:order-2 fixed bottom-5">
        {user.currentUser ? (
          <button
            onClick={handleSignOut}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Выйти
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Войти
            </Link>
            <Link
              to="/register"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Регистрация
            </Link>
          </>
        )}
        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
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

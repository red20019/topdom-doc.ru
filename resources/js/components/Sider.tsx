import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, MenuProps } from "antd";
import { MenuClickEventHandler } from "rc-menu/lib/interface"; //
import {
  FileAddOutlined,
  FolderOpenOutlined,
  UserOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "usehooks-ts";

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
  getItem(
    <Link to="/create-doc">Добавить документ</Link>,
    "1",
    <FileAddOutlined />
  ),
  getItem(
    <Link to="/documents">Мои документы</Link>,
    "2",
    <FolderOpenOutlined />
  ),
  getItem(<Link to="/profile">Профиль</Link>, "3", <UserOutlined />),
];

const Sider: React.FC<Record<string, boolean>> = ({
  matchesMax1270,
  matchesMax1000,
  matchesMax790,
}) => {
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
  const { loading } = useAppSelector((state: RootState) => state.user);

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
      width={`${
        matchesMax790
          ? "80px"
          : matchesMax1270
          ? "20%"
          : matchesMax1000
          ? "25%"
          : "15%"
      }`}
      style={siderStyle}
      // collapsible
      collapsed={matchesMax790}
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
      <div
        className={`flex justify-center lg:order-2 fixed bottom-5 ${
          matchesMax790 ? "left-3" : "left-6"
        }`}
      >
        {user.currentUser ? (
          <button
            onClick={handleSignOut}
            title="Выйти"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {loading ? (
              <LoadingOutlined />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            )}
          </button>
        ) : (
          <>
            <Link
              to="/login"
              title="Войти"
              className="bg-white text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
            </Link>
            <Link
              to="/register"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Регистрация
            </Link>
          </>
        )}
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

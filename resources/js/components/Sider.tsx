import {
  DashboardOutlined,
  FileAddOutlined,
  FolderOpenOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { MenuClickEventHandler } from "rc-menu/lib/interface"; //
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authAPI } from "../api";
import { emptyDocs } from "../redux/docs/docsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changeMenuItem } from "../redux/sider/siderSlice";
import { RootState } from "../redux/store";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/user/userSlice";
import SigninIcon from "./Icons/SigninIcon";
import SignoutIcon from "./Icons/SignoutIcon";
import SignupIcon from "./Icons/SignupIcon";
import picLogo from "/images/logo-topdom-pic-white.svg";
import textLogo from "/images/logo-topdom-text-white.svg";

const siderStyle: React.CSSProperties = {
  textAlign: "left",
  color: "white",
  overflow: "auto",
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
};

type MenuItem = Required<MenuProps>["items"][number];

const Sider: React.FC<Record<string, boolean>> = ({
  matchesMax1270,
  matchesMax1000,
  matchesMax790,
  isOnDocumentPage,
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
    // getItem(<Link to="/profile">Профиль</Link>, "3", <UserOutlined />),
    ...(user.currentUser?.role === "boss"
      ? [
          getItem(
            <Link to="/dashboard">Панель управления</Link>,
            "4",
            <DashboardOutlined />
          ),
        ]
      : []),
  ];
  user.currentUser?.role;
  const onSetMain = () => {
    dispatch(changeMenuItem(["0"]));
  };

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
        className={`flex justify-center lg:order-2 fixed ${
          matchesMax790 ? "left-3 flex-col gap-y-2" : "left-6 gap-x-2"
        } ${
          isOnDocumentPage && matchesMax790 ? "bottom-[7.5rem]" : "bottom-5"
        }`}
      >
        {user.currentUser ? (
          <button
            onClick={handleSignOut}
            title="Выйти"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {loading ? <LoadingOutlined /> : <SignoutIcon />}
          </button>
        ) : (
          <>
            <Link
              to="/login"
              title="Войти"
              className="bg-white text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <SigninIcon />
            </Link>
            <Link
              to="/register"
              title="Регистрация"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <SignupIcon />
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

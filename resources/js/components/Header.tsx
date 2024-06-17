import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "antd";

import { authAPI } from "../api";
import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/user/userSlice";
import { changeMenuItem } from "../redux/sider/siderSlice";
import { emptyDocs } from "../redux/docs/docsSlice";

const headerStyle: React.CSSProperties = {
  paddingTop: "1.75rem",
  paddingBottom: "1rem",
  minHeight: "84px",
  backgroundColor: "white",
  color: "#fff",
  textAlign: "center",
};

const Header: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const response = await authAPI.me();
  //       if (response.data && !user.currentUser) {
  //         handleSignOut();
  //       }
  //     } catch (error) {
  //       handleSignOut();
  //     }
  //   };
  //   getUser();
  // }, []);

  // const handleSignOut = async () => {
  //   try {
  //     dispatch(signOutStart());
  //     const response = await authAPI.signOut();

  //     if (response.success === false) {
  //       dispatch(signOutFailure(response.message));
  //       return;
  //     }
  //     dispatch(emptyDocs());
  //     dispatch(changeMenuItem(["0"]));
  //     dispatch(signOutSuccess());
  //     navigate("/login");
  //   } catch (error) {
  //     dispatch(signOutFailure((error as Record<string, string>).message));
  //   }
  // };

  return (
    <Layout.Header style={headerStyle}>
      <div className="container mx-auto mb-14 px-4">
        <nav className="bg-white border-gray-200 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto">
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 flex-grow"
              id="mobile-menu-2"
            ></div>
          </div>
        </nav>
      </div>
    </Layout.Header>
  );
};

export default Header;

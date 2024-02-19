import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "antd";

// import Logo from "/images/logo.svg";
import { authAPI } from "../api/api";
import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/user/userSlice";

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

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await authAPI.me();

        // if (response.success === false) {
        //   dispatch(signOutFailure(response.message));
        //   return;
        // }
      } catch (error) {
        dispatch(signOutSuccess());
      }
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const response = await authAPI.signOut();

      if (response.success === false) {
        dispatch(signOutFailure(response.message));
        return;
      }
      dispatch(signOutSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(signOutFailure((error as Record<string, string>).message));
    }
  };

  return (
    <Layout.Header style={headerStyle}>
      <div className="container mx-auto mb-14 px-4">
        <nav className="bg-white border-gray-200 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto">
            <div className="flex items-center lg:order-2">
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
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
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
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 flex-grow"
              id="mobile-menu-2"
            >
              {/* <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to="/create-doc"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    Добавить документ
                  </Link>
                </li>
              </ul> */}
            </div>
          </div>
        </nav>
      </div>
    </Layout.Header>
  );
};

export default Header;

import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { useMediaQuery } from "usehooks-ts";

import Welcome from "./pages/Welcome";
import Pending from "./pages/Pending";
import Register from "./pages/SignUp";
import CreateDoc from "./pages/CreateDoc";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import DashBoard from "./pages/Dashboard";
import Document from "./pages/Document";

const Login = lazy(() => import("./pages/Login"));
// const Document = lazy(() => import("./pages/Document"));
const Docs = lazy(() => import("./pages/Docs"));
const Sider = lazy(() => import("./components/Sider"));

const contentStyle: React.CSSProperties = {
  // paddingTop: '40px',
  // minHeight: "calc(100vh - 84px)",
  minHeight: "100vh",
  backgroundColor: "white",
};

export interface IUser {
  name: string;
  age: number;
}
const App: React.FC = () => {
  const location = useLocation();
  const isOnDocumentPage =
    location.pathname.startsWith("/documents/") &&
    location.pathname !== "/documents";

  const matchesMax1270 = useMediaQuery("(max-width: 1270px)");
  const matchesMax1000 = useMediaQuery("(max-width: 1000px)");
  const matchesMax790 = useMediaQuery("(max-width: 790px)");

  return (
    <Layout hasSider style={{ backgroundColor: "white" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Sider
          {...{
            matchesMax1270,
            matchesMax1000,
            matchesMax790,
            isOnDocumentPage,
          }}
        />
      </Suspense>
      <Layout className="bg-white">
        <Layout.Content
          style={{
            ...contentStyle,
            marginLeft: matchesMax790
              ? "80px"
              : matchesMax1270
              ? "20%"
              : matchesMax790
              ? "25%"
              : "15%",
            marginRight:
              isOnDocumentPage && matchesMax790
                ? "0"
                : isOnDocumentPage && matchesMax1270
                ? "20%"
                : isOnDocumentPage && matchesMax790
                ? "25%"
                : isOnDocumentPage
                ? "15%"
                : "0",
          }}
        >
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="register" element={<Register />} />

            <Route
              path="login"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              }
            />
            <Route path="pending" element={<Pending />} />
            <Route element={<PrivateRoute />}>
              <Route path="create-doc" element={<CreateDoc />} />
              <Route
                path="documents"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Docs
                      {...{ matchesMax1270, matchesMax1000, matchesMax790 }}
                    />
                  </Suspense>
                }
              />
              <Route
                path="documents/:id"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Document
                      {...{ matchesMax1270, matchesMax1000, matchesMax790 }}
                    />
                  </Suspense>
                }
              />
              <Route path="dashboard" element={<DashBoard />} />
              {/* <Route path="/profile" element={<Profile />} />
              <Route path="/create-listing" element={<CreateListing />} /> */}
              {/* <Route
                path="/update-listing/:listingId"
                element={<UpdateListing />}
              /> */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;

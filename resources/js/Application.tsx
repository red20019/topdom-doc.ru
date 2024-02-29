import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Layout } from "antd";

import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Pending from "./pages/Pending";
import Login from "./pages/Login";
import Register from "./pages/SignUp";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import CreateDoc from "./pages/CreateDoc";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Document from "./pages/Document";
import Sider from "./components/Sider";
import Docs from "./pages/Docs";

const contentStyle: React.CSSProperties = {
  minHeight: "calc(100vh - 84px)",
  backgroundColor: "white",
};

export interface IUser {
  name: string;
  age: number;
}
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Layout hasSider style={{ backgroundColor: "white" }}>
            <Sider />
            <Layout style={{ marginLeft: "15%" }}>
              {/* <Header /> */}
              <Layout.Content style={contentStyle}>
                <Routes>
                  <Route path="/" element={<Welcome />} />
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<Login />} />
                  <Route path="pending" element={<Pending />} />
                  <Route element={<PrivateRoute />}>
                    <Route path="create-doc" element={<CreateDoc />} />
                    <Route path="documents" element={<Docs />} />
                    <Route path="documents/:id" element={<Document />} />
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
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;

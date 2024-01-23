import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Pending from "./pages/Pending";
import Login from "./pages/Login";
import Register from "./pages/SignUp";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";

export interface IUser {
  name: string;
  age: number;
}
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pending" element={<Pending />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;

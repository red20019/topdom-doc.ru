import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Pending from "./pages/Pending";

export interface IUser {
  name: string;
  age: number;
}
const App = () => {
  const [users, setUsers] = useState<IUser[]>([
    {
      name: "Bijaya",
      age: 25,
    },
    {
      name: "Ram",
      age: 25,
    },
  ]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/pending" element={<Pending />} />
      </Routes>
    </Router>
  );
};

export default App;

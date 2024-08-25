import "./index.css";

import AuthContextProvider from "@/Context/AuthContext";
import React from "react";
import Routes from "./Router/index";

const App = () => {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
};

export default App;

import React from "react";
import { ConfigProvider } from "antd";
import Routers from "./routes";
// antd theme
import antdTheme from "./styles/antdTheme";

const App: React.FC = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <Routers />
    </ConfigProvider>
  );
};

export default App;

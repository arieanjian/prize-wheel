declare const __VERSION__: string;
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import Routers from "./routes";
// antd theme
import antdTheme from "./styles/antdTheme";
// style
import "react-multi-carousel/lib/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  console.log(__VERSION__);
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={antdTheme}>
        <Routers />
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;

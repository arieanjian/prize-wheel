import React from "react";
import { Layout } from "antd";

interface Iprops {
  isShowSider: boolean;
}

const Content: React.FC<Iprops> = ({ isShowSider }) => {
  return (
    <Layout.Content
      className={`bg-[#F0F0F0] pr-8 ${isShowSider ? "pl-2" : "pl-10"}`}
    >
      Content
    </Layout.Content>
  );
};

export default Content;

import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const Bread: React.FC = () => {
  const items = [
    {
      href: "",
      title: <HomeOutlined />,
    },
    {
      href: "",
      title: (
        <>
          <UserOutlined />
          <span>overview</span>
        </>
      ),
    },
    {
      title: "Application",
    },
  ];

  return <Breadcrumb items={items} />;
};

export default Bread;

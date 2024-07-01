import * as AntdIcons from "@ant-design/icons";

import React from "react";

interface IProps {
  name: string;
  color: string;
  icon: string;
  size?: "large" | "middle" | "small";
}

const sizeMap = {
  large: "text-[30px] px-5 py-1",
  middle: "text-[20px] px-3 py-1",
  small: "text-[10px] px-1 py-1",
};

const Index: React.FC<IProps> = ({ name, icon, color, size = "middle" }) => {
  const AntdIcon = AntdIcons[icon as keyof typeof AntdIcons];
  const ValidAntdIcon = AntdIcon as React.ComponentType;

  return (
    <span className={`${color} ${sizeMap[size]} inline-block rounded-[50px]`}>
      <ValidAntdIcon />
      {name}
    </span>
  );
};

export default Index;

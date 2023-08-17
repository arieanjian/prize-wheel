import React from "react";
import { Button } from "antd";
// image
import Logo from "@/assets/imgs/Logo.svg";

const Header: React.FC = () => {
  return (
    <section className="h-[70px] 2xl:h-[80px] px-2 lg:px-4 xl:px-6 2xl:px-8 3xl:px-10 bg-neutral-100 flex items-center">
      <img src={Logo} alt="Cardify" />
      {/* 按鈕操作區 */}
      <div className="flex-1 flex justify-end items-center gap-5">
        <Button type="primary">Log in</Button>
        <Button type="text">Sign up</Button>
      </div>
    </section>
  );
};

export default Header;

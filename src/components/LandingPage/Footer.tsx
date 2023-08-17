import React from "react";
import { GithubOutlined } from "@ant-design/icons";

const Footer: React.FC = () => {
  return (
    <section className="bg-[#121212] mt-20 p-9 flex flex-col">
      <div className="text-white font-normal border-0 border-b border-solid border-white flex gap-4 flex-col md:flex-row items-center justify-between text-2xl md:text-lg pb-2">
        <section className="flex gap-2 flex-col md:flex-row items-center">
          <span>Contact us</span>
          <span>Privacy policy</span>
          <span>Terms</span>
          <span>Impressum</span>
        </section>
        <section className="font-light flex gap-2 mb-3 md:mb-0">
          <span>Team members:</span>
          <div className="flex gap-2">
            <GithubOutlined />
            <GithubOutlined />
            <GithubOutlined />
            <GithubOutlined />
            <GithubOutlined />
          </div>
        </section>
      </div>
      <div className="mt-3 flex-center">
        <span className="text-white text-2xl md:text-lg">
          Copyright &copy; Cardify 2023
        </span>
      </div>
    </section>
  );
};

export default Footer;

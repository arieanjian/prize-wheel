import React from "react";
import { Button } from "antd";
// image
import HeroImg from "@/assets/imgs/Hero.svg";

const Hero: React.FC = () => {
  return (
    <section className={`flex-center flex-col md:flex-row justify-around`}>
      <div className="flex flex-col items-center ">
        <h4
          className={`
          w-[320px] lg:w-[400px] xl:w-[650px] 
          m-0 text-center font-bold
          text-3xl sm:text-2xl lg:text-3xl xl:text-5xl 
          font-segoe-script 
          leading-[57px] sm:leading-[80px] lg:leading-[100px] xl:leading-[100px]
        `}
        >
          Break Down Your Tasks <br className="sm:hidden" /> Complete Your
          Project!
        </h4>
        <p className="text-2xl font-normal">Your tasks' best companion.</p>
        <Button className="btn-dark">Get to Start</Button>
      </div>
      <img
        src={HeroImg}
        alt="HeroImg"
        className={`
        w-[300px] md:w-[400px] lg:w-[500px] 
        h-[395px] md:h-[600px] 2xl:h-[700px]
        `}
      />
    </section>
  );
};

export default Hero;

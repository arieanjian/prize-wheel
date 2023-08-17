import React from "react";
// component
import SectionTitle from "./SectionTitle";
import user01 from "@/assets/imgs/user01.svg";

const aa = `"<span class="font-bold">Cardify fosters better project coordination and enhances productivity.</span>
Especially for me can easier to prioritize tasks across different
projects."`;

const UserCard: React.FC = () => (
  <div
    className={`
    w-[360px] h-[490px] box-border mx-10 lg:mx-[90px]
    flex flex-col items-center justify-start p-6
    border border-solid border-[#121212] rounded-md shadow-2xl
    `}
  >
    <img
      // src={new URL(`../../assets/imgs/${info.Title}.svg`, import.meta.url).href}
      src={user01}
      className="w-[65px] h-[80px]"
      alt="user"
    />
    <h5 className="m-0 text-4xl font-medium">Keven H.</h5>
    <p className="m-0 text-2xl text-[#7D7D7D]">Freelance</p>
    <div className="border border-solid border-[#8C8C8C] w-full my-6"></div>

    <span
      className="text-2xl leading-9 font-light"
      dangerouslySetInnerHTML={{ __html: aa }}
    />
  </div>
);

const Slider: React.FC = () => {
  return (
    <section className="mt-20">
      <SectionTitle className=" mb-16">User Evaluation</SectionTitle>
      <UserCard />
    </section>
  );
};

export default Slider;

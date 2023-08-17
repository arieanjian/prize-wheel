import React from "react";
// component
import SectionTitle from "./SectionTitle";
// static file
import Informations from "@/static/Informations";

type InfoCardProps = {
  info: Iinformation;
  direction: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ info, direction }) => (
  <section
    className={`
    w-[320px] md:w-[600px] lg:w-[900px] xl:w-[1260px] 2xl:w-[1460px]
    md:h-[200px] xl:h-[400px] 
    flex justify-between items-center ${direction}
    border border-solid border-[#121212] rounded-md shadow-2xl 
    px-6 md:px-9 py-9 md:py-8
    `}
  >
    <img
      src={new URL(`../../assets/imgs/${info.Title}.svg`, import.meta.url).href}
      className="w-[300px] md:w-[400px] xl:w-[540px] h-[250px] md:h-[200px] xl:h-[360px]"
      alt={info.Title}
    />
    <div className="flex flex-col justify-start sm:w-[565px]">
      <h4 className="m-0 text-4xl sm:text-3xl lg:text-4xl font-medium">
        {info.Title}
      </h4>
      <h5 className="m-0 mt-1 mb-8 text-2xl sm:text-xl lg:text-2xl font-medium text-[#7D7D7D]">
        {info.subTitle}
      </h5>
      <p className="hidden sm:block m-0 md:text-sm lg:text-lg font-normal lg:leading-9">
        {info.context}
      </p>
    </div>
  </section>
);

const Infos: React.FC = () => {
  return (
    <section className="flex flex-col items-center mx-10 lg:mx-[90px] md:mt-20 box-border">
      <SectionTitle>Efficient Project Management Solution</SectionTitle>
      <section className="mt-16 flex flex-col gap-14">
        {Informations.map((info: Iinformation, index) => (
          <InfoCard
            key={info.Title}
            info={info}
            direction={
              index % 2 === 0
                ? "flex-col sm:flex-row"
                : "flex-col sm:flex-row-reverse"
            }
          />
        ))}
      </section>
    </section>
  );
};

export default Infos;

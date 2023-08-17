import React from "react";
import SectionTitle from "./SectionTitle";
// static data
import priceData from "@/static/Prices";

const PriceCard: React.FC<IPrice> = ({
  bgColor,
  title,
  price,
  textColor = "text-white",
  features,
  bottomColor,
}) => {
  // w-[360px] lg:w-[325px] xl:w-[360px]
  // h-[290px] lg:h-[260px] xl:h-[290px]
  return (
    <div
      className={`
      ${bgColor}
      box-border relative rounded-md rounded-br-[70px] p-[7px]
      w-[360px] lg:w-[325px] xl:w-[395px] 
      h-[290px] lg:h-[260px] xl:h-[320px] 
      flex flex-col shrink-0 overflow-hidden`}
    >
      <section className="h-[100px] rounded-md bg-white flex items-center">
        <span
          className={`w-[60px] h-[60px] ${bgColor} ${textColor} flex-center rounded-full ml-5 text-xl font-bold shadow-[0_6px_8px_0px_#00000026]`}
        >
          {title}
        </span>
        <div className="flex-center flex-col flex-1">
          <h3 className="m-0 font-medium text-[32px] xl:text-[42px]">
            {price}
          </h3>
          <span className="font-light text-base text-[#7D7D7D]">
            Per user / month
          </span>
        </div>
      </section>
      <section className="flex-center mt-[7px] h-[170px] rounded-md bg-white">
        <ul className="m-0 p-0 w-[80%] font-medium text-sm xl:text-base ml-8">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>
      <span
        className={`absolute bottom-0 right-0 w-[70px] h-[70px] ${bottomColor}`}
      />
    </div>
  );
};

const Prices: React.FC = () => {
  return (
    <section className="mt-20 px-4 sm:px-0 shrink-0 flex flex-col items-center md:mx-2">
      <SectionTitle className="mb-16">Upgrade Solutions</SectionTitle>
      <div className="flex flex-col lg:flex-row gap-3 xl:gap-6 w-full overflow-x-auto lg:justify-center items-center">
        {priceData.map((data) => (
          <PriceCard
            key={data.title}
            bgColor={data.bgColor}
            title={data.title}
            price={data.price}
            features={data.features}
            bottomColor={data.bottomColor}
          />
        ))}
      </div>
    </section>
  );
};

export default Prices;

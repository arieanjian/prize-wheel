import React from "react";

interface SectionTitleProps {
  className?: string;
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  className = "",
  children,
}) => {
  return (
    <h3
      className={`font-black text-[40px] text-[#121212] text-center font-Roboto m-0 ${className}`}
    >
      {children}
    </h3>
  );
};

export default SectionTitle;

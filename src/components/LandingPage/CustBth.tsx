/* eslint-disable react-refresh/only-export-components */
import React, { ButtonHTMLAttributes } from "react";
import HocWrapper from "@/HOC/HOCWrapper";

interface ITestbtn extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  cls?: string;
  isLoading?: boolean;
}

const CustBth: React.FC<ITestbtn> = (props) => {
  const { cls, ...rest } = props;

  return (
    <button className={cls} {...rest}>
      {props.children}
    </button>
  );
};

export default HocWrapper(CustBth);

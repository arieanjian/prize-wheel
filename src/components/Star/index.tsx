import React from "react";

import { StarOutlined, StarFilled } from "@ant-design/icons";

interface Iprops extends React.HTMLProps<HTMLSpanElement> {
  isFill: boolean;
}

const BASIC_CLASS = "text-md text-[#FF4D4F]";

const Star: React.FC<Iprops> = ({ isFill, ...rest }) => (
  <span className="flex items-center transition-all hover:scale-125" {...rest}>
    {isFill ? (
      <StarFilled className={BASIC_CLASS} />
    ) : (
      <StarOutlined className={BASIC_CLASS} />
    )}
  </span>
);

export default Star;

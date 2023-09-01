/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CustBth from "./CustBth";

const Test: React.FC = () => {
  const [s_show, set_s_show] = useState(false);
  return (
    <div className="flex gap-4">
      <CustBth cls="bg-red-500">TEST01</CustBth>
      <CustBth cls="bg-blue-500" onClick={() => set_s_show(!s_show)}>
        TEST02
      </CustBth>
      {s_show && <CustBth cls="bg-blue-500">TEST03</CustBth>}
    </div>
  );
};

export default Test;

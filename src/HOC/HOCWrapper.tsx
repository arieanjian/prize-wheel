import React, { useEffect } from "react";

function HocWrapper<P>(WrappedComponent: React.ComponentType<P>) {
  return function Wrapper(props: JSX.IntrinsicAttributes & P & IHocWrapper) {
    useEffect(() => {
      console.log("first render");
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default HocWrapper;

import React from "react";

function Container({ children }: { children: React.JSX.Element[] | React.JSX.Element }) {
  return <div className="px-3 md:px-8 lg:px-16">{children}</div>;
}

export default Container;

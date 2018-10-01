import React from "react";

export const Col = ({ size, children }) => (
  <div className={size}>
    {children}
  </div>
);

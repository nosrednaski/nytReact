import React from "react";

export const FormBtn = props => (
  <button {...props} className="submit-btn">
    {props.children}
  </button>
);

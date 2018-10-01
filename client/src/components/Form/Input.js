import React from "react";
import "./form.css";

export const Input = props => (
  <div className="row">
    <div >
      <input  {...props} />
    </div>
  </div>
);

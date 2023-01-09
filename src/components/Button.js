import React from "react";
import classNames from "classnames";

const Button = ({ children, className, ...rest }) => (
  <button className={classNames("btn", className)} {...rest}>
    {children}
  </button>
);

export default Button;

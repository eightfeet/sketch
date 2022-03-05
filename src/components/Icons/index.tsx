import classNames from "classnames";
import React, { HtmlHTMLAttributes } from "react";
import s from "./Icon.module.scss";

const Index: React.FC<HtmlHTMLAttributes<HTMLSpanElement>> = ({
  children,
  className,
  ...other
}) => {
  return (
    <span className={classNames(s.icon, className)} {...other}>
      {children}
    </span>
  );
};

export default Index;

import classNames from "classnames";
import React, { HtmlHTMLAttributes } from "react";
import s from "./Icon.module.scss";

interface IconProps {
  type?: "dark" | "light";
}

const Index: React.FC<HtmlHTMLAttributes<HTMLSpanElement> & IconProps> = ({
  children,
  className,
  type = "dark",
  ...other
}) => {
  const classStr = classNames(s.icon, s[type]);
  return (
    <span className={classNames(s.iconwrap, className)} {...other}>
      <span className={classStr}>{children}</span>
    </span>
  );
};

export default Index;

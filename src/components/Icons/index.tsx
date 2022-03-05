import classNames from "classnames";
import React, { HtmlHTMLAttributes } from "react";
import s from "./Icon.module.scss";

interface IconProps {
  type?: "dark" | "light";
  tip?: string | number;
}

const Index: React.FC<HtmlHTMLAttributes<HTMLSpanElement> & IconProps> = ({
  children,
  className,
  type = "dark",
  tip,
  ...other
}) => {
  const classStr = classNames(s.icon, s[type]);
  return (
    <span className={classNames(s.iconwrap, className)} {...other}>
      <span className={classStr}>{children}</span>
      {tip ? <span className={s.tip}>{tip}</span> : null}
    </span>
  );
};

export default Index;

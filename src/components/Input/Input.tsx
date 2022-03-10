import classNames from "classnames";
import React from "react";
import s from "./Input.module.scss";

interface Props {}

const Input: React.FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  style,
  ...other
}) => {
  return (
    <input
      {...other}
      className={classNames(s.input, className)}
      style={style}
    />
  );
};

export default Input;

import classNames from "classnames";
import React from "react";
import s from "./Input.module.scss";

interface Props {}

const Input: React.FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  min,
  max,
  ...other
}) => {
  return <input {...other} className={classNames(s.input, className)} />;
};

export default Input;

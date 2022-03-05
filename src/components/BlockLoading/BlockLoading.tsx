import classNames from "classnames";
import React, { HTMLAttributes } from "react";
import s from "./BlockLoading.module.scss";

const BlockLoading: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={classNames(s.root, className)} {...props} />;
};

export default BlockLoading;

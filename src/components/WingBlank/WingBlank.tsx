import classNames from "classnames";
import React from "react";
import s from "./WingBlank.module.scss";

/**
 * 默认ui两翼留白25px
 * @returns
 */
const WingBlank: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...other
}) => {
  return (
    <div className={classNames(s.root, className)} {...other}>
      {children}
    </div>
  );
};

export default WingBlank;

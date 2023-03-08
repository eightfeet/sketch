import React from "react";
import Space from "../Space";
import WingBlank from "../WingBlank";
import s from "./NavigateBar.module.scss";

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const NavigateBar: React.FC<Props> = ({ children, left, right }) => {
  return (
    <div className={s.menubox}>
      <Space />
      <WingBlank className={s.menu}>
        <div className={s.menu}>{left}</div>
        <div className={s.title}>{children}</div>
        <div className={s.menu}>{right}</div>
      </WingBlank>
      <Space />
    </div>
  );
};

export default NavigateBar;

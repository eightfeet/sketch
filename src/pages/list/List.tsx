import React from "react";
import Icons from "~/components/Icons";
import ArrowLeft from "~/components/Icons/ArrowLeft";
import Filter from "~/components/Icons/Filter";
import IModels from "~/components/Icons/IModels";
import Space from "~/components/Space";
import WingBlank from "~/components/WingBlank";
import s from "./List.module.scss";

interface Props {}

const List: React.FC<Props> = ({}) => {
  return (
    <div className={s.root}>
      <WingBlank>
        <Space />
        <Icons type="light">
          <ArrowLeft />
        </Icons>
        <Icons type="light">
          <Filter />
        </Icons>
        <Icons type="light">
          <IModels />
        </Icons>
      </WingBlank>
    </div>
  );
};

export default List;

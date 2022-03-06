import React from "react";
import { useNavigate } from "react-router-dom";
import Icons from "~/components/Icons";
import ArrowLeft from "~/components/Icons/ArrowLeft";
import Filter from "~/components/Icons/Filter";
import Selected from "~/components/Icons/Selected";
import NavigateBar from "~/components/NavigateBar";
import s from "./Contents.module.scss";

interface Props {}

const Contents: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  return (
    <div className={s.root}>
      <NavigateBar
        left={
          <Icons type="dark" tip="50" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Icons>
        }
        right={
          <Icons type="dark">
            <Filter />
          </Icons>
        }
      >
        选择模特
      </NavigateBar>
      <Icons type="dark">
        <Selected />
      </Icons>
    </div>
  );
};

export default Contents;

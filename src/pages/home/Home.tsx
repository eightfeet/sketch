import React, { useCallback } from "react";
import s from "./Home.module.scss";

import { useNavigate } from "react-router-dom";
import WingBlank from "~/components/WingBlank";
import Swiper from "~/components/Swiper";
import img from "./show.jpg";
import img2 from "./show2.jpeg";
import Icons from "~/components/Icons";
import LiseCard from "~/components/Icons/LiseCard";
import ArrowRight from "~/components/Icons/ArrowRight";
import SketchTimer from "./components/SketchTimer";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import dayjs from "dayjs";
import classNames from "classnames";
import { message } from "~/components/Modal";

interface Props {}

const Home: React.FC<Props> = () => {
  const { pictureList, keepingTime } = useSelector(
    (state: RootState) => state
  ).dynamics;
  const navigate = useNavigate();

  const onPlay = useCallback(() => {
    if (pictureList.length && keepingTime) {
      navigate("/models");
    } else if (!pictureList.length) {
      message({
        title: "提示",
        content: "请选择图片",
        onOk: (model) => {
          model.hide(false);
          navigate("/models");
        },
      });
    }
  }, [keepingTime, navigate, pictureList.length]);

  return (
    <div className={s.root}>
      <WingBlank className={s.swiperwrap}>
        <Swiper
          className={s.swiper}
          data={[{ src: img }, { src: img2 }]}
          autoplay
          loop
          effect="fade"
        />
      </WingBlank>
      <WingBlank className={s.feature}>
        <div className={s.menu}>
          <SketchTimer />
          <Icons tip={pictureList.length} onClick={() => navigate("/models")}>
            <LiseCard />
          </Icons>
          <Icons
            className={classNames(
              pictureList.length && keepingTime ? null : s.opacity
            )}
            onClick={onPlay}
          >
            <ArrowRight />
          </Icons>
        </div>
      </WingBlank>

      <WingBlank className={s.space}>
        {dayjs}
        <div className={s.info}>
          速写预计持续
          {dayjs
            .duration({
              minutes: pictureList.length * keepingTime,
            })
            .asHours()
            .toFixed(2)}
          小时
        </div>
      </WingBlank>
    </div>
  );
};

export default Home;

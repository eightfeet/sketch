import React, { useCallback } from "react";
import s from "./Home.module.scss";

import { useNavigate } from "react-router-dom";
import WingBlank from "~/components/WingBlank";
import Swiper from "~/components/Swiper";
import img from "./show.jpeg";
import img3 from "./show3.jpeg";
import img4 from "./show4.jpeg";
import img5 from "./show5.jpeg";
import img6 from "./show6.jpeg";
import img7 from "./show7.jpeg";
import img8 from "./show8.jpeg";
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
      navigate("/view", {
        replace: true,
      });
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

  const reset = useCallback(() => {
    localStorage.removeItem("persist:sketch-persist");
    window.location.reload();
  }, []);

  return (
    <div className={s.root}>
      <WingBlank className={s.swiperwrap}>
        <Swiper
          className={s.swiper}
          keyboard
          data={[
            { src: img },
            { src: img3 },
            { src: img4 },
            { src: img5 },
            { src: img6 },
            { src: img7 },
            { src: img8 },
          ]}
          autoplay
          loop
          effect="fade"
        />
      </WingBlank>
      <WingBlank className={s.feature}>
        <div className={s.menu}>
          <SketchTimer />
          <Icons
            tip={pictureList.length}
            onClick={() => navigate("/models", { replace: true })}
          >
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
            .duration(
              dayjs()
                .add((keepingTime || 0) * pictureList.length, "minute")
                .diff(dayjs())
            )
            .format("HH时mm分ss秒")}
        </div>
        <div className={s.clear} onClick={reset}>
          重制应用
        </div>
      </WingBlank>
    </div>
  );
};

export default Home;

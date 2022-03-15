import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.scss";
import SwiperCore, { Autoplay, EffectFade, Keyboard, Lazy, Zoom } from "swiper";
import s from "./View.module.scss";
import Pic from "~/components/Pic";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { arrivedTime, ShowCountDown } from "~/core/utils";
import Icons from "~/components/Icons";
import ArrowLeft from "~/components/Icons/ArrowLeft";
import { useNavigate } from "react-router-dom";
import SketchTimer from "../home/components/SketchTimer";
import SuiJi from "~/components/Icons/SuiJi";
import AnXu from "~/components/Icons/AnXU";
import { ModelType } from "~/types/models";

SwiperCore.use([Autoplay, EffectFade, Lazy, Keyboard, Zoom]);

interface Props {}

function setPic(arr: ModelType[], random: boolean) {
  if (!random) return arr;
  const data = [...arr];
  return data.sort(function () {
    return Math.random() - 0.5;
  });
}

const renderTime =
  (index: number, length: number) =>
  ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      return <div className={s.timercount}>next</div>;
    }

    return (
      <div className={s.timercount}>
        <div className={s.ind}>
          {(index % length) + 1}/{length}
        </div>
        <div>{ShowCountDown(arrivedTime(remainingTime))}</div>
      </div>
    );
  };

const View: React.FC<Props> = ({}) => {
  const { pictureList, keepingTime } = useSelector(
    (state: RootState) => state.dynamics
  );
  const [suiji, setSuiji] = useState(false);
  const [initTime, setInitTime] = useState(true);
  const [data, setData] = useState<ModelType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentData = setPic(pictureList, suiji);
    setData([...currentData]);
  }, [suiji, pictureList]);

  const renderPic = useCallback(
    () =>
      data?.map(({ imgUrl, from }, index) => {
        const W = parseInt(imgUrl.split("&")[1], 0);
        const H = parseInt(imgUrl.split("&")[2], 0);
        const WW = window.innerWidth;
        const WH = window.innerHeight;
        const ScaleW = (W / H) * WH;
        const ScaleH = (H / W) * WW;
        let Width;
        let Height;
        if (ScaleW >= WW) {
          Width = "auto";
          Height = ScaleH;
        }

        if (ScaleH >= WH) {
          Width = ScaleW;
          Height = "auto";
        }

        let picPath = imgUrl;
        if (from === "md1")
          picPath = `${process.env.REACT_APP_MPATH_M1}models/${picPath}`;
        if (from === "md2")
          picPath = `${process.env.REACT_APP_MPATH_M2}${picPath}`;
        if (from === "md3")
          picPath = `${process.env.REACT_APP_MPATH_M3}${picPath}`;

        const imgStyle: React.CSSProperties = {
          width: Width,
          height: Height,
        };

        return (
          <SwiperSlide key={`${suiji}${picPath}`}>
            <Pic
              className={`swiper-zoom-container ${s.pic}`}
              imgStyle={imgStyle}
              src={picPath}
            />
          </SwiperSlide>
        );
      }),
    [data, suiji]
  );

  const swiperRef = React.useRef<SwiperCore>(null);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const handleSlideChange = useCallback((currentSwiper: SwiperCore) => {
    (swiperRef as any).current = currentSwiper;
    setTimeout(() => {
      setInitTime(true);
    }, 1000);
    setInitTime(false);
  }, []);

  const handleSuiJi = useCallback(() => {
    setSuiji(!suiji);
    setTimeout(() => {
      setInitTime(true);
    }, 100);
    setInitTime(false);
  }, [suiji]);

  return (
    <div className={s.root} key={"wIsx"}>
      <div className={s.back}>
        <Icons type="dark" onClick={() => navigate("/", { replace: true })}>
          <ArrowLeft />
        </Icons>

        <Icons type="dark" className={s.icon} onClick={handleSuiJi}>
          {!suiji ? <SuiJi /> : <AnXu />}
        </Icons>
      </div>
      <Swiper
        keyboard
        zoom={{
          maxRatio: 5,
        }}
        lazy={{
          enabled: true,
          loadPrevNext: true,
        }}
        loop
        onSlideChange={handleSlideChange}
      >
        {renderPic()}
      </Swiper>
      <div className={s.timer}>
        {initTime ? (
          <SketchTimer>
            <CountdownCircleTimer
              isPlaying
              duration={(keepingTime || 0) * 60}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[60, 30, 20, 0]}
              trailColor={"rgba(144,144,144,0.5)"}
              size={80}
              strokeWidth={3}
              onComplete={handleNext}
            >
              {renderTime(
                swiperRef.current?.activeIndex || 0,
                pictureList?.length
              )}
            </CountdownCircleTimer>
          </SketchTimer>
        ) : null}
      </div>
    </div>
  );
};

export default View;

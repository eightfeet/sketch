import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.scss";
import SwiperCore, { Autoplay, EffectFade, Lazy } from "swiper";
import s from "./View.module.scss";
import Pic from "~/components/Pic";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { arrivedTime, ShowCountDown } from "~/core/utils";
import Icons from "~/components/Icons";
import ArrowLeft from "~/components/Icons/ArrowLeft";
import { useNavigate } from "react-router-dom";

SwiperCore.use([Autoplay, EffectFade, Lazy]);

interface Props {}

const renderTime =
  (index: number, length: number) =>
  ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      return <div className={s.timercount}>next</div>;
    }

    return (
      <div className={s.timercount}>
        <div className={s.ind}>
          {index}/{length}
        </div>
        <div>{ShowCountDown(arrivedTime(remainingTime))}</div>
      </div>
    );
  };

const View: React.FC<Props> = ({}) => {
  const { pictureList, keepingTime } = useSelector(
    (state: RootState) => state.dynamics
  );
  const [wIsx, setWIsx] = useState<boolean>(
    window.innerWidth >= window.innerHeight
  );
  const [initTime, setInitTime] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth >= window.innerHeight) {
        setWIsx(true);
      } else {
        setWIsx(false);
      }
    };
    window.addEventListener("resize", fn, false);
    return () => {
      window.removeEventListener("resize", fn);
    };
  }, []);

  console.log("wIsx", wIsx);

  const renderPic = useCallback(
    () =>
      pictureList?.map(({ imgUrl }) => {
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

        const imgStyle: React.CSSProperties = {
          width: Width,
          height: Height,
        };

        return (
          <SwiperSlide>
            <Pic
              className={s.pic}
              imgStyle={imgStyle}
              src={`https://www.eightfeet.cn/md2/${imgUrl}`}
            />
          </SwiperSlide>
        );
      }),
    [pictureList]
  );

  const swiperRef = React.useRef<SwiperCore>(null);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const handleSlideChange = useCallback((currentSwiper: SwiperCore) => {
    console.log(currentSwiper.activeIndex);

    (swiperRef as any).current = currentSwiper;
    setTimeout(() => {
      setInitTime(true);
    }, 1000);
    setInitTime(false);
  }, []);

  return (
    <div className={s.root}>
      <div className={s.back}>
        <Icons type="dark" onClick={() => navigate("/", { replace: true })}>
          <ArrowLeft />
        </Icons>
      </div>
      <Swiper loop onSlideChange={handleSlideChange}>
        {renderPic()}
      </Swiper>
      <div className={s.timer}>
        {initTime ? (
          <CountdownCircleTimer
            isPlaying
            duration={keepingTime * 60}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[60, 30, 20, 0]}
            trailColor={"rgba(144,144,144,0.5)"}
            size={80}
            strokeWidth={3}
            onComplete={handleNext}
          >
            {renderTime(swiperRef.current?.activeIndex || 0, 40)}
          </CountdownCircleTimer>
        ) : null}
      </div>
    </div>
  );
};

export default View;

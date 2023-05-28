import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.scss";
import SwiperCore, { Autoplay, EffectFade, Keyboard, Lazy, Zoom } from "swiper";
import s from "./View.module.scss";
import Pic from "~/components/Pic";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "~/store";
import Icons from "~/components/Icons";
import ArrowLeft from "~/components/Icons/ArrowLeft";
import { useNavigate } from "react-router-dom";
import SuiJi from "~/components/Icons/SuiJi";
import AnXu from "~/components/Icons/AnXU";
import { ModelType } from "~/types/models";
import Timer from "./components/Timer";
import SketchTimer from "../../components/SketchTimer";
import Video from "~/components/Video";
import { getImagePath } from "~/core/utils";
import ReactAudioPlayer from "react-audio-player";
import Painter from "~/components/Painter";
import Pen from "~/components/Icons/Pen";
import classNames from "classnames";

SwiperCore.use([Autoplay, EffectFade, Lazy, Keyboard, Zoom]);

interface Props {}

function setPic(arr: ModelType[], random: boolean) {
  if (!random) return arr;
  const data = [...arr];
  return data.sort(function () {
    return Math.random() - 0.5;
  });
}

const View: React.FC<Props> = () => {
  const { pictureList } = useSelector((state: RootState) => state.dynamics);
  const { lineColor, lineWidth, bgColor, bgAlph } = useSelector(
    (state: RootState) => state.runtime
  );

  const [suiji, setSuiji] = useState(false);
  const [showPainter, setShowPainter] = useState(false);
  const [initTime, setInitTime] = useState(true);
  const [data, setData] = useState<ModelType[]>([]);
  const navigate = useNavigate();
  const player = useRef<ReactAudioPlayer>(null);
  const { set } = useDispatch<RootDispatch>().runtime;
  const [wranTime, setWranTime] = useState(false);

  useEffect(() => {
    const currentData = setPic(pictureList, suiji);
    setData([...currentData]);
  }, [suiji, pictureList]);

  const renderPic = useCallback(
    () =>
      data?.map((item, index) => {
        const { imgUrl, from } = item;
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

        const { root } = getImagePath(item);

        const imgStyle: React.CSSProperties = {
          width: Width,
          height: Height,
        };

        return (
          <SwiperSlide key={`${suiji}${imgUrl}`}>
            {from !== "md4" ? (
              <Pic
                className={`swiper-zoom-container ${s.pic}`}
                imgStyle={imgStyle}
                src={`${root}${imgUrl}`}
              />
            ) : (
              <div className={`swiper-zoom-container`}>
                <Video style={imgStyle} picPath={`${root}${imgUrl}`} />
              </div>
            )}
          </SwiperSlide>
        );
      }),
    [data, suiji]
  );

  const swiperRef = React.useRef<SwiperCore>(null);

  const handleSlideChange = useCallback((currentSwiper: SwiperCore) => {
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

  const onInit = useCallback((currentSwiper) => {
    (swiperRef as any).current = currentSwiper;
  }, []);

  const handleComplete = useCallback(() => {
    setWranTime(false);
    swiperRef.current?.slideNext();
  }, []);

  const onUpdate = useCallback(
    (remainingTime: number) => {
      if (remainingTime === 4) {
        player.current?.audioEl.current?.play();
        setWranTime(true);
      }
      if (remainingTime < 4) {
        !wranTime && setWranTime(false);
      }
      if (remainingTime > 4) {
        wranTime && setWranTime(true);
      }
    },
    [wranTime]
  );

  const onShowPainter = useCallback(() => {
    setShowPainter(true);
  }, []);

  const onHidePainter = useCallback(() => {
    setShowPainter(false);
  }, []);

  const onChangePainter = useCallback(
    (valus: { [key: string]: any }) => {
      for (const key in valus) {
        if (Object.prototype.hasOwnProperty.call(valus, key)) {
          const value = valus[key];
          (value || value === 0) && set({ name: key, value });
        }
      }
    },
    [set]
  );

  return (
    <>
      <Painter
        visible={showPainter}
        onClose={onHidePainter}
        onChange={onChangePainter}
        lineColor={lineColor}
        lineWidth={lineWidth}
        bgColor={bgColor}
        bgAlph={bgAlph}
      />
      <div className={s.root} key={"wIsx"}>
        <ReactAudioPlayer ref={player} src="./warning.mp3" />
        <div className={s.back} style={{ opacity: showPainter ? 0 : 1 }}>
          <Icons type="dark" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Icons>

          <Icons type="dark" className={s.icon} onClick={handleSuiJi}>
            {!suiji ? <SuiJi /> : <AnXu />}
          </Icons>

          <Icons type="dark" className={s.icon} onClick={onShowPainter}>
            <Pen />
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
          onInit={onInit}
        >
          {renderPic()}
        </Swiper>
        <div
          className={classNames(s.timer, { [s.timewran]: wranTime })}
          style={{ opacity: showPainter ? 0 : 1 }}
        >
          <SketchTimer>
            {initTime ? (
              <Timer
                onComplete={handleComplete}
                onUpdate={onUpdate}
                info={`${
                  ((swiperRef.current?.activeIndex || 0) %
                    pictureList?.length) +
                  1
                }/${pictureList?.length}`}
                wranTime={wranTime}
              />
            ) : (
              <span></span>
            )}
          </SketchTimer>
        </div>
      </div>
    </>
  );
};

export default View;

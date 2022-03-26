import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.scss";
import SwiperCore, { Autoplay, EffectFade, Keyboard, Lazy, Zoom } from "swiper";
import s from "./View.module.scss";
import Pic from "~/components/Pic";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import Icons from "~/components/Icons";
import ArrowLeft from "~/components/Icons/ArrowLeft";
import { useNavigate } from "react-router-dom";
import SuiJi from "~/components/Icons/SuiJi";
import AnXu from "~/components/Icons/AnXU";
import { ModelType } from "~/types/models";
import Timer from "./components/Timer";
import dayjs from "dayjs";
import SketchTimer from "../home/components/SketchTimer";

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
  const [suiji, setSuiji] = useState(false);
  const [initTime, setInitTime] = useState(true);
  const [data, setData] = useState<ModelType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentData = setPic(pictureList, suiji);
    setData([...currentData]);
  }, [suiji, pictureList]);

  const vplay: React.MouseEventHandler<HTMLVideoElement> = useCallback((e) => {
    (e.target as any).play();
  }, []);

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
        if (from === "md4")
          picPath = `${process.env.REACT_APP_MPATH_M4}${picPath}`.replace(
            ".png",
            ".mp4"
          );
        console.log(picPath);

        const imgStyle: React.CSSProperties = {
          width: Width,
          height: Height,
        };

        return (
          <SwiperSlide key={`${suiji}${picPath}`}>
            {from !== "md4" ? (
              <Pic
                className={`swiper-zoom-container ${s.pic}`}
                imgStyle={imgStyle}
                src={picPath}
              />
            ) : (
              <div className={`swiper-zoom-container`}>
                <div className={s.video}>
                  <video
                    style={imgStyle}
                    controls={false}
                    loop
                    playsInline
                    onClick={vplay}
                  >
                    <source src={picPath} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </SwiperSlide>
        );
      }),
    [data, suiji, vplay]
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

  const handleComplete = useCallback(() => swiperRef.current?.slideNext(), []);

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
        onInit={onInit}
      >
        {renderPic()}
      </Swiper>
      <div className={s.timer}>
        <SketchTimer>
          {initTime ? (
            <Timer
              onComplete={handleComplete}
              frizeTime={dayjs()}
              info={`${
                ((swiperRef.current?.activeIndex || 0) % pictureList?.length) +
                1
              }/${pictureList?.length}`}
            />
          ) : (
            <span></span>
          )}
        </SketchTimer>
      </div>
    </div>
  );
};

export default View;

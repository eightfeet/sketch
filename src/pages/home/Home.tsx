import React from "react";
import s from "./Home.module.scss";

import pages from "~/Routers/pages";
import { useNavigate } from "react-router-dom";
import WingBlank from "~/components/WingBlank";
import Button from "~/components/Button";
import Swiper from "~/components/Swiper";
import img from "./show.jpg";
import img2 from "./show2.jpeg";
import Clock from "~/components/Icons/Clock";
import Icons from "~/components/Icons";
import ClockFill from "~/components/Icons/ClockFill";
import LiseCard from "~/components/Icons/LiseCard";
import Space from "~/components/Space";
import ArrowRight from "~/components/Icons/ArrowRight";

interface Props {}

const Home: React.FC<Props> = () => {
  const navigate = useNavigate();
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
        <div>
          <div className={s.menu}>
            <Icons>
              <Clock />
            </Icons>
            <Icons>
              <LiseCard />
            </Icons>
            <Icons className={s.opacity}>
              <ArrowRight />
            </Icons>
          </div>
        </div>
      </WingBlank>
      <WingBlank className={s.space} />
    </div>
  );
};

export default Home;

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
        <h3>sketck</h3>
      </WingBlank>
    </div>
  );
};

export default Home;

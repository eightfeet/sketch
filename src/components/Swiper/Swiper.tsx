import React, { useCallback } from "react";
import {
  Swiper as Sw,
  SwiperSlide,
  SwiperProps,
} from "swiper/react/swiper-react";
import "swiper/swiper.scss";
import Pic from "../Pic";
import s from "./Swiper.module.scss";
import SwiperCore, { Autoplay, EffectFade } from "swiper";

SwiperCore.use([Autoplay, EffectFade]);

interface DataItem {
  /**图片地址 */
  src: string;
  /**图片名称 */
  name?: string;
  /**图片链接地址 */
  path?: string;
}

interface Props {
  onClickItem?: (dataItem: DataItem) => void;
  data: DataItem[];
}

const Swiper: React.FC<Props & SwiperProps> = ({
  onClickItem,
  data = [],
  ...other
}) => {
  const handleOnclick = useCallback(
    (item: DataItem) => () => {
      if (typeof onClickItem === "function") {
        onClickItem(item);
      }
    },
    [onClickItem]
  );

  return (
    <Sw autoplay {...other}>
      {data.map((item, index) => (
        <SwiperSlide key={`${index}${item.src}`}>
          <Pic className={s.pic} src={item.src} onClick={handleOnclick(item)} />
        </SwiperSlide>
      ))}
    </Sw>
  );
};

export default Swiper;

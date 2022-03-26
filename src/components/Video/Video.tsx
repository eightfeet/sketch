import React, { useCallback, useRef, useState } from "react";
import Pic from "../Pic";
import s from "./Video.module.scss";

interface Props {
  style: React.CSSProperties;
  picPath: string;
}

const Video: React.FC<Props> = ({ style, picPath }) => {
  const vref = useRef<any>();
  const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(true);
  const vplay: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setPlay(true);
      if (pause) {
        vref.current.play();
      } else {
        vref.current.pause();
      }
      setPause(!pause);
    },
    [pause]
  );

  return (
    <div className={s.video} onClick={vplay}>
      {!play ? (
        <Pic
          imgStyle={style}
          className={s.pic}
          src={picPath.replace("cn/md4", "cn/md4/small")}
        />
      ) : null}
      <video
        ref={vref}
        style={{ ...style, display: play ? "block" : "none" }}
        controls={false}
        loop
        playsInline
      >
        <source src={picPath.replace(".png", ".mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;

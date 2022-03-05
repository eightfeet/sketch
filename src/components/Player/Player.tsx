import classNames from "classnames";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import loadScript from "~/core/loadScript";
import loadStylesheet from "~/core/loadStylesheet";
import BlockLoading from "../BlockLoading";
import s from "./Player.module.scss";
declare const TCPlayer: any;

interface Props {
  courseId: number;
  src?: string;
  appID?: string;
  fileID?: string;
  /**true	是否显示播放器的控制栏 */
  controls?: boolean;
  /**设置封面图片完整地址（如果上传的视频已生成封面图，优先使用生成的封面图，详细请参见 云点播 - 管理视频）。 */
  poster?: string;
  /**false	是否自动播放 */
  autoplay?: boolean;
  /**false	是否循环播放 */
  loop?: boolean;
  /**false	是否静音播放。 */
  muted?: boolean;
  /**auto	是否需要预加载，有3个属性"auto"，"meta"和"none" ，移动端由于系统限制，设置 auto 无效。 */
  preload?: "auto" | "meta" | "none";
  /**true	是否显示封面。 */
  posterImage?: boolean;
  /**是否显示居中的播放按钮（浏览器劫持嵌入的播放按钮无法去除）。 */
  bigPlayButton?: boolean;
}

const Player: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  src,
  className,
  appID,
  fileID,
  controls = true,
  poster,
  autoplay,
  loop,
  muted,
  preload,
  posterImage,
  bigPlayButton,
  courseId,
  ...other
}) => {
  const [isReady, setIsReady] = useState(false);
  const player = useRef<any>();
  useEffect(() => {
    if ((src || appID) && fileID) {
      loadStylesheet("./VideoSdk/tcplayer.min.css");
      const fn = async () => {
        try {
          await loadScript("./VideoSdk/libs/hls.min.0.13.2m.js");
          await loadScript("./VideoSdk/tcplayer.v4.3.0.min.js");
          const tcPlay = TCPlayer("player-container-id", {
            fileID,
            appID,
            controls,
            poster,
            autoplay,
            loop,
            muted,
            preload,
            posterImage,
            bigPlayButton,
            plugin: {
              ProgressMarker: true,
            },
          });
          if (src) tcPlay.src(src);
          tcPlay.on("ready", () => {
            player.current = tcPlay;
            setIsReady(true);
          });
          tcPlay.on("play", () => {
            tcPlay.exitFullscreen();
          });
        } catch (error) {
          console.error(error);
        }
      };
      fn();
    }
    return () => {
      player.current?.dispose();
      setIsReady(false);
    };
  }, [
    appID,
    autoplay,
    bigPlayButton,
    controls,
    fileID,
    loop,
    muted,
    poster,
    posterImage,
    preload,
    src,
  ]);

  return (
    <div className={classNames(s.root, className)} {...other}>
      {!isReady ? <BlockLoading className={s.isread} /> : null}
      <div className={s.video}>
        <video
          id="player-container-id"
          preload="auto"
          webkit-playsinline=""
          playsInline
        />
      </div>
    </div>
  );
};

export default Player;

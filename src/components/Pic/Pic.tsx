import classNames from "classnames";
import React, { HTMLAttributes, useRef, useState } from "react";
import useIntersectionObserver, {
  Args,
} from "~/hooks/useIntersecitionObserver";
import BlockLoading from "../BlockLoading";
import defaultImg from "./default.svg";
import s from "./Pic.module.scss";

interface Props {
  src?: string;
  alt?: string;
  defaultPic?: string;
  width?: number;
  height?: number;
  top?: number;
  imgStyle?: React.CSSProperties;
  lazy?: boolean | number;
}

const Pic: React.FC<Props & HTMLAttributes<HTMLDivElement> & Args> = ({
  className,
  style,
  alt = "",
  defaultPic,
  src,
  height,
  width,
  top,
  imgStyle,
  lazy,
  threshold,
  root,
  rootMargin,
  freezeOnceVisible,
  ...other
}) => {
  const first = useRef<HTMLDivElement>(null);

  const { isIntersecting } =
    useIntersectionObserver(first, {
      threshold,
      root,
      rootMargin,
      freezeOnceVisible,
    }) || {};

  const styles = {
    width,
    height,
    ...(style || {}),
  };

  let picLink = lazy && !isIntersecting ? null : src;

  const [isErrorLoaded, setIsErrorLoaded] = useState<boolean>();
  const [loaded, setLoaded] = useState<boolean>();
  return (
    <div
      ref={first}
      className={classNames(s.root, className)}
      style={styles}
      {...other}
    >
      {!picLink || isErrorLoaded ? (
        <img src={defaultPic || defaultImg} alt={alt} className={s.default} />
      ) : null}
      {/**加载时显示loading */}
      {picLink && isErrorLoaded === undefined ? (
        loaded === true ? null : (
          <BlockLoading className={s.loading} />
        )
      ) : null}
      {picLink && !isErrorLoaded ? (
        <img
          key={picLink}
          className={s.pic}
          onError={() => {
            setIsErrorLoaded(true);
            setLoaded(false);
          }}
          onLoad={() => setLoaded(true)}
          src={picLink}
          alt={alt}
          style={imgStyle}
        />
      ) : null}
    </div>
  );
};

export default Pic;

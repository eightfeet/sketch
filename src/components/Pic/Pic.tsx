import classNames from "classnames";
import React, { HTMLAttributes, useState } from "react";
import BlockLoading from "../BlockLoading";
import defaultImg from "./default.png";
import s from "./Pic.module.scss";

interface Props {
  src?: string;
  alt?: string;
  defaultPic?: string;
}

const Pic: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  className,
  style,
  alt = "",
  defaultPic,
  src,
  ...other
}) => {
  const [isErrorLoaded, setIsErrorLoaded] = useState<boolean>();
  const [loaded, setLoaded] = useState<boolean>();
  return (
    <div className={classNames(s.root, className)} {...other}>
      {/**加载时显示loading */}
      {src && isErrorLoaded === undefined ? (
        loaded === true ? null : (
          <BlockLoading className={s.loading} />
        )
      ) : null}
      {!src || isErrorLoaded ? (
        <img src={defaultPic || defaultImg} alt={alt} className={s.default} />
      ) : (
        <img
          className={s.pic}
          onError={() => setIsErrorLoaded(true)}
          onLoad={() => setLoaded(true)}
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
};

export default Pic;

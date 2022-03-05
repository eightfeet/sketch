import classNames from "classnames";
import React from "react";
import s from "./Space.module.scss";

interface Props {
  span?: number;
}
/**
 * 默认ui间距30px
 * @returns
 */
const Space: React.FC<React.HTMLAttributes<HTMLDivElement> & Props> = ({
  className,
  span,
  ...other
}) => {
  return (
    <div>
      <div
        className={classNames(s.root, className, {
          [s.double]: span === 2,
          [s.triple]: span === 3,
        })}
        {...other}
      />
    </div>
  );
};

export default Space;

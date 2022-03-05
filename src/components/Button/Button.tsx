import classNames from "classnames";
import React, { useCallback } from "react";
import { trackEvent } from "~/core/tracking";
import s from "./Button.module.scss";

interface ButtonProps {
  /**按钮类型 */
  type?: "dark" | "light";
  /**尺寸 */
  size?: "normal" | "mini" | "large";
  htmlType?: "submit" | "reset" | "button" | undefined;
  block?: boolean;
  disabled?: boolean;
  trackEventTag?: string[];
}

const Button: React.FC<
  ButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = ({
  className,
  children,
  type = "dark",
  size = "normal",
  htmlType,
  block,
  disabled,
  onClick,
  trackEventTag,
  ...other
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (typeof onClick === "function") {
        onClick(e);
        if (trackEventTag) {
          trackEvent(trackEventTag);
        }
      }
    },
    [onClick, trackEventTag]
  );

  return (
    <button
      className={classNames(
        s.root,
        { [s.block]: block },
        s[type],
        s[size],
        className
      )}
      disabled={disabled}
      onClick={handleClick}
      {...other}
      type={htmlType}
    >
      {children}
    </button>
  );
};

export default Button;

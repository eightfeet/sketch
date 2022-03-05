import * as React from "react";
import Icon from "..";

const IconWrong: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <path
        data-name="\u77E9\u5F62 1688 \u62F7\u8D1D 2"
        d="m3175.49 1402.27-10.07 10.07 10.07 10.07-3.58 3.58-10.07-10.06-10.07 10.06-3.58-3.58 10.07-10.07-10.07-10.07 3.58-3.58 10.07 10.07 10.07-10.07Z"
        transform="translate(-3141.845 -1392.345)"
        style={{
          fill: "currentColor",
          fillRule: "evenodd",
        }}
      />
    </svg>
  </Icon>
);

export default IconWrong;

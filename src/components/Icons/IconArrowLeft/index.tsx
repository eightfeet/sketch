import * as React from "react";
import Icon from "..";

const IconArrowLeft: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="m4410.01 815 1.38-1.425 10.24-10.568 1.38 1.425L4412.77 815l10.24 10.568-1.38 1.425-10.24-10.568Z"
        transform="translate(-4404.5 -803)"
        style={{
          fill: "currentColor",
          fillRule: "evenodd",
        }}
      />
    </svg>
  </Icon>
);

export default IconArrowLeft;

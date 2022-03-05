import * as React from "react";
import Icon from "..";

const IconTest: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 27 27"
      xmlSpace="preserve"
    >
      <path
        fill="currentColor"
        d="M9.73 18.72 21.75 6.7 16.8 1.75 4.78 13.77l-1.41 5.65.71.71 5.65-1.41zm-.35-5.31 6.36-6.36c.19-.2.51-.2.71 0 .2.19.2.51 0 .71l-6.36 6.36c-.2.2-.51.2-.71 0s-.2-.51 0-.71zM23 22H4c-.55 0-1 .45-1 1s.45 1 1 1h19c.55 0 1-.45 1-1s-.45-1-1-1z"
      />
    </svg>
  </Icon>
);

export default IconTest;

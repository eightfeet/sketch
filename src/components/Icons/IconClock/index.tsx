import * as React from "react";
import Icon from "..";

const IconClock: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27">
      <path
        fill="rgba(255,255,255,0.64)"
        stroke="currentColor"
        strokeWidth={2}
        d="M13 1c6.627 0 12 5.373 12 12s-5.373 12-12 12S1 19.627 1 13 6.373 1 13 1Z"
      />
      <path fillRule="evenodd" fill="currentColor" d="M19 15h-8V7h2v6h6v2Z" />
    </svg>
  </Icon>
);

export default IconClock;

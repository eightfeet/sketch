import * as React from "react";
import Icon from "..";

const IconClear: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="m19.9 18.485-1.414 1.414L10 11.414l-8.485 8.485L.1 18.485 8.586 10 .1 1.515 1.515.101 10 8.586 18.486.101 19.9 1.515 11.414 10l8.486 8.485Z"
      />
    </svg>
  </Icon>
);

export default IconClear;

import * as React from "react";
import Icon from "..";

const IconAdd: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 28">
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M27 16H16v12h-5V16H0v-5h11V0h5v11h11v5Z"
      />
    </svg>
  </Icon>
);

export default IconAdd;

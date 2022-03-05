import * as React from "react";
import Icon from "..";

const IconCoin: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M14 0c7.732 0 14 6.268 14 14s-6.268 14-14 14S0 21.732 0 14 6.268 0 14 0Z"
      />
      <path
        fillRule="evenodd"
        fill="#FFF"
        d="M20 13a1 1 0 0 1-1 1h-4v3h4a1 1 0 0 1 0 2h-4v3a1 1 0 0 1-2 0v-3H9a1 1 0 0 1 0-2h4v-3H9a1 1 0 0 1 0-2h3.086L8.525 8.439a1 1 0 0 1 1.414-1.414l4.077 4.076 4.076-4.076a1 1 0 0 1 1.414 1.414L15.945 12H19a1 1 0 0 1 1 1Z"
      />
    </svg>
  </Icon>
);

export default IconCoin;

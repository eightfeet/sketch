import * as React from "react";

import Icon from "..";

const IconSearch: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.5 34">
      <path
        stroke="currentColor"
        strokeWidth={3}
        fill="none"
        d="M18.059 3.433c5.257 3.036 7.059 9.758 4.024 15.016-3.036 5.257-9.759 7.059-15.017 4.023C1.81 19.437.008 12.714 3.044 7.457 6.079 2.199 12.802.398 18.059 3.433Z"
      />
      <path
        strokeWidth={2}
        fill="currentColor"
        d="M8.592 21.524a1.5 1.5 0 0 1 .548 2.049l-3.499 6.991a1.5 1.5 0 0 1-2.598-1.5l3.5-6.99a1.5 1.5 0 0 1 2.049-.55Z"
      />
    </svg>
  </Icon>
);

export default IconSearch;

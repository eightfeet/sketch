import * as React from "react";
import Icon from "..";

const IconChecked: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 21">
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M28.289 3.525 12.025 19.789a2 2 0 0 1-2.828 0L.711 11.303A2 2 0 1 1 3.54 8.475l7.071 7.071L25.46.697a2 2 0 0 1 2.829 2.828Z"
      />
    </svg>
  </Icon>
);

export default IconChecked;

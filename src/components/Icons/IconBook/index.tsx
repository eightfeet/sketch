import * as React from "react";
import Icon from "..";

const IconBook: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 105">
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="m81.262 104.951-40.017-.056-22.979.056H5.339a4.732 4.732 0 0 1-4.733-4.732v-64.02c0-1.244.028-28.233.028-31.198C.634.717 5.425.744 5.425.744c3.114 0 28.941-.076 30.207-.076h45.63a4.732 4.732 0 0 1 4.733 4.733v94.818a4.731 4.731 0 0 1-4.733 4.732ZM14.823 5.306h-4.695v94.992h4.695V5.306Zm61.73.127H57.632V57.74l9.476-9.444 9.445 9.444V5.433Z"
      />
    </svg>
  </Icon>
);

export default IconBook;

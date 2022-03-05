import * as React from "react";
import Icon from "..";

const IconLock: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.5 37">
      <path
        stroke="currentColor"
        strokeWidth={3}
        fill="none"
        d="M21.513 10.023a8.298 8.298 0 0 0-16.596 0v7.937h16.596v-7.937Z"
      />
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M21.75 34.531H4.511a4 4 0 0 1-4.001-4V15.823a4 4 0 0 1 4.001-4H21.75a4 4 0 0 1 4 4v14.708a4 4 0 0 1-4 4Zm-8.306-16.943a3.251 3.251 0 0 0-3.258 3.246 3.23 3.23 0 0 0 1.628 2.795l-.906 5.132h5.051l-1.06-5.037a3.234 3.234 0 0 0 1.803-2.89 3.252 3.252 0 0 0-3.258-3.246Z"
      />
    </svg>
  </Icon>
);

export default IconLock;

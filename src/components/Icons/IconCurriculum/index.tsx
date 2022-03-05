import * as React from "react";
import Icon from "..";

const IconCurriculum: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 27 27"
      xmlSpace="preserve"
    >
      <path
        d="M6.63 25.41H3.24c-.69 0-1.25-.55-1.25-1.24V7.34c0-.33.01-4.42.01-5.2.04-.66.6-1.16 1.25-1.12h.01c.82 0 7.6-.02 7.94-.02h11.99c.69 0 1.24.56 1.24 1.24V24.17c0 .68-.56 1.24-1.24 1.24l-10.52-.01-6.04.01zM4.49 2.22h1.24v21.97H4.49V2.22zm12.49.03h4.97V13l-2.48-2.48L16.98 13V2.25z"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          fill: "currentColor",
        }}
      />
    </svg>
  </Icon>
);

export default IconCurriculum;

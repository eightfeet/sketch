import * as React from "react";

const Play = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0zm189.952 537.6-261.12 150.528c-17.92 10.24-39.936-2.56-39.936-23.04V364.032c0-20.48 22.528-33.28 39.936-23.04l261.12 150.528c17.92 10.24 17.92 35.84 0 46.08z" />
  </svg>
);

export default Play;

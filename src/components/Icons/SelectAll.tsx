import * as React from "react";
import { SVGProps } from "react";

const SelectAll = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    {...props}
  >
    <path d="M237.888 446.336a40.128 40.128 0 0 1-28.032-11.392L76.16 304.512a40.128 40.128 0 0 1 56.064-57.472l103.04 100.48 228.48-268.288a40.128 40.128 0 1 1 61.056 52.032L268.352 432.192a40.128 40.128 0 0 1-28.608 14.08h-1.856zm0 512a40.128 40.128 0 0 1-28.032-11.392L76.096 816.512a40.128 40.128 0 0 1 56.064-57.472L235.2 859.52l228.48-268.288a40.128 40.128 0 1 1 61.056 52.032L268.352 944.192a40.128 40.128 0 0 1-28.608 14.08h-1.856zm526.08-510.912a191.936 191.936 0 0 1-191.68-191.68A191.936 191.936 0 0 1 763.968 64a191.936 191.936 0 0 1 191.744 191.744 191.936 191.936 0 0 1-191.68 191.68zm0-303.168a111.488 111.488 0 1 0 0 222.912 111.488 111.488 0 0 0 0-222.912zm0 811.52a191.936 191.936 0 0 1-191.68-191.744 191.936 191.936 0 0 1 191.68-191.744 191.936 191.936 0 0 1 191.744 191.68 191.936 191.936 0 0 1-191.68 191.744zm0-303.232a111.488 111.488 0 1 0 0 222.912 111.488 111.488 0 0 0 0-222.912z" />
  </svg>
);

export default SelectAll;

import * as React from "react";

const SearchIcon: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => {
  return (
    <span {...props}>
      <svg
        style={{ width: "100%", height: "100%", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26 33"
      >
        <path
          stroke="currentColor"
          fill="currentColor"
          d="M21.583 17.949c-2.639 4.57-8.062 6.524-12.889 4.965-.023.052-.024.109-.054.159l-3.499 6.991a1.5 1.5 0 0 1-2.598-1.5l3.477-6.945C1.196 18.443-.382 12.024 2.544 6.957c3.035-5.258 9.758-7.059 15.015-4.024 5.257 3.036 7.059 9.758 4.024 15.016ZM12.062 3.953a8.5 8.5 0 0 0-8.499 8.5c0 4.695 3.805 8.5 8.499 8.5a8.5 8.5 0 0 0 8.5-8.5 8.5 8.5 0 0 0-8.5-8.5Z"
        />
      </svg>
    </span>
  );
};

export default SearchIcon;

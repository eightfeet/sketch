import * as React from "react";
import Icon from "..";

interface Props {
  rank: "gold" | "silver" | "bronze";
}
const gray = [
  "currentColor",
  "rgba(255,255,255,0.5)",
  "currentColor",
  "rgba(255,255,255,0.5)",
];
const gold = ["#ED6F6E", "#F9E446", "#F38C15", "#FBE14E"];
const silver = ["#48bce4", "#9cdbf0", "#75b4c9", "#c4ecfa"];
const bronze = ["#d19d77", "#facaa7", "#df9b6a", "#fee0cb"];
const IconGoldMedal: React.FC<
  React.HtmlHTMLAttributes<HTMLSpanElement> & Props
> = ({ rank, ...other }) => {
  let color = gray;
  if (rank === "gold") color = gold;
  if (rank === "silver") color = silver;
  if (rank === "bronze") color = bronze;
  return (
    <Icon {...other}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.5 40">
        <path
          fillRule="evenodd"
          fill={color[0]}
          d="M29.708 9.39s-2.105-1.969-4.457-3.094c-2.1-1.004-4.475-1.177-4.475-1.177l2.33-5.028H33.98L29.708 9.39ZM10.056 6.296C7.704 7.421 5.599 9.39 5.599 9.39L1.327.091h10.874l2.33 5.028s-2.375.173-4.475 1.177Z"
        />
        <path
          fillRule="evenodd"
          stroke={color[1]}
          strokeWidth={3}
          fill={color[2]}
          d="M17.876 4.324c8.94 0 16.186 7.238 16.186 16.166s-7.246 16.166-16.186 16.166S1.689 29.418 1.689 20.49 8.936 4.324 17.876 4.324Z"
        />
        <path
          fillRule="evenodd"
          fill={color[3]}
          d="m17.463 10.637 2.897 5.32 5.892 1.146-4.102 4.434.745 6.029-5.432-2.58-5.433 2.58.745-6.029-4.102-4.434 5.892-1.146 2.898-5.32"
        />
      </svg>
    </Icon>
  );
};

export default IconGoldMedal;

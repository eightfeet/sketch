import * as React from "react";
import Icon from "..";

const IconMedalCup: React.FC<React.HtmlHTMLAttributes<HTMLSpanElement>> = (
  props
) => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 70 322 402.5">
      <defs>
        <filter
          filterUnits="userSpaceOnUse"
          id="a"
          x={25}
          y={120}
          width={267}
          height={272}
        >
          <feOffset in="SourceAlpha" dx={6.303} dy={11.37} />
          <feGaussianBlur result="blurOut" stdDeviation={2.828} />
          <feFlood floodColor="#BDBDBD" result="floodOut" />
          <feComposite operator="atop" in="floodOut" in2="blurOut" />
          <feComponentTransfer>
            <feFuncA type="linear" slope={0.35} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="b">
          <feFlood floodColor="#FFF" floodOpacity={1} result="floodOut" />
          <feComposite
            operator="atop"
            in="floodOut"
            in2="SourceGraphic"
            result="compOut"
          />
          <feBlend in="compOut" in2="SourceGraphic" />
        </filter>
      </defs>
      <path
        fillRule="evenodd"
        fill="#CCC"
        d="m162.713 155.746-12.991 7.5-3.521 2.034-38.914 22.466-84-145.492 14.722-8.5 24.226-13.987 16.478-9.513 84 145.492Z"
      />
      <path
        fillRule="evenodd"
        fill="#E0E1E2"
        d="m38.009 33.754 27.713-16 84 145.492-27.713 16-84-145.492Z"
      />
      <path
        fillRule="evenodd"
        fill="#C9C9C9"
        d="m269.733 28.987 22.98 13.267-84 145.492-14.723-8.5-27.712-16-12.991-7.5 84-145.492 12.991 7.5 19.455 11.233Z"
      />
      <path
        fillRule="evenodd"
        fill="#E0E2E3"
        d="m277.99 33.754-27.712-16-84 145.492 27.712 16 84-145.492Z"
      />
      <path fillRule="evenodd" fill="#FFF" d="M0 0h322v70H0V0Z" />
      <g filter="url(#a)">
        <path
          fillRule="evenodd"
          strokeWidth={21}
          stroke="#F4F4F4"
          fill="#DEDEDE"
          d="M154 125c68.483 0 124 55.517 124 124s-55.517 124-124 124S30 317.483 30 249s55.517-124 124-124Z"
        />
      </g>
      <g filter="url(#b)">
        <path
          fillRule="evenodd"
          fill="#FA936B"
          d="M228.412 198.893c-1.044-2.685-3.507-4.422-6.274-4.422h-19.795c-.045-3.363-.212-5.361-.212-5.361h-92.237s-.16 1.998-.207 5.361H89.894c-2.769 0-5.232 1.737-6.274 4.422-2.686 6.929 4.061 34.294 16.273 45.381 4.473 4.059 9.895 6.577 15.982 7.478 1.671.588 2.972 1.869 2.843 2.874-.22 1.68-3.37 1.971-2.048 5.26 1.465 3.664 9.539 1.818 10.78-4.019 4.261 4.751 9.531 8.7 16.039 11.31 8.426 3.381 2.508 39.144 2.508 42.834 0 0-13.448 0-15.821 3.55-1.469 2.2-1.186 4.735-1.186 4.735s-8.7 2.763-8.7 6.312v4.395h71.453v-4.395c0-3.549-8.703-6.312-8.703-6.312s.287-2.535-1.186-4.735c-2.375-3.55-15.822-3.55-15.822-3.55 0-3.69-5.917-39.453 2.51-42.834 6.51-2.61 11.778-6.559 16.04-11.31 1.24 5.837 9.318 7.683 10.782 4.019 1.321-3.289-1.831-3.58-2.052-5.26-.126-1.005 1.179-2.286 2.845-2.874 6.09-.901 11.507-3.419 15.981-7.478 12.214-11.087 18.958-38.452 16.274-45.381Zm-138.518 1.748h19.851c.37 11.727 2.418 30.26 10.734 45.315-6.443-.102-11.958-2.188-16.425-6.246-11.558-10.498-16.994-39.069-14.16-39.069Zm118.083 39.069c-4.472 4.058-9.982 6.144-16.429 6.246 8.319-15.055 10.371-33.588 10.737-45.315h19.853c2.833 0-2.602 28.571-14.161 39.069Z"
        />
      </g>
    </svg>
  </Icon>
);

export default IconMedalCup;

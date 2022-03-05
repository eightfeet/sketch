import classNames from "classnames";
import React, { HTMLAttributes } from "react";
import WingBlank from "~/components/WingBlank";
import s from "./Tab.module.scss";

export interface tabItemOne {
  /**选项key，不填时将使用索引 */
  key?: string | number;
  name: string;
  icon?: React.ReactNode;
  [keys: string]: any;
}

interface Props {
  tabItem: tabItemOne[];
  currentKey: string | number;
  /**选项key，不填时将使用索引 */
  onChangeTab: (key: string | number, item: tabItemOne) => void;
}

const Tab: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  tabItem,
  currentKey,
  className,
  onChangeTab,
  ...other
}) => {
  return (
    <div className={classNames(s.root, className)} {...other}>
      <WingBlank className={s.tab}>
        {tabItem.map((item, index) => {
          const $itemKey = item.key ?? index;
          return (
            <div
              className={classNames(s.item, {
                [s.activity]: currentKey === $itemKey,
              })}
              key={$itemKey}
            >
              <div onClick={() => onChangeTab($itemKey, item)}>
                {item.icon}
                <p
                  className={classNames(s.itemtxt, {
                    [s.margin]: !!item.icon,
                  })}
                >
                  {item.name}
                </p>
              </div>
            </div>
          );
        })}
      </WingBlank>
    </div>
  );
};

export default Tab;

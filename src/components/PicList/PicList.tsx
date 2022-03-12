import React, { useCallback, useEffect, useState } from "react";
import { ModelType } from "~/types/models";
import s from "./PicList.module.scss";
import Pic from "../Pic";
import Selected from "../Icons/Selected";
import Icons from "../Icons";
import classNames from "classnames";

interface Props {
  column?: number;
  data?: ModelType[];
  space?: number;
  width?: number;
  onClickSelect?: (item: ModelType) => void;
  selectedData?: ModelType[];
  type?: "picture" | "model";
}

const PicList: React.FC<Props> = ({
  column = 3,
  width = window.innerWidth,
  data,
  space = 5,
  onClickSelect,
  selectedData,
}) => {
  const [columnGroup, setColumnGroup] = useState<number[]>([]);
  useEffect(() => {
    const arr = [];
    for (let index = 0; index < column; index++) {
      arr.push(0);
    }
    setColumnGroup(arr);
  }, [column]);

  const renderPic = useCallback(() => {
    if (!columnGroup.length || !data?.length) return null;
    const currentColumnGroup = [...columnGroup];
    const nodes = data.map((item, index) => {
      //计算
      const tips = item.imgUrl.split("&");
      const originWidth = parseInt(tips[1]) || 0;
      const originHeight = parseInt(tips[2]) || 0;
      const wrapWidth = width - space * (column - 1);
      const picwidth = wrapWidth / column;
      const rate = picwidth / originWidth;
      const picheight = originHeight * rate;
      //处理
      const minLine = Math.min(...currentColumnGroup);
      const currentLine = currentColumnGroup.indexOf(minLine);
      const top = currentColumnGroup[currentLine];
      const left = currentLine === 0 ? 0 : currentLine * (picwidth + space);
      const styles = {
        width: Math.floor(picwidth),
        height: Math.floor(picheight),
        left: Math.floor(left),
        top: Math.floor(top),
      };
      currentColumnGroup[currentLine] =
        (currentColumnGroup[currentLine] || 0) + picheight + space;

      let path = item.imgUrl;
      if (item.from === "md1")
        path = process.env.REACT_APP_MPATH_M1! + "models/" + path;
      if (item.from === "md2")
        path = process.env.REACT_APP_MPATH_M2! + "small/" + path;
      if (item.from === "md3")
        path = process.env.REACT_APP_MPATH_M3! + "small/" + path;
      const isSelected = selectedData?.some(
        (sItem) => sItem.imgUrl === item.imgUrl
      );
      return (
        <div className={s.picwrap} style={styles} key={item.imgUrl + index}>
          <Pic className={s.pic} src={path} />
          <Icons
            type="light"
            className={classNames(
              s.checkbutton,
              isSelected ? s.selected : null
            )}
            onClick={() => onClickSelect?.(item)}
          >
            <Selected />
          </Icons>
        </div>
      );
    });
    return (
      <div style={{ height: Math.max(...currentColumnGroup) }}>{nodes}</div>
    );
  }, [column, columnGroup, data, onClickSelect, selectedData, space, width]);

  return (
    <div className={s.root} style={{ width: width }}>
      {renderPic()}
    </div>
  );
};

export default PicList;

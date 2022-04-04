import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "~/components/Button";
import Icons from "~/components/Icons";
import Filter from "~/components/Icons/Filter";
import Modal from "~/components/Modal";
import { RootDispatch, RootState } from "~/store";
import { Tags } from "~/types/models";
import s from "./PicFilter.module.scss";

interface Props {}

const tagsLabel = {
  X: "横向",
  Y: "竖向",
  Clothes: "着衣",
  Body: "人体",
  Male: "男性",
  Female: "女性",
  Header: "头像",
  HandsFeet: "手足",
  Half: "半身",
  Group: "组合",
  Still: "静物",
  Structure: "结构",
};

const PicFilter: React.FC<Props> = () => {
  const [showClockModal, setShowClockModal] = useState(false);
  const { pictureFilter } = useSelector((state: RootState) => state).dynamics;
  const { setPictureFilter, setPictureList } =
    useDispatch<RootDispatch>().dynamics;

  const handle = useCallback(
    (item: keyof Tags) => () => {
      let filter: Tags[] = [...pictureFilter];
      if (pictureFilter.includes(item as any)) {
        filter = pictureFilter.filter((el: any) => el !== item);
      } else {
        filter.push(item as any);
      }
      setPictureFilter(filter);
      setPictureList([]);
    },
    [pictureFilter, setPictureFilter, setPictureList]
  );

  return (
    <>
      <Icons type="light" onClick={() => setShowClockModal(true)}>
        <Filter />
      </Icons>
      <Modal visible={showClockModal} onCancel={() => setShowClockModal(false)}>
        <Modal.Header>筛选图片</Modal.Header>
        <div className={s.buttonwrap}>
          {Object.keys(tagsLabel).map((item: any) => {
            return (
              <Button
                key={item}
                onClick={handle(item)}
                type={pictureFilter?.includes(item) ? "dark" : "darkoutline"}
              >
                {(tagsLabel as any)[item]}
              </Button>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default PicFilter;

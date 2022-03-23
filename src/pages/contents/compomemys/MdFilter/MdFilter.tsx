import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "~/components/Button";
import Icons from "~/components/Icons";
import Filter from "~/components/Icons/Filter";
import Modal from "~/components/Modal";
import { ModelFilter } from "~/models/dynamics";
import { RootDispatch, RootState } from "~/store";
import { ModelType } from "~/types/models";
import s from "./MdFilter.module.scss";

interface Props {}

const MdFilter: React.FC<Props> = () => {
  const [showClockModal, setShowClockModal] = useState(false);
  const { modelFilter } = useSelector((state: RootState) => state).dynamics;
  const { setModelFilter, setModelList } = useDispatch<RootDispatch>().dynamics;

  const handle = useCallback(
    (item: keyof ModelFilter) => () => {
      let data: ModelFilter = {
        ...modelFilter,
        [item]: !modelFilter[item],
      };
      const off = () => {
        data = {
          isMale: false,
          isFemale: false,
          isClothes: false,
          isBody: false,
          isHeader: false,
          isHandsFeet: false,
          isStructure: false,
          isStill: false,
        };
      };
      switch (item) {
        case "isStill":
        case "isHandsFeet":
        case "isStructure":
          if (data[item]) {
            off();
            data[item] = true;
          }
          break;
        default:
          data.isStill = false;
          data.isStructure = false;
          data.isHandsFeet = false;
          break;
      }
      setModelFilter(data);
      setModelList([]);
    },
    [modelFilter, setModelFilter, setModelList]
  );

  return (
    <>
      <Icons type="light" onClick={() => setShowClockModal(true)}>
        <Filter />
      </Icons>
      <Modal visible={showClockModal} onCancel={() => setShowClockModal(false)}>
        <Modal.Header>筛选图片</Modal.Header>
        <div className={s.buttonwrap}>
          {Object.keys(modelFilter).map((item: any) => {
            return (
              <Button
                key={item}
                onClick={handle(item)}
                type={
                  (modelFilter as keyof ModelType)[item]
                    ? "dark"
                    : "darkoutline"
                }
              >
                {item === "isClothes" ? "着衣" : null}
                {item === "isBody" ? "人体" : null}
                {item === "isFemale" ? "女性" : null}
                {item === "isMale" ? "男性" : null}
                {item === "isHeader" ? "头像" : null}
                {item === "isHandsFeet" ? "手足" : null}
                {item === "isStructure" ? "肌肉结构" : null}
                {item === "isStill" ? "静物" : null}
              </Button>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default MdFilter;

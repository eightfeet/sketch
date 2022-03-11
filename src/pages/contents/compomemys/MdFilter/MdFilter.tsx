import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "~/components/Button";
import Icons from "~/components/Icons";
import Filter from "~/components/Icons/Filter";
import Modal from "~/components/Modal";
import { RootDispatch, RootState } from "~/store";
import s from "./MdFilter.module.scss";

interface Props {}

const MdFilter: React.FC<Props> = () => {
  const [showClockModal, setShowClockModal] = useState(false);
  const { modelFilter } = useSelector((state: RootState) => state).dynamics;
  const { setModelFilter } = useDispatch<RootDispatch>().dynamics;

  const handle = useCallback(
    (item: string) => () => {
      console.log(item);
      setModelFilter({
        ...modelFilter,
        [item]: !(modelFilter as any)[item],
      });
    },
    [modelFilter, setModelFilter]
  );

  return (
    <>
      <Icons type="light" onClick={() => setShowClockModal(true)}>
        <Filter />
      </Icons>
      <Modal visible={showClockModal} onCancel={() => setShowClockModal(false)}>
        <Modal.Header>筛选图片</Modal.Header>
        <div className={s.buttonwrap}>
          {Object.keys(modelFilter).map((item: string) => {
            return (
              <Button
                onClick={handle(item)}
                type={(modelFilter as any)[item] ? "dark" : "darkoutline"}
              >
                {item === "isClothes" ? "着衣" : null}
                {item === "isBody" ? "人体" : null}
                {item === "isMale" ? "女性" : null}
                {item === "isFemale" ? "男性" : null}
                {item === "isHeader" ? "头像" : null}
                {item === "isHandsFeet" ? "手足" : null}
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

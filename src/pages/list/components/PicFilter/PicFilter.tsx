import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "~/components/Button";
import Icons from "~/components/Icons";
import Filter from "~/components/Icons/Filter";
import Modal from "~/components/Modal";
import { RootDispatch, RootState } from "~/store";
import s from "./PicFilter.module.scss";

interface Props {}

const PicFilter: React.FC<Props> = () => {
  const [showClockModal, setShowClockModal] = useState(false);
  const { pictureFilter } = useSelector((state: RootState) => state).dynamics;
  const { setPictureFilter } = useDispatch<RootDispatch>().dynamics;

  const handle = useCallback(
    (item: string) => () => {
      console.log(item);
      setPictureFilter({
        ...pictureFilter,
        [item]: !(pictureFilter as any)[item],
      });
    },
    [pictureFilter, setPictureFilter]
  );

  return (
    <>
      <Icons type="light" onClick={() => setShowClockModal(true)}>
        <Filter />
      </Icons>
      <Modal visible={showClockModal} onCancel={() => setShowClockModal(false)}>
        <Modal.Header>筛选图片</Modal.Header>
        <div className={s.buttonwrap}>
          {Object.keys(pictureFilter).map((item: string) => {
            return (
              <Button
                onClick={handle(item)}
                key={item}
                type={(pictureFilter as any)[item] ? "dark" : "darkoutline"}
              >
                {item === "isX" ? "横向" : null}
                {item === "isY" ? "纵向" : null}
              </Button>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default PicFilter;

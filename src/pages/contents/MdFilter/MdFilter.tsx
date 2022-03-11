import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "~/components/Button";
import Icons from "~/components/Icons";
import Filter from "~/components/Icons/Filter";
import Modal from "~/components/Modal";
import WingBlank from "~/components/WingBlank";
import { RootDispatch, RootState } from "~/store";
import s from "./MdFilter.module.scss";

interface Props {}

const MdFilter: React.FC<Props> = () => {
  const [showClockModal, setShowClockModal] = useState(false);
  const onOk = useCallback(() => {
    setShowClockModal(false);
  }, []);
  const { pictureFilter } = useSelector((state: RootState) => state).dynamics;
  const { setPictureFilter } = useDispatch<RootDispatch>().dynamics;

  return (
    <>
      <Icons type="light" onClick={() => setShowClockModal(true)}>
        <Filter />
      </Icons>
      <Modal visible={showClockModal} onCancel={() => setShowClockModal(false)}>
        <Modal.Header>筛选图片</Modal.Header>
        <div className={s.buttonwrap}>
          {JSON.stringify(pictureFilter)}
          {Object.keys(pictureFilter || {}).map((item) => {
            return <Button type="darkoutline">111{item}</Button>;
          })}
        </div>
      </Modal>
    </>
  );
};

export default MdFilter;

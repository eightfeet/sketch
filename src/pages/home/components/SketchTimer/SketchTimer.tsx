import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "~/components/Button";
import Icons from "~/components/Icons";
import Clock from "~/components/Icons/Clock";
import Input from "~/components/Input";
import Modal from "~/components/Modal";
import { RootDispatch, RootState } from "~/store";
import s from "./SketchTimer.module.scss";

interface Props {}

const SketchTimer: React.FC<Props> = ({ children }) => {
  const [showClockModal, setShowClockModal] = useState(false);
  const onOk = useCallback(() => {
    setShowClockModal(false);
  }, []);
  const { keepingTime } = useSelector((state: RootState) => state).dynamics;
  const { setKeepingTime } = useDispatch<RootDispatch>().dynamics;
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = Number(e.target.value);
      setKeepingTime(value);
    },
    [setKeepingTime]
  );

  const onBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = Number(e.target.value);
      setKeepingTime(value < 1 ? 1 : value);
    },
    [setKeepingTime]
  );

  return (
    <>
      {children ? (
        <span onClick={() => setShowClockModal(true)}>{children}</span>
      ) : (
        <Icons tip={`${keepingTime}m`} onClick={() => setShowClockModal(true)}>
          <Clock />
        </Icons>
      )}
      <Modal visible={showClockModal} onCancel={() => setShowClockModal(false)}>
        <Modal.Header>设置时间</Modal.Header>
        <div>
          <Input
            type={"number"}
            placeholder="请输入时长（分钟）"
            value={keepingTime}
            prefix=""
            onBlur={onBlur}
            onChange={onChange}
          />
          <div className={s.info}>每张素材计时{keepingTime}分钟</div>
        </div>
        <Modal.Footer>
          <Button style={{ width: "85%" }} onClick={onOk}>
            确定
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SketchTimer;

import React, { useCallback, useState } from "react";
import Button from "~/components/Button";
import Icons from "~/components/Icons";
import Clock from "~/components/Icons/Clock";
import Modal from "~/components/Modal";
import s from "./SketchTimer.module.scss";

interface Props {}

const SketchTimer: React.FC<Props> = () => {
  const [showClockModal, setShowClockModal] = useState(false);
  const onOk = useCallback(() => {
    setShowClockModal(false);
  }, []);

  return (
    <>
      <Icons tip={"3m/张"} onClick={() => setShowClockModal(true)}>
        <Clock />
      </Icons>
      <Modal visible={showClockModal} onCancel={() => setShowClockModal(false)}>
        <Modal.Header>设置时间</Modal.Header>
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

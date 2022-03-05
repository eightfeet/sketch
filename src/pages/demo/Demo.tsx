import React, { useState } from "react";
import Button from "~/components/Button";
import IconAdd from "~/components/Icons/IconAdd";
import IconBook from "~/components/Icons/IconBook";
import IconClock from "~/components/Icons/IconClock";
import IconGoldMedal from "~/components/Icons/IconGoldMedal";
import IconSearch from "~/components/Icons/IconSearch";
import IconCurriculum from "~/components/Icons/IconCurriculum";
import Modal, { message } from "~/components/Modal";
import Space from "~/components/Space";
import WingBlank from "~/components/WingBlank";
import s from "./Demo.module.scss";
import IconTest from "~/components/Icons/IconTest";
import IconTraining from "~/components/Icons/IconTraining";
import IconChecked from "~/components/Icons/IconChecked";
import IconLock from "~/components/Icons/IconLock";
import IconCoin from "~/components/Icons/IconCoin";
import IconClear from "~/components/Icons/IconClear";
import IconArrowRight from "~/components/Icons/IconArrowRight";
import IconArrowLeft from "~/components/Icons/IconArrowLeft";
import IconWrong from "~/components/Icons/IconWrong";
import IconRight from "~/components/Icons/IconRight";
import Search from "~/components/Search";

interface Props {}

const Demo: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={s.root}>
      <WingBlank>
        <h3>弹窗/提示</h3>
        <div className={s.icon}>
          <IconAdd />
          <IconArrowLeft />
          <IconArrowRight />
          <IconBook />
          <IconChecked />
          <IconClear />
          <IconClock />
          <IconCoin />
          <IconCurriculum />
          <IconGoldMedal rank="gold" />
          <IconGoldMedal rank="silver" />
          <IconGoldMedal rank="bronze" />
          <IconLock />
          <IconSearch />
          <IconTest />
          <IconTraining />
          <IconRight />
          <IconWrong />
        </div>
      </WingBlank>
      <WingBlank>
        <Button
          type="gradientorange"
          size="normal"
          onClick={() => setVisible(true)}
        >
          打开弹窗
        </Button>
        <Button
          type="gradientred"
          block
          size="normal"
          onClick={() => {
            message({
              title: "标题",
              content: "提示内容",
              onOk: (modal) => {
                alert("do someth!");
                modal.remove();
              },
              okText: "确定",
              onCancel: () => {},
              closable: false,
            });
          }}
        >
          打开提示
        </Button>
      </WingBlank>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        className={s.text}
      >
        <Modal.Header>标题</Modal.Header>
        这是个弹窗
      </Modal>
      <Space />
      <WingBlank>
        <Search onSearch={(data) => console.log(data)} />
      </WingBlank>
    </div>
  );
};

export default Demo;

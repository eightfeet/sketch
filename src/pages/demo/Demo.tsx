import React, { useState } from "react";
import Button from "~/components/Button";
import Modal, { message } from "~/components/Modal";
import Space from "~/components/Space";
import WingBlank from "~/components/WingBlank";
import s from "./Demo.module.scss";
import Search from "~/components/Search";
import Icons from "~/components/Icons";
import Clock from "~/components/Icons/Clock";
import ClockFill from "~/components/Icons/ClockFill";
import ArrowRight from "~/components/Icons/ArrowRight";
import LiseCard from "~/components/Icons/LiseCard";
import Filter from "~/components/Icons/Filter";
import Selected from "~/components/Icons/Selected";
import GoToTop from "~/components/Icons/GoToTop";

interface Props {}

const Demo: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={s.root}>
      <WingBlank>
        <h3>弹窗/提示</h3>
        <div className={s.icon}>
          <Icons type="light">
            <Clock />
          </Icons>
          <Icons>
            <ClockFill />
          </Icons>
          <Icons>
            <ArrowRight />
          </Icons>
          <Icons>
            <LiseCard />
          </Icons>
          <Icons>
            <Filter />
          </Icons>
          <Icons>
            <Selected />
          </Icons>
          <Icons>
            <GoToTop />
          </Icons>
        </div>
      </WingBlank>
      <WingBlank>
        <Button type="dark" size="normal" onClick={() => setVisible(true)}>
          打开弹窗
        </Button>
        <Button
          type="light"
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

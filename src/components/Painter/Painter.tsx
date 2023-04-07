import React, { useCallback, useState } from "react";
import Canvas from "./Canvas";
import Eraser from "./Icons/Eraser";
import Pen from "./Icons/Pen";
import Fill from "./Icons/Fill";
import s from "./Painter.module.scss";
import Display from "./Icons/Display";

interface Props {
  visible?: boolean;
  onClose?: () => void;
  onChange?: (data: {
    lineColor?: string;
    lineWidth?: number;
    bgColor?: string;
    bgAlph?: number;
  }) => void;
  lineColor?: string;
  lineWidth?: number;
  bgAlph?: number;
  bgColor?: string;
}
const Painter: React.FC<Props> = ({
  visible,
  onClose,
  lineColor = "#ff0000",
  lineWidth = 2,
  bgColor = "#ffffff",
  bgAlph = 0,
  onChange,
}) => {
  const [clearStamp, setClearStamp] = useState(new Date().getTime());
  const [showBgConfig, setShowBgConfig] = useState(false);
  const [type, setType] = useState<"pen" | "eraser">("pen");
  const [fillmode, setFillmode] = useState(false);

  const close = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const toggleBackground = useCallback(() => {
    setShowBgConfig((bg) => !bg);
  }, []);

  const onLinsize = useCallback(
    (e: any) => {
      const val = Number(e.target.value);
      onChange?.({ lineWidth: val });
    },
    [onChange]
  );

  const onLinColor = useCallback(
    (e: any) => {
      const val = e.target.value;
      onChange?.({ lineColor: val });
    },
    [onChange]
  );

  const onbgColor = useCallback(
    (e: any) => {
      const val = e.target.value;
      onChange?.({ bgColor: val });
    },
    [onChange]
  );

  const onbgAlph = useCallback(
    (e: any) => {
      const val = Number(e.target.value);
      onChange?.({ bgAlph: val });
    },
    [onChange]
  );

  return (
    <div className={s.root}>
      <div className={s.toolbar}>
        <div className={s.switch}>
          <div
            className={`${s.icon} ${showBgConfig ? s.iconact : ""}`}
            onClick={() => setShowBgConfig(!showBgConfig)}
          >
            <Display />
          </div>
        </div>
        <div className={s.handlebar}>
          {showBgConfig ? (
            <>
              <div
                className={`${s.icon} ${type === "pen" ? s.iconact : ""}`}
                onClick={() => setType("pen")}
              >
                <Pen />
              </div>
              <div
                className={`${s.icon} ${type === "eraser" ? s.iconact : ""}`}
                onClick={() => setType("eraser")}
              >
                <Eraser />
              </div>
              &nbsp;&nbsp;
              <input
                className={s.slider}
                type="range"
                min="1"
                max="60"
                value={lineWidth}
                onChange={onLinsize}
              />{" "}
              <span className={s.sliderblock}>({lineWidth})</span>
              &nbsp;&nbsp;
              <input
                className={s.color}
                type="color"
                value={lineColor}
                onChange={onLinColor}
              />{" "}
              <div
                className={`${s.icon} ${fillmode ? s.iconact : ""}`}
                onClick={() => setFillmode(!fillmode)}
              >
                <Fill />
              </div>
              <input
                className={s.slider}
                type="range"
                min="0"
                step={0.1}
                max="1"
                value={bgAlph}
                onChange={onbgAlph}
              />{" "}
              <span className={s.block}>({bgAlph})</span>
              <span className={s.block}> &nbsp;&nbsp;背景色 &nbsp;</span>
              <input
                className={s.color}
                type="color"
                value={bgColor}
                onChange={onbgColor}
              />
              <div onClick={() => setClearStamp(new Date().getTime())}>
                清除
              </div>
            </>
          ) : (
            <>&nbsp;</>
          )}
        </div>
      </div>
      <Canvas
        key={clearStamp}
        color={lineColor}
        eraser={type === "eraser"}
        lineWidth={lineWidth}
      />
    </div>
  );
};

export default Painter;

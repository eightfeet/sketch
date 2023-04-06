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
  defaultLineColor?: string;
  defaultLineWidth?: number;
  bgAlph?: number;
  bgColor?: string;
}
const Painter: React.FC<Props> = ({
  visible,
  onClose,
  defaultLineColor = "#ff0000",
  defaultLineWidth = 2,
  bgColor = "#ffffff",
  bgAlph = 0,
  onChange,
}) => {
  const [color, setColor] = useState("#000");
  const [clearStamp, setClearStamp] = useState(new Date().getTime());
  const [initLineWidth, setInitLineWidth] = useState(defaultLineWidth);
  const [initLineColor, setInitLineColor] = useState(defaultLineColor);
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
      console.log("val", val);

      setInitLineWidth(val);
      onChange?.({ lineWidth: val });
    },
    [onChange]
  );

  const onLinColor = useCallback(
    (setColor: (color: string) => void) => (e: any) => {
      const val = e.target.value;
      setColor(val);
      setInitLineColor(val);
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
      <div className={s.handlebar}>
        {showBgConfig ? (
          <div>
            &nbsp;
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
              value={initLineWidth}
              onChange={onLinsize}
            />{" "}
            <span className={s.sliderblock}>({initLineWidth})</span>
            &nbsp;&nbsp;
            <input
              className={s.color}
              type="color"
              value={initLineColor}
              onChange={onLinColor(setColor)}
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
            <span className={s.sliderblock}>({bgAlph})</span>
            &nbsp;&nbsp;&nbsp; 背景色 &nbsp;&nbsp;
            <input
              className={s.color}
              type="color"
              value={bgColor}
              onChange={onbgColor}
            />
          </div>
        ) : (
          <div>&nbsp;</div>
        )}
        <div
          className={`${s.icon} ${showBgConfig ? s.iconact : ""}`}
          onClick={() => setShowBgConfig(!showBgConfig)}
        >
          <Display />
        </div>
      </div>
      <Canvas
        color={initLineColor}
        eraser={type === "eraser"}
        lineWidth={initLineWidth}
      />
    </div>
  );
};

export default Painter;

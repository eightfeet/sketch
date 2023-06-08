import React, { useCallback, useState } from "react";
import Canvas from "./Canvas";
import Eraser from "./Icons/Eraser";
import Pen from "./Icons/Pen";
import Fill from "./Icons/Fill";
import s from "./Painter.module.scss";
import Paint from "./Icons/Paint";
import Clear from "./Icons/Clear";
import ColorAndAlph from "./ColorAndAlph";

interface Props {
  visible?: boolean;
  onClose?: () => void;
  onChange?: (data: {
    lineColor?: string;
    lineWidth?: number;
    eraserWidth?: number;
    bgColor?: string;
    bgAlph?: number;
    eraserAlph?: number;
    lineAlph?: number;
  }) => void;
  lineColor?: string;
  lineWidth?: number;
  eraserWidth?: number;
  bgAlph?: number;
  bgColor?: string;
  eraserAlph?: number;
  lineAlph?: number;
}
const Painter: React.FC<Props> = ({
  visible,
  onClose,
  lineColor = "#ff0000",
  lineWidth = 2,
  eraserWidth = 2,
  bgColor = "#ffffff",
  bgAlph = 0,
  onChange,
  eraserAlph = 50,
  lineAlph = 50,
}) => {
  const [clearStamp, setClearStamp] = useState(new Date().getTime());
  const [currentMode, setCurrentMode] = useState<"pen" | "eraser" | "fill">();

  const close = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const onChangeBg = useCallback(
    ({ color, alph }) => {
      onChange?.({ bgAlph: alph, bgColor: color });
    },
    [onChange]
  );

  const onChangePen = useCallback(
    ({ color, alph, size }) => {
      onChange?.({ lineAlph: alph, lineColor: color, lineWidth: size });
    },
    [onChange]
  );

  const onChangeEraser = useCallback(
    ({ size, alph }) => {
      onChange?.({ eraserAlph: alph, eraserWidth: size });
    },
    [onChange]
  );

  const onChangeMode = useCallback(
    (mode: "pen" | "eraser" | "fill") => {
      if (currentMode === mode) {
        setCurrentMode(undefined);
      } else {
        setCurrentMode(mode);
      }
    },
    [currentMode]
  );

  return (
    <div className={s.root} style={{ display: visible ? "block" : "none" }}>
      <div className={s.toolbar}>
        <div className={s.switch}>
          <div className={`${s.icon} ${s.iconact}`} onClick={close}>
            <Paint />
          </div>
          <div
            className={`${s.icon} ${currentMode === "pen" ? s.iconact : ""}`}
            onClick={() => onChangeMode("pen")}
          >
            <Pen />
          </div>
          <div
            className={`${s.icon} ${currentMode === "eraser" ? s.iconact : ""}`}
            onClick={() => onChangeMode("eraser")}
          >
            <Eraser />
          </div>
          <div
            className={`${s.icon} ${currentMode === "fill" ? s.iconact : ""}`}
            onClick={() => onChangeMode("fill")}
          >
            <Fill />
          </div>
          <div
            className={`${s.icon}`}
            onClick={() => setClearStamp(new Date().getTime())}
          >
            <Clear />
          </div>
        </div>
        <div className={s.handlebar}>
          {currentMode === "pen" ? (
            <div className={s.setbar}>
              <ColorAndAlph
                color={lineColor}
                size={lineWidth}
                alph={lineAlph}
                onChange={onChangePen}
              />
            </div>
          ) : null}
          {currentMode === "eraser" ? (
            <div className={s.setbar}>
              <ColorAndAlph
                size={eraserWidth}
                alph={eraserAlph}
                onChange={onChangeEraser}
              />
            </div>
          ) : null}
          {currentMode === "fill" ? (
            <div className={s.setbar}>
              <ColorAndAlph
                color={bgColor}
                alph={bgAlph}
                onChange={onChangeBg}
              />
            </div>
          ) : null}
        </div>
      </div>
      <Canvas
        key={clearStamp}
        lineColor={lineColor}
        eraser={currentMode === "eraser"}
        lineWidth={lineWidth}
        lineAlph={lineAlph}
        eraserWidth={eraserWidth}
        bgColor={bgColor}
        bgAlph={bgAlph}
        eraserAlph={eraserAlph}
      />
    </div>
  );
};

export default Painter;

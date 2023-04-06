import React, { useCallback, useRef, useState } from "react";
import { ReactPainter } from "react-painter";
import s from "./Painter.module.scss";

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
  const [clearStamp, setClearStamp] = useState(new Date().getTime());
  const [initLineWidth, setInitLineWidth] = useState(defaultLineWidth);
  const [initLineColor, setInitLineColor] = useState(defaultLineColor);
  const [showBgConfig, setShowBgConfig] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const toggleBackground = useCallback(() => {
    setShowBgConfig((bg) => !bg);
  }, []);

  const onLinsize = useCallback(
    (setLineWidth: (num: number) => void) => (e: any) => {
      const val = Number(e.target.value);
      setLineWidth(val);
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
    <ReactPainter
      width={window.innerWidth}
      key={clearStamp}
      height={window.innerHeight}
      onSave={(blob) => console.log(blob.stream().getReader())}
      initialLineWidth={initLineWidth}
      initialColor={initLineColor}
      render={({
        canvas,
        triggerSave,
        imageDownloadUrl,
        setLineWidth,
        setColor,
      }) => (
        <>
          <div
            className={s.root}
            style={{
              display: visible ? "block" : "none",
            }}
          >
            <div className={s.cvs}>
              {canvas}
              {/* {React.cloneElement(canvas, {
                ref
              })} */}
              <div
                className={s.bgcover}
                style={{
                  backgroundColor: bgColor,
                  opacity: bgAlph,
                }}
              />
            </div>
            <div className={s.handlebar}>
              {showBgConfig ? (
                <button onClick={toggleBackground}>设置</button>
              ) : (
                <div> &nbsp;</div>
              )}

              <div>
                <button onClick={() => setClearStamp(new Date().getTime())}>
                  清空
                </button>
                <button onClick={close}>关闭</button>
              </div>
              {!showBgConfig && (
                <div className={s.bgbar}>
                  &nbsp; 画笔 &nbsp;&nbsp;
                  <input
                    className={s.slider}
                    type="range"
                    min="1"
                    max="60"
                    value={initLineWidth}
                    onChange={onLinsize(setLineWidth)}
                  />{" "}
                  <span className={s.sliderblock}>({initLineWidth})</span>
                  &nbsp;&nbsp;
                  <input
                    className={s.color}
                    type="color"
                    value={initLineColor}
                    onChange={onLinColor(setColor)}
                  />{" "}
                  &nbsp; 透明度 &nbsp;&nbsp;
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
                  />{" "}
                  <button
                    onClick={toggleBackground}
                    className={showBgConfig ? "" : s.effectbtn}
                  >
                    确定
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    />
  );
};

export default Painter;

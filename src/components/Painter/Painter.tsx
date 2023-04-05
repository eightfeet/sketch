import React, { useCallback, useState } from "react";
import { ReactPainter } from "react-painter";
import s from "./Painter.module.scss";

interface Props {
  visible?: boolean;
  onClose?: () => void;
  onChange?: (data: { lineColor?: string; lineWidth?: number }) => void;
  defaultLineColor?: string;
  defaultLineWidth?: number;
}

const Painter: React.FC<Props> = ({
  visible,
  onClose,
  defaultLineColor = "#ff0000",
  defaultLineWidth = 3,
  onChange,
}) => {
  const [clearStamp, setClearStamp] = useState(new Date().getTime());
  const [initLineWidth, setInitLineWidth] = useState(defaultLineWidth);
  const [initLineColor, setInitLineColor] = useState(defaultLineColor);

  const close = useCallback(() => {
    onClose?.();
  }, [onClose]);

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
            style={{ display: visible ? "block" : "none" }}
          >
            <div className={s.cvs}>{canvas}</div>
            <div className={s.handlebar}>
              <div>
                粗细<span className={s.sliderblock}>({initLineWidth})</span>
                &nbsp;
                <input
                  className={s.slider}
                  type="range"
                  min="1"
                  max="60"
                  value={initLineWidth}
                  onChange={onLinsize(setLineWidth)}
                />{" "}
                &nbsp;
                <input
                  className={s.color}
                  type="color"
                  value={initLineColor}
                  onChange={onLinColor(setColor)}
                />{" "}
                &nbsp;&nbsp;
                <button onClick={triggerSave}>生成图片</button>
                {imageDownloadUrl ? (
                  <a href={imageDownloadUrl} download>
                    点击保存
                  </a>
                ) : null}
              </div>
              <div>
                <button onClick={() => setClearStamp(new Date().getTime())}>
                  清空
                </button>
                <button onClick={close}>关闭</button>
              </div>
            </div>
          </div>
        </>
      )}
    />
  );
};

export default Painter;

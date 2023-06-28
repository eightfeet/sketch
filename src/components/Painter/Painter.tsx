import React, { useCallback, useRef, useState } from "react";
import Canvas from "./Canvas";
import Eraser from "./Icons/Eraser";
import Pen from "./Icons/Pen";
import Fill from "./Icons/Fill";
import s from "./Painter.module.scss";
import Paint from "./Icons/Paint";
import Clear from "./Icons/Clear";
import ColorAndAlph from "./ColorAndAlph";
import Undo from "./Icons/Undo";
import Redo from "./Icons/Redo";

interface changeProps {
  color?: string;
  alph?: number;
  size?: number;
}

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
  historyRecords?: number;
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
  historyRecords = 10,
}) => {
  const [currentMode, setCurrentMode] = useState<"pen" | "eraser" | "fill">();
  const canvasRef = useRef<HTMLCanvasElement>();
  const [undoStack, setUndoStack] = useState<HTMLImageElement[]>([]);
  const [redoStack, setRedoStack] = useState<HTMLImageElement[]>([]);
  const [showClean, setShowClean] = useState(false);

  const close = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const onChangeBg = useCallback(
    ({ color, alph }: changeProps) => {
      onChange?.({ bgAlph: alph, bgColor: color });
    },
    [onChange]
  );

  const onChangePen = useCallback(
    ({ color, alph, size }: changeProps) => {
      onChange?.({ lineAlph: alph, lineColor: color, lineWidth: size });
    },
    [onChange]
  );

  const onChangeEraser = useCallback(
    ({ size, alph }: changeProps) => {
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

  const onStartDraw = useCallback(
    (canvas: HTMLCanvasElement) => {
      canvasRef.current = canvas;
      const dataurl = canvas.toDataURL();
      const img = new Image();
      img.src = dataurl;
      setUndoStack((undoStack) => [
        ...undoStack.slice(
          undoStack.length > historyRecords
            ? undoStack.length - historyRecords
            : 0,
          undoStack.length
        ),
        img,
      ]);
      setRedoStack([]);
    },
    [historyRecords]
  );

  const clean = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 10000, 10000);
  }, []);

  const drawImg = useCallback(
    (img: HTMLImageElement) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !img) return;
      clean();
      ctx.globalAlpha = 1;
      ctx.drawImage(img, 0, 0);
    },
    [clean]
  );

  const splitRecords = useCallback((records: HTMLImageElement[]) => {
    const record = records.slice(records.length - 1, records.length)[0];
    const restRecords = records.slice(0, records.length - 1);
    return {
      record,
      restRecords,
    };
  }, []);

  const undo = useCallback(
    (e: any) => {
      e.stopPropagation();
      const { record, restRecords } = splitRecords(undoStack);
      if (!record) return;
      setUndoStack([...restRecords]);
      setRedoStack([...redoStack, record]);
      drawImg(record);
    },
    [drawImg, redoStack, splitRecords, undoStack]
  );

  const redo = useCallback(
    (e: any) => {
      e.stopPropagation();
      const { record, restRecords } = splitRecords(redoStack);
      if (!record) return;
      setRedoStack([...restRecords]);
      setUndoStack([...undoStack, record]);
      drawImg(record);
    },
    [drawImg, redoStack, splitRecords, undoStack]
  );

  const handleClean = useCallback(() => {
    setShowClean(true);
  }, []);

  const onClean = useCallback(() => {
    clean();
    setShowClean(false);
  }, [clean]);

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
          <div className={`${s.icon}`} onClick={handleClean}>
            <Clear />
          </div>
          <div className={`${s.icon}`}>&nbsp;</div>
          <div
            style={{ opacity: undoStack.length ? 1 : 0.2 }}
            className={`${s.icon}`}
            onClick={undo}
          >
            <Undo />
          </div>
          <div
            style={{ opacity: redoStack.length ? 1 : 0.2 }}
            className={`${s.icon}`}
            onClick={redo}
          >
            <Redo />
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
      {showClean ? (
        <div className={s.cleanbox}>
          <div>
            <div className={s.clean}>清除画布</div>
            <div className={s.btnbar}>
              <div className={s.btn} onClick={onClean}>
                确定
              </div>
              <div className={s.btn} onClick={() => setShowClean(false)}>
                取消
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Canvas
        lineColor={lineColor}
        eraser={currentMode === "eraser"}
        lineWidth={lineWidth}
        lineAlph={lineAlph}
        eraserWidth={eraserWidth}
        bgColor={bgColor}
        bgAlph={bgAlph}
        eraserAlph={eraserAlph}
        onStartDraw={onStartDraw}
      />
    </div>
  );
};

export default Painter;

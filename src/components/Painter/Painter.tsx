import React, { useCallback, useRef, useState } from "react";
import Canvas from "./Canvas";
import Eraser from "./Icons/Eraser";
import Pen from "./Icons/Pen";
import Fill from "./Icons/Fill";
import s from "./Painter.module.scss";
import Clear from "./Icons/Clear";
import ColorAndAlph from "./ColorAndAlph";
import Undo from "./Icons/Undo";
import Redo from "./Icons/Redo";
import Close from "./Icons/Close";

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

const isDev = process.env.NODE_ENV === "development";

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
  historyRecords = 50,
}) => {
  const [currentMode, setCurrentMode] = useState<"pen" | "eraser" | "fill">();
  const canvasRef = useRef<HTMLCanvasElement>();
  const [undoStack, setUndoStack] = useState<HTMLImageElement[]>([]);
  const [redoStack, setRedoStack] = useState<HTMLImageElement[]>([]);
  const [showClean, setShowClean] = useState(false);
  const count = useRef(0);
  const currentStatus = useRef<"draw" | "undo" | "redo">("draw");
  const viewRef = useRef<HTMLDivElement>(null);

  const handleView = useCallback((img: HTMLImageElement) => {
    if (!isDev) return;
    if (viewRef.current) {
      viewRef.current.innerHTML = "";
      viewRef.current.append(img);
    }
  }, []);

  const handletestSel = useCallback(
    (index: number, type: "undo" | "redo") => {
      const img = type === "undo" ? undoStack[index] : redoStack[index];
      handleView(img);
    },
    [handleView, redoStack, undoStack]
  );

  const getCanvas = useCallback((cvs: HTMLCanvasElement) => {
    canvasRef.current = cvs;
  }, []);

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

  const getDataUrlToImg = useCallback((canvas: HTMLCanvasElement) => {
    const dataurl = canvas?.toDataURL();
    const img = new Image();
    img.src = dataurl;
    img.alt = `${count.current}`;
    return img;
  }, []);

  const handleRecord = useCallback(
    (cvs?: HTMLCanvasElement) => {
      if (!cvs) return;
      const img = getDataUrlToImg(cvs);
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
      handleView(img);
    },
    [getDataUrlToImg, handleView, historyRecords]
  );

  const onStartDraw = useCallback(
    (canvas: HTMLCanvasElement) => {
      handleRecord(canvas);
    },
    [handleRecord]
  );

  const onEndDraw = useCallback(
    (canvas: HTMLCanvasElement) => {
      count.current = count.current + 1;
      currentStatus.current = "draw";
      if (!canvas) return;
      const img = getDataUrlToImg(canvas);
      setRedoStack([img]);
    },
    [getDataUrlToImg]
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
      count.current = Number(img.alt);
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
    async (e: any) => {
      e.stopPropagation();
      let undoStackCopy = [...undoStack];
      currentStatus.current = "undo";
      const { record, restRecords } = splitRecords(undoStackCopy);
      if (!record) return;
      setUndoStack([...restRecords]);
      setRedoStack([record, ...redoStack]);
      drawImg(record);
    },
    [drawImg, redoStack, splitRecords, undoStack]
  );

  const redo = useCallback(
    (e: any) => {
      e.stopPropagation();
      currentStatus.current = "redo";
      const record = redoStack[0];
      const restRecords = redoStack.slice(1, redoStack.length);
      if (!record) return;
      setRedoStack([...restRecords]);
      setUndoStack([...undoStack, record]);
      drawImg(record);
    },
    [drawImg, redoStack, undoStack]
  );

  const handleClean = useCallback(() => {
    setShowClean(true);
  }, []);

  const onClean = useCallback(() => {
    clean();
    setShowClean(false);
  }, [clean]);

  // useEffect(() => {
  //     console.log(undoStack, redoStack);
  // }, [undoStack, redoStack]);

  return (
    <div className={s.root} style={{ display: visible ? "block" : "none" }}>
      <div className={s.toolbar}>
        <div className={s.switch}>
          <div className={`${s.icon}`} onClick={close}>
            <Close />
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
            style={{ opacity: redoStack.length >= 1 ? 1 : 0.2 }}
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
        onEndDraw={onEndDraw}
        getCanvas={getCanvas}
      />
      {isDev && (
        <div className={s.viewwrap}>
          <div className={s.sel}>
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handletestSel(Number(e.target.value), "undo")
              }
            >
              <option>undo</option>
              {undoStack.map((item, index) => (
                <option value={index} key={index}>
                  {index}
                </option>
              ))}
            </select>
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handletestSel(Number(e.target.value), "redo")
              }
            >
              <option>redo</option>
              {redoStack.map((item, index) => (
                <option value={index} key={index}>
                  {index}
                </option>
              ))}
            </select>
          </div>
          <div ref={viewRef} className={s.blocktest}></div>
        </div>
      )}
    </div>
  );
};

export default Painter;

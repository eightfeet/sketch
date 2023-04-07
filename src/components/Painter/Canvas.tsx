import React, { useRef, useEffect } from "react";
import { hex2rgba } from "./help";

interface CanvasProps {
  lineColor: string;
  eraser: boolean;
  lineWidth: number;
  bgColor?: string;
  bgAlph?: number;
}

const isMobileDevice = typeof window.ontouchstart !== "undefined";

const Canvas: React.FC<CanvasProps> = ({
  lineColor = "#f00",
  eraser = false,
  lineWidth = 20,
  bgColor = "#fff",
  bgAlph = 0.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    let isDrawing = false;

    function startDraw(e: any) {
      e.preventDefault();
      let x = 0;
      let y = 0;
      if (isMobileDevice) {
        // 获取第一个触点的坐标
        x = e.touches[0].clientX - e.target.offsetLeft;
        y = e.touches[0].clientY - e.target.offsetTop;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      // 开始绘制
      isDrawing = true;
      ctx!.beginPath();
      ctx!.moveTo(x, y);
    }

    function stopDraw() {
      isDrawing = false;
    }

    function draw(e: any) {
      e.preventDefault();

      if (!isDrawing) {
        return;
      }

      if (eraser) {
        ctx!.globalCompositeOperation = "destination-out";
        ctx!.lineWidth = lineWidth;
        ctx!.globalAlpha = 0.5;
      } else {
        ctx!.globalCompositeOperation = "source-over";
        ctx!.lineWidth = lineWidth;
        ctx!.strokeStyle = lineColor;
        ctx!.globalAlpha = 0.5;
      }

      let x = 0;
      let y = 0;
      if (isMobileDevice) {
        // 获取第一个触点的坐标
        x = e.touches[0].clientX - e.target.offsetLeft;
        y = e.touches[0].clientY - e.target.offsetTop;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      ctx!.lineTo(x, y);
      ctx!.stroke();
    }

    if (isMobileDevice) {
      canvas.addEventListener("touchstart", startDraw);
      canvas.addEventListener("touchend", stopDraw);
      canvas.addEventListener("touchmove", draw);
    } else {
      canvas.addEventListener("mousedown", startDraw);
      canvas.addEventListener("mouseup", stopDraw);
      canvas.addEventListener("mousemove", draw);
    }

    return () => {
      if (isMobileDevice) {
        canvas.removeEventListener("touchstart", startDraw);
        canvas.removeEventListener("touchend", stopDraw);
        canvas.removeEventListener("touchmove", draw);
      } else {
        canvas.removeEventListener("mousedown", startDraw);
        canvas.removeEventListener("mouseup", stopDraw);
        canvas.removeEventListener("mousemove", draw);
      }
    };
  }, [lineColor, eraser, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ backgroundColor: hex2rgba(bgColor, bgAlph) }}
    />
  );
};

export default Canvas;

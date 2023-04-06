import React, { useRef, useEffect } from "react";

interface CanvasProps {
  color: string;
  eraser: boolean;
  lineWidth: number;
}

const Canvas: React.FC<CanvasProps> = ({
  color = "#f00",
  eraser = false,
  lineWidth = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    let isDrawing = false;

    function startDraw(e: MouseEvent) {
      isDrawing = true;
      ctx!.beginPath();
      ctx!.moveTo(e.clientX, e.clientY);
    }

    function stopDraw() {
      isDrawing = false;
    }

    function draw(e: MouseEvent) {
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
        ctx!.strokeStyle = color;
        ctx!.globalAlpha = 0.5;
      }

      // ctx!.beginPath();
      // ctx!.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2);
      // ctx!.fill();

      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      ctx!.lineTo(e.clientX, e.clientY);
      ctx!.stroke();
    }

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mousemove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mousemove", draw);
    };
  }, [color, eraser, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default Canvas;

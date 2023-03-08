import React, { useCallback, useEffect, useRef, useState } from "react";
import s from "./Timer.module.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import dayjs from "dayjs";

interface Props {
  onComplete: () => void;
  frizeTime: dayjs.Dayjs;
  info?: string;
  onUpdate?: (remainingTime: number) => void;
}

const Timer: React.FC<Props> = ({ onComplete, frizeTime, info, onUpdate }) => {
  const { keepingTime } = useSelector((state: RootState) => state.dynamics);

  const [time, setTime] = useState<string>();

  const safeUpdateTime = useRef<() => void>();

  safeUpdateTime.current = useCallback(() => {
    const timeresult = frizeTime.add(keepingTime || 0, "minute");
    const result = dayjs.duration(timeresult.diff(dayjs()));
    if (result.hours() <= 0 && result.minutes() <= 0 && result.seconds() <= 0) {
      return;
    } else {
      setTime(result.format("HH:mm:ss"));
    }
  }, [frizeTime, keepingTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      safeUpdateTime.current?.();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [frizeTime, keepingTime]);

  const renderTime = useCallback(
    ({ remainingTime }: { remainingTime: number }) => {
      if (remainingTime === 0) {
        return <div className={s.timercount}>next</div>;
      }

      return (
        <div className={s.timercount}>
          <div className={s.index}>{info}</div>
          <div className={s.time}>{time}</div>
        </div>
      );
    },
    [info, time]
  );

  return (
    <CountdownCircleTimer
      isPlaying
      duration={(keepingTime || 0) * 60}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[60, 30, 20, 0]}
      trailColor={"rgba(144,144,144,0.5)"}
      size={70}
      strokeWidth={2}
      onComplete={onComplete}
      onUpdate={onUpdate}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
};

export default Timer;

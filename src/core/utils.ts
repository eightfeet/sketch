import { REHYDRATE, getStoredState } from "redux-persist";
import { persistConfig, persistor, store } from "~/store";
import { parse } from "query-string";
const { t } = parse(window.location.hash.split("?")[1] || "");
export const px2vw = (px: number): string => {
  const result = px / 7.5;
  return `${result}vw`;
};

export const getEnv: () => Promise<"wx" | "miniProgram" | "web"> = async () => {
  const ua = window.navigator.userAgent.toLowerCase();
  const env: "wx" | "miniProgram" | "web" = await new Promise((resolve) => {
    if (ua.indexOf("micromessenger") !== -1) {
      window?.wx?.miniProgram?.getEnv((res: any) => {
        if (res.miniprogram) {
          resolve("miniProgram");
        } else {
          resolve("wx");
        }
      });
    } else {
      resolve("web");
    }
  });
  return env;
};

export const onWindowfocus = () => {
  let timer = 0;

  const handleFocus = async () => {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(async () => {
      if (window.location.hash.indexOf("#/studying") >= 0) {
        const data = await getStoredState(persistConfig);
        store.dispatch({
          type: REHYDRATE,
          key: persistConfig.key,
          payload: data,
        });
      }
      persistor.persist();
    }, 50);
  };

  // Listen to visibilitychange and focus
  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("visibilitychange", handleFocus, false);
    window.addEventListener("focus", handleFocus, false);
    window.addEventListener("showpage", handleFocus, false);
  }

  return () => {
    // Be sure to unsubscribe if a new handler is set
    window.removeEventListener("visibilitychange", handleFocus);
    window.removeEventListener("focus", handleFocus);
    window.removeEventListener("showpage", handleFocus);
  };
};

export const onWindowblur = () => {
  const handleBlur = (e: any) => {
    persistor.pause();
    persistor.flush();
  };
  // Listen to visibilitychange and focus
  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("blur", handleBlur, false);
  }
  return () => {
    // Be sure to unsubscribe if a new handler is set
    window.removeEventListener("blur", handleBlur);
  };
};

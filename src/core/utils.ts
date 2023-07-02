import { REHYDRATE, getStoredState } from "redux-persist";
import { RootDispatch, persistConfig, persistor, store } from "~/store";
import { parse } from "query-string";
import licenseKey from "license-key-gen";

import { ModelType, Tags } from "~/types/models";
import dayjs from "dayjs";
const { t } = parse(window.location.hash.split("?")[1] || "");

export const px2vw = (px: number): string => {
  const result = px / 7.5;
  return `${result}vw`;
};

export const px2rem = (px: number): string => {
  const result = px / 31.25;
  return `${result}rem`;
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

export function arrivedTime(sec: number) {
  const current = new window.Date();
  return new Date((current.getTime() / 1000 + 60 * sec) * 1000);
}

export function ShowCountDown(arrivedTime: any) {
  let now = new Date();
  let endDate = arrivedTime;
  let leftTime = endDate.getTime() - now.getTime();
  let leftsecond = parseInt(`${leftTime / 1000}`, 0);
  let day1 = Math.floor(leftsecond / (60 * 60 * 24));
  let hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
  let minute = Math.floor(
    (leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60
  );
  let second = Math.floor(
    leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60
  );
  const result =
    (hour >= 10 ? hour : "0" + hour) +
    ":" +
    (minute >= 10 ? minute : "0" + minute) +
    ":" +
    (second >= 10 ? second : "0" + second);

  return result;
}

export const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
  navigator.userAgent
);

export const filterModel = (models: ModelType[], condition: Tags[]) => {
  const data: ModelType[] = [];
  // 无过滤时直接返回数据
  if (!condition.length) return models;
  models.forEach((item) => {
    let inCondition: boolean = true;
    condition.forEach((element) => {
      if (!item.tags?.includes(element)) {
        inCondition = false;
      }
    });
    if (inCondition === true) data.push(item);
  });
  return data;
};

export const getImagePath = (item: ModelType) => {
  const num = item.from.replace(/[^0-9]*/, "");
  let rootPath = process.env[`REACT_APP_MPATH_M${num}`]!;
  const smallPath = `${rootPath}${item.from === "md1" ? "models/" : "small/"}`;
  rootPath = `${rootPath}${item.from === "md1" ? "models/" : ""}`;
  return {
    root: rootPath,
    small: smallPath,
  };
};

export const baseLicense = {
  prodCode: "ART",
  appVersion: "1.0",
  osType: "IOS8",
};

const tamp = "TVRJek5EVTJONQ==";
const ndmap = window.btoa(
  `{${window
    .atob(tamp)
    .split("")
    .map((el, i) => `"${i}":"${el}"`)
    .join(",")}}`
);

export const encodeDate = (license: string, date: string) => {
  const licenseArr = license.split("-");
  const dateArr = dayjs(date)
    .format("YYMMDD")
    .split("")
    .map((item) => JSON.parse(window.atob(ndmap))?.[item]);
  return licenseArr
    .map((item, index) => {
      const el = `${dateArr[index]}${item}`;
      return el;
    })
    .join("-");
};

export const decodeDate = (license: string) => {
  const licenseArr = license.split("-");
  const md = JSON.parse(window.atob(ndmap));
  let date = [md[2], md[0]].join("");
  const lice = licenseArr
    .map((item, index) => {
      date = `${date}${index && index % 2 === 0 ? "/" : ""}${item.slice(0, 1)}`;
      const el = item.slice(1, item.length);
      return el;
    })
    .join("-");
  return {
    date,
    lice,
  };
};

export const dec = (license: string) => {
  const { lice: l, date } = decodeDate(license);
  const md = JSON.parse(window.atob(ndmap));
  const inmap: { [key: string]: any } = {};
  for (const key in md) {
    if (Object.prototype.hasOwnProperty.call(md, key)) {
      const element = md[key];
      inmap[element] = key;
    }
  }

  const e = date
    .split("")
    .map((item) => {
      if (inmap[item] !== undefined) {
        return inmap[item];
      }
      return item;
    })
    .join("");
  return {
    e,
    l,
  };
};

export const auth = async (name: string, license: string) => {
  const { e, l } = dec(license);
  if (dayjs(e).isBefore(dayjs())) {
    return Promise.reject(
      "%E6%BF%80%E6%B4%BB%E7%A0%81%E5%B7%B2%E8%BF%87%E6%9C%9F"
    );
  }

  const licData = {
    ...baseLicense,
    info: { name } as any,
  };

  const validate = (await licenseKey.validateLicense(licData, l)) as any;
  if (validate.errorCode === 0) {
    console.log("33333");

    store.dispatch({
      type: "runtime/set",
      payload: {
        name: "auth",
        value: true,
      },
    });
    return Promise.resolve();
  }

  return Promise.reject(
    "%E6%BF%80%E6%B4%BB%E7%A0%81%E6%88%96%E7%94%A8%E6%88%B7%E5%90%8D%E6%9C%89%E8%AF%AF%EF%BC%8C%E8%AF%B7%E9%87%8D%E8%AF%95%EF%BC%81"
  );
};

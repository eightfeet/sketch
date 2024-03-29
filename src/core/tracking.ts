/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
/* eslint-disable no-underscore-dangle */
import loadScript from "./loadScript";

declare global {
  interface Window {
    _hmt: any[];
  }
}

/**
 * 百度统计代码
 */
window._hmt = window._hmt || [];
window._hmt.push(["_setAutoPageview", false]);
loadScript(`https://hm.baidu.com/hm.js?${process.env.REACT_APP_BD_STATISTISC}`);

/**
 * 设置统计账号
 */
export function setAccount(siteId: string) {
  if (process.env.NODE_ENV !== "production") {
    console.info("设置统计账号：" + siteId);
  }
  window._hmt.push(["_setAccount", siteId]);
}

/**
 * 统计页面PV/UV
 */
export function trackPageView(...params: any[]) {
  if (process.env.NODE_ENV !== "production") {
    if (!params || params.length === 0) {
      console.error("PV/UV统计: 页面地址不能为空");
    } else if (params.length > 1) {
      console.warn(`PV/UV统计: ${params[0]}，其余参数将被省略`);
    } else {
      console.info(`PV/UV统计: ${params[0]}`);
    }
  }
  window._hmt.push(["_trackPageview", ...params]);
}

/**
 * 统计事件PV/UV
 */
export function trackEvent(...params: any[]) {
  if (process.env.NODE_ENV !== "production") {
    if (!params) {
      console.error("事件跟踪: 事件标签不能为空");
    } else if (params.length > 3) {
      console.error("事件跟踪: 事件标签数量不能超过3个");
    } else {
      console.info(`事件跟踪: ${JSON.stringify(params.slice(0, 3))}`);
    }
  }
  console.log(params);
  window._hmt.push(["_trackEvent", ...params]);
}

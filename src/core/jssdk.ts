import Defer from "~/core/defer";
import { jsSDk } from "~/api/common";
const cached: any = {};

export async function config(jsApiList: string[]) {
  const url = window.location.href;
  if (cached[url]) {
    return cached[url].promise;
  }

  cached[url] = new Defer();
  const deferred = cached[url];
  const page = window.location.href.split("#")[0];

  const [params] = await Promise.all([jsSDk(page)]);

  if (!window.wx) {
    throw new Error("Loading Weixin JSSDK failed.");
  }

  window.wx.config({
    debug: false,
    appId: params.appId,
    timestamp: params.timestamp,
    nonceStr: params.nonceStr,
    signature: params.signature,
    jsApiList,
  });

  window.wx.ready(deferred.resolve);
  window.wx.error(deferred.reject);

  return deferred.promise;
}

/**
 * Scan QrCode
 *
 * @returns {Promise}
 */
export function scanQrCode(): Promise<string> {
  return new Promise((resolve) => {
    window.wx.scanQRCode({
      needResult: 1,
      scanType: ["qrCode"],
      success(res: any) {
        resolve(res.resultStr);
      },
    });
  });
}

export async function wechat() {
  config(["scanQRCode", "openLocation"])
    .then(() => {
      console.log("WeiXin JSSDK Ready.");
    })
    .catch((err) => {
      console.error("WeiXin JSSDK Error!");
      console.error(err);
    });
}

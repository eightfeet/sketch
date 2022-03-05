declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}
interface Window {
  wx: any;
}

declare const WeixinJSBridge: any;

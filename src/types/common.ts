export const enum ChannelType {
  "终端门店(APP)" = 1,
  "终端门店POS" = 2,
  "YYJ" = 3,
  "微信" = 4,
  "CRM" = 5,
  "会员店平台" = 6,
  "电话" = 7,
  "二维码" = 8,
  "瓶盖防伪" = 9,
  "条形码" = 10,
  "H5页面" = 11,
  "短信" = 12,
  "PC官网" = 13,
  "手机官网" = 14,
  "夺宝奇兵小程序" = 15,
  "公众号联运" = 16,
  "营养家小程序" = 17,
  "终端自助码" = 18,
  "营养管家小程序" = 19,
  "服用提醒小程序" = 20,
  "福码渠道" = 21,
  "YOU营养小程序" = 21,
  "健康通小程序" = 22,
}

export const BrandNameType = {
  TCBJ: "汤臣倍健",
  JLD: "健力多",
  WXN: "无限能",
  JAS: "健安适",
};

export const enum QrResultType {
  Success = 1,
  Fail = 0,
}

export const enum OptionStatus {
  Correct = 1,
  Error = 0,
}

export enum QuestionType {
  "单选题" = 1,
  "判断题" = 2,
  "多选题" = 3,
}

export enum Level {
  One = 1,
  Two = 2,
  Three = 3,
}

export enum ExerciseLevelName {
  "基础题" = 1,
  "学霸题" = 2,
  "学神题" = 3,
}
export enum SubmitType {
  Normal = 1,
  Force = 2,
  Server = 3,
}

export enum ExamStatus {
  Begin = 0,
  Running = 1,
  End = 2,
}

export enum NavigateType {
  Navigate = "navigateTo",
  Redirect = "redirectTo",
  Swtich = "swtichTo",
}

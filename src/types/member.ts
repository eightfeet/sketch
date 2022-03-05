/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

/**
 * 性别
 */
export const enum Gender {
  /**
   * 未知
   */
  Unknown = 0,
  /**
   * 男
   */
  Male = 1,
  /**
   * 女
   */
  Female = 2,
}

/**
 * 会员类型
 */
export const enum MemberType {
  /**
   * 粉丝
   */
  Fans = 0,
  /**
   * 消费者
   */
  Consumer = 1,
  /**
   * 内部人员
   */
  Employee = 2,
  /**
   * 同时是消费者和内部人员
   */
  ConsumerAndEmployee = 3,
}

export const enum MemberStatus {
  /**
   * 未激活
   */
  None = 0,
  /**
   * 已激活
   */
  Enabled = 1,
  /**
   * 已停用
   */
  Disabled = 2,
  /**
   * 已注销
   */
  Cancelled = -1,
}

export interface MemberInfo {
  /**
   * 员工ID (店员ID)
   */
  memberId: number;
  /**
   * 员工名称
   */
  memberName: string;
  /**
   * 会员手机号
   */
  mobilePhone: string;
  /**
   * 性别
   */
  gender: Gender;
  /**
   * 用户类型
   */
  memberType: MemberType;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 用户头像（URL）
   */
  headimg?: string;
  /**
   * 可用汤币
   */
  availableMoney: number;
  /**
   * 冻结汤币
   */
  freezingMoney: number;
  /**
   * 创建时间（ISO 8601）
   */
  createTime: string;
  /**
   * 更新时间（ISO 8601）
   */
  updateTime: string;
  /**
   * 店员状态
   */
  status: MemberStatus;

  /**
   * 机构ID (门店ID)
   */
  orgId?: string;
  /**
   * 机构编号 (门店编号)
   */
  orgNo?: string;
  /**
   * 机构名称 (门店名称)
   */
  orgName?: string;
  /**
   * 店员角色
   */
  roles: MemberRoles[];

  // [key: string]: any;
}

export enum MemberRoles {
  /**
   * 店员
   */
  Clerk = 1,
  /**
   * 店长
   */
  Manager = 2,
}

/**
 * 授权方式
 */
export interface AuthInfo {
  authId: number;
  memberId: number;
  identityType: AuthType;
  identityTypeName: string;
  identity: string;
  credential: string;
  isVerified: boolean;
  isEnable: 0 | 1;
}

export enum AuthType {
  PHONE = "PHONE",
  WECHAT_YYJ = "WECHAT_YYJ",
  APPLET_YYGJ = "APPLET_YYGJ",
  APPLET_MARKTCNTER = "APPLET_MARKTCNTER",
}

export interface TeamInfo {
  id: number;
  name: string;
  nameEn: string;
  parentid: number;
  order: number;
  department: string;
  districtId: string;
}

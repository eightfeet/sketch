/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { scrm, saas } from "~/core/request";
import { MemberInfo } from "~/types/member";

/**
 * JWT Token授权登录
 */
export function jwtAuth(jwtToken: string) {
  return scrm.get<MemberInfo>("/employee/findEmployeeByJwt", {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
}

export interface loginSaasResult {
  /**学员id */
  studentId: number;
  /**学员名称 */
  studentName: string;
  /**学员电话 */
  phone: string;
  /**学员部门id */
  deptId: number;
  /**学员部门编号 */
  deptNo: string;
  /**学员部门名称 */
  deptName: string;
  /**外部系统id，scrm对应memberId */
  externalId: number;
  /**学员头像 */
  headUrl: string;
  /**租户id */
  tenantId: number;
  /**study token */
  token: string;
}

/**
 * 登录培训系统
 * @param scrmToken scrm jwt
 * @param tenantId 租户id
 */
export function loginSaas(scrmToken: string, tenantId: number) {
  return saas.post<loginSaasResult>(
    "/training/h5/auth/loginByJwt",
    {
      scrmToken: `Bearer ${scrmToken}`,
      tenantId,
    },
    {
      authToken: false,
    }
  );
}

/**
 * 微信授权登录
 */
export function wxAuth(params: {
  code: string;
  state: string;
  accountType?: string;
  source?: string;
}) {
  return scrm.post<MemberInfo & { identity: string; authToken: string }>(
    "/auth/employee/loginByWechatOauth",
    {
      accountType: params.accountType,
      code: params.code,
      state: params.state,
      sourceFrom: params.source,
      autoCreateFans: false,
    }
  );
}

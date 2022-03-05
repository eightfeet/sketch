/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { createModel } from "@rematch/core";
import produce from "immer";
import { jwtAuth, loginSaas, loginSaasResult, wxAuth } from "~/api/member";
import { RootModel } from "~/models";
import { MemberInfo } from "~/types/member";

type MemberState = {
  isAuthenticated: boolean;
  jwtToken?: string;
  info?: MemberInfo;
  studientInfo?: loginSaasResult;
};

const INITIAL_STATE: MemberState = {
  isAuthenticated: false,
};

export const member = createModel<RootModel>()({
  state: INITIAL_STATE,

  reducers: {
    login: produce(
      (
        _: MemberState,
        payload: {
          info: MemberInfo;
          jwtToken?: string;
          studientInfo?: loginSaasResult;
        }
      ) => {
        return {
          isAuthenticated: true,
          jwtToken: payload.jwtToken,
          info: payload.info,
          studientInfo: payload.studientInfo,
        };
      }
    ),
    logout: () => INITIAL_STATE,
  },

  effects: (dispatch) => ({
    async loginByToken({
      jwtToken,
      tenantId,
    }: {
      jwtToken: string;
      tenantId: number;
    }) {
      try {
        const member = await jwtAuth(jwtToken);
        const studient = await loginSaas(jwtToken, tenantId);
        if (studient.token) sessionStorage.setItem("authToken", studient.token);
        dispatch.member.login({
          info: member,
          jwtToken: jwtToken,
          studientInfo: studient,
        });
        return member;
      } catch (error) {
        dispatch.member.logout();
        console.error(error);
      }
    },

    async loginByWechat({
      state,
      code,
    }: {
      code: string;
      state: string;
      userLogin?: boolean;
    }) {
      const member = await wxAuth({ state, code });
      dispatch.member.login({
        info: member,
        jwtToken: member.authToken,
      });
      return member;
    },
  }),
});

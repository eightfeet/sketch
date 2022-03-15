/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { createModel } from "@rematch/core";
import produce from "immer";
import { RootModel } from "~/models";
import { ModelType } from "~/types/models";

import defaultmodelList from "./../models/defaultmd.json";

export interface PictureFilter {
  /**横向 */
  isX?: boolean;
  /**纵向 */
  isY?: boolean;
}

export interface ModelFilter {
  /**着衣 */
  isClothes?: boolean;
  /**人体 */
  isBody?: boolean;
  /**女性 */
  isMale?: boolean;
  /**男性 */
  isFemale?: boolean;
  /**头像 */
  isHeader?: boolean;
  /**手足 */
  isHandsFeet?: boolean;
  /**静物 */
  isStill?: boolean;
}

type DynamicsState = {
  modelList: ModelType[];
  pictureList: ModelType[];
  keepingTime?: number;
  pictureFilter: PictureFilter;
  modelFilter: ModelFilter;
};

const INITIAL_STATE: DynamicsState = {
  modelList: [],
  pictureList: [],
  keepingTime: 5,
  pictureFilter: {
    isX: true,
    isY: true,
  },
  modelFilter: {
    isMale: false,
    isFemale: false,
    isClothes: true,
    isBody: false,
    isHeader: false,
    isHandsFeet: false,
    isStill: false,
  },
};

export const dynamics = createModel<RootModel>()({
  state: {
    ...INITIAL_STATE,
    modelList: defaultmodelList,
  },
  reducers: {
    init() {
      return INITIAL_STATE;
    },
    initModelList: produce((state: DynamicsState) => {
      return {
        ...state,
        modelList: INITIAL_STATE.modelList,
      };
    }),
    setModelList: produce((state: DynamicsState, payload: ModelType[]) => {
      return {
        ...state,
        modelList: payload,
      };
    }),
    onToggleModelList: (
      { modelList, ...other }: DynamicsState,
      payload: ModelType
    ) => {
      const isSelect = modelList.some(
        (sitem) => sitem.imgUrl === payload.imgUrl
      );
      if (isSelect) {
        modelList = modelList.filter((item) => item.imgUrl !== payload.imgUrl);
      } else {
        modelList = modelList.concat([payload]);
      }
      return {
        ...other,
        modelList,
      };
    },
    setPictureList: produce((state: DynamicsState, payload: ModelType[]) => {
      return {
        ...state,
        pictureList: payload,
      };
    }),

    initPictureList: produce((state: DynamicsState) => {
      return {
        ...state,
        pictureList: INITIAL_STATE.pictureList,
      };
    }),

    onTogglePictureList: (
      { pictureList, ...other }: DynamicsState,
      payload: ModelType
    ) => {
      const isSelect = pictureList.some(
        (sitem) => sitem.imgUrl === payload.imgUrl
      );
      if (isSelect) {
        pictureList = pictureList.filter(
          (item) => item.imgUrl !== payload.imgUrl
        );
      } else {
        pictureList = pictureList.concat([payload]);
      }
      return {
        ...other,
        pictureList,
      };
    },

    setKeepingTime: (
      { keepingTime, ...other }: DynamicsState,
      payload: number | undefined
    ) => {
      return {
        ...other,
        keepingTime: payload,
      };
    },

    setPictureFilter: (
      { pictureFilter, ...other }: DynamicsState,
      payload: PictureFilter
    ) => {
      return {
        ...other,
        pictureFilter: { ...pictureFilter, ...payload },
      };
    },

    setModelFilter: (
      { modelFilter, ...other }: DynamicsState,
      payload: ModelFilter
    ) => {
      return {
        ...other,
        modelFilter: { ...modelFilter, ...payload },
      };
    },
  },
});

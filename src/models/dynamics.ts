/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { createModel } from "@rematch/core";
import produce from "immer";
import { RootModel } from "~/models";
import { ModelType, Tags } from "~/types/models";

export type PictureFilter = Tags[];

export type ModelFilter = Tags[];

type DynamicsState = {
  modelList: ModelType[];
  pictureList: ModelType[];
  keepingTime?: number;
  pictureFilter: Tags[];
  modelFilter: Tags[];
};

const INITIAL_STATE: DynamicsState = {
  modelList: [],
  pictureList: [],
  keepingTime: 5,
  pictureFilter: [],
  modelFilter: [Tags.着衣],
};

export const dynamics = createModel<RootModel>()({
  state: INITIAL_STATE,
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
      payload: Tags[]
    ) => {
      return {
        ...other,
        pictureFilter: payload,
      };
    },

    setModelFilter: (
      { modelFilter, ...other }: DynamicsState,
      payload: Tags[]
    ) => {
      return {
        ...other,
        modelFilter: payload,
      };
    },
  },
});

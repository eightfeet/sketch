/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { createModel } from "@rematch/core";
import produce from "immer";
import { RootModel } from "~/models";
import { ModelType } from "~/types/models";

type DynamicsState = {
  modelList: ModelType[];
  pictureList: ModelType[];
};

const INITIAL_STATE: DynamicsState = {
  modelList: [],
  pictureList: [],
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
      { pictureList, modelList }: DynamicsState,
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
        pictureList,
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
      { pictureList, modelList }: DynamicsState,
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
        modelList,
        pictureList,
      };
    },
  },
});

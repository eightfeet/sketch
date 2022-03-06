/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { createModel } from "@rematch/core";
import produce from "immer";
import { RootModel } from "~/models";

type RuntimeState = {
  [key: string]: any;
};

const INITIAL_STATE: RuntimeState = {};

export const runtime = createModel<RootModel>()({
  state: INITIAL_STATE,

  reducers: {
    init() {
      return INITIAL_STATE;
    },
    set: produce(
      (state: RuntimeState, { name, value }: { name: string; value: any }) => {
        if (value === undefined) {
          delete state[name];
        } else {
          state[name] = value;
        }
      }
    ),
  },
});

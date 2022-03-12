import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import { getPersistor } from "@rematch/persist";
import { createLogger } from "redux-logger";
import { models, RootModel } from "./models";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

export const initStore = () => {
  const persistConfig = {
    key: `sketch-persist`,
    storage,

    stateReconciler: hardSet,
  };

  const store = init({
    redux: {
      middlewares:
        process.env.NODE_ENV === "development" ? [createLogger()] : [],
    },
    models,
    plugins: [persistPlugin(persistConfig) as any],
  });
  const persistor = getPersistor();

  return {
    persistConfig,
    store,
    persistor,
  };
};

const { persistConfig, store, persistor } = initStore();

export { persistConfig, store, persistor };

export type RootStore = typeof store;
export type RootDispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

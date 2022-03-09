import { Models } from "@rematch/core";
import { dynamics } from "./dynamics";
import { runtime } from "./runtime";
export interface RootModel extends Models<RootModel> {
  runtime: typeof runtime;
  dynamics: typeof dynamics;
}

export const models: RootModel = {
  runtime,
  dynamics,
};

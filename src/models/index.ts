import { Models } from "@rematch/core";
import { dynamics } from "./dynamics";
import { member } from "./member";
import { runtime } from "./runtime";
export interface RootModel extends Models<RootModel> {
  member: typeof member;
  runtime: typeof runtime;
  dynamics: typeof dynamics;
}

export const models: RootModel = {
  member,
  runtime,
  dynamics,
};

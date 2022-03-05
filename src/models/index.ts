import { Models } from "@rematch/core";
import { member } from "./member";
import { runtime } from "./runtime";
export interface RootModel extends Models<RootModel> {
  member: typeof member;
  runtime: typeof runtime;
}

export const models: RootModel = {
  member,
  runtime,
};

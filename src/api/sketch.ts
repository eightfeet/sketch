import { sketch } from "~/core/request";
import { store } from "~/store";

export function queryPicByModelId(index: number) {
  const { mdId } = store.getState().dynamics?.modelList?.[index] || {};
  if (!mdId) return Promise.reject("没有更多了");
  const id = mdId?.replace("md", "");
  return sketch.get<any>(`/models/models${id}.json`);
}

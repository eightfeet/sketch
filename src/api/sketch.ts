import { sketch } from "~/core/request";
import { store } from "~/store";
import { ModelType } from "~/types/models";

export function queryPicByModelId(index: number) {
  const { mdId } = store.getState().dynamics?.modelList?.[index] || {};
  if (!mdId) return Promise.reject("没有更多了");
  const id = mdId?.replace("md", "");
  return sketch.get<ModelType[]>(`/models/models${id}.json`);
}

export function queryContByPage(page: number, total: number) {
  if (page > total) return Promise.reject("没有更多了");
  return sketch.get<ModelType[]>(`/contents/modelsIndex_${page}.json`);
}

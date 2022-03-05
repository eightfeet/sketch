import { saas } from "~/core/request";
import { RankItem } from "~/types/rank";

function filterGroup(params: {
  id: number;
  pageNum?: number;
  startTime: string;
  endTime: string;
}) {
  return {
    filterGroup: {
      rules: [
        {
          field: "project_id",
          operate: "equal",
          value: params.id,
          type: "Int",
        },
        {
          field: "create_time",
          operate: "greaterorequal",
          value: params.startTime,
          type: "String",
        },
        {
          field: "create_time",
          operate: "lessorequal",
          value: params.endTime,
          type: "String",
        },
      ],
      operate: "and",
    },
    pageNum: params.pageNum || 1,
    pageSize: 10,
    totalCount: true,
  };
}

function reponseData(res: { data: RankItem[] }) {
  return res.data;
}
export const getTotalExerciseRank = (params: {
  id: number;
  pageNum: number;
  startTime: string;
  endTime: string;
}) => {
  return saas
    .post<{ data: RankItem[] }>(
      "/training/h5/exercise/totalRank",
      filterGroup(params)
    )
    .then(reponseData);
};

export const getPersonalExerciseRank = (params: {
  id: number;
  pageNum?: number;
  startTime: string;
  endTime: string;
}) => {
  return saas.post<RankItem>(
    "/training/h5/exercise/personalRank",
    filterGroup(params)
  );
};

export const getTotalCourseRank = (params: {
  id: number;
  pageNum: number;
  startTime: string;
  endTime: string;
}) => {
  return saas
    .post<{ data: RankItem[] }>(
      "/training/h5/course/totalRank",
      filterGroup(params)
    )
    .then(reponseData);
};

export const getPersonalCourseRank = (params: {
  id: number;
  pageNum?: number;
  startTime: string;
  endTime: string;
}) => {
  return saas.post<RankItem>(
    "/training/h5/course/personalRank",
    filterGroup(params)
  );
};

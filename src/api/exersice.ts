import { saas } from "~/core/request";
import { Level, OptionStatus } from "~/types/common";
import { Question, Result } from "~/types/question";

function transformerQuestion(item: Question): Question {
  const result = item.result || [];
  return {
    ...item,
    options:
      item?.items?.map((x: string, ind: number) => ({
        name: x,
        correct: result[ind] ? OptionStatus.Correct : OptionStatus.Error,
      })) || [],
  };
}
export function getQuestionList(params: { projectId: number; level: Level }) {
  return saas
    .post<{ code: number; data: Array<Question> }>(
      "/training/h5/exercise/getQuestionList",
      params
    )
    .then((res) => res.data.map((item) => transformerQuestion(item)));
}
export interface SubmitExerciseParams {
  studentId: number;
  projectId: number;
  level: number;
  data: Array<string>;
}
export function submitExercise(params: SubmitExerciseParams) {
  return saas.post<Array<Question>>("/training/h5/exercise/submit", params);
}

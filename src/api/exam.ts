import { saas } from "~/core/request";
import { ExamInfo, ExamItem, ExamRankItem } from "~/types/exam";
import { Question } from "~/types/question";

function transformerQuestion(item: Question): Question {
  return {
    ...item,
    options:
      item?.items?.map((x: string, ind: number) => ({
        name: x,
      })) || [],
  };
}

export function getExamAnswerInfo(params: {
  examId: number;
  studentId: number;
}) {
  return saas.post<{ anwserInfo: string }>(
    "/training/h5/exam/getTmpSubmit",
    params
  );
}

export function submitTempExamInfo(params: {
  studentExamId: number;
  examId: number;
  studentId: number;
  projectId: number;
  answerInfo: string[];
}) {
  return saas.post<{ answerInfo: string }>(
    "/training/h5/exam/tmpSubmit",
    params
  );
}

export function submitExamInfo(params: {
  examId: number;
  studentId: number;
  projectId: number;
  submitType: number; // 1:正常交卷；2：强制交卷；3：后台自动交卷
  answerInfo: string[];
}) {
  return saas.post<{ answerInfo: string }>("/training/h5/exam/submit", params);
}

export function getQuestionList(params: {
  examId: number;
  studentId: number;
  projectId: number;
}) {
  return saas
    .post<{
      data: {
        currentTime: string;
        totalUseTime: number;
        examStartTime: string;
        isFirst: boolean;
        questionList: Array<Question>;
      };
    }>("/training/h5/exam/getExamQuestionList", params)
    .then((res) => ({
      ...res.data,
      questionList: res.data.questionList.map((t) => transformerQuestion(t)),
    }));
}

export function getExamInfo(params: {
  studentId: number;
  examId: number;
  projectId: number;
}) {
  return saas
    .post<{ code: number; data: ExamInfo }>("/training/h5/exam/index", params)
    .then((res) => res.data);
}

export function getExamList(params: { projectId: number; studentId: number }) {
  return saas.post<Array<ExamItem>>(
    "/training/h5/trainingProject/getExamList",
    params
  );
}

export function getExamRank(params: {
  examId: number;
  pageSize: number;
  pageIndex: number;
}) {
  return saas
    .post<{ data: Array<ExamRankItem> }>("/training/h5/exam/examRank", params)
    .then((res) => res.data);
}

export function getPersonalExamRank(params: {
  examId: number;
  studentId: number;
}) {
  return saas
    .post<{ data: ExamRankItem }>("/training/h5/exam/exam4StudentRank", params)
    .then((res) => res.data);
}

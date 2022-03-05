import { ExamStatus } from "./common";

export interface ExamItem {
  id: number;
  name: string;
  endTime: string;
  isEnd: number; // 0: 没有结束；1：已经结束
  submitTime: string;
  startTime: string;
  studentExamStatus: number;
}

export interface ExamInfo {
  title: string;
  status: ExamStatus;
  startTime: string;
  endTime: string;
  single: number;
  multi: number;
  judge: number;
  score: number;
  useTime: number;
  totalScore: number;
  studentExamId: number;
  currentTime: string;
  totalUseTime: number; // 单位分钟
  examStartTime: string;
  examSubmitTime: string;
  tips: string;
}

export interface ExamRankItem {
  studentName: string;
  headUrl: string;
  score: number;
  useTime: number;
  rank: number;
}

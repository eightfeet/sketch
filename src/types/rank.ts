export interface StudentInfo {
  studentName: string;
  score: number;
  useTime: number;
  ranking: number;
}

export interface RankItem {
  studentId: number;
  totalCount: number; //总题数
  rightCount: number; //正确数
  rank: number; //排名
  studentName: string; //学生名称
  headUrl: string; //头像
  rightRate: number; //正确率 百分比值
  totalTime: number; //总耗时
  maxTime: string;
}

import { OptionStatus, QuestionType } from "./common";
export interface Question {
  title: string;
  type: QuestionType;
  options: Array<Option>;
  tips: string;
  id?: number;
  items?: Array<string>;
  result?: Array<number>;
}

export interface Option {
  name?: string;
  select?: boolean;
  correct?: OptionStatus;
}

export interface Result {
  id: number;
  flag: number;
}

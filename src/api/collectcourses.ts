import { saas } from "~/core/request";

interface saveStudentProjectParame {
  /**学员id */
  studentId: number;
  /**培训项目id */
  projectId: number;
  /**部门id */
  deptId: number;
  /**部门编号 */
  deptNo: string;
}

export const saveStudentProject = (parame: saveStudentProjectParame) => {
  return saas.post("/training/h5/studentProject/save", parame);
};

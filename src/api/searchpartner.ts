import { saas } from "~/core/request";

interface TraniningProjectDeptQueryParame {
  /**培训项目id*/
  projectId: number;
  /**连锁名称，搜索时使用（非必传）*/
  deptName?: string;
}

export interface TraniningProjectDeptQueryResult {
  id: number;
  /**连锁编号 */
  deptNo: string;
  /**连锁名称 */
  deptName: string;
  superiorDeptNo: string;
  superiorDeptName: string;
  externalId: string;
  tenantId: number;
  status: number;
}

export const traniningProjectDeptQuery = (
  parame: TraniningProjectDeptQueryParame
) => {
  return saas.post<TraniningProjectDeptQueryResult[]>(
    "/training/h5/trainingProject/traniningProjectDeptQuery",
    parame
  );
};

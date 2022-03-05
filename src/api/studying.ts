import dayjs from "dayjs";
import { saas } from "~/core/request";

interface getRecommendedCourseParame {
  pageNum?: number;
  pageSize?: number;
  /**按创建时间排序 1:倒序，0：升序*/
  rule?: number;
  tenantId: number;
}

export interface getRecommendedCourseResultCourse {
  id: number;
  /**课程名称 */
  courseName: string;
  /**课程类目id */
  courseTypeId: number;
  /**创建时间 */
  createTime: string;
  /**更新时间 */
  updateTime: string;
  /**开始时间 */
  startTime: string;
  /**结束时间 */
  endTime: string;
  /**封面 */
  imageUrl: string;
  /**视频 */
  videoUrl: string;
  status: 1;
  /**课程描述 */
  description: string;
}

interface getRecommendedCourseResult {
  course: getRecommendedCourseResultCourse[];
}

export const getRecommendedCourse = (parame: getRecommendedCourseParame) => {
  const tenantId = parame.tenantId;
  const rules = [];

  if (tenantId)
    rules.push({
      field: "c.tenant_id",
      operate: "equal",
      value: `${tenantId}`,
      type: "Int",
    });

  return saas.post<getRecommendedCourseResult>(
    "/training/h5/course/getRecommendedCourse",
    {
      filterGroup: {
        rules,
      },
      pageNum: parame.pageNum || 1,
      pageSize: parame.pageSize || 10,
      orders: [
        {
          orderKey: "c.start_time", //按创建时间排序
          rule: parame.rule ?? 0, //1:倒序，0：升序
        },
      ],
    }
  );
};

export enum ProjectTimes {
  历史 = 0,
  正在进行 = 1,
  全部 = 2,
}

export interface queryPageStudentProjectParame {
  /**学院id */
  studentId: number;
  /**查询历史 */
  times?: ProjectTimes;
  pageNum?: number;
  pageSize?: number;
}

interface queryPageStudentProjectResultProject {
  /**项目id */
  projectId: number;
  /**项目名 */
  projectName: string;
  /**开始时间 */
  startTime: string;
  /**结束时间 */
  endTime: string;
  /**创建时间 */
  createTime: string;
}

export interface queryPageStudentProjectResult {
  data: queryPageStudentProjectResultProject[];
  totalCount: number;
}

export const queryPageStudentProject = ({
  studentId,
  times = ProjectTimes.正在进行,
  pageNum,
  pageSize,
}: queryPageStudentProjectParame) => {
  const rules: any[] = [
    {
      field: "student_id", //不传查全部
      operate: "equal",
      value: studentId,
      type: "Int",
    },
    {
      field: "status", //状态，1：正常，-1：下线  默认传：1
      operate: "equal",
      value: 1,
      type: "Int",
    },
  ];

  if (times === ProjectTimes.正在进行) {
    rules.push({
      field: "start_time", //开始时间
      operate: "lessorequal",
      value: dayjs().format("YYYY-MM-DD HH:mm:ss"), //当前时间
      type: "String",
    });
    rules.push({
      field: "end_time", //结束时间
      operate: "greaterorequal",
      value: dayjs().format("YYYY-MM-DD HH:mm:ss"), //当前时间
      type: "String",
    });
  }

  if (times === ProjectTimes.历史) {
    rules.push({
      field: "end_time", //结束时间
      operate: "lessorequal",
      value: dayjs().format("YYYY-MM-DD HH:mm:ss"), //当前时间
      type: "String",
    });
  }

  return saas.post<queryPageStudentProjectResult>(
    "/training/h5/studentProject/queryPageStudentProject",
    {
      filterGroup: {
        rules,
        operate: "and",
      },
      pageNum: pageNum ?? 1,
      pageSize: pageSize ?? 30,
      totalCount: true,
      orders: [
        {
          orderKey: "start_time",
          rule: 1,
        },
      ],
    }
  );
};

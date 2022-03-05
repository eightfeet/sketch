import { saas } from "~/core/request";
import { ExerciseInfo } from "~/types/exercise";

export enum StudyStatus {
  未开始 = 0,
  进行中 = 1,
  已结束 = 2,
}

export enum DeptFlag {
  非活动部门内 = 0,
  活动部门内 = 1,
}

export enum ProjectAddFlag {
  未添加 = 0,
  已添加 = 1,
}

interface getTrainingProjectByIdResult {
  /**学习项目id */
  id: number;
  /**学习项目名 */
  projectName: string;
  /**学习项目开始时间 */
  startTime: string;
  /**学习项目结束时间 */
  endTime: string;
  /**学习项目描述 */
  description: string;
  /**banner */
  bannerList: {
    id: 1;
    /**banner名称 */
    bannerName: string;
    /**banner图片 */
    picUrl: string;
    /**跳转链接 */
    targetUrl: string;
  }[];
  /**讲师id */
  instructorId: number;
  /**参与部门范围 */
  deptScope: string[];
  /**排序，由小到大 0-1-... */
  sort: number;
  /**租赁id */
  tenantId: number;
  /**学习项目状态 -1 ：下线，1 ：正常 */
  status: -1 | 1;
  /**培训项目部门范围是否包含当前学员所在部门 */
  deptFlag: DeptFlag;
  /**是否已添加当前项目 */
  projectAddFlag: ProjectAddFlag;
  /**学习项目子类目 */
  items: {
    id: number;
    /**类目类别  类目：1 、课程，2、练习，3、考试*/
    type: number;
    /**类目名 */
    itemName: string;
    projectId: number;
    createTime: string;
    /**课程 */
    courseIds?: number[];
    /**练习 */
    exerciseRule?: {
      /**类型 */
      type: string;
    };
    /**测试 */
    examIds?: number[];
    status: number;
    tenantId: number;
  }[];
  /** 0:未开始 1:进行中 2:已结束 */
  studyStatus: StudyStatus;
  type: "array";
}

/**
 * 获取培训主要信息
 * @param id 项目id
 * @returns
 */
export const getTrainingProjectById = (id: string) => {
  return saas.get<getTrainingProjectByIdResult>(
    `/training/h5/trainingProject/get?id=${id}`
  );
};

interface getCourseDictionaryByProjectIdResult {
  /**课程类目 */
  courseDictionary: {
    /**分类id */
    id: number;
    /**分类名称 */
    fieldName: string;
  }[];
  /**第一个分类的课程 */
  course: {
    /**课程id */
    id: number;
    /**课程名称 */
    courseName: string;
    /**课程类目id */
    courseTypeId: string;
    /**开始时间 */
    startTime: string;
    /**结束时间 */
    endTime: string;
    /**封面 */
    imageUrl: string;
    /**视频url */
    videoUrl: string;
    /**课程描述 */
    description: string;
    /**租赁id */
    tenantId: number;
    /**视频id */
    videoId: string;
  }[];
}
/**
 * 获取课程与第一个类目课程
 * @param id 项目id
 * @returns
 */
export const getCourseDictionaryByProjectId = (id: string) => {
  return saas.post<getCourseDictionaryByProjectIdResult>(
    "/training/h5/course/getCourseDictionaryByProjectId",
    {
      filterGroup: {
        rules: [
          {
            field: "cp.project_id", //项目id
            operate: "equal",
            value: id,
            type: "Int",
          },
        ],
        operate: "and",
      },
    }
  );
};

export interface getCourseByProjectIdResultItem {
  /**课程id */
  id: number;
  /**课程名 */
  courseName: string;
  /**课程id */
  courseTypeId: number;
  /**开始时间 */
  startTime: string;
  /**结束时间 */
  endTime: string;
  /**封面 */
  imageUrl: string;
  /**视频 */
  videoUrl: string;
  /**描述 */
  description: string;
  /**租赁id */
  tenantId: number;
}

export const getCourseByProjectId = ({
  /**项目id */
  id,
  /**分类id */
  typeId,
  pageNum = 1,
  pageSize = 10,
}: {
  id: string | number;
  typeId: string | number;
  pageNum?: number;
  pageSize?: number;
}) => {
  return saas
    .post<{ course: getCourseByProjectIdResultItem[] }>(
      "/training/h5/course/getCourseByProjectId",
      {
        filterGroup: {
          rules: [
            {
              field: "d.id", //分类id
              operate: "equal",
              value: `${typeId}`,
              type: "Int",
            },
            {
              field: "cp.project_id", //项目id
              operate: "equal",
              value: `${id}`,
              type: "Int",
            },
          ],
          operate: "and",
        },
        pageNum,
        pageSize,
      }
    )
    .then((res) => res.course);
};

interface getStudyInfoParame {
  studentId: number;
  projectId: number;
}

// 获取学员练习信息
export const getStudyInfo = (parame: getStudyInfoParame) => {
  return saas
    .post<{ code: number; data: ExerciseInfo[] }>(
      "/training/h5/exercise/getInfo",
      parame
    )
    .then((res) => res.data);
};

import { saas } from "~/core/request";

interface getCourseByIdResult {
  /**课程标题 */
  courseName: string;
  /**课程类型 */
  courseTypeId: number;
  /**开始时间 */
  startTime: string;
  /**结束时间 */
  endTime: string;
  /**封面图 */
  imageUrl: string;
  /**视频链接 */
  videoUrl: string;
  /**视频id */
  videoId: string;
  /**课程描述 */
  description: string;
}

export const getCourseById = (id: number) => {
  return saas.post<{ data: getCourseByIdResult }>(
    "/training/h5/course/getCourseById",
    {
      id,
    }
  );
};

export const saveCourseLearningTime = (params: {
  courseId: number; //课程id
  projectId: number; //项目id
  studentId: number;
  learningTime: number; //学习时长（单位秒）
}) => {
  return saas.post("/training/h5/course/saveCourseLearningTime", params);
};

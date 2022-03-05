import { saas, scrm } from "~/core/request";

/**
 * 微信分享jsSDK认证
 * @param {String} url 链接
 */
export const jsSDk = (url: string) => {
  return scrm.post(
    `/wechatBH/jssdk`,
    { appId: process.env.REACT_APP_WX_ID, url },
    {
      type: "form",
    }
  );
};

interface FilterRule {
  field: string;
  operate:
    | "and"
    | "or"
    | "equal"
    | "notequal"
    | "less"
    | "lessorequal"
    | "greater"
    | "greaterorequal"
    | "in"
    | "like"
    | "startwith"
    | "endwith";
  value: any;
  type?: "String" | "int" | "jsonb";
}
interface FilterGroup {
  operate: "and" | "or";
  rules?: FilterRule[];
  groups?: FilterGroup[];
}
interface FilterOrder {
  orderKey: string;
  rule: number;
}
interface FilterParams {
  memberId?: number;
  pageNum?: number;
  pageSize?: number;
  single?: boolean;
  orders?: FilterOrder[];
  totalCount?: boolean;
  params?: {
    [key: string]: any;
  };

  [key: string]: any;
}

/**
 * 查询数据视图
 * @param {String} viewName 视图名称
 * @param {Object} filters 过滤器
 * @param {*} params 过滤参数
 */
export function queryDataView<T = any>(
  viewName: string,
  filterGroup?: FilterGroup | {} | null,
  params?: FilterParams
) {
  return scrm.post<T>(
    "/commonQueryService/commonQueryWithPower",
    {
      ...params,
      viewName,
      ...(filterGroup ? { filterGroup } : {}),
    },
    {
      params: {
        _viewName: viewName,
      },
    }
  );
}

export interface queryRegionResult {
  /**
   * 大区id
   */
  id: number;
  /**
   * 大区名称
   */
  name: string;
  /**
   * 父级
   */
  parentid: number;
}

/**
 * 查询大区
 */
export const queryBigRegion = (
  memberId: number
): Promise<queryRegionResult[]> => {
  return queryDataView("road_show_enterprise_wechat_all_big_region", null, {
    params: { memberId },
  });
};

/**
 * 根据大区id查询区域
 */

export const queryRegionByParentId = (
  memberId: number,
  parentid: string
): Promise<queryRegionResult[]> => {
  return queryDataView("road_show_enterprise_wechat_query_region_by_id", null, {
    params: {
      memberId,
      id: parentid,
    },
  });
};

/**
 * 文件上传
 * @param blob
 * @param filename
 */
export function uploadFile(blob: Blob, filename: string) {
  const formData = new FormData();
  formData.append("file", blob, filename);

  return scrm.post<{
    success: "true" | "false";
    fileUrl: string;
  }>(process.env.REACT_APP_API_UPLOAD!, formData, {
    type: "file",
  });
}

interface getListBannerResult {
  /**图片地址 */
  image: string;
  /**链接地址 */
  link: string;
  /**标题 */
  title: string;
  [keys: string]: any;
}

export const getListBanner = (jwtToken: string) => {
  return scrm.post<getListBannerResult[]>(
    "/yygj/service/listBanner",
    {
      page: 1,
      limit: 10,
      position: 3, //1:首页，2:互动 3:原营养管家小程序（夺宝奇兵)首页
    },
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
};

// /yygj/service/listArticle

interface getListArticleParam {
  page: number;
  limit?: number; //首页是5条
  moduleId: number;
}

export interface getListArticleResult {
  /**文章id */
  articleId: number;
  /**渠道 */
  channelId: number;
  /**文章标题 */
  title: string;
  /**文章简介 */
  digest: string;
  /**汤币值 */
  tanCoins: number;
  /**是否领取汤币，0：未领取，1：已领取 */
  hasGotCoins: 0 | 1;
  /**上线时间 */
  upTime: string;
  /**阅读量 */
  readCount: number;
  /**图片 */
  picUrl: string;
  [keys: string]: any;
}

export const getListArticle = (jwt: string, param?: getListArticleParam) => {
  return scrm.post<getListArticleResult[]>(
    "/yygj/service/listArticle",
    {
      /**模块 66 推荐 67 销售 68 健康 69 福利 80 推活动-营养管家app  81推活动-健康通 */
      moduleId: param?.moduleId,
      page: param?.page || 1,
      limit: param?.limit || 10,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
};

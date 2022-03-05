export interface Organization {
  /**
   * 机构ID（门店ID）
   */
  orgId: string;
  /**
   * 机构编号（门店编号）
   */
  orgNo: string;
  /**
   * 机构名称（门店名称）
   */
  orgName: string;
  /**
   * 上级机构ID（上级门店ID）
   */
  parentId: string;
  /**
   * 上级机构编号（上级门店编号）
   */
  parentNo: string;
  /**
   * 机构类型 ：Store 门店 , Partner 分销商（经销商/连锁）
   */
  orgType: "Store" | "Partner";
  /**
   * 状态：0 正常
   */
  status: 0;
  /**
   * 大区ID
   */
  districtId?: string;
  /**
   * 大区名称
   */
  districtName?: string;
  /**
   * 归属区域ID
   */
  regionId?: string;
  /**
   * 区域名称
   */
  regionName?: string;
  /**
   * 经度
   */
  longitude: string;
  /**
   * 纬度
   */
  latitude: string;
  /**
   * 会员店标识
   */
  clubStoreFlag: "Y" | "N";
  /**
   * 有效期开始
   */
  beginDate: string;
  /**
   * 管理员
   */
  managerName: string;
  /**
   * 管理员手机
   */
  managerPhone: string;
  /**
   * 1级经销商编号
   */
  p1no: string;
  /**
   * 1级经销商名称
   */
  p1name: string;
  /**
   * 2级经销商编号
   */
  p2no?: string;
  /**
   * 2级经销商名称
   */
  p2name?: string;
  /**
   * 3级经销商编号
   */
  p3no?: string;
  /**
   * 3级经销商名称
   */
  p3name?: string;
  /**
   * 事业部
   */
  department?: string;

  /**
   * 附加信息
   */
  extraInfo: {
    [key: string]: any;
  };
}

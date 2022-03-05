import { scrm } from "~/core/request";
import { queryDataView } from "./common";

export enum ClockStatus {
  UnCheckIn = 0,
  CheckIn = 1,
  CheckOut = 2,
}

export interface ActivityInfo {
  actId: number;
  actType: string;
  orgNo: string;
  actName: string;
  orgName: string;
  startTime: string;
  endTime: string;
  actExtInfo: {
    p1name: string;
    p2name: string;
    region: string;
    county: string;
    orgName: string;
    province: string;
    saleAmount: string;
    actTypeName: string;
    isMemberDay: string;
    workerCount: string;
    districtName: string;
    departmentName: string;
    saleContactName: string;
    saleContactPhone: string;
  };
  clockCount: ClockStatus;
  executor: Array<{ id: number; executor: string }>;
  longitude?: number;
  latitude?: number;
}

export function queryActivityByActId(params: {
  actId: number;
  memberId: number;
  day: string;
}) {
  return scrm.post<ActivityInfo>(
    "/liteEnterpriseWechat/manageQueryActivityByActId",
    params
  );
}

export function queryReportType(params: {
  actId: number;
  memberId: number;
  saleDay: string;
}) {
  return queryDataView<{
    reportType: "none" | "scan" | "sp";
  }>("query_performance_report_type", {}, { params, single: true });
}

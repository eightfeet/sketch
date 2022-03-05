/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { scrm } from "~/core/request";
import { Organization } from "~/types/organization";

export function findOrganizationByIdOrNo(params: {
  orgId?: string;
  orgNo?: string;
}) {
  return scrm.get<Organization>("/organization/findOrganizationByIdOrNo", {
    params,
  });
}

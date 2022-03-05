import React from "react";

interface routeItem {
  page: string;
  name: string;
  path?: string;
  component: React.ComponentType;
}

const routers: routeItem[] = [
  {
    name: "首页",
    page: "home",
    component: React.lazy(() => import("~/pages/home")),
  },
  {
    name: "demo",
    page: "demo",
    component: React.lazy(() => import("~/pages/demo")),
  },
];

export default routers;

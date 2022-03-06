import React from "react";

interface routeItem {
  page: string;
  name: string;
  path?: string;
  component: React.ComponentType;
}

const routers: routeItem[] = [
  {
    name: "SKETCH",
    page: "home",
    component: React.lazy(() => import("~/pages/home")),
  },
  {
    name: "MODELS",
    page: "models",
    component: React.lazy(() => import("~/pages/list")),
  },
  {
    name: "CONTENTS",
    page: "contents",
    component: React.lazy(() => import("~/pages/contents")),
  },

  {
    name: "demo",
    page: "demo",
    component: React.lazy(() => import("~/pages/demo")),
  },
];

export default routers;

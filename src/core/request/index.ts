import Request from "./request";
import * as middlewares from "./middlewares";

const inst = new Request(
  {
    baseUrl: process.env.REACT_APP_BASE_URL,
    type: "json",
  },
  [
    middlewares.timeout,
    middlewares.http,
    middlewares.httpError,
    middlewares.json,
    middlewares.httpResultMiddleware,
    middlewares.baseUrl,
    middlewares.authToken,
    middlewares.params,
    middlewares.type,
  ]
);

const scrm = new Request(
  {
    baseUrl: process.env.REACT_APP_SCRM_URL,
    mode: "cors",
    type: "json",
    errorHander: true,
    authToken: false,
  },
  [
    middlewares.timeout,
    middlewares.http,
    middlewares.httpError,
    middlewares.json,
    middlewares.baseUrl,
    middlewares.authToken,
    middlewares.params,
    middlewares.type,
  ]
);

const saas = new Request(
  {
    baseUrl: process.env.REACT_APP_SAAS_URL,
    mode: "cors",
    type: "json",
    errorHander: true,
  },
  [
    middlewares.timeout,
    middlewares.http,
    middlewares.httpError,
    middlewares.json,
    middlewares.baseUrl,
    middlewares.authToken,
    middlewares.params,
    middlewares.type,
  ]
);

export const sketch = new Request(
  {
    baseUrl: process.env.REACT_APP_SKETCH_URL,
    mode: "cors",
    type: "json",
    errorHander: true,
  },
  [
    middlewares.timeout,
    middlewares.http,
    middlewares.httpError,
    middlewares.json,
    middlewares.baseUrl,
    middlewares.authToken,
    middlewares.params,
    middlewares.type,
  ]
);

export default inst;
export { Request, scrm, saas };

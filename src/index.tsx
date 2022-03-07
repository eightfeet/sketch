import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import bootstrap from "./core/bootstrap";
import "./style/global.scss";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import Routers from "./Routers";
import { persistor, store } from "./store";
import { onWindowblur, onWindowfocus } from "./core/utils";
import { wechat } from "~/core/jssdk";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

onWindowfocus();
onWindowblur();
async function init() {
  try {
    await bootstrap();
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <Routers />
          </PersistGate>
        </Provider>
      </React.StrictMode>,
      document.getElementById("root")
    );
    wechat();
  } catch (error) {
    console.error(error);
  }
}

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

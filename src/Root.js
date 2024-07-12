import React from "react";
import { Provider, use, loadingStore } from "@chaoswise/cw-mobx";
import stores from "./stores";
import App from "./app";

function Root(props) {
  return (
    <Provider {...use(stores)} loadingStore={loadingStore}>
      <App {...props} />
    </Provider>
  );
}

export default Root;

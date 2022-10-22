import * as React from "react";
import { render } from "react-dom";
import { createInstance, Piral } from "piral-core";
import { createContainersApi } from "piral-containers";

const feedUrl = "https://feed.piral.cloud/api/v1/pilet/tractor-demo";

const instance = createInstance({
  requestPilets() {
    return fetch(feedUrl)
      .then((res) => res.json())
      .then((res) => res.items);
  },
  plugins: [createContainersApi()],
});

const app = <Piral instance={instance} />;

render(app, document.querySelector("#app"));

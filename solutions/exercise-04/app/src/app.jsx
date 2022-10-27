import * as React from "react";
import { render } from "react-dom";

const showConsent = () => {
  import("consent/dialog").then(({ showDialog }) => {
    const close = showDialog();

    // close after 5s
    setTimeout(close, 5000);
  });
};

const App = () => {
  return (
    <div>
      <button onClick={showConsent}>Show consent</button>
    </div>
  );
};

render(<App />, document.querySelector("#app"));

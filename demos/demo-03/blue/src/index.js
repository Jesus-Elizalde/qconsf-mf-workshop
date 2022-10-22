import * as React from "react";
import * as ReactDOM from "react-dom";
import basketInfo from "./basket-info";
import buyButton from "./buy-button";
import singleSpaReact from "single-spa-react";

export const BasketInfo = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: basketInfo,
  errorBoundary(err, info, props) {
    return <div>Ouch</div>;
  },
});

export const BuyButton = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: buyButton,
  errorBoundary(err, info, props) {
    return <div>Ouch</div>;
  },
});

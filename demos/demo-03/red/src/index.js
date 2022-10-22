import * as React from "react";
import * as ReactDOM from "react-dom";
import productPage from "./product-page";
import singleSpaReact from "single-spa-react";

const ProductPage = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: productPage,
  errorBoundary(err, info, props) {
    return <div>Ouch</div>;
  },
});

export const bootstrap = ProductPage.bootstrap;
export const mount = ProductPage.mount;
export const unmount = ProductPage.unmount;

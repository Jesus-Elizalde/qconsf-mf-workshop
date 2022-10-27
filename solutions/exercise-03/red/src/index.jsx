import * as React from "react";
import { createRoot } from "react-dom/client";
import ProductPage from "./product-page";

let root = undefined;

export function renderPage(container, props = {}) {
  if (!root) {
    root = createRoot(container);
  }

  root.render(<ProductPage {...props} />);
}

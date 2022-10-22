import * as React from "react";
import { Recommendations } from "./Recommendations";

export function setup(app) {
  app.registerExtension("recommendations", ({ params }) => (
    <Recommendations item={params.item} />
  ));
}

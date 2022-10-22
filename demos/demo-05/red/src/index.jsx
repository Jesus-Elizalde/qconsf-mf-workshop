import * as React from "react";
import { ProductPage } from "./ProductPage";

export function setup(app) {
  app.registerPage("/:name?", ({ history, match }) => (
    <ProductPage
      name={match.params.name || "porsche"}
      history={history}
      BasketInfo={() => <app.Extension name="basket-info" />}
      BuyButton={({ item }) => (
        <app.Extension name="buy-button" params={{ item }} />
      )}
      More={({ item }) => (
        <app.Extension name="more-infos" params={{ item }} />
      )}
      Recommendations={({ item }) => (
        <app.Extension name="recommendations" params={{ item }} />
      )}
    />
  ));
}

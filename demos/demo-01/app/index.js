const express = require("express");
const Layout = require("@podium/layout");
const utils = require("@podium/utils");
const { resolve } = require("path");

const port = 7000;
const app = express();

const layout = new Layout({
  name: "webshop",
  pathname: "/",
});

layout.css(
  new utils.AssetCss({
    value: "/page.css",
  })
);

const blueBuy = layout.client.register({
  name: "blue-buy",
  uri: "http://localhost:7100/buy.manifest.json",
});

const blueCart = layout.client.register({
  name: "blue-cart",
  uri: "http://localhost:7100/cart.manifest.json",
});

const redPage = layout.client.register({
  name: "red-page",
  uri: "http://localhost:7200/page.manifest.json",
});

const greenRecommendations = layout.client.register({
  name: "green-recommendations",
  uri: "http://localhost:7300/recommendations.manifest.json",
});

app.use(layout.middleware());

app.use(express.static(resolve(__dirname, "public")));

app.get(layout.pathname(), async (req, res) => {
  const { sku = "porsche" } = req.query;
  const { cookie } = req.headers;
  const opts = { query: { sku }, headers: { cookie } };
  const incoming = res.locals.podium;

  incoming.view.title = "Webshop";

  const [page, buyButton, cartButton, recommendations] = await Promise.all([
    redPage.fetch(incoming, opts),
    blueBuy.fetch(incoming, opts),
    blueCart.fetch(incoming, opts),
    greenRecommendations.fetch(incoming, opts),
  ]);

  incoming.podlets = [page, buyButton, cartButton, recommendations];

  res.podiumSend(`
    <div id="app">
      <h1 id="store">The Model Store</h1>
      ${cartButton.content}
      ${page.content}
      ${buyButton.content}
      ${recommendations.content}
    </div>
  `);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port} ...`);
});

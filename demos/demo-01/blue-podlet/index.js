const express = require("express");
const session = require("express-session");
const Podlet = require("@podium/podlet");
const { resolve } = require("path");
const { name, version } = require("./package.json");

const port = 7100;
const app = express();

const defaultPrice = "0,00 €";
const prices = {
  porsche: "66,00 €",
  fendt: "54,00 €",
  eicher: "58,00 €",
};

const buyPodlet = new Podlet({
  name: `${name}-buy`,
  version,
  pathname: "/",
  manifest: "/buy.manifest.json",
  content: "/buy",
  development: true,
});

buyPodlet.css({ value: "/buy-button.css" });

app.use(buyPodlet.middleware());

app.use(express.static(resolve(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "foobar-blue",
    resave: false,
    saveUninitialized: true,
  })
);

app.post(buyPodlet.proxy({ target: "/addToCart", name: "addToCart" }), (req, res) => {
  const { sku = "porsche" } = req.body.sku;
  const price = prices[sku] || defaultPrice;
  const value = parseFloat(price.replace(",", "."));

  if (req.session.sum) {
    req.session.sum += value;
    req.session.count++;
  } else {
    req.session.sum = value;
    req.session.count = 1;
  }

  console.log(sku, price, value, req.session);
  res.redirect(req.headers.referer);
});

app.get(buyPodlet.content(), (req, res) => {
  const { sku = "porsche" } = req.query;
  const { mountOrigin, publicPathname } = res.locals.podium.context;
  const price = prices[sku] || defaultPrice;
  const url = new URL(publicPathname, mountOrigin).href;

  res.status(200).podiumSend(`
    <div class="blue-buy" id="buy">
      <form method="POST" action="${url}/addToCart">
        <input type="hidden" name="sku" value="${sku}">
        <button>
          buy for ${price}
        </button>
      </form>
    </div>
  `);
});

app.get(buyPodlet.manifest(), (req, res) => {
  res.status(200).json(buyPodlet);
});

const cartPodlet = new Podlet({
  name: `${name}-cart`,
  version,
  pathname: "/",
  manifest: "/cart.manifest.json",
  content: "/cart",
  development: true,
});

cartPodlet.css({ value: "/basket-info.css" });

app.use(cartPodlet.middleware());

app.get(cartPodlet.content(), (req, res) => {
  const count = req.session.count || 0;
  const cls = count === 0 ? "empty" : "filled";
  res.status(200).podiumSend(`
    <div class="blue-basket" id="basket">
      <div class="${cls}">basket: ${count} item(s)</div>
    </div>
  `);
});

app.get(cartPodlet.manifest(), (req, res) => {
  res.status(200).json(cartPodlet);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port} ...`);
});

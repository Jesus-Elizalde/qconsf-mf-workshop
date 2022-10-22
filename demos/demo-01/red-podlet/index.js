const express = require("express");
const Podlet = require("@podium/podlet");
const { resolve } = require("path");
const { name, version } = require("./package.json");

const port = 7200;
const app = express();

const product = {
  name: "Tractor",
  variants: [
    {
      sku: "porsche",
      color: "red",
      name: "Porsche-Diesel Master 419",
      image: "tractor-red.jpg",
      thumb: "tractor-red-thumb.jpg",
      price: "66,00 €",
    },
    {
      sku: "fendt",
      color: "green",
      name: "Fendt F20 Dieselroß",
      image: "tractor-green.jpg",
      thumb: "tractor-green-thumb.jpg",
      price: "54,00 €",
    },
    {
      sku: "eicher",
      color: "blue",
      name: "Eicher Diesel 215/16",
      image: "tractor-blue.jpg",
      thumb: "tractor-blue-thumb.jpg",
      price: "58,00 €",
    },
  ],
};

const pagePodlet = new Podlet({
  name: `${name}-page`,
  version,
  pathname: "/",
  manifest: "/page.manifest.json",
  content: "/page",
  development: true,
});

pagePodlet.css({ value: "/product-page.css" });

app.use(pagePodlet.middleware());

app.use(express.static(resolve(__dirname, "public")));

app.get(
  pagePodlet.proxy({
    target: "/images",
    name: "images",
  }),
  express.static(resolve(__dirname, "public", "images"))
);

app.get(pagePodlet.content(), async (req, res) => {
  const { sku = "porsche" } = req.query;
  const { mountOrigin, publicPathname } = res.locals.podium.context;
  const url = new URL(publicPathname, mountOrigin).href;
  const current =
    product.variants.find((v) => v.sku === sku) || product.variants[0];

  res.status(200).podiumSend(`
    <div id="image">
      <div>
        <img src="${url}/images/${current.image}" alt="${current.name}" />
      </div>
    </div>
    <h2 id="name">
      ${product.name} <small>${current.name}</small>
    </h2>
    <div id="options">
      ${product.variants
        .map(
          (variant) => `
        <a href="?sku=${variant.sku}">
          <button class="${
            current.sku === variant.sku ? "active" : ""
          }" type="button">
            <img src="${url}/images/${variant.thumb}" alt="${variant.name}" />
          </button>
        </a>
      `
        )
        .join("\n")}
    </div>
  `);
});

app.get(pagePodlet.manifest(), (req, res) => {
  res.status(200).json(pagePodlet);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port} ...`);
});

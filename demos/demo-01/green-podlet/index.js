const express = require("express");
const Podlet = require("@podium/podlet");
const { resolve } = require("path");
const { name, version } = require("./package.json");

const port = 7300;
const app = express();

const allRecommendations = {
  porsche: ["3", "5", "6"],
  fendt: ["3", "6", "4"],
  eicher: ["1", "8", "7"],
};

const recommendationsPodlet = new Podlet({
  name: `${name}-recommendations`,
  version,
  pathname: "/",
  manifest: "/recommendations.manifest.json",
  content: "/recommendations",
  development: true,
});

recommendationsPodlet.css({ value: "/recommendations.css" });

app.use(recommendationsPodlet.middleware());

app.use(express.static(resolve(__dirname, "public")));

app.get(
  recommendationsPodlet.proxy({
    target: "/images",
    name: "images",
  }),
  express.static(resolve(__dirname, "public", "images"))
);

app.get(recommendationsPodlet.content(), (req, res) => {
  const { sku = "porsche" } = req.query;
  const { mountOrigin, publicPathname } = res.locals.podium.context;
  const url = new URL(publicPathname, mountOrigin).href;
  const recommendations = allRecommendations[sku] || allRecommendations.porsche;
  res.status(200).podiumSend(`
    <div class="green-recos" id="reco">
      <h3>Related Products</h3>
      ${recommendations
        .map(
          (recommendation) => `
        <img src="${url}/images/reco_${recommendation}.jpg" alt="Recommendation ${recommendation}">
      `
        )
        .join("\n")}
    </div>
  `);
});

app.get(recommendationsPodlet.manifest(), (req, res) => {
  res.status(200).json(recommendationsPodlet);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port} ...`);
});

import "./style/product-page.css";
import * as React from "react";
import Parcel from "single-spa-react/parcel";
import tractorRed from "./images/tractor-red.jpg";
import tractorBlue from "./images/tractor-blue.jpg";
import tractorGreen from "./images/tractor-green.jpg";
import tractorRedThumb from "./images/tractor-red-thumb.jpg";
import tractorBlueThumb from "./images/tractor-blue-thumb.jpg";
import tractorGreenThumb from "./images/tractor-green-thumb.jpg";

const product = {
  name: "Tractor",
  variants: [
    {
      sku: "porsche",
      color: "red",
      name: "Porsche-Diesel Master 419",
      image: tractorRed,
      thumb: tractorRedThumb,
      price: "66,00 €",
    },
    {
      sku: "fendt",
      color: "green",
      name: "Fendt F20 Dieselroß",
      image: tractorGreen,
      thumb: tractorGreenThumb,
      price: "54,00 €",
    },
    {
      sku: "eicher",
      color: "blue",
      name: "Eicher Diesel 215/16",
      image: tractorBlue,
      thumb: tractorBlueThumb,
      price: "58,00 €",
    },
  ],
};

const BasketInfo = React.lazy(() =>
  System.import("blue").then(({ BasketInfo }) => ({
    default: (props) => <Parcel config={BasketInfo} {...props} />,
  }))
);
const BuyButton = React.lazy(() =>
  System.import("blue").then(({ BuyButton }) => ({
    default: (props) => <Parcel config={BuyButton} {...props} />,
  }))
);
const ProductRecommendations = React.lazy(() =>
  System.import("green").then(({ ProductRecommendations }) => ({
    default: (props) => <Parcel config={ProductRecommendations} {...props} key={props.sku} />,
  }))
);
const ProductReviews = React.lazy(() =>
  System.import("purple").then(({ ProductReviews }) => ({
    default: (props) => <Parcel config={ProductReviews} {...props} key={props.sku} />,
  }))
);

function getCurrent(sku) {
  return product.variants.find((v) => v.sku === sku) || product.variants[0];
}

const ProductPage = () => {
  const [sku, setSku] = React.useState("porsche");
  const current = getCurrent(sku);

  return (
    <React.Suspense fallback="Loading ...">
      <h1 id="store">The Model Store</h1>
      <div className="blue-basket" id="basket">
        <BasketInfo sku={sku} />
      </div>
      <div id="image">
        <div>
          <img src={current.image} alt={current.name} />
        </div>
      </div>
      <h2 id="name">
        {product.name} <small>{current.name}</small>
      </h2>
      <div id="options">
        {product.variants.map((variant) => (
          <button
            key={variant.sku}
            className={sku === variant.sku ? "active" : ""}
            type="button"
            onClick={() => setSku(variant.sku)}
          >
            <img src={variant.thumb} alt={variant.name} />
          </button>
        ))}
      </div>
      <div className="blue-buy" id="buy">
        <BuyButton sku={sku} />
      </div>
      <div className="purple-reviews" id="reviews">
        <ProductReviews sku={sku} />
      </div>
      <div className="green-recos" id="reco">
        <ProductRecommendations sku={sku} />
      </div>
    </React.Suspense>
  );
};

export default ProductPage;

import "./style/product-page.css";
import * as React from "react";
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

const WrapComponent = ({ id, className, render, props }) => {
  const container = React.useRef();

  React.useEffect(() => {
    render(container.current, props);
  }, [props]);

  return <div id={id} className={className} ref={container} />;
};

const BasketInfo = React.lazy(() =>
  import("blue/basketInfo").then(({ renderBasketInfo }) => ({
    default: ({ id, className, ...props }) => (
      <WrapComponent
        id={id}
        className={className}
        render={renderBasketInfo}
        props={props}
      />
    ),
  }))
);
const BuyButton = React.lazy(() =>
  import("blue/buyButton").then(({ renderBuyButton }) => ({
    default: ({ id, className, ...props }) => (
      <WrapComponent
        id={id}
        className={className}
        render={renderBuyButton}
        props={props}
      />
    ),
  }))
);
const ProductRecommendations = React.lazy(() =>
  import("green/recommendations").then(({ renderRecommendations }) => ({
    default: ({ id, className, ...props }) => (
      <WrapComponent
        id={id}
        className={className}
        render={renderRecommendations}
        props={props}
      />
    ),
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
      <BasketInfo className="blue-basket" id="basket" sku={sku} />
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
      <BuyButton className="blue-buy" id="buy" sku={sku} />
      <ProductRecommendations className="green-recos" id="reco" sku={sku} />
    </React.Suspense>
  );
};

export default ProductPage;

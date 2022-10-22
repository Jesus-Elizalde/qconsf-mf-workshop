import * as React from 'react';
import { product } from './product';

export const ProductPage = ({ name, history, BasketInfo, BuyButton, Recommendations, More }) => {
  const [variant] = product.variants.filter((v) => name === v.sku);

  return (
    variant && (
      <>
        <h1 id="store">The Model Store</h1>
        <BasketInfo />
        <div id="image">
          <div>
            <img src={variant.image} alt={variant.name} />
          </div>
        </div>
        <h2 id="name">
          {product.name} <small>{variant.name}</small>
        </h2>
        <div id="options">
          {product.variants.map((variant) => (
            <button
              key={variant.sku}
              className={name === variant.sku ? 'active' : ''}
              type="button"
              onClick={() => history.push(`/${variant.sku}`)}>
              <img src={variant.thumb} alt={variant.name} />
            </button>
          ))}
        </div>
        <BuyButton item={variant.sku} />
        <More item={variant.sku} />
        <Recommendations item={variant.sku} />
      </>
    )
  );
};

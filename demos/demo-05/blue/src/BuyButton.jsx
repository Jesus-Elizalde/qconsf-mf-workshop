import * as React from 'react';
import { prices } from './prices';

export const BuyButton = ({ item, addToCart }) => (
  <div className="blue-buy" id="buy">
    <button type="button" onClick={() => addToCart(item)}>
      buy for {prices[item]}
    </button>
  </div>
);

import * as React from 'react';

export const BasketInfo = ({ count }) => (
  <div className="blue-basket" id="basket">
    <div className={count === 0 ? 'empty' : 'filled'}>basket: {count} item(s)</div>
  </div>
);

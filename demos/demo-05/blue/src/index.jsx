import * as React from 'react';
import { BuyButton } from './BuyButton';
import { BasketInfo } from './BasketInfo';

export function setup(app) {
  const connectBasket = app.createState({
    state: {
      items: [],
    },
    actions: {
      addToCart(dispatch, item) {
        dispatch(state => ({
          ...state,
          items: [...state.items, item],
        }));
      },
    },
  });

  app.registerExtension(
    'buy-button',
    connectBasket(({ actions, params }) => <BuyButton addToCart={actions.addToCart} item={params.item} />),
  );

  app.registerExtension(
    'basket-info',
    connectBasket(({ state }) => <BasketInfo count={state.items.length} />),
  );
}

import ProductRecommendations from "./product-recommendations";

let current = undefined;

export function renderRecommendations(container, props = {}) {
  if (current) {
    current.$destroy();
  }

  current = new ProductRecommendations({
    target: container,
    props,
  });
}

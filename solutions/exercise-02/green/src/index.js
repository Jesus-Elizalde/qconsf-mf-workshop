import productRecommendations from "./product-recommendations";
import singleSpaSvelte from "single-spa-svelte";

export const ProductRecommendations = singleSpaSvelte({
  component: productRecommendations,
});

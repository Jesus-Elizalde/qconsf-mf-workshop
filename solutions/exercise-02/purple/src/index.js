import productReviews from "./product-reviews.vue";
import Vue from "vue";
import singleSpaVue from "single-spa-vue";

export const ProductReviews = singleSpaVue({
  Vue,
  appOptions: (props) =>
    Promise.resolve({
      render(h) {
        return h(productReviews, { props });
      },
    }),
});

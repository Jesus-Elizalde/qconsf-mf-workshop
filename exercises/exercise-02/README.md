# Exercise 2

Write another MF for the webshop using single-spa. The MF should show reviews related to the currently selected product.

## Questions

* How are the lifecycles handled?
* How is the integration done?

## Bonus

* Use a different framework than React or Svelte (e.g., Angular, Vue, Solid.js, ...).

## Hints

* Use the `purple` directory as a starting point to develop (it already contains a *package.json* and a script file).
* Extend the `src/product-reviews.js` to have the desired functionality.
* Run the new MF by calling `npm start` in the `purple` directory (don't forget to `npm install` first).
* Run the original demo from the `demos/demo-03` folder via `run-all.sh`.

Not sure how to do that? Then let's follow the detailed instructions.

## Detailed Instructions

(The following assumes that you make the new frontend using Vue, but you can use any other framework that you'd like to use.)

1. Rename the file `product-reviews.js` in `purple/src` to `product-reviews.vue`
2. Paste the following content to have the component written in Vue:

   ```vue
    <template>
    <div>
        <h3>Reviews</h3>
        <p v-for="review in reviews">
        {{ review }}
        </p>
    </div>
    </template>

    <script>
    import './reviews.css';
    const allReviews = {
        porsche: ["So great", "Wonderful", "Works for me..."],
        fendt: ["Not my cup of tea..."],
        eicher: ["Just the best", "Give it a try!"],
    };  
    
    export default {
        props: ['sku'],
        computed: {
        reviews() {
            const sku = this.sku;
            const reviews = allReviews[sku] || allReviews.porsche;
            return reviews;
        },
        },
    };
    </script>
   ```

3. Add a file `reviews.css` in `purple/src` with the following content:

   ```css
   .purple-reviews {
      display: block;
      outline: 3px dashed purple;
      width: 100%;
   }

   #reviews {
      grid-area: reviews;
   }
   ```

4. Modify the file `index.js` in `purple/src`. Replace the existing content with the following:

   ```js
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
   ```

5. Modify the `package.json` in `purple` to have

   * `"single-spa-vue": "^2.5.1"` instead of `"single-spa-xyz": "^0.0.0"`
   * the following additional entries in the `devDependencies`:

     ```json
     "vue": "^2.6.14",
     "vue-loader": "^15.0.0",
     "vue-template-compiler": "^2.6.14",
     ```

6. In the `webpack.config.js` of `purple` add the following import

   ```js
   const { VueLoaderPlugin } = require("vue-loader");
   ```

   and add

   ```js
   { test: /\.vue$/, loader: "vue-loader" },
   ```

   to the `rules` section. In the `plugins` array insert

   ```js
   new VueLoaderPlugin(),
   ```

7. Integrate the micro frontend by modifying the files in `../demos/demo-03/`. Put a reference to the script in `app/public/index.html` inside the `systemjs-importmap` declaration (e.g., between the `blue` and `green` entries):

   ```json
   "purple": "http://localhost:2004/purple.js",
   ```

8. Integrate the micro frontend by modifying the files in `../demos/demo-03/`. Introduce a new component in `red/src/product-page.js`:

   ```jsx
   const ProductReviews = React.lazy(() =>
     System.import("purple").then(({ ProductReviews }) => ({
       default: (props) => <Parcel config={ProductReviews} {...props} key={props.sku} />,
     }))
   );
   ```

   Place the custom component where you want; ideally right *after* the `<div className="blue-buy" id="buy"><BuyButton sku={sku} /></div>`.

   ```jsx
   <div className="purple-reviews" id="reviews">
     <ProductReviews sku={sku} />
   </div>
   ```

9. Integrate the styling also in the grid area; modify `.../demos/demo-03/app/src/style.css` to have

   ```css
   @media only screen and (max-width: 999px) {
      body > div {
         grid-template-areas:
            "store basket"
            "image name"
            "image options"
            "image buy"
            "image reviews"
            "reco reco";
         grid-template-columns: 4fr 3fr;
      }
      }

      @media only screen and (min-width: 1000px) {
      body > div {
         grid-template-areas:
            "store basket  reco"
            "image name    reco"
            "image options reco"
            "image buy     reco"
            "image reviews reco";
         grid-template-columns: 4fr 3fr 200px;
         width: 1000px;
      }
   }
   ```

   instead of the previous grid declarations.

10. Copy "purple" into the `../demos/demo-03` directory. Modify the run script of `../demos/demo-03` (e.g., `run-all.sh`) to also include "purple", e.g.,

   ```sh
   MFs=('app' 'blue' 'green' 'red', 'purple')

   for MF in "${MFs[@]}"
   do
      cd $MF
      npm install
      cd ..
   done

   npx concurrently "npm --prefix app run start" "npm --prefix blue run start" "npm --prefix red run start" "npm --prefix green run start"  "npm --prefix purple run start"
   ```

   Alternatively, start purple in a new shell (`npm i && npm start`) and leave everything as-is.

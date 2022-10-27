# Exercise 3

Write another MF for the tractor webshop using Webpack Module Federation. The MF should show reviews related to the currently selected product.

## Questions

* How are the lifecycles handled?
* How is the integration done?

## Hints

* Use the `purple` directory as a starting point to develop (it already contains a *package.json* and a script file).
* Extend the `src/product-reviews.js` to have the desired functionality.
* Run the new MF by calling `npm start` in the `purple` directory (don't forget to `npm install` first).
* Run the original demo from the `demos/demo-04` folder via `run-all.sh`.

Not sure how to do that? Then let's follow the detailed instructions.

## Detailed Instructions

(We'll use here React again, but you can also try another framework as suggested for the previous exercise.)

1. Rename the `product-reviews.js` of `purple/src` to `product-reviews.jsx`. Paste the following content into the file:

   ```jsx
   import * as React from "react";
   import { createRoot } from "react-dom/client";
   import "./reviews.css";

   const allReviews = {
     porsche: ["So great", "Wonderful", "Works for me..."],
     fendt: ["Not my cup of tea..."],
     eicher: ["Just the best", "Give it a try!"],
   };

   export const ProductReviews = ({ sku }) => {
     const reviews = allReviews[sku] || allReviews.porsche;
     return (
       <div className="purple-reviews">
         <h3>Reviews</h3>
         {reviews.map((review, i) => (
           <p key={i}>{review}</p>
         ))}
       </div>
     );
   };

   let root = undefined;

   export function renderReviews(container, props) {
     if (!root) {
       root = createRoot(container);
     }
  
     root.render(<ProductReviews {...props} />);
   }
   ```

2. Add a file `reviews.css` in `purple/src` with the following content:

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

3. Modify the `package.json` in `purple` to add the following entries to `dependencies`:

   ```json
   "react": "^18",
   "react-dom": "^18"
   ```

   Also add the following to the `devDependencies`:

   ```json
   "@babel/preset-react": "^7.13.13",
   ```

4. In the `webpack.config.js` of `purple` modify the `exposes` section of the `ModuleFederationPlugin` to be:

   ```js
   exposes: {
     "./productReviews": "./src/product-reviews.jsx",
   },
   ```

   Also to enable the JSX transformation you should add

   ```js
   options: {
      presets: ["@babel/preset-react"],
   },
   ```

   to the `babel-loader`, i.e., change it to:

   ```js
   {
     test: /\.jsx?$/,
     loader: "babel-loader",
     exclude: /node_modules/,
     options: {
      presets: ["@babel/preset-react"],
     },
   }
   ```

5. Integrate the micro frontend by modifying the *webpack.config.js* file in `../demos/demo-04/red`. The `remotes` section has to be:

   ```js
   remotes: {
     purple: "purple@http://localhost:2004/index.js",
     green: "green@http://localhost:2003/index.js",
     blue: "blue@http://localhost:2002/index.js",
   },
   ```

6. Integrate the micro frontend by modifying the files in `../demos/demo-04/`. Introduce a new component in `red/src/product-page.js`:

   ```jsx
   const ProductReviews = React.lazy(() =>
     import("purple/productReviews").then(({ renderReviews }) => ({
       default: ({ id, className, ...props }) => (
         <WrapComponent
           id={id}
           className={className}
           render={renderReviews}
           props={props}
         />
       ),
     }))
   );
   ```

   Place the custom component where you want; ideally right *after* the `<BuyButton className="blue-buy" id="buy" sku={sku} />`.

   ```jsx
   <ProductReviews className="purple-reviews" id="reviews" sku={sku} />
   ```

7. Integrate the styling also in the grid area; modify `.../demos/demo-04/app/src/style.css` to have

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

8. Copy "purple" into the `../demos/demo-04` directory. Modify the run script of `../demos/demo-04` (e.g., `run-all.sh`) to also include "purple", e.g.,

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

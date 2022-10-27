# Exercise 1

Write another micro frontend (MF) for the tractor webshop using web components. The MF should show reviews related to the currently selected product.

## Questions

* How can the new MF be integrated?
* How is the MF being debugged?

## Hints

* Use the `purple` directory as a starting point to develop (it already contains a *package.json* and a script file).
* Extend the `src/product-reviews.js` to have the desired functionality.
* Run the new MF by calling `npm start` in the `purple` directory (don't forget to `npm install` first).
* Run the original demo from the `demos/demo-02` folder via `run-all.sh`.

Not sure how to do that? Then let's follow the detailed instructions.

## Detailed Instructions

1. Open the file `purple/src/product-reviews.js` and modify its content to look like

   ```js
   const link = document.head.appendChild(document.createElement('link'));
   link.href = getUrl("/reviews.css");
   link.rel = "stylesheet";

   function getUrl(path) {
     return new URL(path, import.meta.url).href;
   }

   const allReviews = {
     porsche: ["So great", "Wonderful", "Works for me..."],
     fendt: ["Not my cup of tea..."],
     eicher: ["Just the best", "Give it a try!"],
   };

   class ProductReviews extends HTMLElement {
     constructor() {
        super();
        const sku = this.getAttribute("sku") || "porsche";
        this.render(sku);
     }

     static get observedAttributes() {
        return ["sku"];
     }

     render(sku) {
        const reviews = allReviews[sku] || allReviews.porsche;
        this.innerHTML = `
           <h3>Reviews</h3>
             ${reviews.map((review) => `<p>${review}</p>`).join("\n")}
           </div>`;
     }

     attributeChangedCallback(name, oldValue, newValue) {
        if (name === "sku" && oldValue !== newValue) {
           this.render(newValue);
        }
     }
   }

   customElements.define("product-reviews", ProductReviews);
   ```

2. Create a new file `reviews.css` in the `purple/src` directory. Add some styling to make your solution nicely to look at.

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

3. Integrate the micro frontend by modifying the files in `../demos/demo-02/`. Put a reference to the script in `app/public/index.html`:

   ```html
   <script src="http://localhost:2004/product-reviews.js" type="module"></script>
   ```

4. Integrate the micro frontend by modifying the files in `../demos/demo-02/`. Use the custom element in `red/src/product-page.js`:

   ```html
   <product-reviews sku="${sku}"></product-reviews>
   ```

   Place the custom element where you want; ideally right *after* the `</buy-button>`.

5. Integrate the styling also in the grid area; modify `.../demos/demo-02/app/public/style.css` to have

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

6. Copy "purple" into the `../demos/demo-02` directory. Modify the run script of `../demos/demo-02` (e.g., `run-all.sh`) to also include "purple", e.g.,

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

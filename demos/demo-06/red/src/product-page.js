import join from "lodash/join.js";
import map from "lodash/map.js";
import find from "lodash/find.js";

import "blue/basket-info.js";
import "blue/buy-button.js";
import "green/product-recommendations.js";

const link = document.head.appendChild(document.createElement("link"));
link.href = getUrl("/product-page.css");
link.rel = "stylesheet";

function getUrl(path) {
  return new URL(path, import.meta.url).href;
}

const product = {
  name: "Tractor",
  variants: [
    {
      sku: "porsche",
      color: "red",
      name: "Porsche-Diesel Master 419",
      image: getUrl("/images/tractor-red.jpg"),
      thumb: getUrl("/images/tractor-red-thumb.jpg"),
      price: "66,00 €",
    },
    {
      sku: "fendt",
      color: "green",
      name: "Fendt F20 Dieselroß",
      image: getUrl("/images/tractor-green.jpg"),
      thumb: getUrl("/images/tractor-green-thumb.jpg"),
      price: "54,00 €",
    },
    {
      sku: "eicher",
      color: "blue",
      name: "Eicher Diesel 215/16",
      image: getUrl("/images/tractor-blue.jpg"),
      thumb: getUrl("/images/tractor-blue-thumb.jpg"),
      price: "58,00 €",
    },
  ],
};

function renderOptions(sku) {
  return join(
    map(
      product.variants,
      (variant) => `
        <button class="${
          sku === variant.sku ? "active" : ""
        }" type="button" data-sku="${variant.sku}">
          <img src="${variant.thumb}" alt="${variant.name}" />
        </button>
      `
    ),
    ""
  );
}

function getCurrent(sku) {
  return find(product.variants, (v) => v.sku === sku) || product.variants[0];
}

function renderImage(current) {
  return `
    <div>
      <img src="${current.image}" alt="${current.name}" />
    </div>
  `;
}

function renderName(current) {
  return `
    ${product.name} <small>${current.name}</small>
  `;
}

class ProductPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const sku = this.getAttribute("sku") || "porsche";
    const current = getCurrent(sku);

    this.innerHTML = `
<h1 id="store">The Model Store</h1>
<basket-info sku="${sku}" class="blue-basket" id="basket"></basket-info>
<div id="image">
  ${renderImage(current)}
</div>
<h2 id="name">
  ${renderName(current)}
</h2>
<div id="options">
  ${renderOptions(current.sku)}
</div>
<buy-button sku="${sku}" class="blue-buy" id="buy"></buy-button>
<product-recommendations sku="${sku}" class="green-recos" id="reco"></product-recommendations>
    `;

    this.querySelectorAll("#options button").forEach((button) => {
      button.addEventListener("click", () => {
        const sku = button.dataset.sku;
        this.setAttribute("sku", sku);
      });
    });
  }

  static get observedAttributes() {
    return ["sku"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.isConnected && name === "sku" && oldValue !== newValue) {
      const current = getCurrent(newValue);
      this.querySelector("#basket").setAttribute("sku", newValue);
      this.querySelector("#buy").setAttribute("sku", newValue);
      this.querySelector("#reco").setAttribute("sku", newValue);
      this.querySelector("#name").innerHTML = renderName(current);
      this.querySelector("#image").innerHTML = renderImage(current);
      this.querySelectorAll("#options button").forEach((button) => {
        if (button.dataset.sku === newValue) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    }
  }
}

customElements.define("product-page", ProductPage);

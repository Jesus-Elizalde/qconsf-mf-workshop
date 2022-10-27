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

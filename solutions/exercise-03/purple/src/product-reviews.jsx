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
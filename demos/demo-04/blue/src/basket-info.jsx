import "./style/basket-info.css";
import * as React from "react";
import { createRoot } from "react-dom/client";

const BasketInfo = ({ sku = "porsche" }) => {
  const [items, setItems] = React.useState([]);
  const count = items.length;

  React.useEffect(() => {
    const handler = () => {
      setItems((items) => [...items, sku]);
    };
    window.addEventListener("add-item", handler);
    return () => window.removeEventListener("add-item", handler);
  }, [sku]);

  return (
    <div className={count === 0 ? "empty" : "filled"}>basket: {count} item(s)</div>
  );
};

let root = undefined;

export function renderBasketInfo(container, props) {
  if (!root) {
    root = createRoot(container);
  }
  
  root.render(<BasketInfo {...props} />);
}

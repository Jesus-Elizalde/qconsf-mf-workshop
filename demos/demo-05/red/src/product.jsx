import tractorRed from "./images/tractor-red.jpg";
import tractorBlue from "./images/tractor-blue.jpg";
import tractorGreen from "./images/tractor-green.jpg";
import tractorRedThumb from "./images/tractor-red-thumb.jpg";
import tractorBlueThumb from "./images/tractor-blue-thumb.jpg";
import tractorGreenThumb from "./images/tractor-green-thumb.jpg";

export const product = {
  name: "Tractor",
  variants: [
    {
      sku: "porsche",
      color: "red",
      name: "Porsche-Diesel Master 419",
      image: tractorRed,
      thumb: tractorRedThumb,
      price: "66,00 €",
    },
    {
      sku: "fendt",
      color: "green",
      name: "Fendt F20 Dieselroß",
      image: tractorGreen,
      thumb: tractorGreenThumb,
      price: "54,00 €",
    },
    {
      sku: "eicher",
      color: "blue",
      name: "Eicher Diesel 215/16",
      image: tractorBlue,
      thumb: tractorBlueThumb,
      price: "58,00 €",
    },
  ],
};

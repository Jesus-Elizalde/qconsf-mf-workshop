import "./style.css";
import { registerApplication, start } from "single-spa";

// Simple usage
registerApplication(
  "red",
  () => System.import("red"),
  (location) => location.pathname.startsWith("/"),
  {}
);

start();

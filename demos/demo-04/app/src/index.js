import "./style.css";

const div = document.body.appendChild(document.createElement("div"));

import("red/page").then(({ renderPage }) => renderPage(div));

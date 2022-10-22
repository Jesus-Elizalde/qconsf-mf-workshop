# Client-Side Composition

Composing the micro frontends on the client using web components. The individual modules do not require any build process - they are imported as ES modules (ESMs).

## Advantages

* Can be used progressively to integrate MFs on a non-MF page
* Does not require a specific orchestration layer - just embed a custom element

## Disadvantages

* Difficult to handle fallbacks and errors on a web component
* Web components alone are tedious to write - some framework will be needed anyway

## Area of Use

* An easy way to integrate micro frontends to a non-MF website


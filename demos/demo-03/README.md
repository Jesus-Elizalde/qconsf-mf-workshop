# SPA Composition

Uses single-spa to create the tractor shop. The `red` and `blue` micro frontend are created with React, the `green` micro frontend is created with Svelte.

## Advantages

* Allows composition of different frameworks
* Can handle errors and do lazy loading

## Disadvantages

* The expose is direct and technical - instead of focusing on domain components
* Requires some work to make it loosely coupled

## Area of Use

* Good for sites using multiple technologies separated in (a few) technology containers / micro frontends


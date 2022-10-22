# Distributed Dependency Sharing

This demo shows how dependencies may be shared in a distributed way. Note that the app shell does not use or expose `react` / `react-dom`, but the shared dependency is still loaded (once!) and used in all dependencies as it should.

## Advantages

* Allows every micro frontend to just share and use what they want
* Can be used with everything that webpack bundles to, e.g., backend services

## Disadvantages

* Requires knowledge and strong coupling to integrate micro frontend
* Makes it easy to create hidden monoliths with a tooling dependency

## Area of Use

* Good for progressive enhancement and to do server-side composition with shared modules


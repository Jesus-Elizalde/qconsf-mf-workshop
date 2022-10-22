# Server-Side Composition

Creates a server-side composition of the Tractor store using podium.

## Advantages

* Server-side is the way to go for performance
* Crawlers will get the most info out already (good of your page does not require a login)

## Disadvantages

* Increased complexity - esp. for local development / debugging
* By default strongly coupled - would need additional work

## Area of Use

* When you care deeply about the first render time
* Not much JS is used / SSR can do the heavy work

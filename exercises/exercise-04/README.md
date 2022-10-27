# Exercise 4

Create a React web application to be bundled by Webpack. Share some dependencies such `react` and `react-dom` via Module Federation.

Include the consent dialog micro frontend (MF) from the "consent" directory in the application.

The following details should be sufficient for an integration:

* Container is `consent` at script `consent/index.js`
* Exposes `./dialog`
* Exports function `showDialog`

## Questions

* What version of React is the consent MF using?
* What if the sharing of React is turned off?

## Hints

* Use the "app" directory as a starting point.
* To explicitly start the consent dialog use `npx http-server consent --cors` in the current directory

Not sure how to do that? Then let's follow the detailed instructions.

## Detailed Instructions

1. Modify the *webpack.config.js* of the `app` directory:

   ```js
   new ModuleFederationPlugin({
     name: "app",
     shared: {
       react: {
         singleton: true,
       },
       "react-dom": {
         singleton: true,
       },
     },
     remotes: {
       consent: "consent@http://localhost:8080/index.js",
     },
   }),
   ```

2. Change the `src/index.jsx` of `app` to have the following content:

   ```js
   import('./app');
   ```

3. Introduce a new file `src/app.jsx` with the following content:

   ```jsx
   import * as React from "react";
   import { render } from "react-dom";
   
   const showConsent = () => {
     import("consent/dialog").then(({ showDialog }) => {
       const close = showDialog();
   
       // close after 5s
       setTimeout(close, 5000);
     });
   };
   
   const App = () => {
     return (
       <div>
         <button onClick={showConsent}>Show consent</button>
       </div>
     );
   };
   
   render(<App />, document.querySelector("#app"));
   ```

4. Add a new start script such as `run-all.sh`:

   ```sh
   #!/bin/bash

   cd app
   npm install
   cd ..

   npx concurrently "npm --prefix app run start" "npx http-server consent --cors"
   ```

   For Windows / PowerShell the script looks like this:

   ```ps1
   #! /usr/bin/pwsh

   cd app
   npm install
   cd ..

   npx concurrently "npm --prefix app run start" "npx http-server consent --cors"
   ```

   Alternatively, start both applications from different terminals.

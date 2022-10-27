#!/bin/bash

cd app
npm install
cd ..

npx concurrently "npm --prefix app run start" "npx http-server consent --cors"

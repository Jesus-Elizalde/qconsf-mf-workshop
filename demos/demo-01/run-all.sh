#!/bin/bash

MFs=('app' 'blue-podlet' 'green-podlet' 'red-podlet')

for MF in "${MFs[@]}"
do
  cd $MF
  npm install
  cd ..
done

npx concurrently "node app/index.js" "node blue-podlet/index.js" "node red-podlet/index.js" "node green-podlet/index.js"

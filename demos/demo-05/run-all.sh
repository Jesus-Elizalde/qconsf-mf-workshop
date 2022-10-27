#!/bin/bash

MFs=('app')

for MF in "${MFs[@]}"
do
  cd $MF
  npm install
  cd ..
done

npx concurrently "npm --prefix app run start"

#! /usr/bin/pwsh

$MFs = @('app','blue','green','red')

foreach ( $MF in $MFs )
{
  cd $MF
  npm install
  cd ..
}

npx concurrently "npm --prefix app run start" "npm --prefix blue run start" "npm --prefix red run start" "npm --prefix green run start"

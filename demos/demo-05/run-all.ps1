#! /usr/bin/pwsh

$MFs = @('app')

foreach ( $MF in $MFs )
{
  cd $MF
  npm install
  cd ..
}

npx concurrently "npm --prefix app run start"

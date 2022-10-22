#! /usr/bin/pwsh

$MFs = @('app','blue-podlet','green-podlet','red-podlet')

foreach ( $MF in $MFs )
{
  cd $MF
  npm install
  cd ..
}

npx concurrently "node app/index.js" "node blue-podlet/index.js" "node red-podlet/index.js" "node green-podlet/index.js"

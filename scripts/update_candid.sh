#!/bin/bash

# Usage:
# Start up your own replica on port 8000: dfx start --clean --host 127.0.0.1:8000
# cd examples
# ../scripts/update_candid.sh
# cd motoko_examples
# ../../scripts/update_candid.sh

upgrade_candid()
{
  npm install
  npm link azle
  dfx canister create --all
  dfx build
}

upgrade_all()
{

for dir in */; do

  # You can use this part to skip directories  
  # first_char=${dir:0:1}
  # if [[ "$first_char" < "t" ]]; then
  #     echo "Skipping directory: $dir"
  #     continue
  # fi

  echo "Looking at directory: $dir"
  if [ -f "$dir/dfx.json" ]; then
    echo "Processing directory: $dir"
    cd $dir
    upgrade_candid
    cd ..
  fi
done
}

upgrade_all

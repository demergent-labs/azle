#!/bin/bash

# TODO we should be able to test using the branch and the npm package

directories=(
    "examples/primitive_types"
    "examples/query"
)

npm link

for directory in "${directories[@]}"
do
    cd $directory
    
    dfx stop
    dfx start --clean --background

    npm install
    npm link azle

    dfx deploy
    npm test

    dfx stop

    cd $PWD
done
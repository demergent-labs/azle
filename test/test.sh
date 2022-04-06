#!/bin/bash

# TODO we should be able to test using the branch and the npm package
# TODO we might need/want to delete the target directory to ensure a clean test every time
# TODO the only problem is that it takes forever, but maybe that's okay if this is all in a GitHub action
# TODO these tests will probably take like 30 minutes to run though

directories=(
    "examples/complex_types"
    "examples/counter"
    "examples/cross_canister_calls"
    "examples/heartbeat"
    "examples/ic_api"
    "examples/imports"
    "examples/init"
    "examples/inline_types"
    "examples/key_value_store"
    "examples/motoko_examples/calc"
    "examples/motoko_examples/counter"
    "examples/optional_types"
    "examples/primitive_types"
    "examples/query"
    "examples/simple_erc20"
    "examples/simple_user_accounts"
    "examples/update"
)

root_dir=$PWD

npm link

for directory in "${directories[@]}"
do
    cd $directory

    dfx stop
    dfx start --clean --background

    npm install
    npm link azle

    npm test || { dfx stop; exit 1; }

    dfx stop

    cd $root_dir
done

echo "All tests passed!"
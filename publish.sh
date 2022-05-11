#!/bin/bash

# TODO can GitHub actions do any of this for us?
# TODO document the release process:
# TODO on the release branch, run this and choose a x.y.z-rc.a version
# TODO all tests should pass
# TODO if they do, you can merge release into main
# TODO clone main locally, and run this again choosing the correct version

set -e

directories=(
    "examples/call_raw"
    "examples/complex_types"
    "examples/counter"
    "examples/cross_canister_calls"
    "examples/func_types"
    "examples/generators"
    "examples/heartbeat"
    "examples/ic_api"
    "examples/imports"
    "examples/init"
    "examples/inline_types"
    "examples/key_value_store"
    "examples/ledger_canister"
    "examples/management_canister"
    "examples/motoko_examples/calc"
    "examples/motoko_examples/counter"
    "examples/optional_types"
    "examples/pre_and_post_upgrade"
    "examples/primitive_types"
    "examples/query"
    "examples/simple_erc20"
    "examples/simple_user_accounts"
    "examples/stable_storage"
    "examples/tuple_types"
    "examples/update"
)

root_dir=$PWD

read -p "Enter new version number:" VERSION

sed -E -i "s/(\"version\": \")(.*)(\")/\1$VERSION\3/" package.json
npm install

if [[ "$VERSION" == *"-rc."* ]];
then
    npm publish --tag next
else
    npm publish
fi

# TODO loop through checking for the status instead of sleeping
echo -e "sleeping for 30 seconds to ensure azle@$VERSION is fully registered on npm"

sleep 30

for directory in "${directories[@]}"
do
    cd $directory

    sed -E -i "s/(\"azle\": \")(.*)(\")/\1$VERSION\3/" package.json
    npm install

    cd $root_dir
done

git add --all
git commit -am "release $VERSION"

if [[ "$VERSION" == *"-rc."* ]];
then
    git push origin release
else
    git push origin main
fi

git tag $VERSION
git push origin $VERSION
#!/bin/bash

set -e

directories=(
    "examples/complex_types"
    "examples/counter"
    "examples/ic_api"
    "examples/imports"
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

read -p "Enter new version number:" VERSION

sed -E -i "s/(\"version\": \")(.*)(\")/\1$VERSION\3/" package.json
npm install

git commit -am "release $VERSION"
git push origin release

# git tag $VERSION
# git push origin $VERSION

if [[ "$VERSION" == *"-rc."* ]];
then
    npm publish --tag next
else
    npm publish
fi

for directory in "${directories[@]}"
do
    cd $directory

    sed -E -i "s/(\"version\": \")(.*)(\")/\1$VERSION\3/" package.json
    npm install

    cd $root_dir
done

# cd generator-sudograph
# sed -E -i "s/(\"version\": \")(.*)(\")/\1$VERSION\3/" package.json
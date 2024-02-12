#!/bin/bash

set -e

root_dir=$PWD

VERSION=$1

directories_json_string_with_linebreaks=$2
directories_json_string="${directories_json_string_with_linebreaks//$'\\n'/''}"
directories=$(echo "$directories_json_string" | jq -c -r '.[]')

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

for directory in ${directories[@]}
do
    cd $directory

    sed -E -i "s/(\"azle\": \")(.*)(\")/\1$VERSION\3/" package.json
    npm install

    rm -rf node_modules

    cd $root_dir
done

npm install
npm link
dfx start --background
cd examples/hello_world
npm install
npm link azle
AZLE_USE_DOCKERFILE=true dfx deploy
gzip -9 "$HOME/.config/azle/azle__image__$(npx azle dockerfile-hash).tar"

git add --all
git commit -am "azle-bot automated release $VERSION"
git push origin $GITHUB_HEAD_REF

git tag $VERSION
git push origin $VERSION

if [[ "$VERSION" == *"-rc."* ]];
then
    gh release create "$VERSION" "$HOME/.config/azle/azle__image__$(npx azle dockerfile-hash).tar.gz" -t "$VERSION" --prerelease
else
    gh release create "$VERSION" "$HOME/.config/azle/azle__image__$(npx azle dockerfile-hash).tar.gz" -t "$VERSION"
fi

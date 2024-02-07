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

# TODO put this all back of course
# sleep 30

# for directory in ${directories[@]}
# do
#     cd $directory

#     sed -E -i "s/(\"azle\": \")(.*)(\")/\1$VERSION\3/" package.json
#     npm install

#     rm -rf node_modules

#     cd $root_dir
# done

git add --all
git commit -am "azle-bot automated release $VERSION"
git push origin $GITHUB_HEAD_REF

git tag $VERSION
git push origin $VERSION

dfx start --background
cd examples/hello_world && dfx deploy

if [[ "$VERSION" == *"-rc."* ]];
then
    gh release create "$VERSION" "examples/hello_world/.azle/azle_${VERSION}_image" -t "$VERSION" --prerelease
else
    gh release create "$VERSION" "examples/hello_world/.azle/azle_${VERSION}_image" -t "$VERSION"
fi

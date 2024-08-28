WASMEDGE_REPO_PATH="./wasmedge_quickjs"

rm -rf "$WASMEDGE_REPO_PATH"

git clone --depth 1 --filter=blob:none --sparse git@github.com:demergent-labs/wasmedge-quickjs.git "$WASMEDGE_REPO_PATH"
cd "$WASMEDGE_REPO_PATH"
git sparse-checkout set modules LICENSE LICENSE-QuickJS.txt
# git sparse-checkout init
# git sparse-checkout add modules
# git sparse-checkout add LICENSE
# git sparse-checkout add LICENSE-QuickJS.txt
git checkout c21ff69f442998e4cda4619166e23a9bc91418be

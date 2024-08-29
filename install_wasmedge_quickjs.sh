WASMEDGE_REPO_PATH="./wasmedge_quickjs"

rm -rf "$WASMEDGE_REPO_PATH"

git clone --depth 1 --filter=blob:none --sparse https://github.com/demergent-labs/wasmedge-quickjs.git "$WASMEDGE_REPO_PATH"
cd "$WASMEDGE_REPO_PATH"
git sparse-checkout set --skip-checks modules LICENSE LICENSE-QuickJS.txt
git checkout c21ff69f442998e4cda4619166e23a9bc91418be

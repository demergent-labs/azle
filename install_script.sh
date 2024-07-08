mkdir -p "$HOME/.config/azle"

WASMEDGE_REPO_DIR_NAME="wasmedge-quickjs_$npm_package_version"
WASMEDGE_REPO_PATH="$HOME/.config/azle/$WASMEDGE_REPO_DIR_NAME"

if [ ! -e "$WASMEDGE_REPO_PATH" ]; then
    git clone --depth 1 --filter=blob:none --sparse https://github.com/demergent-labs/wasmedge-quickjs "$WASMEDGE_REPO_PATH"
    cd "$WASMEDGE_REPO_PATH"
    git sparse-checkout set modules
    git checkout c21ff69f442998e4cda4619166e23a9bc91418be
fi

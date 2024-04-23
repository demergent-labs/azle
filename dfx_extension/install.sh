DFX_CACHE_DIR="$(dfx cache show)"
dfx cache install
mkdir -p "$DFX_CACHE_DIR/extensions/azle"
cp extension.json "$DFX_CACHE_DIR/extensions/azle/extension.json"

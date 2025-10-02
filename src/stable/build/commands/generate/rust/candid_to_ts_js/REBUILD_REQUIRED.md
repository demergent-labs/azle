# Wasm Binary Rebuild Required

## What Changed

The `Cargo.toml` and `src/lib.rs` files have been updated to use the official `candid_parser` crate from crates.io instead of the Azle fork. The Rust code compiles successfully and the logic has been tested and verified.

## Why the Binary Wasn't Rebuilt

The Wasm binary (`pkg/candid_to_ts_js_bg.wasm`) needs to be rebuilt but couldn't be automatically updated because:

- The CI environment has network restrictions preventing download of the `wasm32-unknown-unknown` Rust target
- Building the Wasm binary requires `wasm-pack` with full internet access

## How to Rebuild

A human maintainer with unrestricted network access should run:

```bash
# Navigate to the candid_to_ts_js directory
cd src/stable/build/commands/generate/rust/candid_to_ts_js

# Ensure wasm32-unknown-unknown target is installed
rustup target add wasm32-unknown-unknown

# Build the Wasm binary
bash build.sh
```

This will regenerate all files in the `pkg/` directory with the updated code.

## Verification

After rebuilding, you can verify the changes work by:

1. Testing the generate command:

    ```bash
    echo 'service : { greet : (text) -> (text) query; }' > /tmp/test.did
    npx azle generate /tmp/test.did
    ```

2. Running the full test suite as described in AGENTS.md:

    ```bash
    # Generate templates
    npx azle dev template --all

    # Run a test
    cd examples/stable/test/end_to_end/candid_rpc/async_await
    npm install
    npm link azle
    AZLE_VERBOSE=true AZLE_DEV_TEMPLATE=true npm test
    ```

## Expected Output

The generated output should contain:

1. TypeScript type definitions (interfaces, types)
2. JavaScript IDL factory function
3. Proper combination of both with correct formatting

The output format should be identical to before, just using the official candid_parser crate instead of the fork.

## Note

Once this Wasm binary is rebuilt and committed, Azle will no longer depend on the fork and will use the official, maintained candid_parser crate from crates.io.

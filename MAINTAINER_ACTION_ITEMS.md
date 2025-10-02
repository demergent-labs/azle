# Maintainer Action Items

This PR successfully migrates Azle from using a fork of the candid repository to the official `candid_parser` crate from crates.io (version 0.2.2).

## ✅ Completed

- [x] Updated `Cargo.toml` to use official crate
- [x] Updated Rust code to use separate JavaScript and TypeScript compile functions
- [x] Verified Rust code compiles without errors
- [x] Tested logic with standalone program - output is correct
- [x] Updated `deny.toml` to remove fork from allowed sources
- [x] Linting passes
- [x] Typechecking passes
- [x] Documentation created (README.md, MIGRATION_SUMMARY.md)

## ⚠️ Requires Maintainer Action

### 1. Rebuild the Wasm Binary

The Wasm binary needs to be rebuilt with the updated code. The CI environment couldn't do this due to network restrictions preventing download of the `wasm32-unknown-unknown` Rust target.

**Steps:**

```bash
# Ensure you have the wasm32-unknown-unknown target
rustup target add wasm32-unknown-unknown

# Navigate to the directory
cd src/stable/build/commands/generate/rust/candid_to_ts_js

# Run the build script
bash build.sh
```

This will regenerate the files in the `pkg/` directory:

- `candid_to_ts_js_bg.wasm` (the main Wasm binary)
- `candid_to_ts_js.js` (JavaScript wrapper)
- `candid_to_ts_js.d.ts` (TypeScript definitions)
- `candid_to_ts_js_bg.wasm.d.ts`
- `package.json`

**Commit the rebuilt files** with a message like:

```bash
git add src/stable/build/commands/generate/rust/candid_to_ts_js/pkg/
git commit -m "Rebuild Wasm binary with official candid_parser crate"
```

### 2. Test the Generate Command

After rebuilding, test that the generate command works:

```bash
# Create a test Candid file
echo 'service : { greet : (text) -> (text) query; }' > /tmp/test.did

# Generate types
npx azle generate /tmp/test.did
```

Expected output should include:

- TypeScript interface definitions
- JavaScript IDL factory function
- Proper imports from `@dfinity/*` (which will be replaced with `@icp-sdk/core/*`)

### 3. Generate Templates

```bash
npx azle dev template --all
```

This should complete without errors.

### 4. Run Tests

Run at least one example test to ensure nothing is broken:

```bash
cd examples/stable/test/end_to_end/candid_rpc/async_await
npm install
npm link azle
AZLE_VERBOSE=true AZLE_DEV_TEMPLATE=true npm test
```

All tests should pass with green checkmarks.

### 5. Final Cleanup

After successful testing, you can delete these temporary documentation files:

- `REBUILD_REQUIRED.md`
- `MAINTAINER_ACTION_ITEMS.md` (this file)

The `MIGRATION_SUMMARY.md` and `README.md` in the candid_to_ts_js directory should be kept as they document the changes.

## Why This Is Important

This change:

- ✅ Removes dependency on the Azle fork of candid
- ✅ Uses the official, maintained crate from crates.io
- ✅ Enables automatic updates and bug fixes
- ✅ Better aligns with the Internet Computer ecosystem
- ✅ Resolves the issue about upstreaming the code

## Questions?

If you encounter any issues:

1. Check that `wasm-pack` is installed: `wasm-pack --version`
2. Check that the wasm32 target is installed: `rustup target list --installed | grep wasm32`
3. Verify the Rust code compiles: `cd src/stable/build/commands/generate/rust/candid_to_ts_js && cargo check`
4. Review the MIGRATION_SUMMARY.md for more context

## Timeline

The Rust code changes are ready and tested. Only the Wasm binary rebuild is pending. This should take approximately 5-10 minutes to complete once network access is available.

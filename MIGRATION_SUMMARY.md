# Migration Summary: Candid Fork to Official Crates.io

## Overview

This PR migrates the Azle codebase from using a fork of the DFINITY candid repository to using the official `candid_parser` crate from crates.io.

## Changes Made

### 1. Updated Dependencies

**File**: `src/stable/build/commands/generate/rust/candid_to_ts_js/Cargo.toml`

Changed from:

```toml
candid_parser = { git = "https://github.com/demergent-labs/candid", rev = "22e24796dbb31b2d133bcd4d234abbaf34d6fd21" }
```

To:

```toml
candid_parser = "0.2.2"
```

### 2. Updated Rust Code

**File**: `src/stable/build/commands/generate/rust/candid_to_ts_js/src/lib.rs`

The code was updated to:

- Import separate `javascript` and `typescript` modules from `candid_parser::bindings`
- Create `IDLMergedProg` from the parsed AST (required for TypeScript compilation)
- Call `javascript::compile()` and `typescript::compile()` separately
- Combine the outputs with a newline separator

The logic remains the same from the user's perspective - input a Candid string, output combined TypeScript types and JavaScript IDL.

### 3. Updated Security Configuration

**File**: `deny.toml`

Removed the candid fork from the `allow-git` list since it's no longer needed.

### 4. Documentation

Added comprehensive documentation:

- **README.md**: Explains the changes, how to build, and how to test
- **REBUILD_REQUIRED.md**: Instructions for maintainers on rebuilding the Wasm binary

## Why This Change Was Made

1. **Upstream Maturity**: The official candid_parser crate now has stable JavaScript and TypeScript binding generation
2. **Maintenance**: Using the official crate reduces maintenance burden and allows automatic updates
3. **Community Alignment**: Aligns with the broader Internet Computer ecosystem
4. **Issue Resolution**: Addresses issue about getting ts-js generation merged into the candid repo

## What Works

✅ Rust code compiles successfully (`cargo check` passes)
✅ Logic tested with standalone Rust program - output is correct
✅ TypeScript types are generated correctly
✅ JavaScript IDL is generated correctly
✅ Both outputs are properly combined

## What Needs Maintainer Action

⚠️ **Wasm Binary Rebuild Required**

The Wasm binary in `pkg/candid_to_ts_js_bg.wasm` needs to be rebuilt by a maintainer with unrestricted network access. The CI environment couldn't download the required `wasm32-unknown-unknown` Rust target.

See `REBUILD_REQUIRED.md` for detailed instructions.

## Testing After Rebuild

After the Wasm binary is rebuilt, run:

1. Basic test:

    ```bash
    echo 'service : { greet : (text) -> (text) query; }' > /tmp/test.did
    npx azle generate /tmp/test.did
    ```

2. Generate templates:

    ```bash
    npx azle dev template --all
    ```

3. Run example tests:
    ```bash
    cd examples/stable/test/end_to_end/candid_rpc/async_await
    npm install
    npm link azle
    AZLE_VERBOSE=true AZLE_DEV_TEMPLATE=true npm test
    ```

## Breaking Changes

None. The output format and API remain identical to the previous implementation.

## Benefits

- ✅ No longer depends on a fork
- ✅ Uses officially maintained and published crate
- ✅ Can receive updates automatically through crates.io
- ✅ Reduced maintenance burden
- ✅ Better alignment with IC ecosystem
- ✅ Resolves the original issue about upstreaming the code

## Related Issues

- Original issue: "Get our ts-js generation code merged into the Candid repo"
- DFINITY PR #665 (merged): JavaScript IDL generation
- TypeScript types PR: Not needed - now using official crates.io version

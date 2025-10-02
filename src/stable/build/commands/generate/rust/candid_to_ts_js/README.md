# Candid to TypeScript/JavaScript Generator

This Rust crate compiles to WebAssembly and is used by the `azle generate` command to convert Candid files into TypeScript types and JavaScript IDL.

## Recent Updates

This crate has been updated to use the official `candid_parser` crate from crates.io (version 0.2.2) instead of the Azle fork. The migration includes:

- **Cargo.toml**: Updated to use `candid_parser = "0.2.2"` from crates.io instead of the git dependency
- **lib.rs**: Updated to call the separate `javascript::compile` and `typescript::compile` functions from the official candid_parser and combine their outputs

## How It Works

1. Parses the Candid string into an `IDLProg` AST
2. Type-checks the AST using `check_prog` to produce a `TypeEnv` and optional `Type` (actor)
3. Creates an `IDLMergedProg` from the AST (required for TypeScript compilation)
4. Generates TypeScript types using `typescript::compile(&env, &actor, &merged_prog)`
5. Generates JavaScript IDL using `javascript::compile(&env, &actor)`
6. Combines both outputs with a newline separator

## Building

To rebuild the WebAssembly binary after making changes:

```bash
cd src/stable/build/commands/generate/rust/candid_to_ts_js
bash build.sh
```

This will:

1. Run `wasm-pack build --target nodejs --dev` to compile the Rust code to WebAssembly
2. Remove the auto-generated `.gitignore` file so the generated files can be committed

**Note**: Building requires the `wasm32-unknown-unknown` Rust target. Install it with:

```bash
rustup target add wasm32-unknown-unknown
```

## Testing

You can test the logic without building the Wasm binary by creating a standalone Rust program:

```bash
cd /tmp
cargo new test_candid_gen
cd test_candid_gen

# Add candid_parser to Cargo.toml
cat >> Cargo.toml << 'EOF'
candid_parser = "0.2.2"
EOF

# Create test program (see src/lib.rs for reference implementation)
# Run with: cargo run
```

## Migration from Fork

Previously, this crate depended on a fork of the candid repository that included a combined `typescript_and_javascript` module. The official candid_parser now has mature separate modules for JavaScript and TypeScript generation, so we can use the official crate and combine the outputs ourselves.

This change:

- ✅ Removes dependency on the Azle fork
- ✅ Uses the official, maintained candid_parser crate
- ✅ Makes updates and bug fixes available automatically through crates.io
- ✅ Simplifies maintenance and contributions

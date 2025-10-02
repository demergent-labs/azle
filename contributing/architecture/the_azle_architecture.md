# The Azle architecture

Azle is a Canister Development Kit ([CDK](https://internetcomputer.org/docs/building-apps/developer-tools/cdks/)) for the Internet Computer Protocol ([ICP](https://internetcomputer.org/)). In other words it's a WebAssembly runtime for TypeScript and JavaScript on ICP.

This document describes Azle's architecture for security researchers and core developers. It focuses on the stable implementation found under [src/stable](../../src/stable).

[src/stable](../../src/stable) is split into three directories, representing Azle's three major architectural components:

1. [src/stable/build](../../src/stable/build): Azle's build process (generally executes on a development laptop or CI/CD machine)
2. [src/stable/lib](../../src/stable/lib): Azle's runtime TypeScript/JavaScript library (generally executes within the ICP or Node.js Wasm environment)
3. [src/stable/test](../../src/stable/test): Azle's testing utilities (generally executes on a development laptop or CI/CD machine)

## Azle's build process

The build process executes on a development laptop or CI/CD machine, transforming TypeScript/JavaScript source code into a deployable Wasm binary. It's typically invoked through `dfx deploy` or `dfx build` commands.

The Azle build command source code can be found at [src/stable/build/commands/build/index.ts](../../src/stable/build/commands/build/index.ts). The process is as follows:

0. View the sequence diagram [here](./build_process_sequence.md)
1. Context gathering
    1. Build configuration is retrieved from `dfx.json` and the Azle dfx extension
    2. Paths for the Candid file, Wasm binary, TypeScript/JavaScript entrypoint, and build artifacts directory are determined
    3. Environment variables and runtime data are prepared for embedding in the Wasm binary
    - See [get_context.ts](../../src/stable/build/commands/build/get_context.ts)
2. TypeScript/JavaScript compilation
    1. A prelude is prepended to the developer's entrypoint to handle canister class instantiation, Candid generation, and method meta generation
    2. The complete TypeScript/JavaScript program is compiled and bundled into a single JavaScript file using `esbuild`
    3. The bundled JavaScript is written to `.azle/[canisterName]/main.js`
    - See [javascript.ts](../../src/stable/build/commands/build/javascript.ts)
3. Candid and method meta generation
    1. The [stable canister template](#the-stable-canister-template) Wasm binary is manipulated to embed the bundled JavaScript code in a passive data segment
    2. The modified Wasm binary is executed within Node.js' Wasm environment
    3. The execution produces the canister's Candid interface definition and method metadata
    4. The Candid file is written to the build artifacts directory
    - See [candid_and_method_meta/](../../src/stable/build/commands/build/candid_and_method_meta)
4. Final Wasm binary generation
    1. The [stable canister template](#the-stable-canister-template) Wasm binary is manipulated to embed the bundled JavaScript code
    2. Exported Wasm functions are generated for each canister method, hard-coded to call Rust with index arguments
    3. These indices correspond to JavaScript callbacks registered globally at Wasm runtime
    4. The final Wasm binary is written to the build artifacts directory and is ready for deployment to ICP
    - See [wasm_binary/](../../src/stable/build/commands/build/wasm_binary)

### The stable canister template

The stable canister template is a pre-compiled Rust Wasm binary that serves as the foundation for all Azle canisters. It provides the Wasm environment that executes TypeScript/JavaScript code through QuickJS and bridges to ICP System APIs.

The template source code is located at [src/stable/build/commands/build/wasm_binary/rust/stable_canister_template](../../src/stable/build/commands/build/wasm_binary/rust/stable_canister_template). Its generation process is as follows:

1. Template compilation
    1. The Rust crate `stable_canister_template` is compiled to Wasm using `cargo build --target wasm32-wasip1`
    2. The resulting Wasm binary is transformed using `wasi2ic` to make it ICP-compatible
    3. The compiled template is stored statically in the Azle package for reuse across builds
    - See [stable.ts](../../src/stable/build/commands/dev/template/stable.ts) and [compile.ts](../../src/stable/build/commands/build/wasm_binary/compile.ts)
2. Template components
    1. **QuickJS runtime**: Embeds the QuickJS JavaScript interpreter (`rquickjs`) to execute TypeScript/JavaScript code
    2. **ICP System API bindings**: Rust implementations that bridge JavaScript calls to ICP system APIs
    3. **Memory management**: Provides stable memory structures and memory managers for canister state persistence
    4. **Execution scaffolding**: Contains the framework for method registration, callback execution, and request handling
    - See [stable_canister_template/src/](../../src/stable/build/commands/build/wasm_binary/rust/stable_canister_template/src/)
3. Dynamic Wasm binary manipulation
    1. View the sequence diagram [here](./wasm_binary_manipulation_sequence.md)
    2. During each canister build, the static template is manipulated to embed the developer's compiled JavaScript code
    3. Custom Wasm functions are generated and exported for each canister method defined by the developer
    4. These exported functions act as entry points that the ICP replica can invoke

## Azle's runtime library

The runtime library executes within the deployed canister's Wasm environment on the ICP replica. It bridges the developer's TypeScript/JavaScript code with the ICP system APIs through QuickJS and Rust.

The Azle runtime library source code can be found at [src/stable/lib](../../src/stable/lib). The library code works as follows:

0. View the sequence diagram [here](./runtime_library_sequence.md)
1. Canister initialization (`init` or `postUpgrade`)
    1. The compiled JavaScript bundle embedded in the Wasm binary is executed
    2. Canister class decorators register JavaScript callbacks into `globalThis._azleCanisterClassMeta.callbacks` with integer indices
    3. These indices correspond to the hard-coded indices in the exported Wasm functions generated during the build process
    - See [canister_methods/](../../src/stable/lib/canister_methods) for decorator implementations
    - See [globals.ts](../../src/stable/lib/globals.ts) for global state initialization
2. Request handling (when an ICP request arrives)
    1. The ICP replica invokes the appropriate exported Wasm function (e.g. `canister_query [methodName]`, `canister_update [methodName]`)
    2. The exported Wasm function calls into Rust with its hard-coded index
    3. Rust retrieves the JavaScript callback from `globalThis._azleCanisterClassMeta.callbacks[index]`
    4. Rust executes the JavaScript callback through QuickJS
    5. The callback decodes Candid arguments from the ICP request using Azle's Candid decoding APIs
    6. The developer's canister method executes with the decoded arguments
    7. The return value is encoded into Candid binary format
    8. The ICP message is replied to with the encoded result
    - See [execute_and_reply_with_candid_serde.ts](../../src/stable/lib/execute_and_reply_with_candid_serde.ts) for encoding/decoding
    - See [stable_canister_template/src/](../../src/stable/build/commands/build/wasm_binary/rust/stable_canister_template/src/) for Rust runtime code
3. ICP API integration
    1. ICP APIs are available as TypeScript imports from the `azle` module
    2. These TypeScript APIs bridge to Rust implementations using `rquickjs`
    3. The Rust implementations call the appropriate ICP System API functions
    - See [ic_apis/](../../src/stable/lib/ic_apis) for TypeScript API exports
    - See [stable_canister_template/src/ic/](../../src/stable/build/commands/build/wasm_binary/rust/stable_canister_template/src/ic/) for Rust ICP API implementations
4. JavaScript runtime environment
    1. QuickJS serves as the JavaScript interpreter, providing the JavaScript language specification
    2. Web APIs and Node.js standard library are generally not available in stable mode
    3. Experimental mode aims to progressively enable Web APIs and Node.js stdlib functionality

## Azle's testing utilities

Azle's stable mode has three main types of tests:

1. [End-to-end](#end-to-end-tests)
2. [Property](#property-tests)
3. [Fuzz](#fuzz-tests)

Utilities used during testing can be found at [src/stable/test](../../src/stable/test) and [src/experimental/test](../../src/experimental/test). Due to time and resource constraints, we have decided to allow experimental testing utilities into the stable mode tests. We do not believe that the drawbacks of allowing experimental testing code into stable mode tests outweigh the benefits of having more and better testing against stable mode code.

### End-to-end tests

Located at [examples/stable/test/end_to_end](../../examples/stable/test/end_to_end/), these tests deploy full Azle canisters and verify they work correctly with manually written test cases.

**How they work**: Build a canister → Deploy to local replica → Execute test assertions using the JS agent or `dfx` CLI → Verify expected outputs for specific inputs.

**Philosophy**: End-to-end tests serve dual purposes as both automated correctness checks and educational examples. They validate specific features (e.g., `async_await`, `randomness`, `timers`) with clear, deterministic test cases that are easy to understand and debug.

### Property tests

Located at [examples/stable/test/property](../../examples/stable/test/property/), these tests use property-based testing with [fast-check](https://github.com/dubzzz/fast-check) to validate Azle across automatically generated inputs.

**How they work**: Generate random but valid Candid types and canister methods → Synthesize complete canister source code → Build, deploy, and test automatically → Run tens to hundreds of iterations with different inputs.

**Philosophy**: Instead of testing specific cases, property tests validate invariants that should hold for _all_ valid inputs. They attempt to ensure that Azle correctly handles the full spectrum of Candid types and canister configurations, discovering edge cases that manual testing might miss.

### Fuzz tests

Fuzz tests use the [cuzz](https://github.com/demergent-labs/cuzz) library to test concurrent execution with random inputs. They run against existing end-to-end test canisters and are configured via `cuzz.json` files.

**How they work**: Generate random valid inputs → Repeatedly call canister methods with these inputs → Explore different execution interleavings of concurrent calls → Monitor for crashes, traps, and unexpected errors → Vary timing between calls to trigger race conditions.

**Philosophy**: Fuzz tests discover bugs from both unpredictable inputs and concurrent execution that deterministic tests miss. They ensure canisters remain stable when handling arbitrary data under concurrent load, which is critical for ICP where canisters receive concurrent inter-canister calls and asynchronous operations can interleave unexpectedly.

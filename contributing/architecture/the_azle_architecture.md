# The Azle architecture

Azle is a Canister Development Kit ([CDK](https://internetcomputer.org/docs/building-apps/developer-tools/cdks/)) for the Internet Computer Protocol ([ICP](https://internetcomputer.org/)). In other words it's a WebAssembly runtime for TypeScript and JavaScript on ICP.

This document describes Azle's architecture for security researchers and core developers. It focuses on the stable implementation found under [src/stable](../../src/stable).

[src/stable](../../src/stable) is split into three directories, representing Azle's three major architectural components:

1. [src/stable/build](../../src/stable/build): Azle's build process (generally executes on a development laptop or CI/CD machine)
2. [src/stable/lib](../../src/stable/lib): Azle's runtime TypeScript/JavaScript library (generally executes within the ICP or Node.js Wasm environment)
3. [src/stable/test](../../src/stable/test): Azle's testing utilities (generally executes on a development laptop or CI/CD machine)

## Azle's build process

The build process begins with invoking Azle's `Node.js` executable, usually through a command like `npx azle [commandName]`. The `build` command itself (there are various other commands that don't result in building the canister's final Wasm binary) will usually be invoked during the `dfx` command line process, such as from the commands `dfx  deploy` or `dfx build`. The [Azle dfx extension](../../src/stable/build/dfx_extension/extension.json) defines the command that begins the build process.

The Azle build command source starts at [src/stable/build/commands/build/index.ts](../../src/stable/build/commands/build/index.ts). The process is as follows:

0. View the sequence diagram [here](./build_process_sequence.md)
1. Get the context:
    1. Path of file to store the canister's Candid file (Azle `dfx` extension default or `candid` property of canister configuration in `dfx.json`)
    2. Path of directory to store the canister's build artifacts (`.azle/[canisterName]`)
    3. Path to the developer's TypeScript/JavaScript entrypoint (`main` property of canister configuration in `dfx.json`)
    4. Path of file to store the canister's Wasm binary file (Azle `dfx` extension default or `wasm` property of canister configuration in `dfx.json`)
    5. Data object that will be passed into the Wasm's runtime code (e.g. contains environment variables from the developer)
    - See [get_context.ts](../../src/stable/build/commands/build/get_context.ts)
2. Delete the canister build artifacts directory
3. Compile and bundle the canister's TypeScript/JavaScript from the `main` entrypoint into a final JavaScript file
    1. A prelude is added to the canister's TypeScript/JavaScript entrypoint. This prelude handles the canister class instantiation, Candid generation, and canister method meta generation
    2. The final TypeScript/JavaScript program is compiled and bundled using `esbuild`
    - See [javascript.ts](../../src/stable/build/commands/build/javascript.ts)
4. Write the final JavaScript file into the build artifacts directory as `.azle/[canisterName]/main.js`
5. Generate the canister's Candid file and method meta information
    1. The stable canister template Wasm binary is manipulated to include the final compiled and bundled JavaScript code in a passive data segment that is instantiated dynamically at Wasm runtime
    2. The new Wasm binary is then executed within Node.js' Wasm environment
    3. The result of the execution is the canister's full Candid file and a method meta data object necessary for generating the canister's final Wasm binary
    - See [candid_and_method_meta/](../../src/stable/build/commands/build/candid_and_method_meta)
6. Write the Candid file into the build artifacts directory
7. Generate the canister's final Wasm binary
    1. The stable canister template Wasm binary is manipulated to include the final compiled and bundled JavaScript code along with functions exported for each of the canister methods
    2. The exported functions are hard-coded to call a Rust function with an index argument that corresponds to the globally registered JavaScript callbacks at Wasm runtime
    - See [wasm_binary/](../../src/stable/build/commands/build/wasm_binary)
8. Write the Wasm binary file into the build artifacts directory
9. At this point the Wasm binary may be deployed to a local or mainnet ICP replica

## Azle's runtime library

The runtime library executes within the deployed canister's Wasm environment on the ICP replica. It bridges the developer's TypeScript/JavaScript code with the ICP system APIs through QuickJS and Rust.

The Azle runtime library source code can be found at [src/stable/lib](../../src/stable/lib). The process is as follows:

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

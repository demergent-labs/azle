# The Azle architecture

Azle is a Canister Development Kit ([CDK](https://internetcomputer.org/docs/building-apps/developer-tools/cdks/)) for the Internet Computer Protocol ([ICP](https://internetcomputer.org/)). In other words it's a WebAssembly runtime for TypeScript and JavaScript on ICP.

This document describes Azle's architecture for security researchers and core developers. It focuses on the stable implementation found under `src/stable`.

`src/stable` is split into three directories, representing Azle's three major architectural components:

1. `src/stable/build`: Azle's build process (generally executes on a development laptop or CI/CD machine)
2. `src/stable/lib`: Azle's runtime TypeScript/JavaScript library (generally executes within the ICP or Node.js Wasm environment)
3. `src/stable/test`: Azle's testing utilities (generally executes on a development laptop or CI/CD machine)

## Azle's build process

The build process begins with invoking Azle's `Node.js` executable, usually through a command like `npx azle [command name]`. The `build` command itself (there are various other commands that don't result in building the canister's final Wasm binary) will usually be invoked during the `dfx` command line process, such as from the commands `dfx  deploy` or `dfx build`. The [Azle dfx extension](src/stable/build/dfx_extension/extension.json) defines the command that begins the build process.

The Azle build command source code can be found at [src/stable/build/commands/build/index.ts](src/stable/build/commands/build/index.ts). The process is as follows:

0. View the sequence diagram [here](./build_process_sequence.md)
1. Get the context:
    1. Path of file to store the canister's Candid file (Azle `dfx` extension default or `candid` property of canister configuration in `dfx.json`)
    2. Path of directory to store the canister's build artifacts (`.azle/[canisterName]`)
    3. Path to the developer's TypeScript/JavaScript entrypoint (`main` property of canister configuration in `dfx.json`)
    4. Path of file to store the canister's Wasm binary file (Azle `dfx` extension default or `wasm` property of canister configuration in `dfx.json`)
    5. Data object that will be passed into the Wasm's runtime code (e.g. contains environment variables from the developer)
2. Delete the canister build artifacts directory
3. Compile and bundle the canister's TypeScript/JavaScript from the `main` entrypoint into a final JavaScript file
    1. A prelude is added to the canister's TypeScript/JavaScript entrypoint. This prelude handles the canister class instantiation, Candid generation, and canister method meta generation
    2. The final TypeScript/JavaScript program is compiled and bundled using `esbuild`
4. Write the final JavaScript file into the build artifacts directory as `.azle/[canisterName]/main.js`
5. Generate the canister's Candid file and method meta information
    1. The stable canister template Wasm binary is manipulated to include the final compiled and bundled JavaScript code in a passive data segment that is instantiated dynamically at Wasm runtime
    2. The new Wasm binary is then executed within Node.js' Wasm environment
    3. The result of the execution is the canister's full Candid file and a method meta data object necessary for generating the canister's final Wasm binary
6. Write the Candid file into the build artifacts directory
7. Generate the canister's final Wasm binary
    1. The stable canister template Wasm binary is manipulated to include the final compiled and bundled JavaScript code along with functions exported for each of the canister methods
    2. The exported functions are hard-coded to call a Rust function with an index argument that corresponds to the globally registered JavaScript callbacks at Wasm runtime
8. Write the Wasm binary file into the build artifacts directory
9. At this point the Wasm binary may be deployed to a local or mainnet ICP replica

## Azle's runtime library

0. View the sequence diagram [here](./runtime_library_sequence.md)
1. During init or postUpgrade, the final compiled JavaScript bundle is executed. This includes executing any exported canister classes. The canister classes will make use of the decorators. At runtime these decorators will hook up a final global callback with an index. This index corresponds to the index that was hard-coded into the exported Wasm functions during the Wasm binary manipulation process.
2. When an ICP request comes in, the following process occurs
    1. The ICP replica finds the appropriately exported canister method name by looking for exports such as `canister_query [method_name]`, `canister_update [method_name]`, etc.
    2. These exported Wasm functions are hard-coded with an index obtained from the MethodMeta data structure. That index is used as the key in the `globalThis._azleCanisterClassMeta.callbacks` property. Thus the Rust program is able to execute the global JavaScript callback.
    3. The callback is called, using the JavaScript ICP APIs to decode any ICP Candid arguments. The arguments are passed to the developer's own defined canister method, the result is returned and then automatically encoded into the Candid binary format and the ICP message is replied to.
3. The ICP APIs are available as imports from `azle`. The available APIs have a TypeScript front, and under-the-hood are connected to Rust using `rquickjs`.
4. The developer is thus free to use the decorators to hook up their canister classes, and then call into ICP's APIs using the available imports from the `azle` module in their code.
5. QuickJS is used as the JavaScript interpreter. It is a bare-bones JavaScript interpreter that provides the JavaScript language. It does not provide the Web APIs nor the Node.js standard library. Thus many JavaScript programs designed for a web browser or Node.js will not work. The purpose of Azle's experimental mode is to seek to enable more and more of the Web APIs and Node.js stdlib.

## Azle's testing utilities

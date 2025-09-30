# The Azle Architecture

Azle is a Canister Development Kit (CDK) for the Internet Computer Protocol (ICP).

Another way to think about Azle is that it's a WebAssembly runtime for TypeScript and JavaScript on ICP. Instead of compiling TypeScript/JavaScript to Wasm directly, Azle compiles a JavaScript engine (QuickJS) to Wasm and embeds developer JavaScript into that Wasm module. Azle then provides bindings to the ICP system API and a developer-friendly decorator API.

This document describes Azle's architecture for security researchers and new core developers. It focuses on the stable implementation under `src/stable`.

## Build Process

The build process begins with executing the Azle executable, usually through a command like `npx azle [command name]`. During the `dfx` command line process, such as `dfx  deploy` or `dfx build`, the [Azle dfx extension](src/stable/build/dfx_extension/extension.json) defines the command that begins the build process.

1. [Determine stable or experimental mode](src/build.ts)
2. If stable mode is determined, [invoke its build process](src/stable/build/index.ts).
    1. Determine which command the user has invoked
    2. If the `build` command has been invoked
        1. The canister configuration is retrieved from the developer's `dfx.json` file.
        2. Various paths are determined from the canister configuration, including where to place the generated Candid file, where to find the entrypoint to the developer's TypeScript or JavaScript code, and where to place the final Wasm binary.
        3. The final Azle build artificats are located at `./.azle/[canister_name]`. This is known as the canister path.
        4. The canister path is entirely deleted.
        5. The developer's TypeScript or JavaScript code is then compiled into JavaScript and bundled into one file using `esbuild`. A prelude is added that handles retrieving the developer's exported canister classes.
        6. The prelude also hooks up a global method called `_azleGetCandidAndMethodMeta`. This function returns the fully compiled and generated Candid file for the canister, and a data structure called `MethodMeta` that contains information about each canister method, including its name, what type of method it is (init, postUpgrade, query, update, etc), and an index used at runtime by the Wasm exported functions to execute the final hooked up JavaScript callback.
        7. This final compiled JavaScript file is written to `./.azle/[canister_name]/main.js`.
        8. The Candid and MethodMeta are now retrieved by executing the Wasm module in Node.js' Wasm environment
            1. Azle ships with a static Wasm module that is essentially a canister template. It has no JavaScript or canister methods, but has the internals necessary to execute the canister if provided with JavaScript and canister method exports. This code is written in Rust and found here.
            2. The static canister template is manipulated, the JavaScript is placed into a passive data segment in the Wasm binary. The passive data segment will be essentially instantiated at runtime.
            3. The Wasm module has no canister method exports at this time.
            4. The Wasm module is now executed in Node.js' Wasm environment.
            5. During this execution the MethodMeta data structure is populated with the canister method information necessary for use at runtime in the ICP replica's environment
            6. The end result of this process is the fully generated Candid string for the canister, and the Method Meta data structure.
        9. The Candid file is written to `./.azle/[canister_name]/[candid_file_name].did`.
        10. With the MethodMeta data structure created, we can now fully manipulate the static canister template, placing the final compiled JavaScript into a passive data segment and also exported functions that act as the canister methods. At runtime these are invoked by the ICP replica, and in turn using an index for Wasm memory simplicity, the JavaScript callback corresponding to the exported canister method is executed.
        11. By default the final manipulated Wasm binary is stored at `./.azle/[canister_name]/[canister_name].wasm`.
        12. At this point the final Wasm binary has been created and can be deployed to ICP.
    3. Other commands are not described in this document
3. If experimental mode is determined, [invoke its build process](src/experimental/build/index.ts).

## ICP Runtime Process

1. During init or postUpgrade, the final compiled JavaScript bundle is executed. This includes executing any exported canister classes. The canister classes will make use of the decorators. At runtime these decorators will hook up a final global callback with an index. This index corresponds to the index that was hard-coded into the exported Wasm functions during the Wasm binary manipulation process.
2. When an ICP request comes in, the following process occurs
    1. The ICP replica finds the appropriately exported canister method name by looking for exports such as `canister_query [method_name]`, `canister_update [method_name]`, etc.
    2. These exported Wasm functions are hard-coded with an index obtained from the MethodMeta data structure. That index is used as the key in the `globalThis._azleCanisterClassMeta.callbacks` property. Thus the Rust program is able to execute the global JavaScript callback.
    3. The callback is called, using the JavaScript ICP APIs to decode any ICP Candid arguments. The arguments are passed to the developer's own defined canister method, the result is returned and then automatically encoded into the Candid binary format and the ICP message is replied to.
3. The ICP APIs are available as imports from `azle`. The available APIs have a TypeScript front, and under-the-hood are connected to Rust using `rquickjs`.
4. The developer is thus free to use the decorators to hook up their canister classes, and then call into ICP's APIs using the available imports from the `azle` module in their code.
5. QuickJS is used as the JavaScript interpreter. It is a bare-bones JavaScript interpreter that provides the JavaScript language. It does not provide the Web APIs nor the Node.js standard library. Thus many JavaScript programs designed for a web browser or Node.js will not work. The purpose of Azle's experimental mode is to seek to enable more and more of the Web APIs and Node.js stdlib.

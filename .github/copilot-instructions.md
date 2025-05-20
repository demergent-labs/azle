Azle is a TypeScript/JavaScript environment for the Internet Computer Protocol.

Azle generally has two modes of execution for the end developer.

The source code is bifurcated into the src/stable and src/experimental directories.

The examples and tests are bifurcated into the examples/stable and examples/experimental directories.

The source code has two main divisions, the library and build code.

Library code is found at src/stable/lib and src/experimental/lib. Library code runs inside of the deployed canister.

Build code is found at src/stable/build and src/experimental/build. This code is generally used during the build process of the end developer, running in their own environment outside of a deployed canister.

The Rust code for static binary template creation and manipulation of those templates to produce the final Wasm binaries for deployment are found at src/stable/build/commands/build/wasm_binary/rust and src/experimental/build/commands/build/wasm-binary/rust.

Whenever you are working on a feature, unless otherwise noted in the issue or it makes sense not to do this, you should generally test any changes you make by running one or more of the example tests locally.

One simple way to do this for the stable async_await example:

cd examples/stable/test/end_to_end/candid_rpc/async_await
npm install
npm link azle
AZLE_VERBOSE=true AZLE_DEV_TEMPLATE=true npm test

The example tests use jest. You should look for all green checkmarks indicating that all tests passed. Typechecking will automatically run as a test for each example.

For more thorough typechecking, you can also run `npm run typecheck` from within the root directory.

## Coding Standards

- Favor functional programming constructs
- Use declarative programming design, striving to write what and not how
- Avoid TypeScript interfaces
- Use explicit and === strict conditional checks
- Use function declarations vs function expressions, unless you're creating an anonymous function
- Avoid mutation, using map, filter, reduce, object spread, array spread as much as practical
- Avoid else if statements
- Avoid switch statements, using if statements with return statements instead
- Handle Rust Results and Options using ? syntax
- All public APIs, those importable from the Azle npm package itself, must have and maintain excellent JS Docs
- Any internal TypeScript or Rust functions that might require special knowledge to understand should have excellent JS or Rust Docs
- Avoid comments unless absolutely necessary to aid in understanding
- Prefer excellent declarative function and variable names to comments
- Abstract well using functions and variables
- Avoid the use of classes in internal code

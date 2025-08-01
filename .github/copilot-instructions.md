Azle is a TypeScript/JavaScript environment for the Internet Computer Protocol.

Azle generally has two modes of execution for the end developer.

The source code is bifurcated into the src/stable and src/experimental directories.

The examples and tests are bifurcated into the examples/stable and examples/experimental directories.

The source code has two main divisions, the library and build code.

Library code is found at src/stable/lib and src/experimental/lib. Library code runs inside of the deployed canister.

Build code is found at src/stable/build and src/experimental/build. This code is generally used during the build process of the end developer, running in their own environment outside of a deployed canister.

The Rust code for static binary template creation and manipulation of those templates to produce the final Wasm binaries for deployment are found at src/stable/build/commands/build/wasm_binary/rust and src/experimental/build/commands/build/wasm-binary/rust.

## Verifying Changes

Whenever you are working on a feature, unless otherwise noted in the issue or it makes sense not to do this, you should generally use the following commands to test any changes you make by generating the stable and experimental templates, running one or more of the example tests locally, and linting. You should do this BEFORE COMMITTING ANY CHANGES.

### Generating the Wasm binary canister templates

Here's how to generate the stable and experimental Wasm binary canister templates with one command. Always run this command from the Azle root directory:

```
npx azle dev template --all
```

Make sure to resolve any Rust compiler errors before proceeding.

### Running tests in stable mode

Here's how to test the stable API async_await example in stable mode:

```
cd examples/stable/test/end_to_end/candid_rpc/async_await
npm install
npm link azle
AZLE_VERBOSE=true AZLE_DEV_TEMPLATE=true npm test
```

### Running tests in experimental mode

Here's how to test the stable API async_await example in experimental mode:

```
cd examples/stable/test/end_to_end/candid_rpc/async_await
npm install
npm link azle
AZLE_EXPERIMENTAL=true AZLE_VERBOSE=true AZLE_DEV_TEMPLATE=true npm test
```

The example tests use jest. You should look for all green checkmarks indicating that all tests passed. Typechecking will automatically run as a test for each example.

### Typechecking

For more thorough typechecking, you can also run `npm run typecheck` from within the root directory.

### Linting

Remember that you must lint BEFORE COMMITTING ANY CHANGES. From the root directory:

```bash
npx lint-staged --allow-empty
npm run lint
```

Before considering yourself finished with the PR, each of the above commands should complete without any errors whatsoever.

Remember, before the PR can be considered complete, you must at least do the following: generate the stable and experimental templates, run one stable API test in stable and experimental mode to completion without any errors, typecheck from the root directory resulting in no type errors, and lint from the root directory resulting in no errors.

## Coding Standards

- Favor functional programming constructs
- Use declarative programming design, striving to write what and not how
- Avoid TypeScript interfaces
- Use explicit and === strict conditional checks, for example myVariable === true. Do not use just myVariable or !myVariable
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
- Put helper functions in function declarations underneath the code that it is used in. Generally, you should see all helper functions at the bottom of the file
- Prefer const variable declarations over let or var. You should always use const unless you have a very good reason to mutate the variable. In that case you can use let. There is almost no reason you should ever use var.
- Use console.info if you intend for your logs to be committed to the codebase. Use console.log only for debugging purposes.
- Use numeric separators for large numbers, for example 1_000_000 instead of 1000000

## Human Notes

This section is for humans only, please ignore it if you are an AI.

Before merging a PR created by the GitHub Copilot coding agent, you will need to collapse all of the coding agent's commits into one verified commit.

One simple way to do this is the following:

1. Check out the coding agent's feature branch on your local machine
2. Run this command from the root of the repository: `git reset --soft $(git merge-base --fork-point main HEAD)`
3. Commit and force push the changes

The three steps above will essentially allow you to collapse all of the coding agent's commits into one commit on your machine, signed by you and verifiable by GitHub. You will need to force push to the coding agent's branch to remove all of its unverified commits.

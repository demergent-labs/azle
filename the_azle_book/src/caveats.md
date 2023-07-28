# Caveats

## Unknown security vulnerabilities

Azle is a beta project using an experimental JS engine. See [the disclaimer](/azle.md#disclaimer) for more information.

## High instruction/cycle count

Azle canisters will generally use more Wasm instructions and thus cycles than Motoko or Rust canisters. A good rule of thumb for now would be 2-4x the cycles. Azle's efficiency should increase dramatically with the upcoming JS engine swapout.

## JavaScript syntax and features

You may encounter various missing JavaScript syntax or features. Azle generally has better conformance than that of its [underlying JS engine](https://boajs.dev/boa/test262/).

## npm packages

Some npm packages will work and some will not work. It is our long-term goal to support as many npm packages as possible. There are many reasons why an npm package may not currently work, including the small Wasm binary limit of the IC, bugs in Azle's JS engine [Boa](https://github.com/boa-dev/boa), or unimplemented web or Node.js APIs. Feel free to open issues if your npm package does not work in Azle.

## Promises

Though promises are implemented, the underlying queue that handles asynchronous operations is very simple. This queue will not behave exactly as queues from the major JS engines. The queue can be thought of as a simple queue that executes tasks sequentially without reporting errors.

## Treat Azle types as unique keywords

You should treat Azle types essentially as unique keywords, not creating types of the same name elsewhere in your codebase or in other libraries. Any types exported from [this file](https://github.com/demergent-labs/azle/blob/main/index.ts) should be treated thusly.

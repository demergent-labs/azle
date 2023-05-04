# Plugins

Azle plugins allow developers to wrap Rust code in TypeScript/JavaScript APIs that can then be exposed to Azle canisters, providing a clean and simple developer experience with the underlying Rust code.

Plugins are in a very early alpha state. You can create and use them now, but be aware that the API will be changing significantly in the near future.

You can use the following example plugins as you create your own plugins:

## Local plugin

If you just want to create a plugin in the same repo as your project, see [the plugins example](https://github.com/demergent-labs/azle/tree/main/examples/plugins).

## npm plugin

If you want to create a plugin that can be published and/or used with npm, see [the ic-sqlite-plugin example](https://github.com/demergent-labs/ic-sqlite-plugin).

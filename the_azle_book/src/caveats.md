# Caveats

## Unknown security vulnerabilities

Azle is a beta project. See [the disclaimer](/azle.md#disclaimer) for more information.

## npm packages

Some npm packages will work and some will not work. It is our long-term goal to support as many npm packages as possible. There are various reasons why an npm package may not currently work, including the small Wasm binary limit of the IC and unimplemented web or Node.js APIs. Feel free to open issues if your npm package does not work in Azle.

## JavaScript environment APIs

You may encounter various missing JavaScript environment APIs, such as those you would expect in the web or Node.js environments.

## High Candid encoding/decoding costs

Candid encoding/decoding is currently very unoptimized. This will most likely lead to a ~1-2 million extra fixed instruction cost for all calls. Be careful using `CandidType` `Serializable objects` with `StableBTreeMap`, or using any other API or data structure that engages in Candid encoding/decoding.

## Promises

Though promises are implemented, the underlying queue that handles asynchronous operations is very simple. This queue will not behave exactly as queues from the major JS engines.

## JSON.parse and StableBTreeMap float64 values

It seems to be only some `float64` values cannot be successfully stored and retrieved with a `StableBTreeMap` using `stableJson` because of this bug with JSON.parse: https://github.com/bellard/quickjs/issues/206

This will also affect stand-alone usage of `JSON.parse`.

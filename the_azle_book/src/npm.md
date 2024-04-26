# npm TL;DR

If you want to know if an [npm](https://www.npmjs.com/) package will work with Azle, just try out the package.

It's extremely difficult to know generally if a package will work unless it has been tried out and tested already. This is due to the complexity of understanding and implementing all required JavaScript, web, Node.js, and OS-level APIs required for an `npm` package to execute correctly.

To get an idea for which `npm` packages are currently supported, the [Azle examples](./rest_based_examples.md) are full of example code with tests.

You can also look at the [wasmedge-quickjs](https://github.com/second-state/wasmedge-quickjs) documentation [here](https://github.com/WasmEdge/WasmEdge/issues/1535) and [here](https://wasmedge.org/docs/develop/javascript/nodejs), as `wasmedge-quickjs` is our implementation for much of the Node.js stdlib.

# npm

Azle's goal is to support as many [npm](https://www.npmjs.com/) packages as possible.

The current reality is that not all `npm` packages work well with Azle. It is also very difficult to determine which `npm` packages might work well.

For example, when asked about a specific package, we usually cannot say whether or not a given package "works". To truly know if a package will work for your situation, the easiest thing to do is to install it, import it, and try it out.

If you do want to reason about whether or not a package is likely to work, consider the following:

1. Which web or Node.js APIs does the package use?
2. Does the package depend on functionality that ICP supports?
3. Will the package stay within [these limitations](./limitations.md)?

For example, any kind of networking outside of HTTP is unlikely to work (without modification), because ICP has very limited support for non-ICP networking.

Also any kind of heavy computation is unlikely to work (without modification), because ICP has very limited instruction limits per call.

We use [wasmedge-quickjs](https://github.com/second-state/wasmedge-quickjs) as our implementation for much of the Node.js stdlib. To get a feel for which Node.js standard libraries Azle supports, see [here](https://github.com/WasmEdge/WasmEdge/issues/1535) and [here](https://wasmedge.org/docs/develop/javascript/nodejs).

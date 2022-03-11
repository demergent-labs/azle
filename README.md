EXPERIMENTAL

# Azle

TypeScript/JavaScript CDK for the Internet Computer.

## Installation

npm install azle

## Use

See the [examples in this respository](/examples).

## Roadmap

1. Synchronous IC APIs
2. TypeScript -> Candid compiler
3. Asynchronous IC APIs
4. Robust automated tests
5. Comprehensive benchmarks

## Limitations

* No asynchronous IC APIs (such as cross-canister calls)
* No asynchronous TypeScript/JavaScript at all (async/await, promises, etc)
* Third-party npm packages that you import may use unsupported syntax or APIs
* TypeScript -> Candid compiler is very primitive (your `.did` files may be generated incorrectly)
* Various TypeScript types aren't supported as parameters or return types to `Query` or `Update` functions
* Potentially many obvious security vulnerabilities
* Unknown cycle efficiency relative to canisters written in Rust or Motoko
* And much much [more](https://github.com/demergent-labs/azle/issues)

## Contributing

All contributors must agree to and sign the [Azle License Extension](/LICENSE_EXTENSION.md).

Before beginning work on a contribution, please create or comment on the issue you want to work on and wait for clearance from Demergent Labs.

## License

Azle's copyright is governed by the [LICENSE](/LICENSE) and [LICENSE_EXTENSION](/LICENSE_EXTENSION.md).
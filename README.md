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
6. Security audits

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

Please see the good first issue and help wanted issues to get started contributing to the branch.

All contributors must agree to and sign the [Azle License Extension](/LICENSE_EXTENSION.md).

Before beginning work on a contribution, please create or comment on the issue you want to work on and wait for clearance from Demergent Labs.

## License

Azle's copyright is governed by the [LICENSE](/LICENSE) and [LICENSE_EXTENSION](/LICENSE_EXTENSION.md).

## Decentralization

Demergent Labs currently owns the majority of AZLE tokens, and thus has ultimate control over Azle's copyright and AZLE token allocations. Demergent Labs also controls [its own Azle repository](https://github.com/demergent-labs/azle).

The creation and initial dissemination of AZLE tokens is the first step in Demergent Labs' plan to decentralize the Azle project. Right now the project is highly centralized, with Demergent Labs maintaining ultimate control over nearly all aspects of Azle. As time goes on, and as the AZLE token continues to be distributed, the goal is to transfer ownership of the entire project to the AZLE token holders. This will include a decentralized git repository goverend by AZLE token holders.

The plan is for Demergent Labs to own a much smaller perecentage of AZLE tokens, with most being distributed to the community, and some being distributed to key groups that have the best interests of AZLE at heart.

This is all subject to change, especially due to compliance with government regulations. The AZLE token is currently not transferrable.
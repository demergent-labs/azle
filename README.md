# Azle (Alpha)

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
* No asynchronous TypeScript/JavaScript (async/await, promises, etc)
* Third-party npm packages that you import may use unsupported syntax or APIs
* TypeScript -> Candid compiler is very primitive (your `.did` files may be generated incorrectly)
* Various TypeScript types aren't supported as parameters or return types to `Query` or `Update` functions
* Potentially many obvious security vulnerabilities
* Unknown cycle efficiency relative to canisters written in Rust or Motoko
* And much much [more](https://github.com/demergent-labs/azle/issues)

## Contributing

All contributors must agree to and sign the [Azle License Extension](/LICENSE_EXTENSION.md).

Please consider working on the [good first issues](https://github.com/demergent-labs/azle/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) and [help wanted issues](https://github.com/demergent-labs/azle/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) before suggesting other work to be done.

Before beginning work on a contribution, please create or comment on the issue you want to work on and wait for clearance from Demergent Labs.

See [Demergent Labs' Coding Guidelines](/contributing/coding-guidelines.md) for what to expect during code reviews.

## License

Azle's copyright is governed by the [LICENSE](/LICENSE) and [LICENSE_EXTENSION](/LICENSE_EXTENSION.md).

## Decentralization

Please note that the following plan is very subject to change, especially in response to compliance with government regulations. Please carefully read the [Azle License Extension](/LICENSE_EXTENSION.md) to understand Azle's copyright and the AZLE token in more detail.

Azle's tentative path towards decentralization is currently focused on traditional open source governance paired with a new token concept known as Open Source tokens (aka OS tokens or OSTs). The goal for OS tokens is to legally control the copyright and to fully control the repository for open source projects. In other words, OS tokens are governance tokens for open source projects.

Azle's OS token is called AZLE. Currently it only controls Azle's copyright and not the Azle repository. Demergent Labs controls [its own Azle repository](https://github.com/demergent-labs/azle). Once a decentralized git repository is implemented on the Internet Computer, the plan is to move [Demergent Labs' Azle repository](https://github.com/demergent-labs/azle) there and give full control of that repository to the AZLE token holders.

Demergent Labs currently owns the majority of AZLE tokens, and thus has ultimate control over Azle's copyright and AZLE token allocations. Demergent Labs will use its own discretion to distribute AZLE tokens over time to contributors and other parties. AZLE tokens are not currently transferrable and may never become transferrable. If all goes well, Demergent Labs will eventually own much less than 50% of the tokens, with a large group of individuals and other entities controlling the vast majority of the supply.

The hope is that this will all end in a sustainable model for Azle's continued development, maintenance, and success.
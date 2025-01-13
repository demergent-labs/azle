<div align="center">
    <a href="https://github.com/demergent-labs/azle" target="_blank" rel="noopener noreferrer">
        <img height="150" src="https://raw.githubusercontent.com/demergent-labs/azle/main/logo/logo.svg" alt="Azle logo">
    </a>
</div>
</br>
<div align="center">
    <a href="https://github.com/demergent-labs/azle/actions/workflows/test.yml?query=branch%3Amain">
        <img src="https://github.com/demergent-labs/azle/actions/workflows/test.yml/badge.svg" alt="Coverage Status">
    </a>
    <a href="https://npmcharts.com/compare/azle?minimal=true"><img src="https://img.shields.io/npm/dm/azle.svg" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/azle"><img src="https://img.shields.io/npm/v/azle.svg" alt="Version"></a>
    <a href="https://github.com/demergent-labs/azle/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/azle.svg" alt="License"></a>
</div>

# Azle (Beta)

TypeScript and JavaScript CDK for the [Internet Computer](https://internetcomputer.org/).

## Disclaimer

Azle stable mode is continuously subjected to [intense scrutiny and testing](https://github.com/demergent-labs/azle/actions), however it does not yet have multiple independent security reviews/audits.

## Stable Mode

Azle runs in stable mode by default.

This mode is intended for production use after Azle's 1.0 release. Its focus is on API and runtime stability, security, performance, TypeScript and JavaScript language support, the ICP APIs, and Candid remote procedure calls (RPC). There is minimal support for the Node.js standard library, npm ecosystem, and HTTP server functionality.

## Experimental Mode

Azle runs in experimental mode through explicitly enabling a flag in `dfx.json` or certain CLI commands.

This mode is intended for developers who are willing to accept the risk of using an alpha or beta project. Its focus is on quickly enabling new features and functionality without requiring the time and other resources necessary to advance them to the stable mode. The Node.js standard libary, npm ecosystem, and HTTP server functionality are also major areas of focus.

> NOTE: Keep clearly in mind that the experimental mode fundamentally changes the Azle Wasm binary. It is not guaranteed to be secure or stable in API changes or runtime behavior. If you enable the experimental mode, even if you only use APIs from the stable mode, you are accepting a higher risk of bugs, errors, crashes, security exploits, breaking API changes, etc.

## Get Started

The quickest way to get started is through the [hello_world Candid RPC example](https://github.com/demergent-labs/azle/tree/main/examples/hello_world) or the [hello_world HTTP Server example](https://github.com/demergent-labs/azle/tree/main/examples/hello_world_http_server).

You can create the hello_world Candid RPC example locally like this:

```bash
npx azle new hello_world
cd hello_world

# Now read the README.md
```

You can create the hello_world HTTP Server example locally like this:

```bash
npx azle new hello_world --http-server --experimental
cd hello_world

# Now read the README.md
```

## Documentation

See [The Azle Book](https://demergent-labs.github.io/azle/).

## Discussion

Feel free to open issues or join us in the [Discord channel](https://discord.gg/5Hb6rM2QUM).

## Contributing

All contributors must agree to and sign the [Azle License Extension](/LICENSE_EXTENSION.md).

Please reach out before working on anything that is not in the [good first issues](https://github.com/demergent-labs/azle/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) or [help wanted issues](https://github.com/demergent-labs/azle/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22). Before beginning work on a contribution, please create or comment on the issue you want to work on and wait for clearance from Demergent Labs.

See [Demergent Labs' Coding Guidelines](/contributing/coding-guidelines.md) for what to expect during code reviews.

## License

Azle's copyright is governed by the [LICENSE](/LICENSE) and [LICENSE_EXTENSION](/LICENSE_EXTENSION.md).

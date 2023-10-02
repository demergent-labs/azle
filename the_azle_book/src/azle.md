# Azle (Beta)

Azle is a [TypeScript](https://www.typescriptlang.org/) and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [Canister Development Kit](https://internetcomputer.org/docs/current/developer-docs/backend/choosing-language) (CDK) for the [Internet Computer](https://internetcomputer.org/) (IC). In other words, it's a TypeScript/JavaScript runtime for building applications ([canisters](https://internetcomputer.org/docs/current/concepts/canisters-code)) on the IC.

-   [npm package](https://www.npmjs.com/package/azle)
-   [GitHub repo](https://github.com/demergent-labs/azle)
-   [Discord channel](https://discord.gg/5Hb6rM2QUM)

## Disclaimer

Azle may have unknown security vulnerabilities due to the following:

-   Azle does not yet have extensive automated property tests
-   Azle does not yet have multiple independent security reviews/audits
-   Azle does not yet have many live, successful, continuously operating applications deployed to the IC

## Roadmap

We hope to move Azle from beta to release candidates by the end of 2023, and to move from release candidates to 1.0 in early 2024.

### Blockers for release candidates

-   Good automated property test coverage
-   Settling of API/syntax
-   Good npm package support

### Blockers for 1.0

-   Extensive automated property test coverage
-   Multiple independent security reviews/audits
-   Broad npm package support

## Demergent Labs

Azle is currently developed by [Demergent Labs](https://github.com/demergent-labs), a for-profit company with a [grant](https://dfinity.org/grants) from [DFINITY](https://dfinity.org/).

Demergent Labs' [vision](https://github.com/demergent-labs/blog/blob/main/demergent-labs-grand-plan-part-1.md) is to accelerate the adoption of Web3, the Internet Computer, and sustainable open source.

## Benefits and drawbacks

Azle and the IC provide unique benefits and drawbacks, and both are not currently suitable for all application use-cases.

The following information will help you to determine when Azle and the IC might be beneficial for your use-case.

### Benefits

Azle intends to be a full TypeScript and JavaScript environment for the IC (a decentralized cloud platform), with support for all of the TypeScript and JavaScript language and as many relevant environment APIs as possible. These environment APIs will be similar to those available in the Node.js and web browser environments.

One of the core benefits of Azle is that it allows web developers to bring their TypeScript or JavaScript skills to the IC. For example, Azle allows the use of various npm packages and VS Code intellisense.

As for the IC, we believe its main benefits can be broken down into the following categories:

-   [Ownership](#ownership)
-   [Security](#security)
-   [Developer Experience](#developer-experience)

Most of these benefits stem from the decentralized nature of the IC, though the IC is best thought of as a progressively decentralizing cloud platform. As opposed to traditional cloud platforms, its goal is to be owned and controlled by many independent entities.

#### Ownership

-   [Full-stack group ownership](#full-stack-group-ownership)
-   [Autonomous ownership](#autonomous-ownership)
-   [Permanent APIs](#permanent-apis)
-   [Credible neutrality](#credible-neutrality)
-   [Reduced platform risk](#reduced-platform-risk)

##### Full-stack group ownership

The IC allows you to build applications that are controlled directly and only (with some caveats) by a group of people. This is in opposition to most cloud applications written today, which must be under the control of a very limited number of people and often a single legal entity that answers directly to a cloud provider, which itself is a single legal entity.

In the blockchain world, group-owned applications are known as [DAOs](https://en.wikipedia.org/wiki/Decentralized_autonomous_organization). As opposed to DAOs built on most blockchains, the IC allows full-stack applications to be controlled by groups. This means that the group fully controls the running instances of the frontend and the backend code.

##### Autonomous ownership

In addition to allowing applications to be owned by groups of people, the IC also allows applications to be owned by no one. This essentially creates autonomous applications or everlasting processes that execute indefinitely. The IC will essentially allow such an application to run indefinitely, unless it depletes its balance of cycles, or the [NNS](https://internetcomputer.org/nns) votes to shut it down, neither of which is inevitable.

##### Permanent APIs

Because most web APIs are owned and operated by individual entities, their fate is tied to that of their owners. If their owners go out of business, then those APIs may cease to exist. If their owners decide that they do not like or agree with certain users, they may restrict their access. In the end, they may decide to shut down or restrict access for arbitrary reasons.

Because the IC allows for group and autonomous ownership of cloud software, the IC is able to produce potentially permanent web APIs. A decentralized group of independent entities will find it difficult to censor API consumers or shut down an API. An autonomous API would take those difficulties to the extreme, as it would continue operating as long as consumers were willing to pay for it.

##### Credible neutrality

Group and autonomous ownership makes it possible to build neutral cloud software on the IC. This type of software would allow independent parties to coordinate with reduced trust in each other or a single third-party coordinator.

This removes the risk of the third-party coordinator acting in its own self-interest against the interests of the coordinating participants. The coordinating participants would also find it difficult to implement changes that would benefit themselves to the detriment of other participants.

Examples could include mobile app stores, ecommerce marketplaces, and podcast directories.

##### Reduced platform risk

Because the IC is not owned or controlled by any one entity or individual, the risk of being deplatformed is reduced. This is in opposition to most cloud platforms, where the cloud provider itself generally has the power to arbitrarily remove users from its platform. While deplatforming can still occur on the IC, the only endogenous means of forcefully taking down an application is through an NNS vote.

#### Security

-   [Built-in replication](#built-in-replication)
-   [Built-in authentication](#built-in-authentication)
-   [Built-in firewall/port management](#built-in-firewallport-management)
-   [Built-in sandboxing](#built-in-sandboxing)
-   [Threshold protocols](#threshold-protocols)
-   [Verifiable source code](#verifiable-source-code)
-   [Blockchain integration](#blockchain-integration)

##### Built-in replication

Replication has many benefits that stem from reducing various central points of failure.

The IC is at its core a [Byzantine Fault Tolerant](https://en.wikipedia.org/wiki/Byzantine_fault) replicated compute environment. Applications are deployed to subnets which are composed of nodes running replicas. Each replica is an independent replicated state machine that executes an application's state transitions (usually initiated with HTTP requests) and persists the results.

This replication provides a high level of security out-of-the-box. It is also the foundation of a number of protocols that provide threshold cryptographic operations to IC applications.

##### Built-in authentication

IC client tooling makes it easy to sign and send messages to the IC, and [Internet Identity](https://internetcomputer.org/docs/current/tokenomics/identity-auth/what-is-ic-identity) provides a novel approach to self-custody of private keys. The IC automatically authenticates messages with the public key of the signer, and provides a compact representation of that public key, called a principal, to the application. The principal can be used for authorization purposes. This removes many authentication concerns from the developer.

##### Built-in firewall/port management

The concept of ports and various other low-level network infrastructure on the IC is abstracted away from the developer. This can greatly reduce application complexity thus minimizing the chance of introducing vulnerabilities through incorrect configurations. Canisters expose endpoints through various methods, usually query or update methods. Because authentication is also built-in, much of the remaining vulnerability surface area is minimized to implementing correct authorization rules in the canister method endpoints.

##### Built-in sandboxing

Canisters have at least two layers of sandboxing to protect colocated canisters from each other. All canisters are at their core Wasm modules and thus inherit the built-in Wasm sandbox. In case there is any bug in the underlying implementation of the Wasm execution environment (or a vulnerability in the imported host functionality), there is also an OS-level sandbox. Developers need not do anything to take advantage of these sandboxes.

##### Threshold protocols

The IC provides a number of threshold protocols that allow groups of independent nodes to perform cryptographic operations. These protocols remove central points of failure while providing familiar and useful cryptographic operations to developers. Included are [ECDSA](https://internetcomputer.org/docs/current/developer-docs/integrations/t-ecdsa), [BLS](https://internetcomputer.org/how-it-works/response-certification/), [VRF-like](https://internetcomputer.org/how-it-works/chain-key-technology/), and in the future [threshold key derivation](https://forum.dfinity.org/t/threshold-key-derivation-privacy-on-the-ic/16560).

##### Verifiable source code

IC applications (canisters) are compiled into Wasm and deployed to the IC as Wasm modules. The IC hashes each canister's Wasm binary and stores it for public retrieval. The Wasm binary hash can be retrieved and compared with the hash of an independently compiled Wasm binary derived from available source code. If the hashes match, then one can know with a high degree of certainty that the application is executing the Wasm binary that was compiled from that source code.

##### Blockchain integration

When compared with web APIs built for the same purpose, the IC provides a high degree of security when integrating with various other blockchains. It has a direct client integration with Bitcoin, allowing applications to query its state with BFT guarantees. A similar integration is coming for Ethereum.

In addition to these blockchain client integrations, a [threshold ECDSA protocol](https://internetcomputer.org/docs/current/developer-docs/integrations/t-ecdsa/) (tECDSA) allows the IC to create keys and sign transactions on various [ECDSA chains](http://ethanfast.com/top-crypto.html). These chains include Bitcoin and Ethereum, and in the future the protocol may be extended to allow interaction with various [EdDSA chains](http://ethanfast.com/top-crypto.html). These direct integrations combined with tECDSA provide a much more secure way to provide blockchain functionality to end users than creating and storing their private keys on traditional cloud infrastructure.

#### Developer experience

-   [Built-in devops](#built-in-devops)
-   [Orthogonal persistence](#orthogonal-persistence)

##### Built-in devops

The IC provides many devops benefits automatically. Though currently limited in its scalability, the protocol attempts to remove the need for developers to concern themselves with concepts such as autoscaling, load balancing, uptime, sandboxing, and firewalls/port management.

Correctly constructed canisters have a simple deploy process and automatically inherit these devops capabilities up unto the current scaling limits of the IC. DFINITY engineers are constantly working to remove scalability bottlenecks.

##### Orthogonal persistence

The IC automatically persists its heap. This creates an extremely convenient way for developers to store application state, by simply writing into global variables in their programming language of choice. This is a great way to get started.

If a canister upgrades its code, swapping out its Wasm binary, then the heap must be cleared. To overcome this limitation, there is a special area of memory called stable memory that persists across these canister upgrades. Special stable data structures provide a familiar API that allows writing into stable memory directly.

All of this together provides the foundation for a very simple persistence experience for the developer. The persistence tools now available and coming to the IC may be simpler than their equivalents on traditional cloud infrastructure.

### Drawbacks

It's important to note that both Azle and the IC are early-stage projects. The IC officially launched in May of 2021, and Azle reached beta in April of 2022.

#### Azle

Some of Azle's main drawbacks can be summarized as follows:

-   [Beta](#beta)
-   [Security risks](#security-risks)
-   [Missing APIs](#missing-apis)

##### Beta

Azle reached beta in April of 2022. It's an immature project that may have unforeseen bugs and other issues. We're working constantly to improve it. We hope to get to a production-ready 1.0 in 2024. The following are the major blockers to 1.0:

-   Extensive automated property test coverage
-   Multiple independent security reviews/audits
-   Broad npm package support

##### Security risks

As discussed earlier, these are some things to keep in mind:

-   Azle does not yet have extensive automated property tests
-   Azle does not yet have multiple independent security reviews/audits
-   Azle does not yet have many live, successful, continuously operating applications deployed to the IC

##### Missing APIs

Azle is not Node.js nor is it V8 running in a web browser. It is using a JavaScript interpreter running in a very new and very different environment. APIs from the Node.js and web browser ecosystems may not be present in Azle. Our goal is to support as many of these APIs as possible over time.

#### IC

Some of the IC's main drawbacks can be summarized as follows:

-   [Early](#early)
-   [High latencies](#high-latencies)
-   [Limited and expensive compute resources](#limited-and-expensive-compute-resources)
-   [Limited scalability](#limited-scalability)
-   [Lack of privacy](#lack-of-privacy)
-   [NNS risk](#nns-risk)

##### Early

The IC launched officially in May of 2021. As a relatively new project with an extremely ambitious vision, you can expect a small community, immature tooling, and an unproven track record. Much has been delivered, but many promises are yet to be fulfilled.

##### High latencies

Any requests that change state on the IC must go through consensus, thus you can expect latencies of a few seconds for these types of requests. When canisters need to communicate with each other across subnets or under heavy load, these latencies can be even longer. Under these circumstances, in the worst case latencies will build up linearly. For example, if canister A calls canister B calls canister C, and these canisters are all on different subnets or under heavy load, then you might need to multiply the latency by the total number of calls.

##### Limited and expensive compute resources

CPU usage, data storage, and network usage may be more expensive than the equivalent usage on traditional cloud platforms. Combining these costs with the high latencies explained above, it becomes readily apparent that the IC is currently not built for high-performance computing.

##### Limited scalability

The IC might not be able to scale to the needs of your application. It is constantly seeking to improve scalability bottlenecks, but it will probably not be able to onboard millions of users to your traditional web application.

##### Lack of privacy

You should assume that all of your application data (unless it is end-to-end encrypted) is accessible to multiple third-parties with no direct relationship and limited commitment to you. Currently all canister state sits unencrypted on node operator's machines. Application-layer access controls for data are possible, but motivated node operators will have an easy time getting access to your data.

##### NNS risk

The NNS has the ability to uninstall any canister and can generally change anything about the IC protocol. The NNS uses a simple liquid democracy based on coin/token voting and follower relationships. At the time of this writing most of the voting power on the NNS follows DFINITY for protocol changes, effectively giving DFINITY write control to the protocol while those follower relationships remain in place. The NNS must mature and decentralize to provide practical and realistic protections to canisters and their users.

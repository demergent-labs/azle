# Azle (Beta)

Azle is a [TypeScript](https://www.typescriptlang.org/) [Canister Development Kit](https://internetcomputer.org/docs/current/developer-docs/build/cdks/) (CDK) for the [Internet Computer](https://internetcomputer.org/) (IC). In other words, it's a TypeScript/JavaScript runtime for building applications ([canisters](https://internetcomputer.org/docs/current/concepts/canisters-code)) on the IC.

-   [GitHub repo](https://github.com/demergent-labs/azle)
-   [npm package](https://www.npmjs.com/package/azle)

## Demergent Labs

Azle is currently developed by [Demergent Labs](https://github.com/demergent-labs), a for-profit company with a grant from [DFINITY](https://dfinity.org/).

Demergent Labs' [vision](https://github.com/demergent-labs/blog/blob/main/demergent-labs-grand-plan-part-1.md) is to accelerate the adoption of Web3, the Internet Computer, and sustainable open source.

## Benefits and drawbacks

Azle and the IC provide unique benefits and drawbacks, and both are not currently suitable for all application use-cases.

The following information will help you to determine when Azle and the IC might be beneficial for your use-case.

### Benefits

Azle intends to be a full TypeScript/JavaScript environment for the IC (a decentralized cloud platform), with support for all of the TypeScript/JavaScript language and as many relevant host APIs as possible. These host APIs will be similar to those available in the Node.js and web browser environments.

One of the core benefits of Azle is that it allows web developers to bring their TypeScript/JavaScript skills to the IC. For example, Azle allows the use of various npm packages and VS Code intellisense.

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

In addition to allowing applications to be owned by groups of people, the IC also allows applications to be owned by no one. This essentially creates autonomous applications or everlasting processes that execute indefinitely. The IC will allow such an application to run until it depletes its balance of cycles, or until the [NNS](https://internetcomputer.org/nns) votes to shut it down.

##### Permanent APIs

Because most web APIs are owned and operated by individual entities, their fate is tied to that of their owners. If their owners go out of business, then those APIs may cease to exist. If their owners decide that they do not like or agree with certain users, they may restrict their access. In the end, they may decide to shut down or restrict access for arbitrary reasons.

Because the IC allows for group and autonomous ownership of cloud software, the IC is able to produce potentially permanent web APIs. A decentralized group of independent entities will find it difficult to censor API consumers or shut down an API. An autonomous API would take those difficulties to the extreme, as it would continue operating as long as consumers were willing to pay for it.

##### Credible neutrality

Group and autonomous ownership makes it is possible to build neutral cloud software on the IC. This type of software would allow independent parties to coordinate with reduced trust in each other or a single third-party coordinator.

This removes the risk of the third-party coordinator acting in its own self-interest against the interests of the coordinating participants. The coordinating participants would also find it difficult to implement changes that would benefit themselves to the detriment of other participants.

Examples could include mobile app stores, ecommerce marketplaces, and podcast directories.

##### Reduced platform risk

Because the IC is not owned or controlled by any one entity or individual, the risk of being deplatformed is reduced. This is in opposition to most cloud platforms, where the cloud provider itself generally has the power to arbitrarily remove users from its platform. While deplatforming can still occur on the IC, the only endongenous means of forcefully taking down an application is through an NNS vote.

#### Security

-   [Built-in replication](#built-in-replication)
-   [Verifiable source code](#verifiable-source-code)
-   [Blockchain integration](#blockchain-integration)

##### Built-in replication

Replication has many benefits that stem from reducing various central points of failure.

The IC is at its core a [Byzantine Fault Tolerant](https://en.wikipedia.org/wiki/Byzantine_fault) replicated compute environment. Applications are deployed to subnets which are composed of nodes running replicas. Each replica is an independent replicated state machine that executes an application's state transitions (usually initiated with HTTP requests) and persists the results.

This replication provides a high level of security out-of-the-box. It is also the foundation of a number of protocols that provide threshold cryptographic operations to IC applications.

##### Verifiable source code

IC applications (canisters) are compiled into Wasm and deployed to the IC as Wasm modules. The IC hashes each canister's Wasm binary and stores it for public retrieval. The Wasm binary hash can be retrieved and compared with the hash of an independently compiled Wasm binary derived from available source code. If the hashes match, then one can know with a high degree of certainty that the application is executing the Wasm binary that was compiled from that source code.

##### Blockchain integration

When compared with web APIs built for the same purpose, the IC provides a high degree of security when integrating with various other blockchains. It has a direct client integration with Bitcoin, allowing applications to query its state with BFT guarantees. A similar integration is coming for Ethereum.

In addition to these blockchain client integrations, a [threshold ECDSA protocol](https://internetcomputer.org/docs/current/developer-docs/integrations/t-ecdsa/) (tECDSA) allows the IC to create keys and sign transactions on various [ECDSA chains](http://ethanfast.com/top-crypto.html). These chains include Bitcoin and Ethereum, and in the future the protocol may be extended to allow interaction with various [EdDSA chains](http://ethanfast.com/top-crypto.html). These direct integrations combined with tECDSA provide a much more secure way to provide blockchain functionality to end users than creating and storing their private keys on traditional cloud infrastructure.

#### Developer experience

-   [Developer experience](#developer-experience)
-   [Built-in devops](#built-in-devops)
-   uptime
-   scalability
-   built-in authentication

##### Built-in authentication

IC client tooling makes it easy to sign and send messages to the IC. The IC will automatically authenticate these messages by checking that they are signed by a public key. A compact representation of that public key, called a principal, is automatically available to applications through an API for each call.

This makes life

#### Built-in devops

The IC seeks to build into it many devops concepts, such as load balancing, autoscaling, redundancy, firewalls, etc. This provides a very simple backend/devops developer experience.

Because the Internet Computer Protocol (ICP) seeks to build into it decentralization, distribution, security, etc, the developer experience is quite simple. With a few commands, one can deploy an application that takes advantage of the properties of ICP without having to go through the complicated configuration that would ensure on a traditional cloud platform. SaaS providers attempt to give you a similar DX but also bring with them the downsides of centralization.

### Drawbacks

-   Azle Beta security risks
-   High latencies
-   Lack of mature tooling
-   Limited compute resources
-   Expensive compute, storage, and network resources
-   Unproven track record of Azle and the IC
-   Lack of APIs from an environment you're used to (Node.js and web APIs)
-   Lack of some npm packages
-   Lack of privacy
-   Being associated with anything that's running?
-   NNS centralization risks

On the path to a decentralized world computer, certain trade-offs must be made, at least at this time. Currently not all npm packages are available for use with Azle. Latencies are high for certain operations (like http requests, which take multiple seconds to complete). The heap is capped at 4GiB, and no robust general-purpose database solutions (like MySQL, Postgres, MongoDB, etc) currently exist (though Demergent Labs is building one called Sudograph).

Keep in mind that the IC ecosystem is young but maturing. There are various problems that must be resolved along the path to a fully decentralized world computer, and latency of various operations, including missing APIs that you might be used to from a traditional OS or browser environment might be common.

Azle is also currently in beta. It is currently being subjected to in-depth property-based tests, but those have not been completed. There are many example-based tests, but relatively few live applications. Azle is also built on the Boa engine which is not yet production-ready. It's important to keep these things in mind while developing Azle applications, it is your responsibility to understand the risks involved with deploying an Azle application to the IC.

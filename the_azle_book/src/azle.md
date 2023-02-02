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

As for the IC, at the highest level we believe that it is best suited for building applications that desire the following:

-   [Full-stack group ownership](#full-stack-group-ownership)
-   [Autonomous ownership](#autonomous-ownership)
-   [Permanent APIs](#permanent-apis)
-   [Credible neutrality](#credibly-neutrality)
-   [Reduced platform risk](#reduced-platform-risk)
-   [Blockchain integration](#blockchain-integration)
-   [High transparency](#high-transparency)
-   [Built-in security](#built-in-security)
-   [Built-in devops](#built-in-devops)

Most of these benefits stem from the decentralized nature of the IC, though the IC is best thought of as a progressively decentralizing cloud platform. As opposed to traditional cloud platforms, its goal is to be owned and controlled by many independent entities.

#### Full-stack group ownership

The IC allows you to build applications that are controlled directly and only (with some caveats) by a group of people. This is in opposition to most cloud applications written today, which must be under the control of a very limited number of people and often a single legal entity that answers directly to a cloud provider, which itself is a single legal entity.

In the blockchain world, group-owned applications are known as [DAOs](https://en.wikipedia.org/wiki/Decentralized_autonomous_organization). As opposed to DAOs built on most blockchains, the IC allows full-stack applications to be controlled by groups. This means that the group fully controls the running instances of the frontend and the backend code.

#### Autonomous ownership

In addition to allowing applications to be owned by groups of people, the IC also allows applications to be owned by no one. This essentially creates autonomous applications or everlasting processes that execute indefinitely. The IC will allow such an application to run until it depletes its balance of cycles, or until the [NNS](https://internetcomputer.org/nns) votes to shut it down.

#### Permanent APIs

Because most web APIs are owned and operated by individual entities, their fate is tied to that of their owners. If their owners go out of business, then those APIs may cease to exist. If their owners decide that they do not like or agree with you, they may restrict your access. In the end, they may decide to shut down or restrict access for arbitrary reasons.

Because the IC allows for group and autonomous ownership of cloud software, the IC is able to produce potentially permanent web APIs. A decentralized group of independent entities will find it difficult to censor API consumers or shut down an API. An autonomous API would take those difficulties to the extreme, as it would continue operating as long as consumers were willing to pay for it.

#### Credible neutrality

Applications that require coordination between various parties that do not trust each other, might be best suited for the IC. Examples of these types of applications are app stores and ecommerce marketplaces. The merchants need a trusted platform to enforce fair conduct, but often we see that the marketplace begins to act in its own self-interest, and not the interests of the interacting parties. If they had a credibly neutral platform to codify their rules into, they could offload those risks and costs to this autonomous platform and profit.

The IC is an ideal platform for building credibly neutral systems. The applications can be built to be autonomous (owned by no one) or by groups of people, as discussed above. A decentralized group of independent parties could ensure that a credibly neutral platform remains so. No one interest would be above the rest.

Because the IC is not owned or controlled by any one entity or individual, the risk of being deplatformed is possibly reduced. There are various ways that an application can be censored, but to truly take it down requires a vote from the entire NNS community. Being deplatformed for political or religious reasons is highly unlikely.

The IC is an ideal platform for building systems that must remain credibly neutral. It's possible to build software controlled by a large and diverse set of individuals, and no individuals at all.

#### High transparency

The IC allows you to build applications with verifiable source code. This means that the source code can be compiled into a Wasm binary, and a hash of the binary can be checked against the running hash to ensure that the code running on the IC does what the source code says it does.

You can also build into these applications endpoints that return the current state of information, allowing anyone to audit what is going on.

#### Built-in security

Because of built-in replication and the distribution of replica machines around the world, individual canisters are highly secure against various attack vectors. IC applications are distributed and replicated applications which use Byzantine Fault Tolerance to provide a high level of security and availability against various attack vectors.

#### Reduced platform risk

Because the IC is not owned or controlled by any one entity or individual, the risk of being deplatformed is possibly reduced. There are various ways that an application can be censored, but to truly take it down requires a vote from the entire NNS community. Being deplatformed for political or religious reasons is highly unlikely.

#### Blockchain integration

The IC has direct integration with the Bitcoin blockchain, and the IC hosts ICP and many NFT projects. Ethereum integration is possible now and a deeper/more native integration is possibly coming in the future.

If you want to integrate with cryptocurrencies and other blockchain tokens, the IC provides unique benefits.

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

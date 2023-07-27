# Internet Computer Overview

The [Internet Computer](https://internetcomputer.org/) (IC) is a decentralized cloud platform. Actually, it is better thought of as a progressively decentralizing cloud platform. Its full vision is yet to be fulfilled.

It aims to be owned and operated by many independent entities in many geographies and legal jurisdictions throughout the world. This is in opposition to most traditional cloud platforms today, which are generally owned and operated by one overarching legal entity.

The IC is composed of computer hardware nodes running the IC protocol software. Each running IC protocol software process is known as a replica.

Nodes are assigned into groups known as subnets. Each subnet attempts to maximize its decentralization of nodes according to factors such as data center location and node operator independence.

The subnets vary in size. Generally speaking the larger the size of the subnet the more secure it will be. Subnets currently range in size from 13 to 40 nodes, with most subnets having 13 nodes.

IC applications, known as canisters, are deployed to specific subnets. They are then accessible through Internet Protocol requests such as HTTP. Each subnet replicates all canisters across all of its replicas. A consensus protocol is run by the replicas to ensure [Byzantine Fault Tolerance](https://en.wikipedia.org/wiki/Byzantine_fault).

View the [IC Dashboard](https://dashboard.internetcomputer.org/subnets) to explore all data centers, subnets, node operators, and many other aspects of the IC.

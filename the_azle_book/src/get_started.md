# Get Started

-   [Installation](#installation)
-   [Deployment](#deployment)

Azle helps you to build secure decentralized/replicated servers in TypeScript or JavaScript on [ICP](https://internetcomputer.org/). The current replication factor is [13-40 times](https://dashboard.internetcomputer.org/subnets).

Please remember that Azle is in beta and thus it may have unknown security vulnerabilities due to the following:

-   Azle is built with various software packages that have not yet reached maturity
-   Azle does not yet have multiple independent security reviews/audits
-   Azle does not yet have many live, successful, continuously operating applications deployed to ICP

Azle is currently going through a transition to give higher priority to utilizing HTTP, REST, JSON, and other familiar web technologies. This is in contrast to having previously focused on ICP-specific technologies like [Candid](./candid.md) and explicitly creating `Canister` objects with [query](./query_methods.md) and [update](./update_methods.md) methods.

We are calling these two paradigms HTTP-based and Candid-based. Many concepts from the [Candid-based documentation](./candid_based_documentation.md) are still applicable in the HTTP-based paradigm. The HTTP-based paradigm simply focuses on changing the communication and serialization strategies to be more web-focused and less custom.

## Installation

> Windows is only supported through a Linux virtual environment of some kind, such as [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

Run the following commands individually following the instructions in the comments:

```bash
# On Ubuntu/WSL
sudo apt-get install podman

# On Mac
brew install podman

# It's recommended to use nvm and Node.js 20
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart your terminal
nvm install 20

# The dfx command line tools for managing ICP applications
DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

## Deployment

Run the following commands individually following the instructions in the comments:

```bash
npx azle new hello_world
cd hello_world

npm install

dfx start --clean --host 127.0.0.1:8000

# In a separate terminal in the hello_world directory
dfx deploy

# If you have problems deploying see https://demergent-labs.github.io/azle/deployment.html#common-deployment-issues

# Obtain your application's [canisterId]
dfx canister id backend

# View your frontend in a web browser at http://[canisterId].localhost:8000

# Communicate with your canister using any HTTP client library
curl http://[canisterId].localhost:8000/db
curl -X POST -H "Content-Type: application/json" -d "{ \"hello\": \"world\" }" http://[canisterId].localhost:8000/db/update
```

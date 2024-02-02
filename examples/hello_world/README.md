# Azle Hello World

Azle helps you to build secure decentralized/replicated servers in TypeScript or JavaScript. The current replication factor is [13-40 times](https://dashboard.internetcomputer.org/subnets).

For more documentation please see [The Azle Book](https://demergent-labs.github.io/azle/).

## Installation

Run the following commands individually following the instructions in the comments:

```bash
npx azle new hello_world
cd hello_world

# Ubuntu build dependencies
sudo apt install clang
sudo apt install build-essential
sudo apt install libssl-dev
sudo apt install pkg-config

# Mac build dependencies
xcode-select --install
brew install llvm

# The dfx command line tools for managing ICP applications
DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
dfx start --clean --host 127.0.0.1:8000

# In a separate terminal in the hello_world directory
npm install
dfx deploy

# If you have problems deploying see https://demergent-labs.github.io/azle/deployment.html#common-deployment-issues

# Obtain your application's [canisterId]
dfx canister id backend

# View your frontend in a web browser at http://[canisterId].localhost:8000

# Communicate with your canister using any HTTP client library
curl http://[canisterId].localhost:8000/db
curl -X POST -H "Content-Type: application/json" -d "{ \"hello\": \"world\" }" http://[canisterId].localhost:8000/db/update
```

## Examples

There are many Azle examples in the [examples directory](bkyz2-fmaaa-aaaaa-qaaaq-cai). We recommend starting with the following:

-   [apollo_server](https://github.com/demergent-labs/azle/tree/main/examples/apollo_server)
-   [ethers](https://github.com/demergent-labs/azle/tree/main/examples/ethers)
-   [express](https://github.com/demergent-labs/azle/tree/main/examples/express)
-   [fs](https://github.com/demergent-labs/azle/tree/main/examples/fs)
-   [hello_world](https://github.com/demergent-labs/azle/tree/main/examples/hello_world)
-   [ic_evm_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ic_evm_rpc)
-   [sqlite](https://github.com/demergent-labs/azle/tree/main/examples/sqlite)
-   [web_assembly](https://github.com/demergent-labs/azle/tree/main/examples/web_assembly)

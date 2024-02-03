# Get Started

Azle helps you to build secure decentralized/replicated servers in TypeScript or JavaScript. The current replication factor is [13-40 times](https://dashboard.internetcomputer.org/subnets).

Azle is currently going through a transition to give higher priority to utilizing HTTP, REST, JSON, and other familiar web technologies. This is in contrast to having previously focused on ICP-specific technologies like [Candid](./candid.md) and explicitly creating `Canister` objects with [query](./query_methods.md) and [update](./update_methods.md) methods.

We are calling these two paradigms REST-based and Candid-based. Many concepts from the [Candid-based documentation](./candid_based_documentation.md) are still applicable in the REST-based paradigm. The REST-based paradigm simply focuses on changing the communication and serialization strategies to be more web-focused and less custom.

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
echo 'export PATH="/usr/local/opt/llvm/bin:$PATH"' >> ~/.zshrc

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

# Get Started

Azle helps you to build secure decentralized/replicated servers in TypeScript or JavaScript on <a href="https://internetcomputer.org/" target="_blank">ICP</a>. The current replication factor is <a href="https://dashboard.internetcomputer.org/subnets" target="_blank">13-40</a>.

Please remember that Azle stable mode is continuously subjected to <a href="https://github.com/demergent-labs/azle/actions" target="_blank">intense scrutiny and testing</a>, however it has not yet undergone intense security review.

Azle runs in stable mode by default.

This mode is intended for production use after Azle's imminent 1.0 release. Its focus is on API and runtime stability, security, performance, TypeScript and JavaScript language support, the ICP APIs, and Candid remote procedure calls (RPC). There is minimal support for the Node.js standard library, npm ecosystem, and HTTP server functionality.

## Installation

> Windows is only supported through a Linux virtual environment of some kind, such as <a href="https://learn.microsoft.com/en-us/windows/wsl/install" target="_blank">WSL</a>

You will need [Node.js](#nodejs) and [dfx](#dfx) to develop ICP applications with Azle:

### Node.js

It's recommended to use nvm to install the latest LTS version of Node.js:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Restart your terminal and then run:

```bash
nvm install --lts
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
node --version
```

### dfx

Install the dfx command line tools for managing ICP applications:

```bash
DFX_VERSION=0.27.0 sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
dfx --version
```

## Deployment

To create and deploy a simple sample application called `hello_world`:

```bash
# create a new default project called hello_world
npx azle new hello_world
cd hello_world
```

```bash
# install all npm dependencies including azle
npm install
```

```bash
# start up a local ICP replica
dfx start --clean
```

In a separate terminal in the `hello_world` directory:

```bash
# deploy your canister
dfx deploy
```

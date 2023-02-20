# Quick Start

If you are using a \*nix environment (Linux, Mac OS, [WSL if using Windows](https://learn.microsoft.com/en-us/windows/wsl/install)) with bash and you have [Node.js/npm installed](./installation.md#nodejs), then just run the following commands to get started ASAP:

```bash
npx azle new hello_world
cd hello_world

npm install
npm run dfx_install
npm run replica_start
npm run canister_deploy_local

npm run canister_call_set_message
npm run canister_call_get_message
```

See the official [azle_hello_world](https://github.com/demergent-labs/azle_hello_world) example for more information.

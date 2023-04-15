# Installation

Follow the instructions exactly as stated below to avoid issues.

You should be using a \*nix environment (Linux, Mac OS, [WSL if using Windows](https://learn.microsoft.com/en-us/windows/wsl/install)) with bash and have the following installed on your system:

-   Node.js 18
-   dfx 0.13.1

## Node.js

We highly recommend using [nvm](https://github.com/nvm-sh/nvm) to install Node.js (and npm, which is included with Node.js). Run the following commands to install Node.js and npm with nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# restart your terminal

nvm install 18
```

## dfx

Run the following command to install dfx 0.13.1:

```bash
DFX_VERSION=0.13.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

# Installation

Follow the instructions exactly as stated below to avoid issues.

You should be using a \*nix environment (Linux, Mac OS, [WSL if using Windows](https://learn.microsoft.com/en-us/windows/wsl/install)) with bash and have the following installed on your system:

-   Node.js 18
-   dfx 0.14.0

## Node.js

We highly recommend using [nvm](https://github.com/nvm-sh/nvm) to install Node.js (and npm, which is included with Node.js). Run the following commands to install Node.js and npm with nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Now restart your terminal and run the following command:

```bash
nvm install 18
```

## dfx

Run the following command to install dfx 0.14.0:

```bash
DFX_VERSION=0.14.0 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

If after trying to run `dfx` commands you encounter an error such as `dfx: command not found`, you might need to add `$HOME/bin` to your path. Here's an example of doing this in your `.bashrc`:

```bash
echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
```

# Installation

Follow the instructions exactly as stated below to avoid issues.

Windows is only supported through a Linux virtual environment of some kind, such as [WSL](https://learn.microsoft.com/en-us/windows/wsl/install). Follow [these instructions to install WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

You should be using a \*nix environment (Linux, Mac OS, [WSL if using Windows](https://learn.microsoft.com/en-us/windows/wsl/install)) with bash and have the following installed on your system:

-   [Build dependencies](#build-dependencies)
-   [Node.js 18](#nodejs)
-   [dfx 0.15.1](#dfx-0151)

## Build dependencies

It is best to install all of these dependencies based on your OS:

### Ubuntu/WSL

```bash
sudo apt install clang
sudo apt install build-essential
sudo apt install libssl-dev
sudo apt install pkg-config
```

### Mac

```bash
# Install the Xcode Command Line Tools
xcode-select --install
```

## Node.js

We highly recommend using [nvm](https://github.com/nvm-sh/nvm) to install Node.js (and npm, which is included with Node.js). Run the following commands to install Node.js and npm with nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Now restart your terminal and run the following command:

```bash
nvm install 18
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
node --version
```

## dfx 0.15.1

Run the following command to install dfx 0.15.1:

```bash
DFX_VERSION=0.15.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
dfx --version
```

If after trying to run `dfx --version` you encounter an error such as `dfx: command not found`, you might need to add `$HOME/bin` to your path. Here's an example of doing this in your `.bashrc`:

```bash
echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
```

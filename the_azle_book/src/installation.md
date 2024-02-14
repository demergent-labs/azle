# Installation

> Windows is only supported through a Linux virtual environment of some kind, such as [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

On Ubuntu/WSL:

```bash
sudo apt-get install podman
```

On Mac:

```bash
brew install podman
```

It's recommended to use nvm and Node.js 20:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Restart your terminal and then run:

```bash
nvm install 20
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
node --version
```

Install the dfx command line tools for managing ICP applications:

```bash
DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
dfx --version
```

If after trying to run `dfx --version` you encounter an error such as `dfx: command not found`, you might need to add `$HOME/bin` to your path. Here's an example of doing this in your `.bashrc`:

```bash
echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
```

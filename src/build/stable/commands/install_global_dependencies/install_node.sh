#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: No Node.js version specified."
    echo "Usage: ./install_node.sh <NODE_VERSION>"
    exit 1
fi

NODE_VERSION=$1

# Load nvm if it's installed
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    source "$HOME/.nvm/nvm.sh"
elif [ -s "/usr/local/opt/nvm/nvm.sh" ]; then
    # Fallback for macOS/Homebrew installation path
    source "/usr/local/opt/nvm/nvm.sh"
else
    echo "nvm is not installed."
fi

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    echo "nvm is not installed. Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

    # Load nvm into the shell (necessary for the script to use nvm after installation)
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
else
    echo "nvm is already installed."
fi

if nvm ls "$NODE_VERSION" &> /dev/null; then
    echo "Node.js version $NODE_VERSION is already installed. Skipping installation."
    nvm use "$NODE_VERSION"
else
    echo "Installing Node.js version $NODE_VERSION..."
    nvm install "$NODE_VERSION"
    nvm use "$NODE_VERSION"
    echo "Node.js $NODE_VERSION installation completed."
fi

node --version
exit 0

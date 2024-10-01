#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: No Node.js version specified."
    echo "Usage: ./install_node.sh <NODE_VERSION>"
    exit 1
fi

NODE_VERSION=$1

source "$HOME/.nvm/nvm.sh"

if nvm ls "$NODE_VERSION" &> /dev/null; then
    echo "Node.js version $NODE_VERSION is already installed. Skipping installation."
    nvm use "$NODE_VERSION"
else
    echo "Installing Node.js version $NODE_VERSION..."
    nvm install "$NODE_VERSION"
    nvm use "$NODE_VERSION"
    nvm alias default "$NODE_VERSION"
    echo "Node.js $NODE_VERSION installation completed."
fi

node --version
exit 0

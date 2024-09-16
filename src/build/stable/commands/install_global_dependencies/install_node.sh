#!/bin/bash

# Ensure that a version argument is passed
if [ -z "$1" ]; then
    echo "Error: No Node.js version specified."
    echo "Usage: ./install_node.sh <NODE_VERSION>"
    exit 1
fi

NODE_VERSION=$1

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    echo "nvm is not installed. Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

    # Load nvm into the shell (necessary for the script to use nvm after installation)
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion
else
    echo "nvm is already installed."
fi

if nvm ls "$NODE_VERSION" &> /dev/null; then
    echo "Node.js version $NODE_VERSION is already installed. Skipping installation."
    nvm use "$NODE_VERSION"
    exit 0
else
    echo "Installing Node.js version $NODE_VERSION..."
    nvm install "$NODE_VERSION"
    nvm use "$NODE_VERSION"
fi

echo "Node.js $NODE_VERSION installation completed."
node --version
exit 0

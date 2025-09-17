#!/bin/bash

set -eou pipefail

if [ -z "$1" ]; then
    echo "Error: No DFX version specified."
    echo "Usage: ./install_dfx.sh <DFX_VERSION>"
    exit 1
fi

DFX_VERSION=$1

# Install or update dfx using the official installation script
echo "Installing dfx version $DFX_VERSION..."
DFXVM_INIT_YES=true DFX_VERSION=$DFX_VERSION sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Determine the correct dfx path based on the operating system
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    DFX_PATH="$HOME/Library/Application Support/org.dfinity.dfx/bin"
else
    # Linux and others
    DFX_PATH="$HOME/.local/share/dfx/bin"
fi

# Add dfx to PATH for current session so the installation can be verified
export PATH="$DFX_PATH:$PATH"

# Verify installation
if ! command -v dfx &> /dev/null; then
    echo "dfx installation verification failed" >&2
    exit 1
fi

echo "dfx $DFX_VERSION installation completed."
exit 0

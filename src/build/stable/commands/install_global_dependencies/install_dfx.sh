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
DFXVM_INIT_YES=true DFX_VERSION=$DFX_VERSION sh -ci "$(curl --retry 3 -fsSL https://sdk.dfinity.org/install.sh)"

# Verify installation
if ! command -v dfx &> /dev/null; then
    echo "dfx installation verification failed" >&2
    exit 1
fi

echo "dfx $DFX_VERSION installation completed."
exit 0

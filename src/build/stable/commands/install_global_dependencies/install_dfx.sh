#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: No DFX version specified."
    echo "Usage: ./install_dfx.sh <DFX_VERSION>"
    exit 1
fi

DFX_VERSION=$1

# Install or update dfx using the official installation script
echo "Installing dfx version $DFX_VERSION..."
DFXVM_INIT_YES=true DFX_VERSION=$DFX_VERSION sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"

echo "dfx $DFX_VERSION installation completed."
exit 0

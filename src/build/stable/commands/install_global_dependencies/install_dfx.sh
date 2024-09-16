#!/bin/bash

# Ensure that a version argument is passed
if [ -z "$1" ]; then
    echo "Error: No DFX version specified."
    echo "Usage: ./install_dfx.sh <DFX_VERSION>"
    exit 1
fi

DFX_VERSION=$1

# Check if dfx is installed and its version
if command -v dfx &> /dev/null; then
    INSTALLED_VERSION=$(dfx --version | cut -d ' ' -f 2)

    echo "Installed dfx version: $INSTALLED_VERSION"
    echo "Requested dfx version: $DFX_VERSION"

    # If the installed version matches the requested version, skip installation
    if [ "$INSTALLED_VERSION" = "$DFX_VERSION" ]; then
        echo "dfx $DFX_VERSION is already installed. No installation needed."
        exit 0
    else
        echo "Updating dfx from version $INSTALLED_VERSION to $DFX_VERSION"
    fi
else
    echo "dfx is not installed. Proceeding with installation of dfx $DFX_VERSION."
fi

# Install or update dfx using the official installation script
echo "Installing dfx version $DFX_VERSION..."
DFXVM_INIT_YES=true DFX_VERSION=$DFX_VERSION sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"

echo "dfx $DFX_VERSION installation completed."
exit 0

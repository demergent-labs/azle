#!/bin/bash

# Common functions used across WSL-Ubuntu GitHub Actions workflows for Azle
# This script should be sourced in workflows that need these functions

retry_command() {
    local function_name="${1}"
    local max_attempts=5
    local initial_delay=1
    local max_delay=60

    local attempt=1
    local delay=$initial_delay

    echo "=== Retry command setup for '$function_name' ==="
    echo "Max attempts: $max_attempts, Initial delay: ${initial_delay}s, Max delay: ${max_delay}s"

    # Try the function until it succeeds (matches the original retry_command action pattern)
    until {
        echo "Attempt $attempt/$max_attempts for '$function_name'"
        $function_name
    }; do
        if [[ "$attempt" -ge "$max_attempts" ]]; then
            echo "💥 '$function_name' failed after $attempt attempts"
            return 1
        fi

        attempt=$(($attempt + 1))
        echo "❌ '$function_name' failed, retrying in $delay seconds... (attempt $attempt/$max_attempts)"
        sleep $delay

        # Exponential backoff with configurable maximum
        delay=$(( delay * 2 ))
        if [[ "$delay" -gt "$max_delay" ]]; then
            delay=$max_delay
        fi
    done

    echo "✅ '$function_name' succeeded on attempt $attempt"
    return 0
}

setup_nodejs() {
    echo "=== Setting up Node.js ==="

    # Get Node version from package.json
    NODE_VERSION=$(jq -r '.azle.globalDependencies.node // error("node version not found")' "package.json")
    echo "Installing Node.js version $NODE_VERSION using nvm..."

    # Install nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

    # Source nvm
    export NVM_DIR="$HOME/.nvm"
    source "$NVM_DIR/nvm.sh"

    # Install and use the specific Node version
    nvm install $NODE_VERSION
    nvm use $NODE_VERSION
    nvm alias default $NODE_VERSION

    # Verify installation
    node --version
    npm --version
}

install_dfx() {
    echo "=== Installing dfx ==="

    DFX_VERSION=$(jq -r '.azle.globalDependencies.dfx // error("dfx version not found")' "package.json")
    echo "Installing dfx version $DFX_VERSION..."
    DFXVM_INIT_YES=true DFX_VERSION=$DFX_VERSION sh -ci "$(curl --retry 3 -fsSL https://sdk.dfinity.org/install.sh)"
    export PATH="$HOME/.local/share/dfx/bin:$PATH"
    if ! command -v dfx &> /dev/null; then
        echo "dfx installation verification failed" >&2
        exit 1
    fi
    echo "dfx installation completed."
}

install_npm_dependencies() {
    echo "=== Installing npm dependencies ==="
    npm install
}

# Helper function to ensure cargo environment is sourced
ensure_cargo_env() {
    echo "Ensuring cargo environment is available..."

    # Always source the cargo environment to ensure PATH is updated
    if [[ -f "$HOME/.cargo/env" ]]; then
        echo "Sourcing $HOME/.cargo/env..."
        source "$HOME/.cargo/env"
        export PATH="$HOME/.cargo/bin:$PATH"
    fi

    # Verify cargo is available after sourcing
    if ! command -v cargo &> /dev/null; then
        echo "❌ Cargo is still not available after sourcing environment"
        echo "PATH: $PATH"
        echo "Contents of ~/.cargo/bin (if it exists):"
        ls -la "$HOME/.cargo/bin" || echo "Directory does not exist"
        return 1
    else
        echo "✅ Cargo is available at: $(which cargo)"
    fi
}

install_rust_cargo() {
    echo "=== Installing Rust and Cargo ==="
    npx azle dev setup --rust

    ensure_cargo_env
}

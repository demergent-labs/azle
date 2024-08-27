#!/bin/bash

# Base directories
BASE_DIR="."
EXAMPLES_DIR="$BASE_DIR/examples"
TESTS_DIR="$BASE_DIR/tests"

# Function to discover npm package directories
discover_npm_packages() {
    local dir=$1
    find "$dir" -type d -exec test -f "{}/package.json" \; -print
}

# Discover npm packages in examples and tests
example_directories=$(discover_npm_packages "$EXAMPLES_DIR")
test_directories=$(discover_npm_packages "$TESTS_DIR")

# Combine all directories into a single list
all_directories=$(echo -e "$example_directories\n$test_directories")

# Output the directories
echo "$all_directories"

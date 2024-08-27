#!/bin/bash

# Base directories
BASE_DIR="."
EXAMPLES_DIR="$BASE_DIR/examples"
TESTS_DIR="$BASE_DIR/tests"

# Function to discover test directories
discover_directories() {
    local dir=$1
    find "$dir" -type d
}

# Discover directories in examples and tests
example_directories=$(discover_directories "$EXAMPLES_DIR")
test_directories=$(discover_directories "$TESTS_DIR")

# Combine all directories into a single list
all_directories=$(echo -e "$example_directories\n$test_directories")

# Output the directories
echo "$all_directories"

#!/bin/bash

# Base directories
BASE_DIR="."
EXAMPLES_DIR="$BASE_DIR/examples"
TESTS_DIR="$BASE_DIR/tests"

# Directories to exclude
EXCLUDE_DIRS=(
    "tests/property/candid_rpc/class_api/stable_b_tree_map"
    "tests/property/candid_rpc/functional_api/stable_b_tree_map"
)

# Function to discover test directories
discover_directories() {
    local dir=$1
    find "$dir" -type d ! -path "*/node_modules/*"
}

# Function to check if a directory is excluded
is_excluded() {
    local dir=$1
    for exclude in "${EXCLUDE_DIRS[@]}"; do
        if [[ "$dir" == *"$exclude" ]]; then
            return 0
        fi
    done
    return 1
}

# Discover directories in examples and tests
example_directories=$(discover_directories "$EXAMPLES_DIR")
test_directories=$(discover_directories "$TESTS_DIR")

# Combine all directories into a single list and filter out excluded directories
all_directories=$(echo -e "$example_directories\n$test_directories" | while read -r dir; do
    if is_excluded "$dir"; then
        continue
    fi
    if [[ -f "$dir/package.json" ]]; then
        echo "$dir"
    fi
done)

# Sort the directories alphabetically and output them
sorted_directories=$(echo "$all_directories" | sort)

echo "$sorted_directories"

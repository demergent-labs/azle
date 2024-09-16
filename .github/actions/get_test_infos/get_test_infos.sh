#!/bin/bash

# Inputs from action.yml or environment variables
DIRECTORIES=($INPUT_DIRECTORIES)
EXCLUDE_DIRS=($INPUT_EXCLUDE_DIRS)

# Convert arrays to comma-separated strings for passing into Node.js
directories=$(IFS=, ; echo "${DIRECTORIES[*]}")
exclude_dirs=$(IFS=, ; echo "${EXCLUDE_DIRS[*]}")

# Get test infos
json_result=$(npx tsx .github/actions/get_test_infos/index.js "$directories" "$exclude_dirs")

# Format the result
result="${json_result//'%'/'%25'}"
result="${result//$'\n'/'%0A'}"
result="${result//$'\r'/'%0D'}"

# Output the final result as base64
echo "$result" | base64

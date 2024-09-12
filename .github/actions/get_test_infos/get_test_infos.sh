#!/bin/bash

# Inputs from action.yml or environment variables
DIRECTORIES=($INPUT_DIRECTORIES)
EXCLUDE_DIRS=($INPUT_EXCLUDE_DIRS)

# Function to discover test directories
discover_directories() {
    local dir=$1
    find "$dir" -type d -not -path "*/node_modules/*" -exec sh -c '
        for pkg in "$@"; do
            if [ -f "$pkg/package.json" ]; then
                if jq -e ".scripts.test" "$pkg/package.json" > /dev/null; then
                    echo "$pkg"
                fi
            fi
        done
    ' sh {} +
}

# Discover directories in the provided directories, excluding specified directories
all_directories=""
for dir in "${DIRECTORIES[@]}"; do
    all_directories+=$(discover_directories "$dir")
    all_directories+=$'\n'
done

# Prepare the data to be passed into the JavaScript script
sorted_directories=$(echo "$all_directories" | sort | tr '\n' ' ')  # Convert into a space-separated string
exclude_dirs=$(IFS=, ; echo "${EXCLUDE_DIRS[*]}")  # Convert array to comma-separated

# Call the JavaScript script with input directories and excluded directories
json_result=$(node .github/actions/get_test_infos/generate_json.js "$sorted_directories" "$exclude_dirs")

# Format the result
result="${json_result//'%'/'%25'}"
result="${result//$'\n'/'%0A'}"
result="${result//$'\r'/'%0D'}"

# Output the final result as base64
echo "$result" | base64

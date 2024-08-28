#!/bin/bash

# Base directories
BASE_DIR="."
EXAMPLES_DIR="$BASE_DIR/examples"
TESTS_DIR="$BASE_DIR/tests"

# Excluded directories
EXCLUDE_DIRS=(
    "$EXAMPLES_DIR/filter_example"
    "$TESTS_DIR/end_to_end/candid_rpc/functional_syntax/filter_example"
)

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

# Generate JSON object for each directory
generate_json() {
    local dir=$1
    local name=$(basename "$dir")
    local type=""
    local syntax=""
    local api=""

    if [[ "$dir" == "$EXAMPLES_DIR"* ]]; then
        type="ex"
    elif [[ "$dir" == "$TESTS_DIR/property"* ]]; then
        type="prop"
        if [[ "$dir" == *"/candid_rpc/"* ]]; then
            syntax="crpc"
            if [[ "$dir" == *"/functional_api/"* ]]; then
                api="functional"
            elif [[ "$dir" == *"/class_api/"* ]]; then
                api="class"
            fi
        elif [[ "$dir" == *"/ic_api/"* ]]; then
            syntax="ic_api"
        fi
    elif [[ "$dir" == "$TESTS_DIR/end_to_end"* ]]; then
        type="e2e"
        if [[ "$dir" == *"/http_server/"* ]]; then
            syntax="http"
        elif [[ "$dir" == *"/candid_rpc/"* ]]; then
            syntax="crpc"
        fi
    fi

    # Construct JSON object
    echo "{"
    echo "\"path\":\"$dir\","
    echo "\"name\":\"$name\","
    echo "\"type\":\"$type\""
    [[ -n "$syntax" ]] && echo ",\"syntax\":\"$syntax\""
    [[ -n "$api" ]] && echo ",\"api\":\"$api\""
    echo "}"
}

# Discover directories in examples and tests, excluding specified directories
all_directories=$(discover_directories "$EXAMPLES_DIR")
all_directories+=$'\n'
all_directories+=$(discover_directories "$TESTS_DIR")

# Initialize an empty variable to store the JSON result
json_result="["

# Sort, filter, and generate JSON objects
while read -r dir; do
    if ! is_excluded "$dir"; then
        json_result+=$(generate_json "$dir")
        json_result+=","
    fi
done <<< "$(echo "$all_directories" | sort)"  # Feed sorted directories into the loop

# Remove the last comma and close the JSON array
json_result=$(echo "$json_result" | sed '$ s/,$//')
json_result=$(echo "$json_result" | sed ':a;N;$!ba;s/\n//g') # Remove new lines
json_result+="]"

# Store the result in a variable (you can use it as needed)
result="$json_result"
result="${result//'%'/'%25'}"
result="${result//$'\n'/'%0A'}"
result="${result//$'\r'/'%0D'}"

# Print the result if needed
echo "$result" | base64

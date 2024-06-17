#!/bin/bash

# Function to process each jest.config.js file
process_jest_config() {
    local config_file="$1"
    local pattern="testEnvironment: 'node',"

    # Check if transform key exists in the file
    if grep -q "$pattern" "$config_file"; then
        echo "Updating $config_file..."

        # Add transformIgnorePatterns line after transform: {
        sed -i -e "/\ \ \ \ \}/a, \ \ \ \ transformIgnorePatterns: ['\/node_modules\/(?!\(azle\)\/)'], \/\/ Make sure azle is transformed" "$config_file"

        echo "Successfully updated $config_file"
    else
        echo "transform key not found in $config_file. Skipping..."
    fi
}

# Find all jest.config.js files excluding node_modules, .azle, .dfx folders
find . -name "jest.config.js" \
  -not -path "./node_modules/*" \
  -not -path "./.azle/*" \
  -not -path "./.dfx/*" \
  | while read -r file; do
    process_jest_config "$file"
done

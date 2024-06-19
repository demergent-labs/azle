#!/bin/bash

# Define the source path of the .openvaluesharing.json file
SOURCE_PATH="../../.openvaluesharing.json"

# Define the target root node_modules directory
TARGET_NODE_MODULES_DIR="node_modules"

# Check if the source file exists
if [ ! -f "$SOURCE_PATH" ]; then
  echo "Source file .openvaluesharing.json not found at $SOURCE_PATH"
  exit 1
fi

# Function to copy the file into every node_modules directory recursively
copy_to_node_modules() {
  local dir="$1"
  if [ -d "$dir" ]; then
    for package_dir in "$dir"/*; do
      if [ -d "$package_dir" ]; then
        if [[ "$(basename "$package_dir")" == @* ]]; then
          # Handle scoped packages
          for scoped_package_dir in "$package_dir"/*; do
            if [ -d "$scoped_package_dir" ]; then
              cp "$SOURCE_PATH" "$scoped_package_dir"
              echo "Copied .openvaluesharing.json to $scoped_package_dir"
              # Recurse into the node_modules directory of the current package
              copy_to_node_modules "$scoped_package_dir/node_modules"
            fi
          done
        else
          cp "$SOURCE_PATH" "$package_dir"
          echo "Copied .openvaluesharing.json to $package_dir"
          # Recurse into the node_modules directory of the current package
          copy_to_node_modules "$package_dir/node_modules"
        fi
      fi
    done
  fi
}

# Start the process from the target root node_modules directory
copy_to_node_modules "$TARGET_NODE_MODULES_DIR"

echo "Done copying .openvaluesharing.json to all packages in node_modules."

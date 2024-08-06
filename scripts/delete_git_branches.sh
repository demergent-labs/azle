#!/bin/bash

# List of branches to delete
branches=(
    "my_branch1"
    "my_branch2"
)

# Function to delete branches locally and on GitHub
delete_branch() {
  local branch=$1

  git branch -d "$branch"
  git push --delete origin "$branch"
}

# Iterate over the branches and delete them
for branch in "${branches[@]}"; do
  delete_branch "$branch"
done

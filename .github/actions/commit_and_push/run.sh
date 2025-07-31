#!/usr/bin/env bash
set -eo pipefail

# Inputs passed as environment variables:
# GITHUB_TOKEN, BRANCH_NAME, COMMIT_MESSAGE, ADD_FILES

# Repository and target branch
REPO="${GITHUB_REPOSITORY}"
TARGET_BRANCH="$BRANCH_NAME"

# Stage and detect changes
  git add "$ADD_FILES"
  CHANGED=$(git diff --cached --name-only)
  if [ -z "$CHANGED" ]; then
    echo "No changes to commit"
    exit 0
  fi

# Determine expectedHeadOid for commit (existing branch) with retry logic
get_branch_head() {
  local retries=5
  local delay=1

  for ((i=1; i<=retries; i++)); do
    if EXPECTED_HEAD=$(gh api repos/$REPO/git/ref/heads/$TARGET_BRANCH --jq .object.sha 2>/dev/null); then
      echo "Successfully got branch HEAD: $EXPECTED_HEAD"
      return 0
    fi

    if [ $i -lt $retries ]; then
      echo "Attempt $i failed to get branch HEAD, retrying in ${delay}s..."
      sleep $delay
      delay=$((delay * 2))  # Exponential backoff
    fi
  done

  echo "Failed to get branch HEAD after $retries attempts"
  return 1
}

get_branch_head

# Build GraphQL payload in temp file
  tmp=$(mktemp)
  cat <<EOF > "$tmp"
{"query":"mutation(\$input:CreateCommitOnBranchInput!){createCommitOnBranch(input:\$input){commit{oid url}}}","variables":{"input":{"branch":{"repositoryNameWithOwner":"$REPO","branchName":"$TARGET_BRANCH"},"fileChanges":{"additions":[
EOF

first=true
while IFS= read -r f; do
  content=$(base64 -w0 "$f")
  if [ "$first" = true ]; then first=false; else echo "," >> "$tmp"; fi
  echo "{\"path\":\"$f\",\"contents\":\"$content\"}" >> "$tmp"
done <<< "$CHANGED"

        # Close additions, add commit and expectedHeadOid
        cat <<EOF >> "$tmp"
        ]},
        "message": {
          "headline": "$COMMIT_MESSAGE"
        },
        "expectedHeadOid": "$EXPECTED_HEAD"
      }
  }
}
EOF

# Execute GraphQL commit using CLI
echo "Running GraphQL commit for branch $TARGET_BRANCH"
gh api graphql --input="$tmp" | jq

# Cleanup
echo "Cleaning up"
rm -f "$tmp"

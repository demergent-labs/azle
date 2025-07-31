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

# Get expectedHeadOid using local git (faster, no API calls)
EXPECTED_HEAD=$(git rev-parse HEAD)
echo "Using local HEAD SHA: $EXPECTED_HEAD"

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

# Execute GraphQL commit with rate limit detection
echo "Running GraphQL commit for branch $TARGET_BRANCH"

# Try the commit with rate limit detection
if ! response=$(gh api graphql --input="$tmp" 2>&1); then
  if echo "$response" | grep -q "rate limit exceeded"; then
    echo "⚠️ Rate limit exceeded. This indicates too many concurrent workflows."
    echo "Consider:"
    echo "  1. Staggering workflow runs"
    echo "  2. Using workflow concurrency limits"
    echo "  3. Reducing parallel job counts"
    echo
    echo "Rate limit will reset automatically. Retrying in 60 seconds..."
    sleep 60

    # Single retry after rate limit wait
    echo "Retrying commit after rate limit wait..."
    gh api graphql --input="$tmp" | jq
  else
    echo "GraphQL commit failed with error:"
    echo "$response"
    exit 1
  fi
else
  echo "$response" | jq
fi

# Cleanup
echo "Cleaning up"
rm -f "$tmp"

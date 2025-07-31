#!/usr/bin/env bash
set -eo pipefail

# Inputs passed as environment variables:
# GITHUB_TOKEN, BRANCH_NAME, COMMIT_MESSAGE, ADD_FILES

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
{"query":"mutation(\$input:CreateCommitOnBranchInput!){createCommitOnBranch(input:\$input){commit{oid url}}}","variables":{"input":{"branch":{"repositoryNameWithOwner":"$GITHUB_REPOSITORY","branchName":"$BRANCH_NAME"},"fileChanges":{"additions":[
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
echo "Running GraphQL commit for branch $BRANCH_NAME"

# Try the commit with rate limit detection
if ! response=$(gh api graphql --input="$tmp" 2>&1); then
  if echo "$response" | grep -q "rate limit exceeded"; then
    echo "⚠️ Rate limit exceeded."
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

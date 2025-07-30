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

# Determine expectedHeadOid for commit (existing branch)
EXPECTED_HEAD=$(gh api repos/$REPO/git/ref/heads/$TARGET_BRANCH --jq .object.sha)

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

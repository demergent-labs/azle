#!/usr/bin/env bash
set -eo pipefail

# Inputs passed as environment variables:
# GITHUB_TOKEN, BRANCH_NAME, CREATE_BRANCH, COMMIT_MESSAGE, ADD_FILES

REPO="${GITHUB_REPOSITORY}"            # provided by GitHub Actions
BASE_BRANCH="${GITHUB_REF_NAME}"       # provided by Actions
TARGET_BRANCH="$BRANCH_NAME"

# Ensure branch exists
BASE_SHA=$(gh api repos/$REPO/git/ref/heads/$BASE_BRANCH --jq .object.sha)
if [[ "$CREATE_BRANCH" == "true" ]]; then
  if ! gh api repos/$REPO/git/ref/heads/$TARGET_BRANCH >/dev/null 2>&1; then
    gh api repos/$REPO/git/refs -X POST -f ref="refs/heads/$TARGET_BRANCH" -f sha="$BASE_SHA"
  fi
fi

# Stage and detect changes
git add "$ADD_FILES"
CHANGED=$(git diff --cached --name-only)
if [ -z "$CHANGED" ]; then
  echo "No changes to commit"
  exit 0
fi

# Build GraphQL payload in temp file
tmp=$(mktemp)
cat <<EOF > "$tmp"
{"query":"mutation(\$input:CreateCommitOnBranchInput!){createCommitOnBranch(input:\$input){commit{oid url}}}","variables":{"input":{"branch":{"repositoryNameWithOwner":"$REPO","branchName":"$TARGET_BRANCH"},"fileChanges":{"replacements":[
EOF

first=true
while IFS= read -r f; do
  content=$(base64 -w0 "$f")
  if [ "$first" = true ]; then first=false; else echo "," >> "$tmp"; fi
  echo "{\"path\":\"$f\",\"contents\":\"$content\"}" >> "$tmp"
done <<< "$CHANGED"

echo "]}},\"commit\":{\"message\":{\"headline\":\"$COMMIT_MESSAGE\"}}}}" >> "$tmp"

# Execute GraphQL
echo "Running GraphQL commit for branch $TARGET_BRANCH"
response=$(curl -s -H "Authorization: bearer $GITHUB_TOKEN" -H "Content-Type: application/json" -d @"$tmp" https://api.github.com/graphql)
echo "$response" | jq

# Cleanup
echo "Cleaning up"
rm -f "$tmp"

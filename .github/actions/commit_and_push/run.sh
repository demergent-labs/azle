#!/usr/bin/env bash
set -eo pipefail

# Inputs passed as environment variables:
# GITHUB_TOKEN, BRANCH_NAME, CREATE_BRANCH, COMMIT_MESSAGE, ADD_FILES

REPO="${GITHUB_REPOSITORY}"            # provided by GitHub Actions
BASE_BRANCH="${GITHUB_REF_NAME}"       # provided by Actions
TARGET_BRANCH="$BRANCH_NAME"

# Ensure branch exists via GraphQL
BASE_SHA=$(gh api repos/$REPO/git/ref/heads/$BASE_BRANCH --jq .object.sha)
if [[ "$CREATE_BRANCH" == "true" ]]; then
  # If the branch ref does not exist, create it via GraphQL
  if ! gh api repos/$REPO/git/ref/heads/$TARGET_BRANCH >/dev/null 2>&1; then
    OWNER=${REPO%%/*}
    NAME=${REPO#*/}
    # Fetch repository Node ID
    REPO_ID=$(gh api graphql \
      -f query='query($owner:String!,$name:String!){repository(owner:$owner,name:$name){id}}' \
      -f owner="$OWNER" -f name="$NAME" --jq '.data.repository.id')

    # Create branch reference via GraphQL
    REF_PAYLOAD=$(mktemp)
    cat <<EOF > "$REF_PAYLOAD"
{"query":"mutation(\$input:CreateRefInput!){createRef(input:\$input){ref{name}}}","variables":{"input":{"repositoryId":"$REPO_ID","name":"refs/heads/$TARGET_BRANCH","oid":"$BASE_SHA"}}}
EOF
    gh api graphql --input="$REF_PAYLOAD"
    rm -f "$REF_PAYLOAD"
  fi
fi

  # Stage and detect changes
  git add "$ADD_FILES"
  CHANGED=$(git diff --cached --name-only)
  if [ -z "$CHANGED" ]; then
    echo "No changes to commit"
    exit 0
  fi

  # Determine expectedHeadOid for commit
  if gh api repos/$REPO/git/ref/heads/$TARGET_BRANCH --jq '.object.sha' >/dev/null 2>&1; then
    EXPECTED_HEAD=$(gh api repos/$REPO/git/ref/heads/$TARGET_BRANCH --jq .object.sha)
  else
    EXPECTED_HEAD=$BASE_SHA
  fi

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
        "commit": {
          "message": {
            "headline": "$COMMIT_MESSAGE"
          }
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

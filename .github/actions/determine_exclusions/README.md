## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: determine-exclusions
      uses: ./.github/actions/determine_exclusions
      with:
          is_workflow_dispatch: ${{ github.event_name == 'workflow_dispatch' }}
          exclude_slow_input: ${{ inputs.exclude-slow-tests }}
          exclude_unstable_input: ${{ inputs.exclude-unstable-tests }}
          exclude_release_only_input: ${{ inputs.exclude-release-only-tests }}
          is_feature_branch_draft_pr: ${{ steps.set-conditions.outputs.is_feature_branch_draft_pr }}
          is_feature_branch_pr: ${{ steps.set-conditions.outputs.is_feature_branch_pr }}
          is_main_branch_push: ${{ steps.set-conditions.outputs.is_main_branch_push }}

    - name: Use exclusion outputs
      run: |
          echo "Exclude slow tests: ${{ steps.determine-exclusions.outputs.exclude_slow }}"
          echo "Exclude unstable tests: ${{ steps.determine-exclusions.outputs.exclude_unstable }}"
          echo "Exclude release only tests: ${{ steps.determine-exclusions.outputs.exclude_release_only }}"
```

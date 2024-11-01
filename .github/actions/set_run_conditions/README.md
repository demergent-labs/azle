## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: set-run-conditions
      uses: ./.github/actions/set_run_conditions

    - name: Use run conditions
      run: |
          echo "Is main branch push: ${{ steps.set-run-conditions.outputs.is_main_branch_push }}"
          echo "Is main branch merge from release: ${{ steps.set-run-conditions.outputs.is_main_branch_merge_from_release_push }}"
          echo "Is release branch PR: ${{ steps.set-run-conditions.outputs.is_release_branch_pr }}"
          echo "Is feature branch PR: ${{ steps.set-run-conditions.outputs.is_feature_branch_pr }}"
          echo "Is feature branch draft PR: ${{ steps.set-run-conditions.outputs.is_feature_branch_draft_pr }}"
```

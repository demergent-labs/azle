## Prerequisite

This action assumes that the repository has already been checked out before
calling the action, typically using `actions/checkout@v4`. If you have not
checked out the code in a previous step, make sure to do so to avoid errors.

This action does **not** perform a checkout action itself because it would be
redundant. This action is part of the repository's codebase, so if the code
hasn't already been checked out, the action itself wouldn't even be available to
call. Additionally, rerunning a checkout at this stage could potentially
overwrite any earlier `actions/checkout` step with different parameters, such as
checking out a specific branch.

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

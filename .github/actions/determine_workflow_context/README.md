## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: workflow-context
      uses: ./.github/actions/determine_workflow_context

    - name: Use run conditions
      run: |
          echo "Is main branch push: ${{ steps.workflow-context.outputs.is_main_branch_push }}"
          echo "Is main branch merge from release push: ${{ steps.workflow-context.outputs.is_main_branch_merge_from_release_push }}"
          echo "Is release branch PR: ${{ steps.workflow-context.outputs.is_release_branch_pr }}"
          echo "Is feature branch PR: ${{ steps.workflow-context.outputs.is_feature_branch_pr }}"
          echo "Is feature branch draft PR: ${{ steps.workflow-context.outputs.is_feature_branch_draft_pr }}"
```

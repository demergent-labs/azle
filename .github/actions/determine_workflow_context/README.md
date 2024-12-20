## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: workflow-context
      uses: ./.github/actions/determine_workflow_context

    - name: Use run conditions
      run: |
          echo "Is main branch push from feature merge: ${{ steps.workflow-context.outputs.is_main_branch_push_from_feature_merge }}"
          echo "Is main branch push from release merge: ${{ steps.workflow-context.outputs.is_main_branch_push_from_release_merge }}"
          echo "Is release branch PR: ${{ steps.workflow-context.outputs.is_release_branch_pr }}"
          echo "Is feature branch PR: ${{ steps.workflow-context.outputs.is_feature_branch_pr }}"
          echo "Is feature branch draft PR: ${{ steps.workflow-context.outputs.is_feature_branch_draft_pr }}"
```

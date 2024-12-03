## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: determine-workflow-config
      uses: ./.github/actions/determine_workflow_config
      with:
          is-workflow-dispatch: ${{ github.event_name == 'workflow_dispatch' }}
          exclude-slow-dispatch-input-value: ${{ inputs.exclude-slow-tests }}
          exclude-unstable-dispatch-input-value: ${{ inputs.exclude-unstable-tests }}
          exclude-release-only-dispatch-input-value: ${{ inputs.exclude-release-only-tests }}
          link-azle-dispatch-input-value: ${{ inputs.link-azle }}
          fuzz-dispatch-input-value: ${{ inputs.fuzz-tests }}

    - name: Use determine-workflow-config outputs
      run: |
          echo "Exclude slow tests: ${{ steps.determine-workflow-config.outputs.exclude-slow }}"
          echo "Exclude unstable tests: ${{ steps.determine-workflow-config.outputs.exclude-unstable }}"
          echo "Exclude release only tests: ${{ steps.determine-workflow-config.outputs.exclude-release-only }}"
          echo "Link to azle: ${{ steps.determine-workflow-config.outputs.link-azle }}"
          echo "Fuzz tests: ${{ steps.determine-workflow-config.outputs.fuzz }}"
```

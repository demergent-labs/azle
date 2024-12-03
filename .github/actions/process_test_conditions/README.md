## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: process-test-conditions
      uses: ./.github/actions/process_test_conditions
      with:
          is-workflow-dispatch: ${{ github.event_name == 'workflow_dispatch' }}
          exclude-slow-dispatch-input-value: ${{ inputs.exclude-slow-tests }}
          exclude-unstable-dispatch-input-value: ${{ inputs.exclude-unstable-tests }}
          exclude-release-only-dispatch-input-value: ${{ inputs.exclude-release-only-tests }}
          link-azle-dispatch-input-value: ${{ inputs.link-azle }}
          fuzz-dispatch-input-value: ${{ inputs.fuzz-tests }}

    - name: Use process-test-conditions outputs
      run: |
          echo "Exclude slow tests: ${{ steps.process-test-conditions.outputs.exclude-slow }}"
          echo "Exclude unstable tests: ${{ steps.process-test-conditions.outputs.exclude-unstable }}"
          echo "Exclude release only tests: ${{ steps.process-test-conditions.outputs.exclude-release-only }}"
          echo "Link to azle: ${{ steps.process-test-conditions.outputs.link-azle }}"
          echo "Fuzz tests: ${{ steps.process-test-conditions.outputs.fuzz }}"
```

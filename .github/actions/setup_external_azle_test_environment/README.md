## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: setup-external-azle-test-environment
      uses: ./.github/actions/setup_external_azle_test_environment
      with:
          packed-file-name: ${{ needs.setup-and-pack.outputs.packed-file-name }}
          artifact-name-suffix: ${{ matrix.os }}

    - name: Run tests
      working-directory: ${{ steps.setup-external-azle-test-environment.outputs.external-test-env-path }}
      run: npx azle --version
```

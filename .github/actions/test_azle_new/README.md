## Example Usage

```yaml
- name: Test azle new command
  uses: ./.github/actions/test_azle_new
  with:
      project_name: 'test_project'
      experimental: 'false'
      http_server: 'false'
      working_directory: 'external-test-env'
      version: ${{ env.UNIQUE_VERSION }}
      packed_file_path: ${{ steps.pack_azle.outputs.packed_file_absolute_path }}
```

Tests the `azle new` command and CLI functionality in a clean external environment.

## Example Usage

```yaml
- name: Test azle new command
  uses: ./.github/actions/test_azle_new
  with:
      project_name: 'test_project'
      experimental: 'false'
      http_server: 'false'
      working_directory: 'external_test_env'
      version: '0.30.0-beta'
      packed_file_path: '../azle/dist/azle.tgz'
```

Tests the `azle new` command and related CLI functionality outside the azle repository.

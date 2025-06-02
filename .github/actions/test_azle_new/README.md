## Example Usage

```yaml
- name: Test azle new command
  uses: ./.github/actions/test_azle_new
  with:
      project-name: 'test_project'
      experimental: 'false'
      http-server: 'false'
      working-directory: 'external_test_env'
      version: '0.30.0-beta'
      packed-file-path: '../azle/dist/azle.tgz'
```

Tests the `azle new` command and related CLI functionality outside the azle repository.

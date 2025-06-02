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

Tests the `azle new` command and related CLI functionality outside the azle repository. We are attempting to run these tests in an environment as similar to the end developer's as possible. Running tests from within the Azle repository itself has led to various problems in the past (e.g. the existence of the Azle dev dependencies causing things to work that shouldn't have).

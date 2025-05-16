# Test Azle Template Action

This GitHub Action creates, tests, and verifies an Azle template project. It encapsulates a series of steps to ensure the template works correctly:

1. Creates a new project with `azle new`
2. Installs dependencies
3. Runs tests
4. Verifies the `.azle` directory exists after running tests
5. Cleans the project with `azle clean`
6. Verifies the `.azle` directory is removed
7. Checks the Azle version

## Inputs

| Input               | Description                                                 | Required | Default |
| ------------------- | ----------------------------------------------------------- | -------- | ------- |
| `template_name`     | Name of the template project to be created                  | Yes      | -       |
| `experimental`      | Whether to use experimental mode                            | No       | `false` |
| `http_server`       | Whether to include HTTP server (requires experimental mode) | No       | `false` |
| `working_directory` | Base working directory where the template will be created   | Yes      | -       |
| `version`           | Expected Azle version for verification                      | Yes      | -       |

## Example Usage

```yaml
- name: Test Stable Template
  uses: ./.github/actions/test_azle_template
  with:
      template_name: 'my_project'
      experimental: 'false'
      http_server: 'false'
      working_directory: 'test_dir'
      version: ${{ env.UNIQUE_VERSION }}
```

## Adding New Template Types

To test a new template type, simply add another call to this action with the appropriate parameters in your workflow file.

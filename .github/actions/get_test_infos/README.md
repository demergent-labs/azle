## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: get-test-infos
      uses: ./.github/actions/get_test_infos
      with:
          directories: './tests ./examples'
          exclude-dirs: 'tests/exclude_this_directory examples/exclude_this exclude_all_with_this_dir_in_path'

    - run: echo "${{ steps.get-test-infos.outputs.test-infos }}"
```

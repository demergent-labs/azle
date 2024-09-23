## Prerequisite

This action assumes that the repository has already been checked out before
calling the action, typically using `actions/checkout@v4`. If you have not
checked out the code in a previous step, make sure to do so to avoid errors.

This action does **not** perform a checkout action itself because it would be
redundant. This action is part of the repository’s codebase, so if the code
hasn’t already been checked out, the action itself wouldn't even be available to
call. Additionally, rerunning a checkout at this stage could potentially
overwrite any earlier `actions/checkout` step with different parameters, such as
checking out a specific branch.

## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: get-test-infos
      uses: ./.github/actions/get_test_infos
      with:
          node-version: '20.x'
          directories: './tests ./examples'
          exclude-dirs: 'tests/exclude_this_directory examples/exclude_this exclude_all_with_this_dir_in_path'

    - run: echo "${{ steps.get-test-infos.outputs.test-infos }}"
```

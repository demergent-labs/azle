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

    - id: get-dfx-version
      uses: ./.github/actions/get_dfx_version

    - run: echo ${{ steps.get-dfx-version.outputs.dfx-version }}
```

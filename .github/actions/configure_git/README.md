## Prerequisite

This action assumes that the repository has already been checked out before
calling the action, typically using `actions/checkout@v4`. If you have not
checked out the code in a previous step, make sure to do so to avoid errors.

This action does **not** perform a checkout action itself because it would be
redundant. This action is part of the repository's codebase, so if the code
hasn't already been checked out, the action itself wouldn't even be available to
call.

## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - uses: ./.github/actions/configure_git
      with:
          gpg_signing_key: ${{ secrets.GPG_SIGNING_KEY }}
```

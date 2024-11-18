## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - uses: ./.github/actions/commit_and_push
      with:
          gpg_signing_key: ${{ secrets.GPG_SIGNING_KEY }}
          branch-name: 'branch-name'
          commit-message: 'commit message'
          create-branch: 'true'
```

## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - uses: ./.github/actions/commit_and_push
      with:
          gpg-signing-key: ${{ secrets.GPG_SIGNING_KEY }}
          branch-name: 'branch-name'
          commit-message: 'commit message'
```

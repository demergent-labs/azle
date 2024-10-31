## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - uses: ./.github/actions/configure_git
      with:
          gpg_signing_key: ${{ secrets.GPG_SIGNING_KEY }}
```

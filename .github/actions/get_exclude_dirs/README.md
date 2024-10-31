## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: get-exclude-dirs
      uses: ./.github/actions/get_exclude_dirs
      with:
          exclude-slow: true
          exclude-unstable: true
          exclude-release: true

    - run: echo "${{ steps.get-exclude-dirs.outputs.exclude-dirs }}"
```

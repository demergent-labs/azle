## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: setup-dfx
      uses: ./.github/actions/setup_dfx

    - run: echo ${{ steps.setup-dfx.outputs.dfx-version }}
```

## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: setup-node
      uses: ./.github/actions/setup_node

    - run: echo "${{ steps.setup-node.outputs.node-version }}"
```

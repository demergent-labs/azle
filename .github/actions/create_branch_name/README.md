## Example Usage

```yaml
steps:
    - id: create-branch-name
      uses: ./.github/actions/create_branch_name
      with:
          prefix: 'update--0.24.2-rc.89-'
          path: 'examples/hello_world'
```

The action will convert the path to use hyphens instead of slashes and combine it with the prefix.
For example, with the inputs above, it would output: `update--examples-hello_world`

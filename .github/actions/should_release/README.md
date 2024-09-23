> [!IMPORTANT]
> This action performs a checkout using `actions/checkout@v4`, specifically
> checking out the `github.event.pull_request.head.ref`. If your workflow
> includes other checkout steps, be mindful that this checkout will override
> previous checkouts, as it checks out a specific branch for the action to
> function correctly. You should consider this when planning future steps in
> your workflow, especially if those steps rely on a different commit or branch.

## Example Usage

```yaml
steps:
    - uses: actions/checkout@v4

    - id: should-release
      uses: ./.github/actions/should_release

    - run: echo "${{ steps.should-release.outputs.should-release }}"
```

## Example Usage

```yaml
jobs:
    # First job: Pack azle and upload as artifact
    pack-azle:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4

            - name: Pack azle
              run: npm pack

            - name: Upload packed azle
              uses: actions/upload-artifact@v4
              with:
                  name: azle-packed-ubuntu-latest
                  path: 'azle.tgz'

    # Second job: Test the packed azle in external environment
    test-packed-azle:
        needs: pack-azle
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4

            - id: setup-external-azle-test-environment
              uses: ./.github/actions/setup_external_azle_test_environment
              with:
                  packed-file-name: azle.tgz
                  artifact-name-suffix: ubuntu-latest

            - name: Run tests
              working-directory: ${{ steps.setup-external-azle-test-environment.outputs.external-test-env-path }}
              run: npx azle --version
```

## Example Usage

```yaml
- name: Test stable template creation and functionality
  uses: ./.github/actions/test_azle_template
  with:
      template_name: 'stable_template_test'
      experimental: 'false'
      http_server: 'false'
      working_directory: 'external-test-env'
      version: ${{ env.UNIQUE_VERSION }}
      packed_file_path: ${{ steps.pack_azle.outputs.packed_file_absolute_path }}
```

The action will test all of the azle cli commands outside in a clean environment unaffected by the state of the azle repo.

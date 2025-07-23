Because we are now distributing `dist/canister_templates/stable.wasm` and `dist/canister_templates/experimental.wasm` as compiled binaries, we must adhere to stricter licensing requirements, as we are now distributing a lot of software in binary form.

The license information is automatically generated whenever you run the `npx azle dev template` command. The licenses are generated using `cargo bundle-licenses` and saved to `dist/canister_templates/licenses.yml`.

## Automated License Generation

The license generation happens automatically as part of the template building process:

- `npx azle dev template` - Builds stable template and generates licenses
- `npx azle dev template --experimental` - Builds experimental template and generates licenses
- `npx azle dev template --all` - Builds both templates and generates licenses

## Manual License Generation

If you need to generate licenses manually, you can run:

```bash
cargo bundle-licenses --format yaml --output dist/canister_templates/licenses.yml
```

## Troubleshooting

If license generation fails, you may need to search the generated file for `NOT FOUND` warnings and manually copy any missing licenses from their repositories if necessary.

Note: The `cargo-bundle-licenses` tool is automatically installed as part of the dev setup process.

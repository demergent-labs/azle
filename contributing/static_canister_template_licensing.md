Because we are now distributing `canister_templates/stable.wasm` and `canister_templates/experimental.wasm` as compiled binaries, we must adhere to stricter licensing requirements, as we are now distributing a lot of software in binary form.

The first attempt to comply sits at `canister_templates/licenses.yml`. You can generate the licenses anew with:

```bash
cargo bundle-licenses --format yaml --output canister_templates/licenses.yml --previous canister_templates/licenses.yml --check-previous
```

Search the file for `NOT FOUND`, and manually copy any licenses in from their repositories if necessary.

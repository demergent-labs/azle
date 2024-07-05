Because we are now distributing `static_canister_template.wasm` as a compiled binary, we must adhere to stricter licensing requirements, as we are now distributing a lot of software in binary form.

The first attempt to comply sits at `static_canister_template_licenses.yml`. You can generate the licenses anew with:

```bash
cargo bundle-licenses --format yaml --output static_canister_template_licenses.yml --previous static_canister_template_licenses.yml --check-previous
```

Search the file for `NOT FOUND`, and manually copy any licenses in from their repositories if necessary.

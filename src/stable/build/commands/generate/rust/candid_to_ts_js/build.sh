# TODO unfortunately we need the --dev option or else we get this error:
# TODO RangeError: WebAssembly.Table.grow(): failed to grow table by 4
# TODO this is probably caused by the wasm-opt optimization automatically performed
# TODO without the --dev option
wasm-pack build --target nodejs --dev

# wasm-pack build automatically adds a .gitignore to ignore all of the generated files
# but we want to check them into our repository
rm pkg/.gitignore

cargo bundle-licenses --format yaml --output licenses.yml

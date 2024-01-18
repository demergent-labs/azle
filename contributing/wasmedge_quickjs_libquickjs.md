We are currently on a fork of https://github.com/second-state/wasmedge-quickjs. Here is our fork: https://github.com/demergent-labs/wasmedge-quickjs

There is a file located at wasmedge-quickjs/lib/libquickjs.a, this seems to be the main QuickJS binary. Unfortunately the upstream of wasmedge-quickjs has a QuickJS binary that has SIMD support, and the Wasmtime implementation used on ICP does not support SIMD. So we must compile it ourselves and manually copy it into our fork of wasmedge-quickjs.

This is how you do it:

```
git clone https://github.com/second-state/quickjs-wasi
cd quickjs-wasi/lib

# In quickjs-wasi/lib/build_lib.sh on line 2, simply remove the -msimd128 option

# install wasicc and other tools with https://github.com/wasienv/wasienv

chmod +x build_lib.sh
./build_lib.sh

# Copy quickjs-wasi/lib/libquickjs.a to wasmedge-quickjs/lib/libquickjs.a
# You might also need to copy over binding.rs, I do not remember
```

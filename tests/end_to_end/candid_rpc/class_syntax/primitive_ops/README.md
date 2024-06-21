Must use `0.10.2-btcbeta.0` of DFX:

```
DFX_VERSION="0.10.2-btcbeta.0" sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)"
```

Run benchmarks:

```bash
dfx start --clean --background
npm install
npm link azle # if desired to run against the repo code
npm run benchmark
```

Must use `0.10.2-btcbeta.0` of DFX:

```
DFX_VERSION="0.10.2-btcbeta.0" sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)"
```

Add Motoko back into `dfx.json` later:

```json
        "motoko": {
            "type": "motoko",
            "main": "canisters/motoko/main.mo",
            "declarations": {
                "output": "benchmark/dfx_generated/motoko"
            }
        },
```
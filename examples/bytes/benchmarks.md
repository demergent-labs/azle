# Azle/Motoko/Rust Benchmarks

-   These benchmarks should be considered preliminary (especially the Motoko benchmarks, something seems off with the function prelude)
-   These benchmarks were implemented using the performance counter API
    -   Performance counter information in [The Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports)
    -   Performance counter information in [the forum](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
-   Each benchmark is the average of 10 runs
-   Each benchmark description gives the benchmark function name followed by the number of value initializations performed by the benchmark function
-   The following may be inaccurate or missing from the benchmarks as described [here](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027):
    -   Candid serialization/deserialization of function parameters and return types
    -   Canister method prologue/epilogue
    -   Some Motoko runtime behavior (such as garbage collection)
-   You can find a raw CSV file with this data [here](./benchmarks.csv)
-   A rough USD cost model for various app scenarios can be found [here](https://docs.google.com/spreadsheets/d/1PQ53R9hYE1fuMB_z-Bl6dyymm7end7rVJ85TvGEh0BQ)

The format for benchmark numbers is (x / y) where:

-   x = Wasm instructions counted only in the function body
-   y = Wasm instructions counted in the function body and the function prelude

## Averages

| Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Average Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | ----------------------------------- | ----------------------------- |
| (64_531 / 901_442_389) | (200 / 1_401_409)        | (200 / 822_013_265)    | (323x / 3_085x)               | (323x / 76x)                | (-323x / -3_085x)             | (1x / -377x)                  | (-323x / -76x)                      | (1x / 377x)                   |

## Benchmarks

| Description        | Azle Wasm Instructions   | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ------------------ | ------------------------ | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| get_bytes: 0 kb    | (64_538 / 28_479_729)    | (200 / 2_361)            | (200 / 66_277)         | (323x / 12_063x)              | (323x / 430x)               | (-323x / -12_063x)            | (1x / -28x)                   | (-323x / -430x)             | (1x / 28x)                    |
| get_bytes: 1 kb    | (64_538 / 30_187_372)    | (200 / 8_181)            | (200 / 1_655_517)      | (323x / 3_690x)               | (323x / 18x)                | (-323x / -3_690x)             | (1x / -202x)                  | (-323x / -18x)              | (1x / 202x)                   |
| get_bytes: 10 kb   | (64_495 / 45_338_442)    | (200 / 59_343)           | (200 / 15_922_110)     | (322x / 764x)                 | (322x / 3x)                 | (-322x / -764x)               | (1x / -268x)                  | (-322x / -3x)               | (1x / 268x)                   |
| get_bytes: 100 kb  | (64_538 / 197_123_886)   | (200 / 271_189)          | (200 / 158_598_002)    | (323x / 727x)                 | (323x / 1x)                 | (-323x / -727x)               | (1x / -585x)                  | (-323x / -1x)               | (1x / 585x)                   |
| get_bytes: 1000 kb | (64_538 / 1_712_126_739) | (200 / 2_689_939)        | (200 / 1_585_369_571)  | (323x / 636x)                 | (323x / 1x)                 | (-323x / -636x)               | (1x / -589x)                  | (-323x / -1x)               | (1x / 589x)                   |
| get_bytes: 2000 kb | (64_538 / 3_395_398_169) | (200 / 5_377_439)        | (200 / 3_170_468_115)  | (323x / 631x)                 | (323x / 1x)                 | (-323x / -631x)               | (1x / -590x)                  | (-323x / -1x)               | (1x / 590x)                   |

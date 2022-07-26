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
| (64_237 / 901_211_373) | (200 / 1_401_409)        | (200 / 822_011_544)    | (321x / 3_062x)               | (321x / 74x)                | (-321x / -3_062x)             | (1x / -377x)                  | (-321x / -74x)                      | (1x / 377x)                   |

## Benchmarks

| Description        | Azle Wasm Instructions   | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ------------------ | ------------------------ | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| get_bytes: 0 kb    | (64_243 / 28_245_139)    | (200 / 2_361)            | (200 / 68_051)         | (321x / 11_963x)              | (321x / 418x)               | (-321x / -11_963x)            | (1x / -29x)                   | (-321x / -418x)             | (1x / 29x)                    |
| get_bytes: 1 kb    | (64_243 / 29_915_127)    | (200 / 8_181)            | (200 / 1_653_582)      | (321x / 3_657x)               | (321x / 18x)                | (-321x / -3_657x)             | (1x / -202x)                  | (-321x / -18x)              | (1x / 202x)                   |
| get_bytes: 10 kb   | (64_208 / 45_064_213)    | (200 / 59_343)           | (200 / 15_919_714)     | (321x / 759x)                 | (321x / 3x)                 | (-321x / -759x)               | (1x / -268x)                  | (-321x / -3x)               | (1x / 268x)                   |
| get_bytes: 100 kb  | (64_243 / 196_906_970)   | (200 / 271_189)          | (200 / 158_595_508)    | (321x / 726x)                 | (321x / 1x)                 | (-321x / -726x)               | (1x / -585x)                  | (-321x / -1x)               | (1x / 585x)                   |
| get_bytes: 1000 kb | (64_243 / 1_711_944_596) | (200 / 2_689_939)        | (200 / 1_585_366_924)  | (321x / 636x)                 | (321x / 1x)                 | (-321x / -636x)               | (1x / -589x)                  | (-321x / -1x)               | (1x / 589x)                   |
| get_bytes: 2000 kb | (64_243 / 3_395_192_194) | (200 / 5_377_439)        | (200 / 3_170_465_489)  | (321x / 631x)                 | (321x / 1x)                 | (-321x / -631x)               | (1x / -590x)                  | (-321x / -1x)               | (1x / 590x)                   |

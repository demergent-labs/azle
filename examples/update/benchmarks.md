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
| (97_205 / 745_791)     | (200 / 6_386)            | (338 / 40_564)         | (486x / 277x)                 | (319x / 19x)                | (-486x / -277x)               | (-2x / -13x)                  | (-319x / -19x)                      | (2x / 13x)                    |

## Benchmarks

| Description          | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| -------------------- | ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| update: empty string | (97_035 / 664_168)     | (200 / 1_859)            | (230 / 35_416)         | (485x / 357x)                 | (432x / 19x)                | (-485x / -357x)               | (-1x / -19x)                  | (-432x / -19x)              | (1x / 19x)                    |
| update: small string | (97_156 / 883_876)     | (200 / 2_061)            | (338 / 36_191)         | (486x / 429x)                 | (294x / 24x)                | (-486x / -429x)               | (-2x / -18x)                  | (-294x / -24x)              | (2x / 18x)                    |
| update: large string | (97_424 / 689_330)     | (200 / 15_239)           | (447 / 50_084)         | (487x / 45x)                  | (230x / 14x)                | (-487x / -45x)                | (-2x / -3x)                   | (-230x / -14x)              | (2x / 3x)                     |

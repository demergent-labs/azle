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
| (97_044 / 744_837)     | (200 / 6_386)            | (336 / 40_699)         | (485x / 277x)                 | (320x / 19x)                | (-485x / -277x)               | (-2x / -13x)                  | (-320x / -19x)                      | (2x / 13x)                    |

## Benchmarks

| Description          | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| -------------------- | ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| update: empty string | (96_879 / 663_544)     | (200 / 1_859)            | (224 / 35_821)         | (484x / 357x)                 | (437x / 19x)                | (-484x / -357x)               | (-1x / -19x)                  | (-437x / -19x)              | (1x / 19x)                    |
| update: small string | (97_102 / 883_169)     | (200 / 2_061)            | (338 / 36_191)         | (486x / 429x)                 | (294x / 24x)                | (-486x / -429x)               | (-2x / -18x)                  | (-294x / -24x)              | (2x / 18x)                    |
| update: large string | (97_152 / 687_798)     | (200 / 15_239)           | (447 / 50_084)         | (486x / 45x)                  | (229x / 14x)                | (-486x / -45x)                | (-2x / -3x)                   | (-229x / -14x)              | (2x / 3x)                     |

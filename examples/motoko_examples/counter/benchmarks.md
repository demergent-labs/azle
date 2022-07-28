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
| (99_783 / 563_395)     | (207 / 9_010)            | (210 / 40_341)         | (482x / 222x)                 | (474x / 17x)                | (-482x / -222x)               | (-1x / -10x)                  | (-474x / -17x)                      | (1x / 10x)                    |

## Benchmarks

| Description | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ----------- | ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| set: max    | (94_423 / 529_636)     | (200 / 21_587)           | (207 / 65_579)         | (472x / 25x)                  | (455x / 8x)                 | (-472x / -25x)                | (-1x / -3x)                   | (-455x / -8x)               | (1x / 3x)                     |
| set: middle | (94_877 / 519_456)     | (200 / 11_530)           | (207 / 45_920)         | (474x / 45x)                  | (458x / 11x)                | (-474x / -45x)                | (-1x / -4x)                   | (-458x / -11x)              | (1x / 4x)                     |
| set: min    | (94_328 / 716_545)     | (200 / 1_625)            | (207 / 30_523)         | (472x / 441x)                 | (456x / 23x)                | (-472x / -441x)               | (-1x / -19x)                  | (-456x / -23x)              | (1x / 19x)                    |
| inc         | (115_504 / 487_943)    | (226 / 1_299)            | (220 / 19_342)         | (511x / 376x)                 | (525x / 25x)                | (-511x / -376x)               | (1x / -15x)                   | (-525x / -25x)              | (-1x / 15x)                   |

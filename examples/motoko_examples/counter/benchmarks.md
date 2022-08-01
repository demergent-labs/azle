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
| (99_872 / 726_420)     | (207 / 9_065)            | (216 / 44_338)         | (483x / 247x)                 | (462x / 20x)                | (-483x / -247x)               | (-1x / -11x)                  | (-462x / -20x)                      | (1x / 11x)                    |

## Benchmarks

| Description | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ----------- | ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| set: max    | (94_384 / 692_126)     | (200 / 21_642)           | (217 / 71_247)         | (472x / 32x)                  | (435x / 10x)                | (-472x / -32x)                | (-1x / -3x)                   | (-435x / -10x)              | (1x / 3x)                     |
| set: middle | (94_537 / 895_407)     | (200 / 11_585)           | (216 / 51_372)         | (473x / 77x)                  | (438x / 17x)                | (-473x / -77x)                | (-1x / -4x)                   | (-438x / -17x)              | (1x / 4x)                     |
| set: min    | (94_553 / 662_780)     | (200 / 1_680)            | (216 / 34_825)         | (473x / 395x)                 | (438x / 19x)                | (-473x / -395x)               | (-1x / -21x)                  | (-438x / -19x)              | (1x / 21x)                    |
| inc         | (116_014 / 655_365)    | (226 / 1_354)            | (216 / 19_908)         | (513x / 484x)                 | (537x / 33x)                | (-513x / -484x)               | (1x / -15x)                   | (-537x / -33x)              | (-1x / 15x)                   |

# Azle/Motoko/Rust Benchmarks

-   These benchmarks should be considered preliminary (especially the Motoko benchmarks, something seems off with the function prelude)
-   These benchmarks were implemented using the performance counter API
    -   Performance counter information in [The Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports)
    -   Performance counter information in [the forum](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
-   Each benchmark is the average of 10 runs
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

| Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| (64_536 / 901_725_467) | (200 / 1_401_409)        | (200 / 822_012_291)    | (323x / 3_111x)               | (323x / 75x)                | (-323x / -3_111x)             | (1x / -377x)                  | (-323x / -75x)              | (1x / 377x)                   |

## Benchmarks

| Description        | Azle Wasm Instructions   | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ------------------ | ------------------------ | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| get_bytes: 0 kb    | (64_542 / 28_758_792)    | (200 / 2_361)            | (200 / 68_427)         | (323x / 12_181x)              | (323x / 423x)               | (-323x / -12_181x)            | (1x / -29x)                   | (-323x / -423x)             | (1x / 29x)                    |
| get_bytes: 1 kb    | (64_542 / 30_429_367)    | (200 / 8_181)            | (200 / 1_654_191)      | (323x / 3_720x)               | (323x / 18x)                | (-323x / -3_720x)             | (1x / -202x)                  | (-323x / -18x)              | (1x / 202x)                   |
| get_bytes: 10 kb   | (64_507 / 45_578_417)    | (200 / 59_343)           | (200 / 15_920_455)     | (323x / 768x)                 | (323x / 3x)                 | (-323x / -768x)               | (1x / -268x)                  | (-323x / -3x)               | (1x / 268x)                   |
| get_bytes: 100 kb  | (64_542 / 197_421_147)   | (200 / 271_189)          | (200 / 158_596_348)    | (323x / 728x)                 | (323x / 1x)                 | (-323x / -728x)               | (1x / -585x)                  | (-323x / -1x)               | (1x / 585x)                   |
| get_bytes: 1000 kb | (64_542 / 1_712_458_746) | (200 / 2_689_939)        | (200 / 1_585_367_863)  | (323x / 637x)                 | (323x / 1x)                 | (-323x / -637x)               | (1x / -589x)                  | (-323x / -1x)               | (1x / 589x)                   |
| get_bytes: 2000 kb | (64_542 / 3_395_706_335) | (200 / 5_377_439)        | (200 / 3_170_466_461)  | (323x / 631x)                 | (323x / 1x)                 | (-323x / -631x)               | (1x / -590x)                  | (-323x / -1x)               | (1x / 590x)                   |

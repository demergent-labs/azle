# Azle/Motoko/Rust Benchmarks

-   These benchmarks should be considered preliminary (especially the Motoko benchmarks, something seems off with the function prelude)
-   These benchmarks were implemented using the performance counter API
    -   Performance counter information in [The Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports)
    -   Performance counter information in [the forum](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
-   The results were obtained for each data type by returning performance counter values after performing n iterations of value initializations on the stack and heap in each language
-   Each benchmark is the average of 10 runs
-   Each benchmark description gives the benchmark function name followed by the number of value initializations performed by the benchmark function
-   All benchmark code can be found [here](/benchmark/primitive_ops)
-   The following may be inaccurate or missing from the benchmarks as described [here](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027):
    -   Candid serialization/deserialization of function parameters and return types
    -   Canister method prologue/epilogue
    -   Some Motoko runtime behavior (such as garbage collection)
-   You can find a raw CSV file with this data [here](/benchmark/primitive_ops/benchmarks.csv)
-   A rough USD cost model for various app scenarios can be found [here](https://docs.google.com/spreadsheets/d/1PQ53R9hYE1fuMB_z-Bl6dyymm7end7rVJ85TvGEh0BQ)

The format for benchmark numbers is (x / y) where:

-   x = Wasm instructions counted only in the function body
-   y = Wasm instructions counted in the function body and the function prelude

## Averages

| Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Average Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ---------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | ----------------------------------- | ----------------------------- |
| (717_209 / 1_103_188)  | (423 / 1_647)            | (615 / 28_047)         | (1_220x / 608x)               | (825x / 35x)                | (-1_220x / -608x)             | (-0x / -17x)                  | (-825x / -35x)                      | (1x / 17x)                    |

## Primitive Operations

| Description        | Azle Wasm Instructions  | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| ------------------ | ----------------------- | ------------------------ | ---------------------- | ----------------------------- | --------------------------- | ----------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| empty              | (63_802 / 430_201)      | (200 / 1_264)            | (200 / 19_466)         | (319x / 340x)                 | (319x / 22x)                | (-319x / -340x)               | (1x / -15x)                   | (-319x / -22x)              | (1x / 15x)                    |
| blob_init_stack: 1 | (1_370_617 / 1_776_174) | (646 / 2_029)            | (1_030 / 36_628)       | (2_122x / 875x)               | (1_331x / 48x)              | (-2_122x / -875x)             | (-2x / -18x)                  | (-1_331x / -48x)            | (2x / 18x)                    |

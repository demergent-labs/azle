# Azle/Motoko/Rust Benchmarks

- These benchmarks should be considered preliminary (especially the Motoko benchmarks, something seems off with the function prelude)
- These benchmarks were implemented using the performance counter API
    - Performance counter information in [The Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports)
    - Performance counter information in [the forum](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
- The results were obtained for each data type by returning performance counter values after performing n iterations of value initializations on the stack and heap in each language
- Each benchmark is the average of 10 runs
- Each benchmark description gives the benchmark function name followed by the number of value initializations performed by the benchmark function
- All benchmark code can be found [here](/benchmark/primitive_ops)
- The following may be inaccurate or missing from the benchmarks as described [here](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027):
    - Candid serialization/deserialization of function parameters and return types
    - Canister method prologue/epilogue
    - Some Motoko runtime behavior (such as garbage collection)
- You can find a raw CSV file with this data [here](/benchmark/primitive_ops/benchmarks.csv)
- A rough USD cost model for various app scenarios can be found [here](https://docs.google.com/spreadsheets/d/1PQ53R9hYE1fuMB_z-Bl6dyymm7end7rVJ85TvGEh0BQ)

The format for benchmark numbers is (x / y) where:
  - x = Wasm instructions counted only in the function body
  - y = Wasm instructions counted in the function body and the function prelude
    
| Description | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| empty | (64_603 / 439_745) | (200 / 1_264) |(200 / 19_426) | (323x / 348x) | (323x / 23x) | (-323x / -348x) | (1x / -15x) | (-323x / -23x) | (1x / 15x) |

Average Azle Wasm Instructions: (64_603 / 439_745)

Average Motoko Wasm Instructions: (200 / 1_264)

Average Rust Wasm Instructions: (200 / 19_426)

Average Azle/Motoko Change Multiplier: (323x / 348x)

Average Azle/Rust Change Multiplier: (323x / 23x)

Average Motoko/Azle Change Multiplier: (-323x / -348x)

Average Motoko/Rust Change Multiplier: (1x / -15x)

Average Rust/Azle Change Multiplier: (-323x / -23x)

Average Rust/Motoko Change Multiplier: (1x / 15x)
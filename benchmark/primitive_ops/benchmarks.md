# Azle/Rust/Motoko Benchmarks

- These benchmarks were implemented using the performance counter API
    - Performance counter information in [The Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports)
    - Performance counter information in [the forum](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
- The results were obtained for each data type by performing a number of iterations of basic value initializations on the stack and heap in each language
- Each benchmark description gives the benchmark function name followed by the number of value initializations performed by the benchmark function
- All benchmark code can be found [here](https://github.com/demergent-labs/azle/tree/26_benchmarking/benchmark/primitive_ops)
- The following may be missing from the benchmarks as described [here](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027):
    - Candid serialization/deserialization of function parameters and return types
    - Canister method prologue/epilogue
    - Some Motoko runtime behavior (such as garbage collection)
    
| Description | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| blob_init_stack: 1 | 1_571_266 | 1_583 |32_071 | 993x | 49x | -993x | -20x | -49x | 20x |
| blob_init_stack: 10 | 8_753_778 | 3_803 |33_620 | 2_302x | 260x | -2_302x | -9x | -260x | 9x |
| blob_init_stack: 100 | 84_458_672 | 27_653 |50_675 | 3_054x | 1_667x | -3_054x | -2x | -1_667x | 2x |
| blob_init_heap: 1 | 1_648_215 | 4_637 |34_036 | 355x | 48x | -355x | -7x | -48x | 7x |
| blob_init_heap: 10 | 9_640_130 | 36_836 |52_982 | 262x | 182x | -262x | -1x | -182x | 1x |
| blob_init_heap: 100 | 92_567_307 | 1_734_848 |251_739 | 53x | 368x | -53x | 7x | -368x | -7x |

Average Azle Wasm Instructions: 33_106_561

Average Motoko Wasm Instructions: 301_560

Average Rust Wasm Instructions: 75_854

Average Azle/Motoko Change Multiplier: 1_170x

Average Azle/Rust Change Multiplier: 429x

Average Motoko/Azle Change Multiplier: -1_170x

Average Motoko/Rust Change Multiplier: -5x

Average Rust/Azle Change Multiplier: -429x

Average Rust/Motoko Change Multiplier: 5x
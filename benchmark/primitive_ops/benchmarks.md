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

The format for benchmark numbers is (x / y) where:
  - x = Wasm instructions counted only in the function body
  - y = Wasm instructions counted in the function body and the function prelude
    
| Description | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| blob_init_stack: 1 | (1_380_197 / 1_790_043) | (646 / 2_029) |(566 / 32_995) | (2_137x / 882x) | (2_439x / 54x) | (-2_137x / -882x) | (1x / -16x) | (-2_439x / -54x) | (-1x / 16x) |
| blob_init_stack: 10 | (8_564_299 / 8_972_311) | (2_866 / 4_249) |(2_209 / 34_638) | (2_988x / 2_112x) | (3_877x / 259x) | (-2_988x / -2_112x) | (1x / -8x) | (-3_877x / -259x) | (-1x / 8x) |
| blob_init_stack: 100 | (84_247_940 / 84_658_663) | (26_716 / 28_099) |(20_254 / 52_683) | (3_153x / 3_013x) | (4_160x / 1_607x) | (-3_153x / -3_013x) | (1x / -2x) | (-4_160x / -1_607x) | (-1x / 2x) |
| blob_init_heap: 1 | (1_460_003 / 1_868_381) | (3_700 / 5_083) |(2_504 / 34_954) | (395x / 368x) | (583x / 53x) | (-395x / -368x) | (1x / -7x) | (-583x / -53x) | (-1x / 7x) |
| blob_init_heap: 10 | (9_450_549 / 9_858_674) | (35_899 / 37_282) |(21_490 / 53_940) | (263x / 264x) | (440x / 183x) | (-263x / -264x) | (2x / -1x) | (-440x / -183x) | (-2x / 1x) |
| blob_init_heap: 100 | (92_373_073 / 92_779_438) | (1_733_911 / 1_735_294) |(222_040 / 254_490) | (53x / 53x) | (416x / 365x) | (-53x / -53x) | (8x / 7x) | (-416x / -365x) | (-8x / -7x) |

Average Azle Wasm Instructions: (32_912_677 / 33_321_252)

Average Motoko Wasm Instructions: (300_623 / 302_006)

Average Rust Wasm Instructions: (44_844 / 77_283)

Average Azle/Motoko Change Multiplier: (1_498x / 1_115x)

Average Azle/Rust Change Multiplier: (1_986x / 420x)

Average Motoko/Azle Change Multiplier: (-1_498x / -1_115x)

Average Motoko/Rust Change Multiplier: (2x / -5x)

Average Rust/Azle Change Multiplier: (-1_986x / -420x)

Average Rust/Motoko Change Multiplier: (-2x / 5x)
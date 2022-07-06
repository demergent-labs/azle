# Azle/Rust/Motoko Benchmarks
These benchmarks were run using the performance counter. The results are the average of ten executions.
| Description | Azle Wasm Instructions | Rust Wasm Instructions | Azle/Rust Percentage Change | Azle/Rust Change Multiplier |
| --- | --- | --- | --- | --- |
| boolean_candid_serde_one | 315_235 | 31_735 | 900% | 10x |
| boolean_candid_serde_many: 1 | 605_116 | 70_277 | 775% | 9x |
| boolean_candid_serde_many: 10 | 623_053 | 94_064 | 562% | 7x |
| boolean_candid_serde_many: 100 | 5_416_799 | 348_601 | 1_454% | 16x |
| boolean_init_stack: 1 | 610_874 | 35_346 | 1_629% | 17x |
| boolean_init_stack: 10 | 2_266_616 | 35_530 | 6_283% | 64x |
| boolean_init_stack: 100 | 19_163_653 | 36_740 | 52_115% | 522x |
| boolean_init_heap: 1 | 789_475 | 39_184 | 1_915% | 20x |
| boolean_init_heap: 10 | 3_072_119 | 59_588 | 5_065% | 52x |
| boolean_init_heap: 100 | 26_848_300 | 278_298 | 9_579% | 97x |
| nat_candid_serde_one | 350_285 | 70_404 | 399% | 5x |
| nat_candid_serde_many: 1 | 430_208 | 109_373 | 294% | 4x |
| nat_candid_serde_many: 10 | 1_011_446 | 494_577 | 105% | 2x |
| nat_candid_serde_many: 100 | 8_989_963 | 4_371_119 | 106% | 2x |
| nat_init_stack: 1 | 614_747 | 34_885 | 1_662% | 18x |
| nat_init_stack: 10 | 2_622_935 | 38_250 | 6_757% | 69x |
| nat_init_stack: 100 | 18_884_831 | 73_035 | 25_757% | 259x |
| nat_init_heap: 1 | 792_229 | 38_620 | 1_951% | 21x |
| nat_init_heap: 10 | 3_325_914 | 58_729 | 5_602% | 57x |
| nat_init_heap: 100 | 26_553_187 | 276_698 | 9_607% | 97x |
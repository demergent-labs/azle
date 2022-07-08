# Azle/Rust/Motoko Benchmarks
These benchmarks were run using the performance counter. The results are the average of ten executions.
| Description | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Percentage Change | Azle/Rust Percentage Change | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier |
| --- | --- | --- | --- | --- | --- | --- | --- |
| boolean_init_stack: 1 | 818_461 | 1_335 |36_534 | 61_208% | 2_142% | 613x | 22x |
| boolean_init_stack: 10 | 5_661_633 | 2_978 |49_690 | 190_015% | 11_294% | 1_901x | 114x |
| boolean_init_stack: 100 | 51_460_149 | 19_403 |183_925 | 265_117% | 27_879% | 2_652x | 280x |
| boolean_init_heap: 1 | 590_944 | 3_764 |36_084 | 15_632% | 1_538% | 157x | 16x |
| boolean_init_heap: 10 | 2_872_125 | 28_674 |57_699 | 9_928% | 4_882% | 100x | 50x |
| boolean_init_heap: 100 | 26_690_478 | 1_731_004 |269_907 | 1_487% | 9_818% | 16x | 99x |
| int_init_stack: 1 | 837_890 | 1_070_932 |57_332 | -22% | 1_361% | 1x | 15x |
| int_init_stack: 10 | 5_549_617 | 5_350_979 |171_992 | 4% | 3_127% | 1x | 32x |
| int_init_stack: 100 | 52_517_298 | 53_499_428 |1_406_297 | -2% | 3_634% | 1x | 37x |
| int_init_heap: 1 | 598_474 | 17_389 |37_995 | 3_342% | 1_475% | 34x | 16x |
| int_init_heap: 10 | 2_877_203 | 165_605 |58_036 | 1_637% | 4_878% | 17x | 50x |
| int_init_heap: 100 | 26_613_648 | 515_495 |269_216 | 5_257% | 9_911% | 54x | 100x |
| nat_init_stack: 1 | 839_895 | 1_072_347 |54_599 | -22% | 1_438% | 1x | 15x |
| nat_init_stack: 10 | 5_551_451 | 5_358_123 |162_690 | 4% | 3_312% | 1x | 34x |
| nat_init_stack: 100 | 52_761_457 | 53_570_853 |1_333_590 | -2% | 3_856% | 1x | 40x |
| nat_init_heap: 1 | 589_380 | 17_497 |36_386 | 3_269% | 1_521% | 34x | 16x |
| nat_init_heap: 10 | 2_856_394 | 165_829 |55_967 | 1_623% | 5_023% | 17x | 51x |
| nat_init_heap: 100 | 26_640_752 | 515_279 |263_977 | 5_263% | 10_113% | 54x | 102x |

Average Azle Wasm Instructions: 14_795_958

Average Motoko Wasm Instructions: 6_839_273

Average Rust Wasm Instructions: 252_329

Average Azle/Motoko Change Multiplier: 314x

Average Azle/Rust Change Multiplier: 61x
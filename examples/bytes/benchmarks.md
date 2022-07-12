# Azle/Rust/Motoko Benchmarks

These benchmarks were run using the performance counter. The results are the average of ten executions.
| Description | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Percentage Change | Azle/Rust Percentage Change | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier |
| --- | --- | --- | --- | --- | --- | --- | --- |
| boolean_init_stack: 1 | 628_928 | 404 |1_211 | 155_575% | 51_835% | 1_557x | 519x |
| boolean_init_stack: 10 | 5_260_459 | 2_047 |10_379 | 256_884% | 50_584% | 2_570x | 507x |
| boolean_init_stack: 100 | 51_253_501 | 18_472 |101_954 | 277_366% | 50_171% | 2_775x | 503x |
| boolean_init_heap: 1 | 410_761 | 2_771 |1_980 | 14_724% | 20_645% | 148x | 207x |
| boolean_init_heap: 10 | 2_758_600 | 28_055 |17_865 | 9_733% | 15_341% | 98x | 154x |
| boolean_init_heap: 100 | 26_477_895 | 1_608_994 |182_714 | 1_546% | 14_391% | 16x | 145x |
| int_init_stack: 1 | 649_134 | 1_070_001 |22_689 | -39% | 2_761% | 1x | 29x |
| int_init_stack: 10 | 5_358_612 | 5_350_047 |132_539 | 0% | 3_943% | 1x | 40x |
| int_init_stack: 100 | 52_601_452 | 53_498_472 |1_323_555 | -2% | 3_874% | 1x | 40x |
| int_init_heap: 1 | 409_406 | 16_557 |2_724 | 2_373% | 14_930% | 25x | 150x |
| int_init_heap: 10 | 2_747_256 | 165_915 |21_804 | 1_556% | 12_500% | 17x | 126x |
| int_init_heap: 100 | 26_512_263 | 472_862 |223_832 | 5_507% | 11_745% | 56x | 118x |
| nat_init_stack: 1 | 643_769 | 1_071_416 |22_677 | -40% | 2_739% | 1x | 28x |
| nat_init_stack: 10 | 5_369_367 | 5_357_192 |132_574 | 0% | 3_950% | 1x | 41x |
| nat_init_stack: 100 | 52_340_549 | 53_569_922 |1_323_904 | -2% | 3_854% | 1x | 40x |
| nat_init_heap: 1 | 410_871 | 16_557 |2_674 | 2_382% | 15_265% | 25x | 154x |
| nat_init_heap: 10 | 2_753_648 | 165_695 |21_535 | 1_562% | 12_687% | 17x | 128x |
| nat_init_heap: 100 | 26_480_557 | 472_642 |220_489 | 5_503% | 11_910% | 56x | 120x |

Average Azle Wasm Instructions: 14_614_835

Average Motoko Wasm Instructions: 6_827_112

Average Rust Wasm Instructions: 209_283

Average Azle/Motoko Change Multiplier: 409x

Average Azle/Rust Change Multiplier: 169x

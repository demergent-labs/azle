# Azle/Rust/Motoko Benchmarks

- These benchmarks should be considered preliminary (especially the Motoko benchmarks, something seems off)
- These benchmarks were implemented using the performance counter API
    - Performance counter information in [The Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports)
    - Performance counter information in [the forum](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
- The results were obtained for each data type by returning the performance counter value after performing n iterations of value initializations on the stack and heap in each language
- Each benchmark description gives the benchmark function name followed by the number of value initializations performed by the benchmark function
- All benchmark code can be found [here](https://github.com/demergent-labs/azle/tree/26_benchmarking/benchmark/primitive_ops)
- The following may be missing from the benchmarks as described [here](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027):
    - Candid serialization/deserialization of function parameters and return types
    - Canister method prologue/epilogue
    - Some Motoko runtime behavior (such as garbage collection)
    
| Description | Azle Wasm Instructions | Motoko Wasm Instructions | Rust Wasm Instructions | Azle/Motoko Change Multiplier | Azle/Rust Change Multiplier | Motoko/Azle Change Multiplier | Motoko/Rust Change Multiplier | Rust/Azle Change Multiplier | Rust/Motoko Change Multiplier |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| blob_init_stack: 1 | 1_553_328 | 1_583 |35_406 | 981x | 44x | -981x | -22x | -44x | 22x |
| blob_init_stack: 10 | 8_758_034 | 3_803 |38_627 | 2_303x | 227x | -2_303x | -10x | -227x | 10x |
| blob_init_stack: 100 | 84_292_642 | 27_653 |77_552 | 3_048x | 1_087x | -3_048x | -3x | -1_087x | 3x |
| blob_init_heap: 1 | 1_639_933 | 4_693 |36_336 | 350x | 45x | -350x | -8x | -45x | 8x |
| blob_init_heap: 10 | 9_470_757 | 36_463 |55_855 | 260x | 170x | -260x | -2x | -170x | 2x |
| blob_init_heap: 100 | 92_915_520 | 1_859_157 |263_807 | 51x | 357x | -51x | 7x | -357x | -7x |
| boolean_init_stack: 1 | 521_201 | 1_188 |32_062 | 439x | 16x | -439x | -27x | -16x | 27x |
| boolean_init_stack: 10 | 2_175_917 | 1_503 |32_206 | 1_448x | 68x | -1_448x | -21x | -68x | 21x |
| boolean_init_stack: 100 | 18_788_221 | 4_653 |33_646 | 4_038x | 558x | -4_038x | -7x | -558x | 7x |
| boolean_init_heap: 1 | 596_056 | 4_298 |35_365 | 139x | 17x | -139x | -8x | -17x | 8x |
| boolean_init_heap: 10 | 3_249_889 | 34_018 |57_602 | 96x | 57x | -96x | -2x | -57x | 2x |
| boolean_init_heap: 100 | 26_343_079 | 1_834_700 |284_979 | 15x | 93x | -15x | 6x | -93x | -6x |
| float32_init_stack: 1 | 537_598 | 1_189 |32_996 | 452x | 16x | -452x | -28x | -16x | 28x |
| float32_init_stack: 10 | 2_321_117 | 1_513 |33_140 | 1_534x | 70x | -1_534x | -22x | -70x | 22x |
| float32_init_stack: 100 | 20_523_999 | 4_753 |34_580 | 4_318x | 594x | -4_318x | -7x | -594x | 7x |
| float32_init_heap: 1 | 608_148 | 4_351 |35_153 | 140x | 17x | -140x | -8x | -17x | 8x |
| float32_init_heap: 10 | 3_002_949 | 34_693 |57_583 | 87x | 52x | -87x | -2x | -52x | 2x |
| float32_init_heap: 100 | 28_104_420 | 1_841_455 |286_861 | 16x | 98x | -16x | 6x | -98x | -6x |
| float64_init_stack: 1 | 533_337 | 1_189 |32_994 | 449x | 16x | -449x | -28x | -16x | 28x |
| float64_init_stack: 10 | 2_316_241 | 1_513 |33_120 | 1_531x | 70x | -1_531x | -22x | -70x | 22x |
| float64_init_stack: 100 | 20_170_984 | 4_753 |34_380 | 4_244x | 587x | -4_244x | -7x | -587x | 7x |
| float64_init_heap: 1 | 610_764 | 4_295 |35_157 | 142x | 17x | -142x | -8x | -17x | 8x |
| float64_init_heap: 10 | 3_401_942 | 35_066 |56_445 | 97x | 60x | -97x | -2x | -60x | 2x |
| float64_init_heap: 100 | 27_725_646 | 1_717_148 |285_861 | 16x | 97x | -16x | 6x | -97x | -6x |
| int_init_stack: 1 | 523_153 | 1_188 |33_319 | 440x | 16x | -440x | -28x | -16x | 28x |
| int_init_stack: 10 | 2_184_379 | 1_503 |38_274 | 1_453x | 57x | -1_453x | -25x | -57x | 25x |
| int_init_stack: 100 | 19_164_183 | 4_653 |93_624 | 4_119x | 205x | -4_119x | -20x | -205x | 20x |
| int_init_heap: 1 | 592_464 | 4_298 |35_428 | 138x | 17x | -138x | -8x | -17x | 8x |
| int_init_heap: 10 | 2_872_848 | 34_018 |57_691 | 85x | 50x | -85x | -2x | -50x | 2x |
| int_init_heap: 100 | 26_766_603 | 1_834_700 |289_350 | 15x | 93x | -15x | 6x | -93x | -6x |
| int8_init_stack: 1 | 521_523 | 1_188 |32_139 | 439x | 16x | -439x | -27x | -16x | 27x |
| int8_init_stack: 10 | 2_174_612 | 1_503 |32_283 | 1_447x | 67x | -1_447x | -21x | -67x | 21x |
| int8_init_stack: 100 | 18_787_245 | 4_653 |33_723 | 4_038x | 557x | -4_038x | -7x | -557x | 7x |
| int8_init_heap: 1 | 596_142 | 4_269 |34_218 | 140x | 17x | -140x | -8x | -17x | 8x |
| int8_init_heap: 10 | 2_875_554 | 33_872 |56_267 | 85x | 51x | -85x | -2x | -51x | 2x |
| int8_init_heap: 100 | 26_781_322 | 1_833_245 |285_281 | 15x | 94x | -15x | 6x | -94x | -6x |
| int16_init_stack: 1 | 522_654 | 1_188 |32_078 | 440x | 16x | -440x | -27x | -16x | 27x |
| int16_init_stack: 10 | 2_180_564 | 1_503 |32_222 | 1_451x | 68x | -1_451x | -21x | -68x | 21x |
| int16_init_stack: 100 | 19_139_476 | 4_653 |33_662 | 4_113x | 569x | -4_113x | -7x | -569x | 7x |
| int16_init_heap: 1 | 592_762 | 4_269 |34_235 | 139x | 17x | -139x | -8x | -17x | 8x |
| int16_init_heap: 10 | 2_869_145 | 33_872 |56_666 | 85x | 51x | -85x | -2x | -51x | 2x |
| int16_init_heap: 100 | 26_395_639 | 1_833_245 |284_965 | 15x | 93x | -15x | 6x | -93x | -6x |
| int32_init_stack: 1 | 878_916 | 1_195 |32_078 | 735x | 27x | -735x | -27x | -27x | 27x |
| int32_init_stack: 10 | 2_173_697 | 1_578 |32_222 | 1_378x | 67x | -1_378x | -20x | -67x | 20x |
| int32_init_stack: 100 | 18_776_190 | 5_403 |33_662 | 3_475x | 558x | -3_475x | -6x | -558x | 6x |
| int32_init_heap: 1 | 594_859 | 4_361 |34_235 | 137x | 17x | -137x | -8x | -17x | 8x |
| int32_init_heap: 10 | 2_875_808 | 34_413 |56_665 | 84x | 51x | -84x | -2x | -51x | 2x |
| int32_init_heap: 100 | 26_773_121 | 1_838_650 |285_159 | 15x | 94x | -15x | 6x | -94x | -6x |
| int64_init_stack: 1 | 522_670 | 1_195 |32_076 | 437x | 16x | -437x | -27x | -16x | 27x |
| int64_init_stack: 10 | 2_183_034 | 1_583 |32_202 | 1_379x | 68x | -1_379x | -20x | -68x | 20x |
| int64_init_stack: 100 | 19_169_896 | 5_453 |34_038 | 3_515x | 563x | -3_515x | -6x | -563x | 6x |
| int64_init_heap: 1 | 591_234 | 4_368 |34_815 | 136x | 17x | -136x | -8x | -17x | 8x |
| int64_init_heap: 10 | 2_869_275 | 34_493 |56_947 | 83x | 50x | -83x | -2x | -50x | 2x |
| int64_init_heap: 100 | 26_427_994 | 1_839_450 |286_714 | 15x | 92x | -15x | 6x | -92x | -6x |
| nat_init_stack: 1 | 526_166 | 1_188 |33_907 | 443x | 16x | -443x | -29x | -16x | 29x |
| nat_init_stack: 10 | 2_534_289 | 1_503 |38_945 | 1_686x | 65x | -1_686x | -26x | -65x | 26x |
| nat_init_stack: 100 | 18_788_803 | 4_653 |94_970 | 4_038x | 198x | -4_038x | -20x | -198x | 20x |
| nat_init_heap: 1 | 596_054 | 4_298 |35_972 | 139x | 17x | -139x | -8x | -17x | 8x |
| nat_init_heap: 10 | 2_878_442 | 34_018 |57_625 | 85x | 50x | -85x | -2x | -50x | 2x |
| nat_init_heap: 100 | 26_805_923 | 1_834_700 |283_361 | 15x | 96x | -15x | 7x | -96x | -7x |
| nat8_init_stack: 1 | 521_922 | 1_188 |32_656 | 439x | 16x | -439x | -27x | -16x | 27x |
| nat8_init_stack: 10 | 2_179_857 | 1_503 |32_800 | 1_450x | 66x | -1_450x | -22x | -66x | 22x |
| nat8_init_stack: 100 | 19_155_300 | 4_653 |34_240 | 4_117x | 559x | -4_117x | -7x | -559x | 7x |
| nat8_init_heap: 1 | 590_541 | 4_269 |34_731 | 139x | 17x | -139x | -8x | -17x | 8x |
| nat8_init_heap: 10 | 2_871_542 | 33_872 |57_166 | 85x | 50x | -85x | -2x | -50x | 2x |
| nat8_init_heap: 100 | 26_390_533 | 1_833_245 |284_904 | 15x | 93x | -15x | 6x | -93x | -6x |
| nat16_init_stack: 1 | 525_299 | 1_188 |32_654 | 442x | 16x | -442x | -27x | -16x | 27x |
| nat16_init_stack: 10 | 2_541_255 | 1_503 |32_798 | 1_691x | 77x | -1_691x | -22x | -77x | 22x |
| nat16_init_stack: 100 | 18_758_575 | 4_653 |34_238 | 4_032x | 548x | -4_032x | -7x | -548x | 7x |
| nat16_init_heap: 1 | 594_793 | 4_269 |34_808 | 140x | 17x | -140x | -8x | -17x | 8x |
| nat16_init_heap: 10 | 2_875_824 | 33_872 |57_236 | 85x | 50x | -85x | -2x | -50x | 2x |
| nat16_init_heap: 100 | 26_758_507 | 1_833_245 |285_221 | 15x | 94x | -15x | 6x | -94x | -6x |
| nat32_init_stack: 1 | 522_558 | 1_196 |32_654 | 437x | 16x | -437x | -27x | -16x | 27x |
| nat32_init_stack: 10 | 2_175_423 | 1_583 |32_798 | 1_374x | 66x | -1_374x | -21x | -66x | 21x |
| nat32_init_stack: 100 | 19_164_910 | 5_453 |34_238 | 3_515x | 560x | -3_515x | -6x | -560x | 6x |
| nat32_init_heap: 1 | 590_643 | 4_362 |34_808 | 136x | 17x | -136x | -8x | -17x | 8x |
| nat32_init_heap: 10 | 2_867_885 | 34_418 |57_211 | 83x | 50x | -83x | -2x | -50x | 2x |
| nat32_init_heap: 100 | 26_400_468 | 1_838_700 |284_737 | 15x | 93x | -15x | 6x | -93x | -6x |
| nat64_init_stack: 1 | 524_673 | 1_197 |32_652 | 438x | 16x | -438x | -27x | -16x | 27x |
| nat64_init_stack: 10 | 2_185_661 | 1_593 |32_778 | 1_372x | 67x | -1_372x | -21x | -67x | 21x |
| nat64_init_stack: 100 | 19_136_422 | 5_553 |34_038 | 3_446x | 562x | -3_446x | -6x | -562x | 6x |
| nat64_init_heap: 1 | 594_117 | 4_294 |34_813 | 139x | 17x | -139x | -8x | -17x | 8x |
| nat64_init_heap: 10 | 2_876_878 | 34_122 |56_952 | 84x | 51x | -84x | -2x | -51x | 2x |
| nat64_init_heap: 100 | 26_785_663 | 1_835_745 |286_986 | 15x | 94x | -15x | 6x | -94x | -6x |
| null_init_stack: 1 | 522_407 | 1_188 |32_735 | 440x | 16x | -440x | -28x | -16x | 28x |
| null_init_stack: 10 | 2_174_828 | 1_503 |32_879 | 1_447x | 66x | -1_447x | -22x | -66x | 22x |
| null_init_stack: 100 | 18_778_908 | 4_653 |34_319 | 4_036x | 547x | -4_036x | -7x | -547x | 7x |
| null_init_heap: 1 | 970_631 | 4_288 |35_265 | 228x | 28x | -228x | -8x | -28x | 8x |
| null_init_heap: 10 | 2_868_021 | 34_056 |56_894 | 84x | 50x | -84x | -2x | -50x | 2x |
| null_init_heap: 100 | 26_419_922 | 1_835_091 |280_151 | 15x | 95x | -15x | 7x | -95x | -7x |
| opt_init_stack: 1 | 524_705 | 1_204 |32_656 | 436x | 16x | -436x | -27x | -16x | 27x |
| opt_init_stack: 10 | 2_182_457 | 1_583 |32_800 | 1_379x | 67x | -1_379x | -21x | -67x | 21x |
| opt_init_stack: 100 | 19_112_434 | 5_453 |34_240 | 3_505x | 558x | -3_505x | -6x | -558x | 6x |
| opt_init_heap: 1 | 591_869 | 4_314 |35_162 | 137x | 17x | -137x | -8x | -17x | 8x |
| opt_init_heap: 10 | 2_860_402 | 34_190 |57_299 | 84x | 50x | -84x | -2x | -50x | 2x |
| opt_init_heap: 100 | 26_677_492 | 1_836_423 |286_573 | 15x | 93x | -15x | 6x | -93x | -6x |
| principal_init_stack: 1 | 50_115_983 | 7_433 |54_252 | 6_742x | 924x | -6_742x | -7x | -924x | 7x |
| principal_init_stack: 10 | 331_676_415 | 43_628 |177_559 | 7_602x | 1_868x | -7_602x | -4x | -1_868x | 4x |
| principal_init_stack: 100 | 3_314_091_368 | 425_903 |1_481_839 | 7_781x | 2_236x | -7_781x | -3x | -2_236x | 3x |
| principal_init_heap: 1 | 50_606_412 | 10_543 |56_055 | 4_800x | 903x | -4_800x | -5x | -903x | 5x |
| principal_init_heap: 10 | 332_590_014 | 76_288 |203_297 | 4_361x | 1_636x | -4_361x | -3x | -1_636x | 3x |
| principal_init_heap: 100 | 3_320_469_551 | 2_257_405 |1_747_364 | 1_499x | 1_901x | -1_499x | 1x | -1_901x | -1x |
| record_init_stack: 1 | 51_850_667 | 7_917 |55_376 | 6_549x | 936x | -6_549x | -7x | -936x | 7x |
| record_init_stack: 10 | 345_938_084 | 48_398 |186_664 | 7_148x | 1_853x | -7_148x | -4x | -1_853x | 4x |
| record_init_stack: 100 | 3_455_074_847 | 473_603 |1_572_124 | 7_295x | 2_198x | -7_295x | -3x | -2_198x | 3x |
| record_init_heap: 1 | 51_917_598 | 11_027 |58_150 | 4_710x | 893x | -4_710x | -5x | -893x | 5x |
| record_init_heap: 10 | 346_279_389 | 81_058 |222_435 | 4_273x | 1_557x | -4_273x | -3x | -1_557x | 3x |
| record_init_heap: 100 | 3_452_720_030 | 2_305_105 |1_945_311 | 1_526x | 1_776x | -1_526x | 1x | -1_776x | -1x |
| text_init_stack: 1 | 527_598 | 1_188 |34_491 | 444x | 15x | -444x | -29x | -15x | 29x |
| text_init_stack: 10 | 2_183_309 | 1_503 |38_416 | 1_453x | 57x | -1_453x | -26x | -57x | 26x |
| text_init_stack: 100 | 19_364_651 | 4_653 |81_661 | 4_162x | 237x | -4_162x | -18x | -237x | 18x |
| text_init_heap: 1 | 591_184 | 4_298 |36_203 | 138x | 16x | -138x | -8x | -16x | 8x |
| text_init_heap: 10 | 2_876_119 | 34_163 |56_883 | 84x | 51x | -84x | -2x | -51x | 2x |
| text_init_heap: 100 | 26_447_103 | 1_836_155 |282_925 | 15x | 94x | -15x | 7x | -94x | -7x |
| variant_init_stack: 1 | 570_233 | 1_241 |32_705 | 459x | 17x | -459x | -26x | -17x | 26x |
| variant_init_stack: 10 | 2_671_911 | 2_033 |32_849 | 1_314x | 81x | -1_314x | -16x | -81x | 16x |
| variant_init_stack: 100 | 24_845_100 | 9_953 |34_289 | 2_496x | 725x | -2_496x | -3x | -725x | 3x |
| variant_init_heap: 1 | 637_529 | 4_351 |36_074 | 147x | 18x | -147x | -8x | -18x | 8x |
| variant_init_heap: 10 | 3_373_345 | 34_693 |58_688 | 97x | 58x | -97x | -2x | -58x | 2x |
| variant_init_heap: 100 | 32_972_066 | 1_841_455 |288_739 | 18x | 114x | -18x | 6x | -114x | -6x |
| vec_init_stack: 1 | 998_554 | 1_188 |33_557 | 841x | 30x | -841x | -28x | -30x | 28x |
| vec_init_stack: 10 | 4_696_778 | 1_503 |37_085 | 3_125x | 127x | -3_125x | -25x | -127x | 25x |
| vec_init_stack: 100 | 45_221_465 | 4_653 |76_370 | 9_719x | 592x | -9_719x | -16x | -592x | 16x |
| vec_init_heap: 1 | 1_058_668 | 4_298 |35_515 | 247x | 30x | -247x | -8x | -30x | 8x |
| vec_init_heap: 10 | 5_384_988 | 34_163 |57_420 | 158x | 94x | -158x | -2x | -94x | 2x |
| vec_init_heap: 100 | 53_137_642 | 1_836_155 |266_637 | 30x | 202x | -30x | 7x | -202x | -7x |

Average Azle Wasm Instructions: 129_474_843

Average Motoko Wasm Instructions: 328_980

Average Rust Wasm Instructions: 135_498

Average Azle/Motoko Change Multiplier: 1_487x

Average Azle/Rust Change Multiplier: 275x

Average Motoko/Azle Change Multiplier: -1_487x

Average Motoko/Rust Change Multiplier: -10x

Average Rust/Azle Change Multiplier: -275x

Average Rust/Motoko Change Multiplier: 10x
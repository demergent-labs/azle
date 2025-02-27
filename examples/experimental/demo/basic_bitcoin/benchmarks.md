# Benchmarks for basic_bitcoin

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_988_936_465 | 5_996_164_586 | $0.0079729202 | $7_972.92         | <font color="green">-3_860_032</font> |
| 1   | http_request_update | 172_019_343   | 69_397_737    | $0.0000922761 | $92.27            | <font color="green">-1_777_456</font> |
| 2   | http_request_update | 171_929_314   | 69_361_725    | $0.0000922282 | $92.22            | <font color="green">-1_827_364</font> |
| 3   | http_request_update | 172_359_558   | 69_533_823    | $0.0000924570 | $92.45            | <font color="green">-1_923_276</font> |
| 4   | http_request_update | 172_036_442   | 69_404_576    | $0.0000922852 | $92.28            | <font color="green">-1_817_117</font> |
| 5   | http_request_update | 172_027_828   | 69_401_131    | $0.0000922806 | $92.28            | <font color="green">-1_766_886</font> |
| 6   | http_request_update | 172_412_833   | 69_555_133    | $0.0000924854 | $92.48            | <font color="green">-1_970_991</font> |
| 7   | http_request_update | 171_896_414   | 69_348_565    | $0.0000922107 | $92.21            | <font color="green">-2_091_377</font> |
| 8   | http_request_update | 174_419_238   | 70_357_695    | $0.0000935525 | $93.55            | <font color="green">-1_726_895</font> |
| 9   | http_request_update | 170_766_167   | 68_896_466    | $0.0000916096 | $91.60            | <font color="green">-1_803_771</font> |
| 10  | http_request_update | 172_441_122   | 69_566_448    | $0.0000925004 | $92.50            | <font color="green">-1_965_408</font> |
| 11  | http_request_update | 179_111_694   | 72_234_677    | $0.0000960483 | $96.04            | <font color="green">-2_137_722</font> |
| 12  | http_request_update | 172_323_308   | 69_519_323    | $0.0000924378 | $92.43            | <font color="green">-1_728_362</font> |
| 13  | http_request_update | 171_937_763   | 69_365_105    | $0.0000922327 | $92.23            | <font color="green">-1_928_840</font> |
| 14  | http_request_update | 172_303_781   | 69_511_512    | $0.0000924274 | $92.42            | <font color="green">-1_970_705</font> |
| 15  | http_request_update | 170_704_701   | 68_871_880    | $0.0000915769 | $91.57            | <font color="green">-1_791_840</font> |
| 16  | http_request_update | 173_054_521   | 69_811_808    | $0.0000928267 | $92.82            | <font color="green">-1_779_031</font> |
| 17  | http_request_update | 172_470_419   | 69_578_167    | $0.0000925160 | $92.51            | <font color="green">-1_943_975</font> |
| 18  | http_request_update | 172_097_127   | 69_428_850    | $0.0000923175 | $92.31            | <font color="green">-1_856_223</font> |
| 19  | http_request_update | 172_535_440   | 69_604_176    | $0.0000925506 | $92.55            | <font color="green">-2_077_622</font> |
| 20  | http_request_update | 170_743_101   | 68_887_240    | $0.0000915973 | $91.59            | <font color="green">-2_000_478</font> |
| 21  | http_request_update | 170_666_134   | 68_856_453    | $0.0000915564 | $91.55            | <font color="green">-2_014_651</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_992_796_497 | 5_997_708_598 | $0.0079749732 | $7_974.97         |
| 1   | http_request_update | 173_796_799   | 70_108_719    | $0.0000932215 | $93.22            |
| 2   | http_request_update | 173_756_678   | 70_092_671    | $0.0000932001 | $93.20            |
| 3   | http_request_update | 174_282_834   | 70_303_133    | $0.0000934800 | $93.47            |
| 4   | http_request_update | 173_853_559   | 70_131_423    | $0.0000932516 | $93.25            |
| 5   | http_request_update | 173_794_714   | 70_107_885    | $0.0000932204 | $93.22            |
| 6   | http_request_update | 174_383_824   | 70_343_529    | $0.0000935337 | $93.53            |
| 7   | http_request_update | 173_987_791   | 70_185_116    | $0.0000933230 | $93.32            |
| 8   | http_request_update | 176_146_133   | 71_048_453    | $0.0000944710 | $94.47            |
| 9   | http_request_update | 172_569_938   | 69_617_975    | $0.0000925689 | $92.56            |
| 10  | http_request_update | 174_406_530   | 70_352_612    | $0.0000935458 | $93.54            |
| 11  | http_request_update | 181_249_416   | 73_089_766    | $0.0000971853 | $97.18            |
| 12  | http_request_update | 174_051_670   | 70_210_668    | $0.0000933570 | $93.35            |
| 13  | http_request_update | 173_866_603   | 70_136_641    | $0.0000932586 | $93.25            |
| 14  | http_request_update | 174_274_486   | 70_299_794    | $0.0000934755 | $93.47            |
| 15  | http_request_update | 172_496_541   | 69_588_616    | $0.0000925299 | $92.52            |
| 16  | http_request_update | 174_833_552   | 70_523_420    | $0.0000937729 | $93.77            |
| 17  | http_request_update | 174_414_394   | 70_355_757    | $0.0000935499 | $93.54            |
| 18  | http_request_update | 173_953_350   | 70_171_340    | $0.0000933047 | $93.30            |
| 19  | http_request_update | 174_613_062   | 70_435_224    | $0.0000936556 | $93.65            |
| 20  | http_request_update | 172_743_579   | 69_687_431    | $0.0000926613 | $92.66            |
| 21  | http_request_update | 172_680_785   | 69_662_314    | $0.0000926279 | $92.62            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

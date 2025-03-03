# Benchmarks for basic_bitcoin

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_988_993_937 | 5_996_187_574 | $0.0079729507 | $7_972.95         | <font color="red">+57_472</font>    |
| 1   | http_request_update | 172_909_840   | 69_753_936    | $0.0000927497 | $92.74            | <font color="red">+890_497</font>   |
| 2   | http_request_update | 172_912_079   | 69_754_831    | $0.0000927509 | $92.75            | <font color="red">+982_765</font>   |
| 3   | http_request_update | 173_404_439   | 69_951_775    | $0.0000930128 | $93.01            | <font color="red">+1_044_881</font> |
| 4   | http_request_update | 173_019_225   | 69_797_690    | $0.0000928079 | $92.80            | <font color="red">+982_783</font>   |
| 5   | http_request_update | 172_860_050   | 69_734_020    | $0.0000927232 | $92.72            | <font color="red">+832_222</font>   |
| 6   | http_request_update | 173_504_392   | 69_991_756    | $0.0000930659 | $93.06            | <font color="red">+1_091_559</font> |
| 7   | http_request_update | 173_027_861   | 69_801_144    | $0.0000928125 | $92.81            | <font color="red">+1_131_447</font> |
| 8   | http_request_update | 175_256_160   | 70_692_464    | $0.0000939976 | $93.99            | <font color="red">+836_922</font>   |
| 9   | http_request_update | 171_694_746   | 69_267_898    | $0.0000921034 | $92.10            | <font color="red">+928_579</font>   |
| 10  | http_request_update | 173_504_518   | 69_991_807    | $0.0000930660 | $93.06            | <font color="red">+1_063_396</font> |
| 11  | http_request_update | 180_139_613   | 72_645_845    | $0.0000965950 | $96.59            | <font color="red">+1_027_919</font> |
| 12  | http_request_update | 173_301_882   | 69_910_752    | $0.0000929582 | $92.95            | <font color="red">+978_574</font>   |
| 13  | http_request_update | 173_003_898   | 69_791_559    | $0.0000927997 | $92.79            | <font color="red">+1_066_135</font> |
| 14  | http_request_update | 173_366_345   | 69_936_538    | $0.0000929925 | $92.99            | <font color="red">+1_062_564</font> |
| 15  | http_request_update | 171_566_572   | 69_216_628    | $0.0000920353 | $92.03            | <font color="red">+861_871</font>   |
| 16  | http_request_update | 173_991_486   | 70_186_594    | $0.0000933250 | $93.32            | <font color="red">+936_965</font>   |
| 17  | http_request_update | 173_562_397   | 70_014_958    | $0.0000930968 | $93.09            | <font color="red">+1_091_978</font> |
| 18  | http_request_update | 173_063_153   | 69_815_261    | $0.0000928313 | $92.83            | <font color="red">+966_026</font>   |
| 19  | http_request_update | 173_706_437   | 70_072_574    | $0.0000931734 | $93.17            | <font color="red">+1_170_997</font> |
| 20  | http_request_update | 171_892_827   | 69_347_130    | $0.0000922088 | $92.20            | <font color="red">+1_149_726</font> |
| 21  | http_request_update | 171_764_318   | 69_295_727    | $0.0000921404 | $92.14            | <font color="red">+1_098_184</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_988_936_465 | 5_996_164_586 | $0.0079729202 | $7_972.92         |
| 1   | http_request_update | 172_019_343   | 69_397_737    | $0.0000922761 | $92.27            |
| 2   | http_request_update | 171_929_314   | 69_361_725    | $0.0000922282 | $92.22            |
| 3   | http_request_update | 172_359_558   | 69_533_823    | $0.0000924570 | $92.45            |
| 4   | http_request_update | 172_036_442   | 69_404_576    | $0.0000922852 | $92.28            |
| 5   | http_request_update | 172_027_828   | 69_401_131    | $0.0000922806 | $92.28            |
| 6   | http_request_update | 172_412_833   | 69_555_133    | $0.0000924854 | $92.48            |
| 7   | http_request_update | 171_896_414   | 69_348_565    | $0.0000922107 | $92.21            |
| 8   | http_request_update | 174_419_238   | 70_357_695    | $0.0000935525 | $93.55            |
| 9   | http_request_update | 170_766_167   | 68_896_466    | $0.0000916096 | $91.60            |
| 10  | http_request_update | 172_441_122   | 69_566_448    | $0.0000925004 | $92.50            |
| 11  | http_request_update | 179_111_694   | 72_234_677    | $0.0000960483 | $96.04            |
| 12  | http_request_update | 172_323_308   | 69_519_323    | $0.0000924378 | $92.43            |
| 13  | http_request_update | 171_937_763   | 69_365_105    | $0.0000922327 | $92.23            |
| 14  | http_request_update | 172_303_781   | 69_511_512    | $0.0000924274 | $92.42            |
| 15  | http_request_update | 170_704_701   | 68_871_880    | $0.0000915769 | $91.57            |
| 16  | http_request_update | 173_054_521   | 69_811_808    | $0.0000928267 | $92.82            |
| 17  | http_request_update | 172_470_419   | 69_578_167    | $0.0000925160 | $92.51            |
| 18  | http_request_update | 172_097_127   | 69_428_850    | $0.0000923175 | $92.31            |
| 19  | http_request_update | 172_535_440   | 69_604_176    | $0.0000925506 | $92.55            |
| 20  | http_request_update | 170_743_101   | 68_887_240    | $0.0000915973 | $91.59            |
| 21  | http_request_update | 170_666_134   | 68_856_453    | $0.0000915564 | $91.55            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

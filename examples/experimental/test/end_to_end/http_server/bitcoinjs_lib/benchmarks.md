# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 49_642_902_378 | 39_457_750_951 | $0.0524657877 | $52_465.78        | <font color="red">+51_840_680</font>  |
| 1   | http_request_update | 55_496_423     | 22_788_569     | $0.0000303013 | $30.30            | <font color="red">+204_798</font>     |
| 2   | http_request_update | 939_348_485    | 376_329_394    | $0.0005003939 | $500.39           | <font color="green">-1_114_234</font> |
| 3   | http_request_update | 6_818_675_972  | 5_128_060_388  | $0.0068186281 | $6_818.62         | <font color="green">-5_668_088</font> |
| 4   | http_request_update | 6_665_442_809  | 5_066_767_123  | $0.0067371282 | $6_737.12         | <font color="green">-6_191_859</font> |
| 5   | http_request_update | 12_390_702_454 | 9_756_870_981  | $0.0129734186 | $12_973.41        | <font color="green">-312_244</font>   |
| 6   | http_request_update | 939_360_764    | 376_334_305    | $0.0005004004 | $500.40           | <font color="green">-983_013</font>   |
| 7   | http_request_update | 3_341_999_049  | 2_537_389_619  | $0.0033738909 | $3_373.89         | <font color="green">-207_114</font>   |
| 8   | http_request_update | 11_328_790_907 | 8_932_106_362  | $0.0118767539 | $11_876.75        | <font color="green">-42_289</font>    |
| 9   | http_request_update | 11_334_829_423 | 8_934_521_769  | $0.0118799656 | $11_879.96        | <font color="green">-622_698</font>   |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 49_591_061_698 | 39_437_014_679 | $0.0524382153 | $52_438.21        |
| 1   | http_request_update | 55_291_625     | 22_706_650     | $0.0000301924 | $30.19            |
| 2   | http_request_update | 940_462_719    | 376_775_087    | $0.0005009865 | $500.98           |
| 3   | http_request_update | 6_824_344_060  | 5_130_327_624  | $0.0068216427 | $6_821.64         |
| 4   | http_request_update | 6_671_634_668  | 5_069_243_867  | $0.0067404215 | $6_740.42         |
| 5   | http_request_update | 12_391_014_698 | 9_756_995_879  | $0.0129735847 | $12_973.58        |
| 6   | http_request_update | 940_343_777    | 376_727_510    | $0.0005009233 | $500.92           |
| 7   | http_request_update | 3_342_206_163  | 2_537_472_465  | $0.0033740010 | $3_374.00         |
| 8   | http_request_update | 11_328_833_196 | 8_932_123_278  | $0.0118767764 | $11_876.77        |
| 9   | http_request_update | 11_335_452_121 | 8_934_770_848  | $0.0118802968 | $11_880.29        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

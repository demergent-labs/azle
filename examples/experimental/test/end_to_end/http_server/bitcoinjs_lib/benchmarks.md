# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | init                | 49_715_875_585 | 39_486_940_234 | $0.0525045998 | $52_504.59        | <font color="red">+124_813_887</font>  |
| 1   | http_request_update | 55_346_072     | 22_728_428     | $0.0000302213 | $30.22            | <font color="red">+54_447</font>       |
| 2   | http_request_update | 933_156_543    | 373_852_617    | $0.0004971006 | $497.10           | <font color="green">-7_306_176</font>  |
| 3   | http_request_update | 6_796_300_268  | 5_119_110_107  | $0.0068067271 | $6_806.72         | <font color="green">-28_043_792</font> |
| 4   | http_request_update | 6_644_396_664  | 5_058_348_665  | $0.0067259345 | $6_725.93         | <font color="green">-27_238_004</font> |
| 5   | http_request_update | 12_390_666_740 | 9_756_856_696  | $0.0129733996 | $12_973.39        | <font color="green">-347_958</font>    |
| 6   | http_request_update | 933_183_251    | 373_863_300    | $0.0004971148 | $497.11           | <font color="green">-7_160_526</font>  |
| 7   | http_request_update | 3_342_070_644  | 2_537_418_257  | $0.0033739289 | $3_373.92         | <font color="green">-135_519</font>    |
| 8   | http_request_update | 11_328_901_568 | 8_932_150_627  | $0.0118768127 | $11_876.81        | <font color="red">+68_372</font>       |
| 9   | http_request_update | 11_335_727_710 | 8_934_881_084  | $0.0118804433 | $11_880.44        | <font color="red">+275_589</font>      |

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

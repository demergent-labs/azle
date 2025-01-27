# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | init                | 49_650_035_406 | 39_460_604_162 | $0.0524695815 | $52_469.58        | <font color="red">+58_973_708</font>   |
| 1   | http_request_update | 55_433_411     | 22_763_364     | $0.0000302678 | $30.26            | <font color="red">+141_786</font>      |
| 2   | http_request_update | 936_575_513    | 375_220_205    | $0.0004989190 | $498.91           | <font color="green">-3_887_206</font>  |
| 3   | http_request_update | 6_808_438_244  | 5_123_965_297  | $0.0068131829 | $6_813.18         | <font color="green">-15_905_816</font> |
| 4   | http_request_update | 6_655_453_240  | 5_062_771_296  | $0.0067318151 | $6_731.81         | <font color="green">-16_181_428</font> |
| 5   | http_request_update | 12_391_435_305 | 9_757_164_122  | $0.0129738084 | $12_973.80        | <font color="red">+420_607</font>      |
| 6   | http_request_update | 936_467_596    | 375_177_038    | $0.0004988617 | $498.86           | <font color="green">-3_876_181</font>  |
| 7   | http_request_update | 3_342_111_927  | 2_537_434_770  | $0.0033739509 | $3_373.95         | <font color="green">-94_236</font>     |
| 8   | http_request_update | 11_328_570_681 | 8_932_018_272  | $0.0118766367 | $11_876.63        | <font color="green">-262_515</font>    |
| 9   | http_request_update | 11_335_177_615 | 8_934_661_046  | $0.0118801508 | $11_880.15        | <font color="green">-274_506</font>    |

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

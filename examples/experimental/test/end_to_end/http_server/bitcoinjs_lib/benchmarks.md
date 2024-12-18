# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 49_591_061_698 | 39_437_014_679 | $0.0524382153 | $52_438.21        | <font color="red">+6_940_357</font>   |
| 1   | http_request_update | 55_291_625     | 22_706_650     | $0.0000301924 | $30.19            | <font color="red">+31_461</font>      |
| 2   | http_request_update | 940_462_719    | 376_775_087    | $0.0005009865 | $500.98           | <font color="green">-56_220</font>    |
| 3   | http_request_update | 6_824_344_060  | 5_130_327_624  | $0.0068216427 | $6_821.64         | <font color="green">-1_140_611</font> |
| 4   | http_request_update | 6_671_634_668  | 5_069_243_867  | $0.0067404215 | $6_740.42         | <font color="red">+722_507</font>     |
| 5   | http_request_update | 12_391_014_698 | 9_756_995_879  | $0.0129735847 | $12_973.58        | <font color="red">+626_128</font>     |
| 6   | http_request_update | 940_343_777    | 376_727_510    | $0.0005009233 | $500.92           | <font color="red">+16_191</font>      |
| 7   | http_request_update | 3_342_206_163  | 2_537_472_465  | $0.0033740010 | $3_374.00         | <font color="red">+760_573</font>     |
| 8   | http_request_update | 11_328_833_196 | 8_932_123_278  | $0.0118767764 | $11_876.77        | <font color="red">+334_606</font>     |
| 9   | http_request_update | 11_335_452_121 | 8_934_770_848  | $0.0118802968 | $11_880.29        | <font color="red">+1_069_043</font>   |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 49_584_121_341 | 39_434_238_536 | $0.0524345240 | $52_434.52        |
| 1   | http_request_update | 55_260_164     | 22_694_065     | $0.0000301756 | $30.17            |
| 2   | http_request_update | 940_518_939    | 376_797_575    | $0.0005010164 | $501.01           |
| 3   | http_request_update | 6_825_484_671  | 5_130_783_868  | $0.0068222494 | $6_822.24         |
| 4   | http_request_update | 6_670_912_161  | 5_068_954_864  | $0.0067400372 | $6_740.03         |
| 5   | http_request_update | 12_390_388_570 | 9_756_745_428  | $0.0129732517 | $12_973.25        |
| 6   | http_request_update | 940_327_586    | 376_721_034    | $0.0005009147 | $500.91           |
| 7   | http_request_update | 3_341_445_590  | 2_537_168_236  | $0.0033735965 | $3_373.59         |
| 8   | http_request_update | 11_328_498_590 | 8_931_989_436  | $0.0118765984 | $11_876.59        |
| 9   | http_request_update | 11_334_383_078 | 8_934_343_231  | $0.0118797282 | $11_879.72        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

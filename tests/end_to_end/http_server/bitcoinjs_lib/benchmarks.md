# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 49_591_969_882 | 39_437_377_952 | $0.0524386983 | $52_438.69        | <font color="red">+7_848_541</font>   |
| 1   | http_request_update | 55_291_625     | 22_706_650     | $0.0000301924 | $30.19            | <font color="red">+31_461</font>      |
| 2   | http_request_update | 940_462_737    | 376_775_094    | $0.0005009865 | $500.98           | <font color="green">-56_202</font>    |
| 3   | http_request_update | 6_824_353_621  | 5_130_331_448  | $0.0068216478 | $6_821.64         | <font color="green">-1_131_050</font> |
| 4   | http_request_update | 6_671_406_599  | 5_069_152_639  | $0.0067403002 | $6_740.30         | <font color="red">+494_438</font>     |
| 5   | http_request_update | 12_390_123_352 | 9_756_639_340  | $0.0129731106 | $12_973.11        | <font color="green">-265_218</font>   |
| 6   | http_request_update | 940_343_787    | 376_727_514    | $0.0005009233 | $500.92           | <font color="red">+16_201</font>      |
| 7   | http_request_update | 3_341_642_902  | 2_537_247_160  | $0.0033737014 | $3_373.70         | <font color="red">+197_312</font>     |
| 8   | http_request_update | 11_328_279_532 | 8_931_901_812  | $0.0118764819 | $11_876.48        | <font color="green">-219_058</font>   |
| 9   | http_request_update | 11_334_660_793 | 8_934_454_317  | $0.0118798759 | $11_879.87        | <font color="red">+277_715</font>     |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

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

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

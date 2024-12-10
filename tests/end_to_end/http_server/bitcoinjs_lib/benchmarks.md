# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 49_603_537_876 | 39_442_005_150 | $0.0524448510 | $52_444.85        | <font color="red">+19_416_535</font> |
| 1   | http_request_update | 55_306_740     | 22_712_696     | $0.0000302004 | $30.20            | <font color="red">+46_576</font>     |
| 2   | http_request_update | 940_418_555    | 376_757_422    | $0.0005009630 | $500.96           | <font color="green">-100_384</font>  |
| 3   | http_request_update | 6_825_008_889  | 5_130_593_555  | $0.0068219963 | $6_821.99         | <font color="green">-475_782</font>  |
| 4   | http_request_update | 6_671_380_460  | 5_069_142_184  | $0.0067402863 | $6_740.28         | <font color="red">+468_299</font>    |
| 5   | http_request_update | 12_390_327_230 | 9_756_720_892  | $0.0129732191 | $12_973.21        | <font color="green">-61_340</font>   |
| 6   | http_request_update | 940_291_477    | 376_706_590    | $0.0005008955 | $500.89           | <font color="green">-36_109</font>   |
| 7   | http_request_update | 3_341_966_181  | 2_537_376_472  | $0.0033738734 | $3_373.87         | <font color="red">+520_591</font>    |
| 8   | http_request_update | 11_328_469_083 | 8_931_977_633  | $0.0118765827 | $11_876.58        | <font color="green">-29_507</font>   |
| 9   | http_request_update | 11_335_317_376 | 8_934_716_950  | $0.0118802251 | $11_880.22        | <font color="red">+934_298</font>    |

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

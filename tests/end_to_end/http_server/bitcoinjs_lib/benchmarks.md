# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 49_601_951_225 | 39_441_370_490 | $0.0524440071 | $52_444.00        | <font color="red">+17_829_884</font> |
| 1   | http_request_update | 55_306_742     | 22_712_696     | $0.0000302004 | $30.20            | <font color="red">+46_578</font>     |
| 2   | http_request_update | 940_418_539    | 376_757_415    | $0.0005009630 | $500.96           | <font color="green">-100_400</font>  |
| 3   | http_request_update | 6_824_710_333  | 5_130_474_133  | $0.0068218375 | $6_821.83         | <font color="green">-774_338</font>  |
| 4   | http_request_update | 6_670_966_379  | 5_068_976_551  | $0.0067400661 | $6_740.06         | <font color="red">+54_218</font>     |
| 5   | http_request_update | 12_390_005_140 | 9_756_592_056  | $0.0129730478 | $12_973.04        | <font color="green">-383_430</font>  |
| 6   | http_request_update | 940_291_510    | 376_706_604    | $0.0005008955 | $500.89           | <font color="green">-36_076</font>   |
| 7   | http_request_update | 3_342_082_077  | 2_537_422_830  | $0.0033739350 | $3_373.93         | <font color="red">+636_487</font>    |
| 8   | http_request_update | 11_328_286_323 | 8_931_904_529  | $0.0118764855 | $11_876.48        | <font color="green">-212_267</font>  |
| 9   | http_request_update | 11_335_019_174 | 8_934_597_669  | $0.0118800665 | $11_880.06        | <font color="red">+636_096</font>    |

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

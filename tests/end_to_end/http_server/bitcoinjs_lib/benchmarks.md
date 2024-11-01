# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 49_591_865_875 | 39_437_336_350 | $0.0524386430 | $52_438.64        | <font color="red">+7_744_534</font>   |
| 1   | http_request_update | 55_291_627     | 22_706_650     | $0.0000301924 | $30.19            | <font color="red">+31_463</font>      |
| 2   | http_request_update | 940_462_727    | 376_775_090    | $0.0005009865 | $500.98           | <font color="green">-56_212</font>    |
| 3   | http_request_update | 6_823_963_463  | 5_130_175_385  | $0.0068214403 | $6_821.44         | <font color="green">-1_521_208</font> |
| 4   | http_request_update | 6_671_630_201  | 5_069_242_080  | $0.0067404191 | $6_740.41         | <font color="red">+718_040</font>     |
| 5   | http_request_update | 12_390_654_423 | 9_756_851_769  | $0.0129733931 | $12_973.39        | <font color="red">+265_853</font>     |
| 6   | http_request_update | 940_343_798    | 376_727_519    | $0.0005009233 | $500.92           | <font color="red">+16_212</font>      |
| 7   | http_request_update | 3_341_886_984  | 2_537_344_793  | $0.0033738313 | $3_373.83         | <font color="red">+441_394</font>     |
| 8   | http_request_update | 11_328_133_427 | 8_931_843_370  | $0.0118764042 | $11_876.40        | <font color="green">-365_163</font>   |
| 9   | http_request_update | 11_335_128_474 | 8_934_641_389  | $0.0118801246 | $11_880.12        | <font color="red">+745_396</font>     |

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

# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 49_591_554_085 | 39_437_211_634 | $0.0524384772 | $52_438.47        | <font color="red">+7_432_744</font> |
| 1   | http_request_update | 55_277_558     | 22_701_023     | $0.0000301849 | $30.18            | <font color="red">+17_394</font>    |
| 2   | http_request_update | 940_408_272    | 376_753_308    | $0.0005009576 | $500.95           | <font color="green">-110_667</font> |
| 3   | http_request_update | 6_824_887_064  | 5_130_544_825  | $0.0068219315 | $6_821.93         | <font color="green">-597_607</font> |
| 4   | http_request_update | 6_671_034_336  | 5_069_003_734  | $0.0067401022 | $6_740.10         | <font color="red">+122_175</font>   |
| 5   | http_request_update | 12_390_653_419 | 9_756_851_367  | $0.0129733926 | $12_973.39        | <font color="red">+264_849</font>   |
| 6   | http_request_update | 940_246_490    | 376_688_596    | $0.0005008715 | $500.87           | <font color="green">-81_096</font>  |
| 7   | http_request_update | 3_342_130_335  | 2_537_442_134  | $0.0033739607 | $3_373.96         | <font color="red">+684_745</font>   |
| 8   | http_request_update | 11_329_009_410 | 8_932_193_764  | $0.0118768701 | $11_876.87        | <font color="red">+510_820</font>   |
| 9   | http_request_update | 11_335_106_217 | 8_934_632_486  | $0.0118801128 | $11_880.11        | <font color="red">+723_139</font>   |

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

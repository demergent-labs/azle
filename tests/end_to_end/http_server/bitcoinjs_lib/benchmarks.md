# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 49_591_603_504 | 39_437_231_401 | $0.0524385035 | $52_438.50        | <font color="red">+7_482_163</font>   |
| 1   | http_request_update | 55_277_557     | 22_701_022     | $0.0000301849 | $30.18            | <font color="red">+17_393</font>      |
| 2   | http_request_update | 940_408_282    | 376_753_312    | $0.0005009576 | $500.95           | <font color="green">-110_657</font>   |
| 3   | http_request_update | 6_824_390_401  | 5_130_346_160  | $0.0068216674 | $6_821.66         | <font color="green">-1_094_270</font> |
| 4   | http_request_update | 6_670_904_880  | 5_068_951_952  | $0.0067400333 | $6_740.03         | <font color="green">-7_281</font>     |
| 5   | http_request_update | 12_389_970_229 | 9_756_578_091  | $0.0129730292 | $12_973.02        | <font color="green">-418_341</font>   |
| 6   | http_request_update | 940_246_487    | 376_688_594    | $0.0005008715 | $500.87           | <font color="green">-81_099</font>    |
| 7   | http_request_update | 3_342_548_392  | 2_537_609_356  | $0.0033741830 | $3_374.18         | <font color="red">+1_102_802</font>   |
| 8   | http_request_update | 11_328_930_816 | 8_932_162_326  | $0.0118768283 | $11_876.82        | <font color="red">+432_226</font>     |
| 9   | http_request_update | 11_335_394_821 | 8_934_747_928  | $0.0118802663 | $11_880.26        | <font color="red">+1_011_743</font>   |

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

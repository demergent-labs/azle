# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | balance          | 2_283_186    | 1_503_274 | $0.0000019989 | $1.99             | <font color="green">-13_612</font> |
| 1   | account          | 3_629_122    | 2_041_648 | $0.0000027147 | $2.71             | <font color="green">-16_695</font> |
| 2   | balance          | 2_231_249    | 1_482_499 | $0.0000019712 | $1.97             | <font color="red">+9_700</font>    |
| 3   | account          | 3_621_943    | 2_038_777 | $0.0000027109 | $2.71             | <font color="green">-1_091</font>  |
| 4   | accounts         | 1_664_665    | 1_255_866 | $0.0000016699 | $1.66             | <font color="red">+4_220</font>    |
| 5   | transfer         | 3_601_050    | 2_030_420 | $0.0000026998 | $2.69             | <font color="red">+31_740</font>   |
| 6   | balance          | 2_233_129    | 1_483_251 | $0.0000019722 | $1.97             | <font color="red">+13_511</font>   |
| 7   | account          | 3_620_029    | 2_038_011 | $0.0000027099 | $2.70             | <font color="red">+3_259</font>    |
| 8   | balance          | 2_229_030    | 1_481_612 | $0.0000019701 | $1.97             | <font color="red">+17_518</font>   |
| 9   | account          | 3_619_821    | 2_037_928 | $0.0000027098 | $2.70             | <font color="red">+3_233</font>    |
| 10  | accounts         | 1_663_781    | 1_255_512 | $0.0000016694 | $1.66             | <font color="red">+11_886</font>   |
| 11  | trap             | 1_616_594    | 1_236_637 | $0.0000016443 | $1.64             | <font color="green">-8_809</font>  |
| 12  | sendNotification | 2_653_658    | 1_651_463 | $0.0000021959 | $2.19             | <font color="red">+5_607</font>    |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_296_798    | 1_508_719 | $0.0000020061 | $2.00             |
| 1   | account          | 3_645_817    | 2_048_326 | $0.0000027236 | $2.72             |
| 2   | balance          | 2_221_549    | 1_478_619 | $0.0000019661 | $1.96             |
| 3   | account          | 3_623_034    | 2_039_213 | $0.0000027115 | $2.71             |
| 4   | accounts         | 1_660_445    | 1_254_178 | $0.0000016676 | $1.66             |
| 5   | transfer         | 3_569_310    | 2_017_724 | $0.0000026829 | $2.68             |
| 6   | balance          | 2_219_618    | 1_477_847 | $0.0000019650 | $1.96             |
| 7   | account          | 3_616_770    | 2_036_708 | $0.0000027081 | $2.70             |
| 8   | balance          | 2_211_512    | 1_474_604 | $0.0000019607 | $1.96             |
| 9   | account          | 3_616_588    | 2_036_635 | $0.0000027081 | $2.70             |
| 10  | accounts         | 1_651_895    | 1_250_758 | $0.0000016631 | $1.66             |
| 11  | trap             | 1_625_403    | 1_240_161 | $0.0000016490 | $1.64             |
| 12  | sendNotification | 2_648_051    | 1_649_220 | $0.0000021929 | $2.19             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | transfer            | 2_189_412    | 1_465_764 | $0.0000019490 | $1.94             | <font color="red">+24_380</font> |
| 1   | receiveNotification | 1_447_501    | 1_169_000 | $0.0000015544 | $1.55             | <font color="red">+60_070</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_165_032    | 1_456_012 | $0.0000019360 | $1.93             |
| 1   | receiveNotification | 1_387_431    | 1_144_972 | $0.0000015224 | $1.52             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

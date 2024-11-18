# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | balance          | 2_286_062    | 1_504_424 | $0.0000020004 | $2.00             | <font color="green">-10_736</font> |
| 1   | account          | 3_632_848    | 2_043_139 | $0.0000027167 | $2.71             | <font color="green">-12_969</font> |
| 2   | balance          | 2_234_447    | 1_483_778 | $0.0000019729 | $1.97             | <font color="red">+12_898</font>   |
| 3   | account          | 3_625_656    | 2_040_262 | $0.0000027129 | $2.71             | <font color="red">+2_622</font>    |
| 4   | accounts         | 1_667_118    | 1_256_847 | $0.0000016712 | $1.67             | <font color="red">+6_673</font>    |
| 5   | transfer         | 3_602_980    | 2_031_192 | $0.0000027008 | $2.70             | <font color="red">+33_670</font>   |
| 6   | balance          | 2_235_196    | 1_484_078 | $0.0000019733 | $1.97             | <font color="red">+15_578</font>   |
| 7   | account          | 3_622_914    | 2_039_165 | $0.0000027114 | $2.71             | <font color="red">+6_144</font>    |
| 8   | balance          | 2_231_598    | 1_482_639 | $0.0000019714 | $1.97             | <font color="red">+20_086</font>   |
| 9   | account          | 3_623_022    | 2_039_208 | $0.0000027115 | $2.71             | <font color="red">+6_434</font>    |
| 10  | accounts         | 1_665_826    | 1_256_330 | $0.0000016705 | $1.67             | <font color="red">+13_931</font>   |
| 11  | trap             | 1_618_070    | 1_237_228 | $0.0000016451 | $1.64             | <font color="green">-7_333</font>  |
| 12  | sendNotification | 2_638_419    | 1_645_367 | $0.0000021878 | $2.18             | <font color="green">-9_632</font>  |

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
| 0   | transfer            | 2_228_104    | 1_481_241 | $0.0000019696 | $1.96             | <font color="red">+63_072</font> |
| 1   | receiveNotification | 1_470_322    | 1_178_128 | $0.0000015665 | $1.56             | <font color="red">+82_891</font> |

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

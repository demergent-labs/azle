# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | balance          | 2_269_534    | 1_497_813 | $0.0000019916 | $1.99             | <font color="green">-27_264</font> |
| 1   | account          | 3_611_985    | 2_034_794 | $0.0000027056 | $2.70             | <font color="green">-33_832</font> |
| 2   | balance          | 2_219_636    | 1_477_854 | $0.0000019651 | $1.96             | <font color="green">-1_913</font>  |
| 3   | account          | 3_605_706    | 2_032_282 | $0.0000027023 | $2.70             | <font color="green">-17_328</font> |
| 4   | accounts         | 1_656_637    | 1_252_654 | $0.0000016656 | $1.66             | <font color="green">-3_808</font>  |
| 5   | transfer         | 3_573_978    | 2_019_591 | $0.0000026854 | $2.68             | <font color="red">+4_668</font>    |
| 6   | balance          | 2_221_674    | 1_478_669 | $0.0000019661 | $1.96             | <font color="red">+2_056</font>    |
| 7   | account          | 3_603_328    | 2_031_331 | $0.0000027010 | $2.70             | <font color="green">-13_442</font> |
| 8   | balance          | 2_217_511    | 1_477_004 | $0.0000019639 | $1.96             | <font color="red">+5_999</font>    |
| 9   | account          | 3_603_318    | 2_031_327 | $0.0000027010 | $2.70             | <font color="green">-13_270</font> |
| 10  | accounts         | 1_655_411    | 1_252_164 | $0.0000016650 | $1.66             | <font color="red">+3_516</font>    |
| 11  | trap             | 1_632_275    | 1_242_910 | $0.0000016527 | $1.65             | <font color="red">+6_872</font>    |
| 12  | sendNotification | 2_665_532    | 1_656_212 | $0.0000022022 | $2.20             | <font color="red">+17_481</font>   |

## Baseline benchmarks Azle version: 0.25.0-alpha

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
| 0   | transfer            | 2_189_409    | 1_465_763 | $0.0000019490 | $1.94             | <font color="red">+24_377</font> |
| 1   | receiveNotification | 1_414_885    | 1_155_954 | $0.0000015370 | $1.53             | <font color="red">+27_454</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_165_032    | 1_456_012 | $0.0000019360 | $1.93             |
| 1   | receiveNotification | 1_387_431    | 1_144_972 | $0.0000015224 | $1.52             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

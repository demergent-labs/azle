# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | balance          | 2_496_352    | 1_588_540 | $0.0000021122 | $2.11             | <font color="red">+213_143</font> |
| 1   | account          | 3_910_011    | 2_154_004 | $0.0000028641 | $2.86             | <font color="red">+280_859</font> |
| 2   | balance          | 2_423_230    | 1_559_292 | $0.0000020733 | $2.07             | <font color="red">+191_958</font> |
| 3   | account          | 3_899_044    | 2_149_617 | $0.0000028583 | $2.85             | <font color="red">+277_193</font> |
| 4   | accounts         | 1_829_517    | 1_321_806 | $0.0000017576 | $1.75             | <font color="red">+164_898</font> |
| 5   | transfer         | 3_837_168    | 2_124_867 | $0.0000028254 | $2.82             | <font color="red">+236_187</font> |
| 6   | balance          | 2_424_768    | 1_559_907 | $0.0000020742 | $2.07             | <font color="red">+191_669</font> |
| 7   | account          | 3_896_908    | 2_148_763 | $0.0000028571 | $2.85             | <font color="red">+276_886</font> |
| 8   | balance          | 2_425_169    | 1_560_067 | $0.0000020744 | $2.07             | <font color="red">+196_109</font> |
| 9   | account          | 3_898_996    | 2_149_598 | $0.0000028583 | $2.85             | <font color="red">+279_122</font> |
| 10  | accounts         | 1_824_196    | 1_319_678 | $0.0000017547 | $1.75             | <font color="red">+160_316</font> |
| 11  | trap             | 1_804_700    | 1_311_880 | $0.0000017444 | $1.74             | <font color="red">+188_106</font> |
| 12  | sendNotification | 2_897_709    | 1_749_083 | $0.0000023257 | $2.32             | <font color="red">+244_051</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_283_209    | 1_503_283 | $0.0000019989 | $1.99             |
| 1   | account          | 3_629_152    | 2_041_660 | $0.0000027147 | $2.71             |
| 2   | balance          | 2_231_272    | 1_482_508 | $0.0000019712 | $1.97             |
| 3   | account          | 3_621_851    | 2_038_740 | $0.0000027109 | $2.71             |
| 4   | accounts         | 1_664_619    | 1_255_847 | $0.0000016699 | $1.66             |
| 5   | transfer         | 3_600_981    | 2_030_392 | $0.0000026998 | $2.69             |
| 6   | balance          | 2_233_099    | 1_483_239 | $0.0000019722 | $1.97             |
| 7   | account          | 3_620_022    | 2_038_008 | $0.0000027099 | $2.70             |
| 8   | balance          | 2_229_060    | 1_481_624 | $0.0000019701 | $1.97             |
| 9   | account          | 3_619_874    | 2_037_949 | $0.0000027098 | $2.70             |
| 10  | accounts         | 1_663_880    | 1_255_552 | $0.0000016695 | $1.66             |
| 11  | trap             | 1_616_594    | 1_236_637 | $0.0000016443 | $1.64             |
| 12  | sendNotification | 2_653_658    | 1_651_463 | $0.0000021959 | $2.19             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | transfer            | 2_339_343    | 1_525_737 | $0.0000020287 | $2.02             | <font color="red">+149_931</font> |
| 1   | receiveNotification | 1_526_019    | 1_200_407 | $0.0000015961 | $1.59             | <font color="red">+78_518</font>  |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_189_412    | 1_465_764 | $0.0000019490 | $1.94             |
| 1   | receiveNotification | 1_447_501    | 1_169_000 | $0.0000015544 | $1.55             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | balance          | 2_269_564    | 1_497_825 | $0.0000019916 | $1.99             | <font color="green">-13_645</font> |
| 1   | account          | 3_612_008    | 2_034_803 | $0.0000027056 | $2.70             | <font color="green">-17_144</font> |
| 2   | balance          | 2_219_765    | 1_477_906 | $0.0000019651 | $1.96             | <font color="green">-11_507</font> |
| 3   | account          | 3_605_803    | 2_032_321 | $0.0000027023 | $2.70             | <font color="green">-16_048</font> |
| 4   | accounts         | 1_656_713    | 1_252_685 | $0.0000016657 | $1.66             | <font color="green">-7_906</font>  |
| 5   | transfer         | 3_574_001    | 2_019_600 | $0.0000026854 | $2.68             | <font color="green">-26_980</font> |
| 6   | balance          | 2_221_552    | 1_478_620 | $0.0000019661 | $1.96             | <font color="green">-11_547</font> |
| 7   | account          | 3_603_305    | 2_031_322 | $0.0000027010 | $2.70             | <font color="green">-16_717</font> |
| 8   | balance          | 2_217_580    | 1_477_032 | $0.0000019640 | $1.96             | <font color="green">-11_480</font> |
| 9   | account          | 3_603_341    | 2_031_336 | $0.0000027010 | $2.70             | <font color="green">-16_533</font> |
| 10  | accounts         | 1_655_388    | 1_252_155 | $0.0000016650 | $1.66             | <font color="green">-8_492</font>  |
| 11  | trap             | 1_632_344    | 1_242_937 | $0.0000016527 | $1.65             | <font color="red">+15_750</font>   |
| 12  | sendNotification | 2_665_532    | 1_656_212 | $0.0000022022 | $2.20             | <font color="red">+11_874</font>   |

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

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | transfer            | 2_189_409    | 1_465_763 | $0.0000019490 | $1.94             | <font color="green">-3</font>      |
| 1   | receiveNotification | 1_414_885    | 1_155_954 | $0.0000015370 | $1.53             | <font color="green">-32_616</font> |

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

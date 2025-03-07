# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | insertSmallRecord  | 20_305_711_930 | 16_122_874_772 | $0.0214381029 | $21_438.10        | <font color="green">-6_803_528</font> |
| 1   | insertMediumRecord | 18_371_055_983 | 14_549_012_393 | $0.0193453853 | $19_345.38        | <font color="red">+3_129_496</font>   |
| 2   | insertLargeRecord  | 21_003_576_762 | 16_802_020_704 | $0.0223411429 | $22_341.14        | <font color="red">+1_969_366</font>   |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 20_312_515_458 | 16_125_596_183 | $0.0214417215 | $21_441.72        |
| 1   | insertMediumRecord | 18_367_926_487 | 14_547_760_594 | $0.0193437208 | $19_343.72        |
| 2   | insertLargeRecord  | 21_001_607_396 | 16_801_232_958 | $0.0223400954 | $22_340.09        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

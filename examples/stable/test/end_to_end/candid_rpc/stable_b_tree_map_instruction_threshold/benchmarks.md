# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | insertSmallRecord  | 19_579_747_074 | 15_432_488_829 | $0.0205201174 | $20_520.11        | <font color="green">-725_964_856</font> |
| 1   | insertMediumRecord | 18_006_680_010 | 14_403_262_004 | $0.0191515854 | $19_151.58        | <font color="green">-364_375_973</font> |
| 2   | insertLargeRecord  | 20_814_331_827 | 16_326_322_730 | $0.0217086215 | $21_708.62        | <font color="green">-189_244_935</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 20_305_711_930 | 16_122_874_772 | $0.0214381029 | $21_438.10        |
| 1   | insertMediumRecord | 18_371_055_983 | 14_549_012_393 | $0.0193453853 | $19_345.38        |
| 2   | insertLargeRecord  | 21_003_576_762 | 16_802_020_704 | $0.0223411429 | $22_341.14        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

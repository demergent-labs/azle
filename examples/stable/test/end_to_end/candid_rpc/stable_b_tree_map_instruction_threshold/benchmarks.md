# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | insertSmallRecord  | 19_770_852_027 | 15_508_930_810 | $0.0206217600 | $20_621.76        | <font color="green">-170_105_500</font> |
| 1   | insertMediumRecord | 18_115_453_532 | 14_446_771_412 | $0.0192094385 | $19_209.43        | <font color="green">-144_864_091</font> |
| 2   | insertLargeRecord  | 20_896_276_762 | 16_359_100_704 | $0.0217522054 | $21_752.20        | <font color="green">-200_819_773</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 19_940_957_527 | 15_576_973_010 | $0.0207122337 | $20_712.23        |
| 1   | insertMediumRecord | 18_260_317_623 | 14_504_717_049 | $0.0192864871 | $19_286.48        |
| 2   | insertLargeRecord  | 21_097_096_535 | 16_839_428_614 | $0.0223908830 | $22_390.88        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

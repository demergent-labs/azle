# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | insertSmallRecord  | 17_816_550_930 | 13_927_210_372 | $0.0185185938 | $18_518.59        | <font color="green">-16_453_790</font> |
| 1   | insertMediumRecord | 16_029_632_084 | 12_812_442_833 | $0.0170363209 | $17_036.32        | <font color="green">-10_138_845</font> |
| 2   | insertLargeRecord  | 18_464_957_634 | 14_586_573_053 | $0.0193953286 | $19_395.32        | <font color="green">-2_354_951</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 17_833_004_720 | 13_933_791_888 | $0.0185273451 | $18_527.34        |
| 1   | insertMediumRecord | 16_039_770_929 | 12_816_498_371 | $0.0170417134 | $17_041.71        |
| 2   | insertLargeRecord  | 18_467_312_585 | 14_587_515_034 | $0.0193965811 | $19_396.58        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

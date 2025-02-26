# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | insertSmallRecord  | 17_833_004_720 | 13_933_791_888 | $0.0185273451 | $18_527.34        | <font color="green">-219_994_226</font> |
| 1   | insertMediumRecord | 16_039_770_929 | 12_816_498_371 | $0.0170417134 | $17_041.71        | <font color="green">-134_550_231</font> |
| 2   | insertLargeRecord  | 18_467_312_585 | 14_587_515_034 | $0.0193965811 | $19_396.58        | <font color="green">-92_390_122</font>  |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 18_052_998_946 | 14_421_789_578 | $0.0191762209 | $19_176.22        |
| 1   | insertMediumRecord | 16_174_321_160 | 12_870_318_464 | $0.0171132764 | $17_113.27        |
| 2   | insertLargeRecord  | 18_559_702_707 | 14_624_471_082 | $0.0194457205 | $19_445.72        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

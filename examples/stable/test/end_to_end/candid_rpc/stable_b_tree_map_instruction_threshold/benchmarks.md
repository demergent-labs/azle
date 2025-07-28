⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | insertSmallRecord  | 19_172_288_381 | 15_269_505_352 | $0.0203034032 | $20_303.40        | <font color="green">-401_534_221</font> |
| 1   | insertMediumRecord | 17_897_930_796 | 13_959_762_318 | $0.0185618772 | $18_561.87        | <font color="green">-69_685_275</font>  |
| 2   | insertLargeRecord  | 20_620_408_060 | 16_248_753_224 | $0.0216054797 | $21_605.47        | <font color="green">-244_642_267</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 19_573_822_602 | 15_430_119_040 | $0.0205169664 | $20_516.96        |
| 1   | insertMediumRecord | 17_967_616_071 | 13_987_636_428 | $0.0185989405 | $18_598.94        |
| 2   | insertLargeRecord  | 20_865_050_327 | 16_346_610_130 | $0.0217355971 | $21_735.59        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

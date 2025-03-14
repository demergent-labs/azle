⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | insertSmallRecord  | 17_371_073_974 | 13_749_019_589 | $0.0182816589 | $18_281.65        | <font color="green">-441_860_103</font> |
| 1   | insertMediumRecord | 15_761_043_697 | 12_305_007_478 | $0.0163615993 | $16_361.59        | <font color="green">-270_569_124</font> |
| 2   | insertLargeRecord  | 18_333_390_745 | 14_533_946_298 | $0.0193253524 | $19_325.35        | <font color="green">-127_001_044</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 17_812_934_077 | 13_925_763_630 | $0.0185166701 | $18_516.67        |
| 1   | insertMediumRecord | 16_031_612_821 | 12_813_235_128 | $0.0170373744 | $17_037.37        |
| 2   | insertLargeRecord  | 18_460_391_789 | 14_584_746_715 | $0.0193929002 | $19_392.90        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

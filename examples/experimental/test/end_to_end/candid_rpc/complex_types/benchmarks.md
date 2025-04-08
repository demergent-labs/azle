# Benchmarks for complex_types

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | createUser     | 80_430_864   | 32_762_345 | $0.0000435631 | $43.56            | <font color="red">+55_438</font> |
| 1   | createThread   | 163_795_418  | 66_108_167 | $0.0000879020 | $87.90            | <font color="red">+11_500</font> |
| 2   | createPost     | 86_470_012   | 35_178_004 | $0.0000467751 | $46.77            | <font color="red">+83_516</font> |
| 3   | createReaction | 172_510_498  | 69_594_199 | $0.0000925373 | $92.53            | <font color="red">+67_096</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 80_375_426   | 32_740_170 | $0.0000435336 | $43.53            |
| 1   | createThread   | 163_783_918  | 66_103_567 | $0.0000878959 | $87.89            |
| 2   | createPost     | 86_386_496   | 35_144_598 | $0.0000467307 | $46.73            |
| 3   | createReaction | 172_443_402  | 69_567_360 | $0.0000925016 | $92.50            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

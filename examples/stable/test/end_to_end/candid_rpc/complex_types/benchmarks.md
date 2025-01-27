# Benchmarks for complex_types

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | createUser     | 19_871_291   | 8_538_516  | $0.0000113534 | $11.35            | <font color="red">+1_348_222</font> |
| 1   | createThread   | 21_119_995   | 9_037_998  | $0.0000120176 | $12.01            | <font color="red">+1_657_933</font> |
| 2   | createPost     | 23_683_910   | 10_063_564 | $0.0000133812 | $13.38            | <font color="red">+1_867_766</font> |
| 3   | createReaction | 26_805_895   | 11_312_358 | $0.0000150417 | $15.04            | <font color="red">+2_044_274</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 18_523_069   | 7_999_227  | $0.0000106363 | $10.63            |
| 1   | createThread   | 19_462_062   | 8_374_824  | $0.0000111358 | $11.13            |
| 2   | createPost     | 21_816_144   | 9_316_457  | $0.0000123878 | $12.38            |
| 3   | createReaction | 24_761_621   | 10_494_648 | $0.0000139544 | $13.95            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

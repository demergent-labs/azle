# Benchmarks for complex_types

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | createUser     | 19_868_792   | 8_537_516  | $0.0000113521 | $11.35            | <font color="red">+1_345_723</font> |
| 1   | createThread   | 21_108_819   | 9_033_527  | $0.0000120116 | $12.01            | <font color="red">+1_646_757</font> |
| 2   | createPost     | 23_645_184   | 10_048_073 | $0.0000133606 | $13.36            | <font color="red">+1_829_040</font> |
| 3   | createReaction | 26_791_776   | 11_306_710 | $0.0000150342 | $15.03            | <font color="red">+2_030_155</font> |

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

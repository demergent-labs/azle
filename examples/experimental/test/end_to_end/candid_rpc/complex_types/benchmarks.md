# Benchmarks for complex_types

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser     | 80_417_364   | 32_756_945 | $0.0000435559 | $43.55            | <font color="green">-40_627</font> |
| 1   | createThread   | 163_730_797  | 66_082_318 | $0.0000878677 | $87.86            | <font color="green">-74_851</font> |
| 2   | createPost     | 86_455_550   | 35_172_220 | $0.0000467674 | $46.76            | <font color="green">-48_282</font> |
| 3   | createReaction | 172_495_578  | 69_588_231 | $0.0000925294 | $92.52            | <font color="red">+10_993</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 80_457_991   | 32_773_196 | $0.0000435775 | $43.57            |
| 1   | createThread   | 163_805_648  | 66_112_259 | $0.0000879075 | $87.90            |
| 2   | createPost     | 86_503_832   | 35_191_532 | $0.0000467931 | $46.79            |
| 3   | createReaction | 172_484_585  | 69_583_834 | $0.0000925235 | $92.52            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

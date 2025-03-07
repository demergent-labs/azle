# Benchmarks for randomness

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade  | 4_819_185_369 | 3_528_264_147 | $0.0046914270 | $4_691.42         | <font color="green">-574_918</font> |
| 1   | randomNumber | 1_042_907     | 1_007_162     | $0.0000013392 | $1.33             | <font color="red">+2_510</font>     |
| 2   | randomNumber | 1_029_605     | 1_001_842     | $0.0000013321 | $1.33             | <font color="red">+2_672</font>     |
| 3   | randomNumber | 1_029_605     | 1_001_842     | $0.0000013321 | $1.33             | <font color="red">+3_650</font>     |
| 4   | randomNumber | 1_029_605     | 1_001_842     | $0.0000013321 | $1.33             | <font color="red">+2_672</font>     |
| 5   | randomNumber | 1_029_605     | 1_001_842     | $0.0000013321 | $1.33             | <font color="red">+3_690</font>     |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade  | 4_819_760_287 | 3_528_494_114 | $0.0046917328 | $4_691.73         |
| 1   | randomNumber | 1_040_397     | 1_006_158     | $0.0000013379 | $1.33             |
| 2   | randomNumber | 1_026_933     | 1_000_773     | $0.0000013307 | $1.33             |
| 3   | randomNumber | 1_025_955     | 1_000_382     | $0.0000013302 | $1.33             |
| 4   | randomNumber | 1_026_933     | 1_000_773     | $0.0000013307 | $1.33             |
| 5   | randomNumber | 1_025_915     | 1_000_366     | $0.0000013302 | $1.33             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

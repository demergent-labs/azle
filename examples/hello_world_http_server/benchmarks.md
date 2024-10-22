# Benchmarks for backend

## Current benchmarks Azle version: 0.25.0

| Execution | Method Name | Instructions  | Cycles        | USD           | USD/Thousand Calls | Change                     |
| --------- | ----------- | ------------- | ------------- | ------------- | ------------------ | -------------------------- |
| 0         | 2           | 8,134,412,120 | 3,254,354,848 | $0.0043498032 | $4.3498            | <font color="red">0</font> |
| 1         | 1           | 53,820,571    | 22,118,228    | $0.0000295634 | $0.0296            | <font color="red">0</font> |

## Baseline benchmarks Azle version: 0.25.0

| Execution | Method Name | Instructions  | Cycles        | USD           | USD/Thousand Calls |
| --------- | ----------- | ------------- | ------------- | ------------- | ------------------ |
| 0         | 2           | 8,134,412,120 | 3,254,354,848 | $0.0043498032 | $4.3498            |
| 1         | 1           | 53,820,571    | 22,118,228    | $0.0000295634 | $0.0296            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

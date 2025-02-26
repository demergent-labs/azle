# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | addTodo        | 2_082_599    | 1_423_039 | $0.0000018922 | $1.89             | <font color="green">-10_839</font> |
| 1   | addTodo        | 1_787_426    | 1_304_970 | $0.0000017352 | $1.73             | <font color="green">-3_711</font>  |
| 2   | completeTodo   | 1_055_357    | 1_012_142 | $0.0000013458 | $1.34             | <font color="green">-8_644</font>  |
| 3   | clearCompleted | 985_252      | 984_100   | $0.0000013085 | $1.30             | <font color="green">-9_547</font>  |
| 4   | completeTodo   | 1_050_439    | 1_010_175 | $0.0000013432 | $1.34             | <font color="green">-6_064</font>  |
| 5   | clearCompleted | 969_826      | 977_930   | $0.0000013003 | $1.30             | <font color="green">-5_602</font>  |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 2_093_438    | 1_427_375 | $0.0000018979 | $1.89             |
| 1   | addTodo        | 1_791_137    | 1_306_454 | $0.0000017372 | $1.73             |
| 2   | completeTodo   | 1_064_001    | 1_015_600 | $0.0000013504 | $1.35             |
| 3   | clearCompleted | 994_799      | 987_919   | $0.0000013136 | $1.31             |
| 4   | completeTodo   | 1_056_503    | 1_012_601 | $0.0000013464 | $1.34             |
| 5   | clearCompleted | 975_428      | 980_171   | $0.0000013033 | $1.30             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

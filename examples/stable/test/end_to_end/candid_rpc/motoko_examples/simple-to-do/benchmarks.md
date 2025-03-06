# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | addTodo        | 2_082_472    | 1_422_988 | $0.0000018921 | $1.89             | <font color="green">-127</font>   |
| 1   | addTodo        | 1_784_447    | 1_303_778 | $0.0000017336 | $1.73             | <font color="green">-2_979</font> |
| 2   | completeTodo   | 1_055_651    | 1_012_260 | $0.0000013460 | $1.34             | <font color="red">+294</font>     |
| 3   | clearCompleted | 985_876      | 984_350   | $0.0000013089 | $1.30             | <font color="red">+624</font>     |
| 4   | completeTodo   | 1_047_920    | 1_009_168 | $0.0000013419 | $1.34             | <font color="green">-2_519</font> |
| 5   | clearCompleted | 970_308      | 978_123   | $0.0000013006 | $1.30             | <font color="red">+482</font>     |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 2_082_599    | 1_423_039 | $0.0000018922 | $1.89             |
| 1   | addTodo        | 1_787_426    | 1_304_970 | $0.0000017352 | $1.73             |
| 2   | completeTodo   | 1_055_357    | 1_012_142 | $0.0000013458 | $1.34             |
| 3   | clearCompleted | 985_252      | 984_100   | $0.0000013085 | $1.30             |
| 4   | completeTodo   | 1_050_439    | 1_010_175 | $0.0000013432 | $1.34             |
| 5   | clearCompleted | 969_826      | 977_930   | $0.0000013003 | $1.30             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

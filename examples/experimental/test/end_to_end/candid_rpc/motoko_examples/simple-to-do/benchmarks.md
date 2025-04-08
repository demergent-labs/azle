# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | addTodo        | 1_928_124    | 1_361_249 | $0.0000018100 | $1.81             | <font color="red">+678</font>     |
| 1   | addTodo        | 1_680_359    | 1_262_143 | $0.0000016782 | $1.67             | <font color="red">+324</font>     |
| 2   | completeTodo   | 993_405      | 987_362   | $0.0000013129 | $1.31             | <font color="red">+981</font>     |
| 3   | clearCompleted | 902_450      | 950_980   | $0.0000012645 | $1.26             | <font color="green">-967</font>   |
| 4   | completeTodo   | 986_719      | 984_687   | $0.0000013093 | $1.30             | <font color="green">-3_985</font> |
| 5   | clearCompleted | 884_749      | 943_899   | $0.0000012551 | $1.25             | <font color="green">-3_385</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 1_927_446    | 1_360_978 | $0.0000018097 | $1.80             |
| 1   | addTodo        | 1_680_035    | 1_262_014 | $0.0000016781 | $1.67             |
| 2   | completeTodo   | 992_424      | 986_969   | $0.0000013123 | $1.31             |
| 3   | clearCompleted | 903_417      | 951_366   | $0.0000012650 | $1.26             |
| 4   | completeTodo   | 990_704      | 986_281   | $0.0000013114 | $1.31             |
| 5   | clearCompleted | 888_134      | 945_253   | $0.0000012569 | $1.25             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | addTodo        | 1_923_771    | 1_359_508 | $0.0000018077 | $1.80             | <font color="green">-3_675</font> |
| 1   | addTodo        | 1_676_025    | 1_260_410 | $0.0000016759 | $1.67             | <font color="green">-4_010</font> |
| 2   | completeTodo   | 990_525      | 986_210   | $0.0000013113 | $1.31             | <font color="green">-1_899</font> |
| 3   | clearCompleted | 899_238      | 949_695   | $0.0000012628 | $1.26             | <font color="green">-4_179</font> |
| 4   | completeTodo   | 985_349      | 984_139   | $0.0000013086 | $1.30             | <font color="green">-5_355</font> |
| 5   | clearCompleted | 883_922      | 943_568   | $0.0000012546 | $1.25             | <font color="green">-4_212</font> |

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

# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | addTodo        | 1_930_657    | 1_362_262 | $0.0000018114 | $1.81             | <font color="red">+9_193</font> |
| 1   | addTodo        | 1_680_052    | 1_262_020 | $0.0000016781 | $1.67             | <font color="red">+3_050</font> |
| 2   | completeTodo   | 993_347      | 987_338   | $0.0000013128 | $1.31             | <font color="red">+5_371</font> |
| 3   | clearCompleted | 903_041      | 951_216   | $0.0000012648 | $1.26             | <font color="red">+4_471</font> |
| 4   | completeTodo   | 989_853      | 985_941   | $0.0000013110 | $1.31             | <font color="red">+3_553</font> |
| 5   | clearCompleted | 889_490      | 945_796   | $0.0000012576 | $1.25             | <font color="red">+3_160</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 1_921_464    | 1_358_585 | $0.0000018065 | $1.80             |
| 1   | addTodo        | 1_677_002    | 1_260_800 | $0.0000016764 | $1.67             |
| 2   | completeTodo   | 987_976      | 985_190   | $0.0000013100 | $1.30             |
| 3   | clearCompleted | 898_570      | 949_428   | $0.0000012624 | $1.26             |
| 4   | completeTodo   | 986_300      | 984_520   | $0.0000013091 | $1.30             |
| 5   | clearCompleted | 886_330      | 944_532   | $0.0000012559 | $1.25             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

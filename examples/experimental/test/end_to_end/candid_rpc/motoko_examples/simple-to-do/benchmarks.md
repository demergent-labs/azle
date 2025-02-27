# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | addTodo        | 1_925_836    | 1_360_334 | $0.0000018088 | $1.80             | <font color="green">-4_821</font> |
| 1   | addTodo        | 1_676_699    | 1_260_679 | $0.0000016763 | $1.67             | <font color="green">-3_353</font> |
| 2   | completeTodo   | 992_737      | 987_094   | $0.0000013125 | $1.31             | <font color="green">-610</font>   |
| 3   | clearCompleted | 899_648      | 949_859   | $0.0000012630 | $1.26             | <font color="green">-3_393</font> |
| 4   | completeTodo   | 987_389      | 984_955   | $0.0000013097 | $1.30             | <font color="green">-2_464</font> |
| 5   | clearCompleted | 885_854      | 944_341   | $0.0000012557 | $1.25             | <font color="green">-3_636</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 1_930_657    | 1_362_262 | $0.0000018114 | $1.81             |
| 1   | addTodo        | 1_680_052    | 1_262_020 | $0.0000016781 | $1.67             |
| 2   | completeTodo   | 993_347      | 987_338   | $0.0000013128 | $1.31             |
| 3   | clearCompleted | 903_041      | 951_216   | $0.0000012648 | $1.26             |
| 4   | completeTodo   | 989_853      | 985_941   | $0.0000013110 | $1.31             |
| 5   | clearCompleted | 889_490      | 945_796   | $0.0000012576 | $1.25             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

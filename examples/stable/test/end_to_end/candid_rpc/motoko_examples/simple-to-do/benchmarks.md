# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | addTodo        | 2_060_255    | 7_060_255 | $0.0000096725 | $9.67             | <font color="green">-23_772</font> |
| 1   | addTodo        | 1_767_083    | 6_767_083 | $0.0000092709 | $9.27             | <font color="green">-23_121</font> |
| 2   | completeTodo   | 1_036_988    | 6_036_988 | $0.0000082707 | $8.27             | <font color="green">-22_948</font> |
| 3   | clearCompleted | 968_112      | 5_968_112 | $0.0000081763 | $8.17             | <font color="green">-23_736</font> |
| 4   | completeTodo   | 1_026_862    | 6_026_862 | $0.0000082568 | $8.25             | <font color="green">-25_871</font> |
| 5   | clearCompleted | 953_813      | 5_953_813 | $0.0000081567 | $8.15             | <font color="green">-21_895</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 2_084_027    | 7_084_027 | $0.0000097051 | $9.70             |
| 1   | addTodo        | 1_790_204    | 6_790_204 | $0.0000093026 | $9.30             |
| 2   | completeTodo   | 1_059_936    | 6_059_936 | $0.0000083021 | $8.30             |
| 3   | clearCompleted | 991_848      | 5_991_848 | $0.0000082088 | $8.20             |
| 4   | completeTodo   | 1_052_733    | 6_052_733 | $0.0000082922 | $8.29             |
| 5   | clearCompleted | 975_708      | 5_975_708 | $0.0000081867 | $8.18             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).

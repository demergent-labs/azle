# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | addTodo        | 1_919_516    | 1_357_806 | $0.0000018054 | $1.80             | <font color="green">-2_732</font> |
| 1   | addTodo        | 1_677_686    | 1_261_074 | $0.0000016768 | $1.67             | <font color="green">-920</font>   |
| 2   | completeTodo   | 989_491      | 985_796   | $0.0000013108 | $1.31             | <font color="red">+432</font>     |
| 3   | clearCompleted | 896_149      | 948_459   | $0.0000012611 | $1.26             | <font color="green">-2_268</font> |
| 4   | completeTodo   | 982_020      | 982_808   | $0.0000013068 | $1.30             | <font color="green">-3_254</font> |
| 5   | clearCompleted | 879_038      | 941_615   | $0.0000012520 | $1.25             | <font color="green">-3_074</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 1_922_248    | 1_358_899 | $0.0000018069 | $1.80             |
| 1   | addTodo        | 1_678_606    | 1_261_442 | $0.0000016773 | $1.67             |
| 2   | completeTodo   | 989_059      | 985_623   | $0.0000013106 | $1.31             |
| 3   | clearCompleted | 898_417      | 949_366   | $0.0000012623 | $1.26             |
| 4   | completeTodo   | 985_274      | 984_109   | $0.0000013085 | $1.30             |
| 5   | clearCompleted | 882_112      | 942_844   | $0.0000012537 | $1.25             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

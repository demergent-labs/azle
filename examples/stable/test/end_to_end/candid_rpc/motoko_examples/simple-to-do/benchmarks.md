# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | addTodo        | 1_934_950    | 1_363_980 | $0.0000018136 | $1.81             | <font color="green">-64_798</font> |
| 1   | addTodo        | 1_676_093    | 1_260_437 | $0.0000016760 | $1.67             | <font color="green">-35_770</font> |
| 2   | completeTodo   | 999_137      | 989_654   | $0.0000013159 | $1.31             | <font color="green">-5_835</font>  |
| 3   | clearCompleted | 933_280      | 963_312   | $0.0000012809 | $1.28             | <font color="green">-1_753</font>  |
| 4   | completeTodo   | 993_650      | 987_460   | $0.0000013130 | $1.31             | <font color="green">-5_409</font>  |
| 5   | clearCompleted | 918_395      | 957_358   | $0.0000012730 | $1.27             | <font color="green">-2_698</font>  |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 1_999_748    | 1_389_899 | $0.0000018481 | $1.84             |
| 1   | addTodo        | 1_711_863    | 1_274_745 | $0.0000016950 | $1.69             |
| 2   | completeTodo   | 1_004_972    | 991_988   | $0.0000013190 | $1.31             |
| 3   | clearCompleted | 935_033      | 964_013   | $0.0000012818 | $1.28             |
| 4   | completeTodo   | 999_059      | 989_623   | $0.0000013159 | $1.31             |
| 5   | clearCompleted | 921_093      | 958_437   | $0.0000012744 | $1.27             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

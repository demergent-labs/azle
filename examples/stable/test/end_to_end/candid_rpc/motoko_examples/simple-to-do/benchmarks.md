# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | addTodo        | 2_102_981    | 1_431_192 | $0.0000019030 | $1.90             | <font color="red">+103_233</font> |
| 1   | addTodo        | 1_810_807    | 1_314_322 | $0.0000017476 | $1.74             | <font color="red">+98_944</font>  |
| 2   | completeTodo   | 1_072_391    | 1_018_956 | $0.0000013549 | $1.35             | <font color="red">+67_419</font>  |
| 3   | clearCompleted | 1_004_604    | 991_841   | $0.0000013188 | $1.31             | <font color="red">+69_571</font>  |
| 4   | completeTodo   | 1_063_150    | 1_015_260 | $0.0000013500 | $1.34             | <font color="red">+64_091</font>  |
| 5   | clearCompleted | 984_235      | 983_694   | $0.0000013080 | $1.30             | <font color="red">+63_142</font>  |

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

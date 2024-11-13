# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | addTodo        | 1_999_748    | 1_389_899 | $0.0000018481 | $1.84             | <font color="red">+91_276</font> |
| 1   | addTodo        | 1_711_863    | 1_274_745 | $0.0000016950 | $1.69             | <font color="red">+68_908</font> |
| 2   | completeTodo   | 1_004_972    | 991_988   | $0.0000013190 | $1.31             | <font color="red">+27_360</font> |
| 3   | clearCompleted | 935_033      | 964_013   | $0.0000012818 | $1.28             | <font color="red">+19_494</font> |
| 4   | completeTodo   | 999_059      | 989_623   | $0.0000013159 | $1.31             | <font color="red">+29_254</font> |
| 5   | clearCompleted | 921_093      | 958_437   | $0.0000012744 | $1.27             | <font color="red">+22_949</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 1_908_472    | 1_353_388 | $0.0000017996 | $1.79             |
| 1   | addTodo        | 1_642_955    | 1_247_182 | $0.0000016583 | $1.65             |
| 2   | completeTodo   | 977_612      | 981_044   | $0.0000013045 | $1.30             |
| 3   | clearCompleted | 915_539      | 956_215   | $0.0000012715 | $1.27             |
| 4   | completeTodo   | 969_805      | 977_922   | $0.0000013003 | $1.30             |
| 5   | clearCompleted | 898_144      | 949_257   | $0.0000012622 | $1.26             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

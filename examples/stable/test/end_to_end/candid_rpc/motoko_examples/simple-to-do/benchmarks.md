⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | addTodo        | 2_084_027    | 1_423_610 | $0.0000018929 | $1.89             | <font color="red">+4_142</font> |
| 1   | addTodo        | 1_790_204    | 1_306_081 | $0.0000017367 | $1.73             | <font color="red">+2_439</font> |
| 2   | completeTodo   | 1_059_936    | 1_013_974 | $0.0000013483 | $1.34             | <font color="red">+4_004</font> |
| 3   | clearCompleted | 991_848      | 986_739   | $0.0000013120 | $1.31             | <font color="red">+3_111</font> |
| 4   | completeTodo   | 1_052_733    | 1_011_093 | $0.0000013444 | $1.34             | <font color="red">+3_882</font> |
| 5   | clearCompleted | 975_708      | 980_283   | $0.0000013035 | $1.30             | <font color="red">+5_644</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 2_079_885    | 1_421_954 | $0.0000018907 | $1.89             |
| 1   | addTodo        | 1_787_765    | 1_305_106 | $0.0000017354 | $1.73             |
| 2   | completeTodo   | 1_055_932    | 1_012_372 | $0.0000013461 | $1.34             |
| 3   | clearCompleted | 988_737      | 985_494   | $0.0000013104 | $1.31             |
| 4   | completeTodo   | 1_048_851    | 1_009_540 | $0.0000013424 | $1.34             |
| 5   | clearCompleted | 970_064      | 978_025   | $0.0000013005 | $1.30             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

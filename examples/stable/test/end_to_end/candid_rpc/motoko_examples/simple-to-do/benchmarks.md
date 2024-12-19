# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | addTodo        | 1_934_950    | 1_363_980 | $0.0000018136 | $1.81             | <font color="red">+26_478</font> |
| 1   | addTodo        | 1_676_093    | 1_260_437 | $0.0000016760 | $1.67             | <font color="red">+33_138</font> |
| 2   | completeTodo   | 999_137      | 989_654   | $0.0000013159 | $1.31             | <font color="red">+21_525</font> |
| 3   | clearCompleted | 933_280      | 963_312   | $0.0000012809 | $1.28             | <font color="red">+17_741</font> |
| 4   | completeTodo   | 993_650      | 987_460   | $0.0000013130 | $1.31             | <font color="red">+23_845</font> |
| 5   | clearCompleted | 918_395      | 957_358   | $0.0000012730 | $1.27             | <font color="red">+20_251</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

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

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

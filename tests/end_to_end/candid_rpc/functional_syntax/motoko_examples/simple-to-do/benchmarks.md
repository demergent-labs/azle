# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.24.2-rc.93

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 1_930_718    | 1_362_287 | $0.0000018114 | $1.81             |
| 1   | addTodo        | 1_684_139    | 1_263_655 | $0.0000016802 | $1.68             |
| 2   | completeTodo   | 995_505      | 988_202   | $0.0000013140 | $1.31             |
| 3   | clearCompleted | 901_562      | 950_624   | $0.0000012640 | $1.26             |
| 4   | completeTodo   | 989_071      | 985_628   | $0.0000013106 | $1.31             |
| 5   | clearCompleted | 886_932      | 944_772   | $0.0000012562 | $1.25             |

## Baseline benchmarks Azle version: 0.24.2-rc.93

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

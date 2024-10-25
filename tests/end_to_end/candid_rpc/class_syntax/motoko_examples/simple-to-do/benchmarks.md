# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 1_902_303    | 1_350_921 | $0.0000017963 | $1.79             |
| 1   | addTodo        | 1_637_878    | 1_245_151 | $0.0000016556 | $1.65             |
| 2   | completeTodo   | 973_288      | 979_315   | $0.0000013022 | $1.30             |
| 3   | clearCompleted | 912_087      | 954_834   | $0.0000012696 | $1.26             |
| 4   | completeTodo   | 968_100      | 977_240   | $0.0000012994 | $1.29             |
| 5   | clearCompleted | 895_113      | 948_045   | $0.0000012606 | $1.26             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

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

# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addTodo        | 1_931_995    | 1_362_798 | $0.0000018121 | $1.81             |
| 1   | addTodo        | 1_684_386    | 1_263_754 | $0.0000016804 | $1.68             |
| 2   | completeTodo   | 991_484      | 986_593   | $0.0000013118 | $1.31             |
| 3   | clearCompleted | 901_701      | 950_680   | $0.0000012641 | $1.26             |
| 4   | completeTodo   | 988_519      | 985_407   | $0.0000013103 | $1.31             |
| 5   | clearCompleted | 886_530      | 944_612   | $0.0000012560 | $1.25             |

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

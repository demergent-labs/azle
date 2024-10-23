# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0

| Execution | Method Name                  | Instructions | Cycles    | USD           | USD/Thousand Calls | Change                          |
| --------- | ---------------------------- | ------------ | --------- | ------------- | ------------------ | ------------------------------- |
| 0         | getRandomnessDirectly        | 1,406,105    | 1,152,442 | $0.0000015404 | $0.0015            | <font color="green">-104</font> |
| 1         | getRandomnessIndirectly      | 1,333,065    | 1,123,226 | $0.0000015013 | $0.0015            | <font color="red">0</font>      |
| 2         | getRandomnessSuperIndirectly | 1,375,020    | 1,140,008 | $0.0000015237 | $0.0015            | <font color="green">-12</font>  |
| 3         | returnPromiseVoid            | 1,315,034    | 1,116,013 | $0.0000014917 | $0.0015            | <font color="green">-11</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Execution | Method Name                  | Instructions | Cycles    | USD           | USD/Thousand Calls |
| --------- | ---------------------------- | ------------ | --------- | ------------- | ------------------ |
| 0         | getRandomnessDirectly        | 1,406,209    | 1,152,483 | $0.0000015404 | $0.0015            |
| 1         | getRandomnessIndirectly      | 1,333,065    | 1,123,226 | $0.0000015013 | $0.0015            |
| 2         | getRandomnessSuperIndirectly | 1,375,032    | 1,140,012 | $0.0000015238 | $0.0015            |
| 3         | returnPromiseVoid            | 1,315,045    | 1,116,018 | $0.0000014917 | $0.0015            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

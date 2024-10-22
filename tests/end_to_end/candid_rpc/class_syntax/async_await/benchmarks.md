# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0

| Execution | Method Name                  | Instructions | Cycles    | USD           | Change                         |
| --------- | ---------------------------- | ------------ | --------- | ------------- | ------------------------------ |
| 0         | getRandomnessDirectly        | 1,402,526    | 1,151,010 | $0.0000015385 | <font color="green">-69</font> |
| 1         | getRandomnessIndirectly      | 1,332,834    | 1,123,133 | $0.0000015012 | <font color="red">+58</font>   |
| 2         | getRandomnessSuperIndirectly | 1,373,304    | 1,139,321 | $0.0000015228 | <font color="green">-35</font> |
| 3         | returnPromiseVoid            | 1,319,087    | 1,117,634 | $0.0000014938 | <font color="green">-69</font> |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

## Baseline benchmarks Azle version: 0.25.0

| Execution | Method Name                  | Instructions | Cycles    | USD           |
| --------- | ---------------------------- | ------------ | --------- | ------------- |
| 0         | getRandomnessDirectly        | 1,402,595    | 1,151,038 | $0.0000015385 |
| 1         | getRandomnessIndirectly      | 1,332,776    | 1,123,110 | $0.0000015012 |
| 2         | getRandomnessSuperIndirectly | 1,373,339    | 1,139,335 | $0.0000015228 |
| 3         | returnPromiseVoid            | 1,319,156    | 1,117,662 | $0.0000014939 |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

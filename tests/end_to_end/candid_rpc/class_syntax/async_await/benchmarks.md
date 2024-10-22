# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0

| Execution | Method Name                  | Instructions | Cycles    | USD           | Change                           |
| --------- | ---------------------------- | ------------ | --------- | ------------- | -------------------------------- |
| 0         | getRandomnessDirectly        | 1,402,595    | 1,151,038 | $0.0000015385 | <font color="green">-430</font>  |
| 1         | getRandomnessIndirectly      | 1,332,776    | 1,123,110 | $0.0000015012 | <font color="red">+1189</font>   |
| 2         | getRandomnessSuperIndirectly | 1,373,339    | 1,139,335 | $0.0000015228 | <font color="green">-1668</font> |
| 3         | returnPromiseVoid            | 1,319,156    | 1,117,662 | $0.0000014939 | <font color="red">+6527</font>   |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

## Baseline benchmarks Azle version: 0.25.0

| Execution | Method Name | Instructions | Cycles    | USD           |
| --------- | ----------- | ------------ | --------- | ------------- |
| 0         | 0           | 1,403,025    | 1,151,210 | $0.0000015387 |
| 1         | 1           | 1,331,587    | 1,122,634 | $0.0000015005 |
| 2         | 2           | 1,375,007    | 1,140,002 | $0.0000015237 |
| 3         | 3           | 1,312,629    | 1,115,051 | $0.0000014904 |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

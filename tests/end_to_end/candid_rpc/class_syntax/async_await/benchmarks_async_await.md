## Current benchmarks Azle version: 0.25.0

| Execution | Method Name                  | Instructions | Cycles    | USD           |
| --------- | ---------------------------- | ------------ | --------- | ------------- |
| 0         | getRandomnessDirectly        | 1,400,920    | 1,150,368 | $0.0000015376 |
| 1         | getRandomnessIndirectly      | 1,331,629    | 1,122,651 | $0.0000015005 |
| 2         | getRandomnessSuperIndirectly | 1,372,096    | 1,138,838 | $0.0000015222 |
| 3         | returnPromiseVoid            | 1,314,426    | 1,115,770 | $0.0000014913 |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

## Baseline benchmarks Azle version: 0.25.0

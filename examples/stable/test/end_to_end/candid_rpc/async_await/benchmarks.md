# Benchmarks for async_await

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name                                 | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getRandomnessDirectly                       | 968_549      | 977_419   | $0.0000012996 | $1.29             | <font color="green">-69_049</font>  |
| 1   | getRandomnessIndirectly                     | 907_946      | 953_178   | $0.0000012674 | $1.26             | <font color="green">-71_504</font>  |
| 2   | getRandomnessSuperIndirectly                | 944_578      | 967_831   | $0.0000012869 | $1.28             | <font color="green">-71_912</font>  |
| 3   | getRandomnessSuperIndirectlyAndConcurrently | 2_099_608    | 1_429_843 | $0.0000019012 | $1.90             | <font color="red">+1_132_204</font> |
| 4   | returnPromiseVoid                           | 896_167      | 948_466   | $0.0000012611 | $1.26             |                                     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 1_037_598    | 1_005_039 | $0.0000013364 | $1.33             |
| 1   | getRandomnessIndirectly      | 979_450      | 981_780   | $0.0000013054 | $1.30             |
| 2   | getRandomnessSuperIndirectly | 1_016_490    | 996_596   | $0.0000013251 | $1.32             |
| 3   | returnPromiseVoid            | 967_404      | 976_961   | $0.0000012990 | $1.29             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

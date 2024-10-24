# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | getRandomnessDirectly        | 1_405_445    | 1_152_178 | $0.0000015320 | $1.53             | <font color="green">-3_803</font> |
| 1   | getRandomnessIndirectly      | 1_334_058    | 1_123_623 | $0.0000014940 | $1.49             | <font color="red">+7_982</font>   |
| 2   | getRandomnessSuperIndirectly | 1_376_268    | 1_140_507 | $0.0000015165 | $1.51             | <font color="red">+7_724</font>   |
| 3   | returnPromiseVoid            | 1_321_885    | 1_118_754 | $0.0000014876 | $1.48             | <font color="red">+8_769</font>   |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 1_409_248    | 1_153_699 | $0.0000015340 | $1.53             |
| 1   | getRandomnessIndirectly      | 1_326_076    | 1_120_430 | $0.0000014898 | $1.48             |
| 2   | getRandomnessSuperIndirectly | 1_368_544    | 1_137_417 | $0.0000015124 | $1.51             |
| 3   | returnPromiseVoid            | 1_313_116    | 1_115_246 | $0.0000014829 | $1.48             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_billion))
-   Base fee: 590_000 cycles
-   Per instruction fee: 0.4 cycles
-   Additional fee: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

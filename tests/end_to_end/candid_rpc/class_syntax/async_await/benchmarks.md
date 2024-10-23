# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Thousand Calls | Change                          |
| --- | ---------------------------- | ------------ | --------- | ------------- | ------------------ | ------------------------------- |
| 0   | getRandomnessDirectly        | 1_406_064    | 1_152_425 | $0.0000015403 | $0.0015            | <font color="green">-41</font>  |
| 1   | getRandomnessIndirectly      | 1_333_024    | 1_123_209 | $0.0000015013 | $0.0015            | <font color="green">-41</font>  |
| 2   | getRandomnessSuperIndirectly | 1_374_898    | 1_139_959 | $0.0000015237 | $0.0015            | <font color="green">-122</font> |
| 3   | returnPromiseVoid            | 1_315_016    | 1_116_006 | $0.0000014917 | $0.0015            | <font color="green">-18</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Thousand Calls |
| --- | ---------------------------- | ------------ | --------- | ------------- | ------------------ |
| 0   | getRandomnessDirectly        | 1_406_105    | 1_152_442 | $0.0000015404 | $0.0015            |
| 1   | getRandomnessIndirectly      | 1_333_065    | 1_123_226 | $0.0000015013 | $0.0015            |
| 2   | getRandomnessSuperIndirectly | 1_375_020    | 1_140_008 | $0.0000015237 | $0.0015            |
| 3   | returnPromiseVoid            | 1_315_034    | 1_116_013 | $0.0000014917 | $0.0015            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base*fee + (per_instruction_fee * number*of_instructions) + (additional_fee_per_billion * floor(number_of_instructions / 1_billion))
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   Additional fee: 400,000,000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.33661 (as of December 18, 2023)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | getRandomnessDirectly        | 1_409_225    | 1_153_690 | $0.0000015340 | $1.5340           | <font color="green">-3904</font> |
| 1   | getRandomnessIndirectly      | 1_326_053    | 1_120_421 | $0.0000014898 | $1.4898           | <font color="green">-402</font>  |
| 2   | getRandomnessSuperIndirectly | 1_368_544    | 1_137_417 | $0.0000015124 | $1.5124           | <font color="green">-366</font>  |
| 3   | returnPromiseVoid            | 1_313_024    | 1_115_209 | $0.0000014829 | $1.4829           | <font color="green">-873</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 1_413_129    | 1_155_251 | $0.0000015361 | $1.5361           |
| 1   | getRandomnessIndirectly      | 1_326_455    | 1_120_582 | $0.0000014900 | $1.4900           |
| 2   | getRandomnessSuperIndirectly | 1_368_910    | 1_137_564 | $0.0000015126 | $1.5126           |
| 3   | returnPromiseVoid            | 1_313_897    | 1_115_558 | $0.0000014833 | $1.4833           |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base*fee + (per_instruction_fee * number*of_instructions) + (additional_fee_per_billion * floor(number_of_instructions / 1_billion))
-   Base fee: 590_000 cycles
-   Per instruction fee: 0.4 cycles
-   Additional fee: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

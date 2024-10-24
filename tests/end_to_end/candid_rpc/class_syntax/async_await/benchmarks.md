# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls | Change                         |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------ |
| 0   | getRandomnessDirectly        | 1_409_294    | 1_153_717 | $0.0000015341 | $1.5341           | <font color="red">+46</font>   |
| 1   | getRandomnessIndirectly      | 1_326_076    | 1_120_430 | $0.0000014898 | $1.4898           | <font color="red">0</font>     |
| 2   | getRandomnessSuperIndirectly | 1_368_561    | 1_137_424 | $0.0000015124 | $1.5124           | <font color="red">+17</font>   |
| 3   | returnPromiseVoid            | 1_313_047    | 1_115_218 | $0.0000014829 | $1.4829           | <font color="green">-69</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 1_409_248    | 1_153_699 | $0.0000015340 | $1.5340           |
| 1   | getRandomnessIndirectly      | 1_326_076    | 1_120_430 | $0.0000014898 | $1.4898           |
| 2   | getRandomnessSuperIndirectly | 1_368_544    | 1_137_417 | $0.0000015124 | $1.5124           |
| 3   | returnPromiseVoid            | 1_313_116    | 1_115_246 | $0.0000014829 | $1.4829           |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_billion))
-   Base fee: 590_000 cycles
-   Per instruction fee: 0.4 cycles
-   Additional fee: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

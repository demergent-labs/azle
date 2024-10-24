# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | getRandomnessDirectly        | 1_403_216    | 1_151_286 | $0.0000015308 | $1.53             | <font color="green">-6_032</font> |
| 1   | getRandomnessIndirectly      | 1_331_416    | 1_122_566 | $0.0000014926 | $1.49             | <font color="red">+5_340</font>   |
| 2   | getRandomnessSuperIndirectly | 1_370_777    | 1_138_310 | $0.0000015136 | $1.51             | <font color="red">+2_233</font>   |
| 3   | returnPromiseVoid            | 1_315_499    | 1_116_199 | $0.0000014842 | $1.48             | <font color="red">+2_383</font>   |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 1_409_248    | 1_153_699 | $0.0000015340 | $1.53             |
| 1   | getRandomnessIndirectly      | 1_326_076    | 1_120_430 | $0.0000014898 | $1.48             |
| 2   | getRandomnessSuperIndirectly | 1_368_544    | 1_137_417 | $0.0000015124 | $1.51             |
| 3   | returnPromiseVoid            | 1_313_116    | 1_115_246 | $0.0000014829 | $1.48             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

# Benchmarks for async_await

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | getRandomnessDirectly        | 1_400_969    | 1_150_387 | $0.0000015296 | $1.52             | <font color="green">-2_247</font> |
| 1   | getRandomnessIndirectly      | 1_329_913    | 1_121_965 | $0.0000014918 | $1.49             | <font color="green">-1_503</font> |
| 2   | getRandomnessSuperIndirectly | 1_372_715    | 1_139_086 | $0.0000015146 | $1.51             | <font color="red">+1_938</font>   |
| 3   | returnPromiseVoid            | 1_313_860    | 1_115_544 | $0.0000014833 | $1.48             | <font color="green">-1_639</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 1_403_216    | 1_151_286 | $0.0000015308 | $1.53             |
| 1   | getRandomnessIndirectly      | 1_331_416    | 1_122_566 | $0.0000014926 | $1.49             |
| 2   | getRandomnessSuperIndirectly | 1_370_777    | 1_138_310 | $0.0000015136 | $1.51             |
| 3   | returnPromiseVoid            | 1_315_499    | 1_116_199 | $0.0000014842 | $1.48             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

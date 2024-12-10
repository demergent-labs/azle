# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRandomnessDirectly        | 1_356_134    | 1_132_453 | $0.0000015058 | $1.50             | <font color="green">-47_082</font> |
| 1   | getRandomnessIndirectly      | 1_320_152    | 1_118_060 | $0.0000014867 | $1.48             | <font color="green">-11_148</font> |
| 2   | getRandomnessSuperIndirectly | 1_355_483    | 1_132_193 | $0.0000015054 | $1.50             | <font color="green">-15_225</font> |
| 3   | returnPromiseVoid            | 1_307_074    | 1_112_829 | $0.0000014797 | $1.47             | <font color="green">-8_460</font>  |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 1_403_216    | 1_151_286 | $0.0000015308 | $1.53             |
| 1   | getRandomnessIndirectly      | 1_331_300    | 1_122_520 | $0.0000014926 | $1.49             |
| 2   | getRandomnessSuperIndirectly | 1_370_708    | 1_138_283 | $0.0000015135 | $1.51             |
| 3   | returnPromiseVoid            | 1_315_534    | 1_116_213 | $0.0000014842 | $1.48             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

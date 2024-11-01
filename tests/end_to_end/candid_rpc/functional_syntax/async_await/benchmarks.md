# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | getRandomnessDirectly        | 140_161_719  | 56_654_687 | $0.0000753320 | $75.33            | <font color="red">+129_012</font> |
| 1   | getRandomnessIndirectly      | 140_170_699  | 56_658_279 | $0.0000753368 | $75.33            | <font color="red">+167_451</font> |
| 2   | getRandomnessSuperIndirectly | 140_168_287  | 56_657_314 | $0.0000753355 | $75.33            | <font color="red">+154_225</font> |
| 3   | returnPromiseVoid            | 140_137_530  | 56_645_012 | $0.0000753192 | $75.31            | <font color="red">+12_357</font>  |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 140_032_707  | 56_603_082 | $0.0000752634 | $75.26            |
| 1   | getRandomnessIndirectly      | 140_003_248  | 56_591_299 | $0.0000752478 | $75.24            |
| 2   | getRandomnessSuperIndirectly | 140_014_062  | 56_595_624 | $0.0000752535 | $75.25            |
| 3   | returnPromiseVoid            | 140_125_173  | 56_640_069 | $0.0000753126 | $75.31            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRandomnessDirectly        | 140_061_992  | 56_614_796 | $0.0000752790 | $75.27            | <font color="red">+29_285</font>   |
| 1   | getRandomnessIndirectly      | 140_175_847  | 56_660_338 | $0.0000753396 | $75.33            | <font color="red">+172_599</font>  |
| 2   | getRandomnessSuperIndirectly | 140_110_775  | 56_634_310 | $0.0000753049 | $75.30            | <font color="red">+96_713</font>   |
| 3   | returnPromiseVoid            | 140_074_066  | 56_619_626 | $0.0000752854 | $75.28            | <font color="green">-51_107</font> |

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

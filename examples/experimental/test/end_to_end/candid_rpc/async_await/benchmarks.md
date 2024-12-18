# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRandomnessDirectly        | 140_152_097  | 56_650_838 | $0.0000753269 | $75.32            | <font color="green">-9_656</font>  |
| 1   | getRandomnessIndirectly      | 140_258_045  | 56_693_218 | $0.0000753833 | $75.38            | <font color="red">+87_254</font>   |
| 2   | getRandomnessSuperIndirectly | 140_244_829  | 56_687_931 | $0.0000753762 | $75.37            | <font color="red">+76_577</font>   |
| 3   | returnPromiseVoid            | 140_078_466  | 56_621_386 | $0.0000752878 | $75.28            | <font color="green">-58_948</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 140_161_753  | 56_654_701 | $0.0000753321 | $75.33            |
| 1   | getRandomnessIndirectly      | 140_170_791  | 56_658_316 | $0.0000753369 | $75.33            |
| 2   | getRandomnessSuperIndirectly | 140_168_252  | 56_657_300 | $0.0000753355 | $75.33            |
| 3   | returnPromiseVoid            | 140_137_414  | 56_644_965 | $0.0000753191 | $75.31            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

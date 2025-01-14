# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls | Change                               |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------ |
| 0   | getRandomnessDirectly        | 151_172_733  | 61_059_093 | $0.0000811884 | $81.18            | <font color="red">+11_010_980</font> |
| 1   | getRandomnessIndirectly      | 151_341_892  | 61_126_756 | $0.0000812784 | $81.27            | <font color="red">+11_171_101</font> |
| 2   | getRandomnessSuperIndirectly | 151_268_211  | 61_097_284 | $0.0000812392 | $81.23            | <font color="red">+11_099_959</font> |
| 3   | returnPromiseVoid            | 151_232_271  | 61_082_908 | $0.0000812201 | $81.22            | <font color="red">+11_094_857</font> |

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

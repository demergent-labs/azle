# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRandomnessDirectly        | 140_152_051  | 56_650_820 | $0.0000753269 | $75.32            | <font color="red">+119_344</font>  |
| 1   | getRandomnessIndirectly      | 140_258_126  | 56_693_250 | $0.0000753833 | $75.38            | <font color="red">+254_878</font>  |
| 2   | getRandomnessSuperIndirectly | 140_244_944  | 56_687_977 | $0.0000753763 | $75.37            | <font color="red">+230_882</font>  |
| 3   | returnPromiseVoid            | 140_078_408  | 56_621_363 | $0.0000752877 | $75.28            | <font color="green">-46_765</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 140_032_707  | 56_603_082 | $0.0000752634 | $75.26            |
| 1   | getRandomnessIndirectly      | 140_003_248  | 56_591_299 | $0.0000752478 | $75.24            |
| 2   | getRandomnessSuperIndirectly | 140_014_062  | 56_595_624 | $0.0000752535 | $75.25            |
| 3   | returnPromiseVoid            | 140_125_173  | 56_640_069 | $0.0000753126 | $75.31            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

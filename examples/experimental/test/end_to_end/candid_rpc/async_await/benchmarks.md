# Benchmarks for async_await

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | getRandomnessDirectly        | 150_468_324  | 60_777_329 | $0.0000808138 | $80.81            | <font color="red">+149_458_140</font> |
| 1   | getRandomnessIndirectly      | 150_268_299  | 60_697_319 | $0.0000807074 | $80.70            | <font color="red">+149_290_048</font> |
| 2   | getRandomnessSuperIndirectly | 150_415_679  | 60_756_271 | $0.0000807858 | $80.78            | <font color="red">+149_396_661</font> |
| 3   | returnPromiseVoid            | 150_268_318  | 60_697_327 | $0.0000807074 | $80.70            | <font color="red">+149_304_743</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                  | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | ------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 1_010_184    | 994_073 | $0.0000013218 | $1.32             |
| 1   | getRandomnessIndirectly      | 978_251      | 981_300 | $0.0000013048 | $1.30             |
| 2   | getRandomnessSuperIndirectly | 1_019_018    | 997_607 | $0.0000013265 | $1.32             |
| 3   | returnPromiseVoid            | 963_575      | 975_430 | $0.0000012970 | $1.29             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

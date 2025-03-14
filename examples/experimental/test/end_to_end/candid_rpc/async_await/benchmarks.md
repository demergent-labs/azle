⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for async_await

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name                  | Instructions | Cycles  | USD           | USD/Million Calls | Change                                  |
| --- | ---------------------------- | ------------ | ------- | ------------- | ----------------- | --------------------------------------- |
| 0   | getRandomnessDirectly        | 1_010_184    | 994_073 | $0.0000013218 | $1.32             | <font color="green">-149_277_091</font> |
| 1   | getRandomnessIndirectly      | 978_251      | 981_300 | $0.0000013048 | $1.30             | <font color="green">-149_355_208</font> |
| 2   | getRandomnessSuperIndirectly | 1_019_018    | 997_607 | $0.0000013265 | $1.32             | <font color="green">-149_302_390</font> |
| 3   | returnPromiseVoid            | 963_575      | 975_430 | $0.0000012970 | $1.29             | <font color="green">-149_497_440</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 150_287_275  | 60_704_910 | $0.0000807175 | $80.71            |
| 1   | getRandomnessIndirectly      | 150_333_459  | 60_723_383 | $0.0000807421 | $80.74            |
| 2   | getRandomnessSuperIndirectly | 150_321_408  | 60_718_563 | $0.0000807357 | $80.73            |
| 3   | returnPromiseVoid            | 150_461_015  | 60_774_406 | $0.0000808099 | $80.80            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

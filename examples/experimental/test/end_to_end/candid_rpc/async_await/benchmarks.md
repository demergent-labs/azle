# Benchmarks for async_await

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | getRandomnessDirectly        | 149_472_430  | 60_378_972 | $0.0000802841 | $80.28            | <font color="green">-1_608_430</font> |
| 1   | getRandomnessIndirectly      | 149_336_788  | 60_324_715 | $0.0000802120 | $80.21            | <font color="green">-1_734_503</font> |
| 2   | getRandomnessSuperIndirectly | 149_332_119  | 60_322_847 | $0.0000802095 | $80.20            | <font color="green">-1_770_204</font> |
| 3   | returnPromiseVoid            | 149_300_414  | 60_310_165 | $0.0000801926 | $80.19            | <font color="green">-1_804_801</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 151_080_860  | 61_022_344 | $0.0000811396 | $81.13            |
| 1   | getRandomnessIndirectly      | 151_071_291  | 61_018_516 | $0.0000811345 | $81.13            |
| 2   | getRandomnessSuperIndirectly | 151_102_323  | 61_030_929 | $0.0000811510 | $81.15            |
| 3   | returnPromiseVoid            | 151_105_215  | 61_032_086 | $0.0000811525 | $81.15            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

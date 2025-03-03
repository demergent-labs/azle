# Benchmarks for async_await

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getRandomnessDirectly        | 150_301_660  | 60_710_664 | $0.0000807251 | $80.72            | <font color="red">+829_230</font>   |
| 1   | getRandomnessIndirectly      | 150_345_504  | 60_728_201 | $0.0000807485 | $80.74            | <font color="red">+1_008_716</font> |
| 2   | getRandomnessSuperIndirectly | 150_393_499  | 60_747_399 | $0.0000807740 | $80.77            | <font color="red">+1_061_380</font> |
| 3   | returnPromiseVoid            | 150_326_528  | 60_720_611 | $0.0000807384 | $80.73            | <font color="red">+1_026_114</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 149_472_430  | 60_378_972 | $0.0000802841 | $80.28            |
| 1   | getRandomnessIndirectly      | 149_336_788  | 60_324_715 | $0.0000802120 | $80.21            |
| 2   | getRandomnessSuperIndirectly | 149_332_119  | 60_322_847 | $0.0000802095 | $80.20            |
| 3   | returnPromiseVoid            | 149_300_414  | 60_310_165 | $0.0000801926 | $80.19            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

# Benchmarks for async_await

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRandomnessDirectly        | 150_287_275  | 60_704_910 | $0.0000807175 | $80.71            | <font color="green">-14_385</font> |
| 1   | getRandomnessIndirectly      | 150_333_459  | 60_723_383 | $0.0000807421 | $80.74            | <font color="green">-12_045</font> |
| 2   | getRandomnessSuperIndirectly | 150_321_408  | 60_718_563 | $0.0000807357 | $80.73            | <font color="green">-72_091</font> |
| 3   | returnPromiseVoid            | 150_461_015  | 60_774_406 | $0.0000808099 | $80.80            | <font color="red">+134_487</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 150_301_660  | 60_710_664 | $0.0000807251 | $80.72            |
| 1   | getRandomnessIndirectly      | 150_345_504  | 60_728_201 | $0.0000807485 | $80.74            |
| 2   | getRandomnessSuperIndirectly | 150_393_499  | 60_747_399 | $0.0000807740 | $80.77            |
| 3   | returnPromiseVoid            | 150_326_528  | 60_720_611 | $0.0000807384 | $80.73            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

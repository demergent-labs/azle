# Benchmarks for complex_types

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser     | 19_628_156   | 8_441_262  | $0.0000112241 | $11.22            | <font color="green">-13_802</font> |
| 1   | createThread   | 20_866_866   | 8_936_746  | $0.0000118829 | $11.88            | <font color="green">-16_331</font> |
| 2   | createPost     | 23_398_231   | 9_949_292  | $0.0000132293 | $13.22            | <font color="red">+8_444</font>    |
| 3   | createReaction | 26_498_401   | 11_189_360 | $0.0000148782 | $14.87            | <font color="red">+20_203</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 19_641_958   | 8_446_783  | $0.0000112314 | $11.23            |
| 1   | createThread   | 20_883_197   | 8_943_278  | $0.0000118916 | $11.89            |
| 2   | createPost     | 23_389_787   | 9_945_914  | $0.0000132248 | $13.22            |
| 3   | createReaction | 26_478_198   | 11_181_279 | $0.0000148674 | $14.86            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

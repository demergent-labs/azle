# Benchmarks for complex_types

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | createUser     | 19_648_333   | 8_449_333  | $0.0000112348 | $11.23            | <font color="red">+8_469</font>  |
| 1   | createThread   | 20_888_521   | 8_945_408  | $0.0000118944 | $11.89            | <font color="red">+19_441</font> |
| 2   | createPost     | 23_400_796   | 9_950_318  | $0.0000132306 | $13.23            | <font color="red">+3_082</font>  |
| 3   | createReaction | 26_516_038   | 11_196_415 | $0.0000148875 | $14.88            | <font color="red">+69_949</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 19_639_864   | 8_445_945  | $0.0000112303 | $11.23            |
| 1   | createThread   | 20_869_080   | 8_937_632  | $0.0000118841 | $11.88            |
| 2   | createPost     | 23_397_714   | 9_949_085  | $0.0000132290 | $13.22            |
| 3   | createReaction | 26_446_089   | 11_168_435 | $0.0000148503 | $14.85            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

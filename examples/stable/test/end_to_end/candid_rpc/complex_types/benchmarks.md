# Benchmarks for complex_types

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | createUser     | 19_650_158   | 8_450_063  | $0.0000112358 | $11.23            | <font color="red">+10_294</font> |
| 1   | createThread   | 20_872_901   | 8_939_160  | $0.0000118861 | $11.88            | <font color="red">+3_821</font>  |
| 2   | createPost     | 23_412_002   | 9_954_800  | $0.0000132366 | $13.23            | <font color="red">+14_288</font> |
| 3   | createReaction | 26_483_074   | 11_183_229 | $0.0000148700 | $14.87            | <font color="red">+36_985</font> |

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

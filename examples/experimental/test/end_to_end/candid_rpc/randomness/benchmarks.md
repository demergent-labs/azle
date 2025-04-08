# Benchmarks for randomness

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade  | 4_858_365_655 | 3_543_936_262 | $0.0047122657 | $4_712.26         | <font color="red">+39_180_286</font> |
| 1   | randomNumber | 1_039_695     | 1_005_878     | $0.0000013375 | $1.33             | <font color="green">-3_212</font>    |
| 2   | randomNumber | 1_027_546     | 1_001_018     | $0.0000013310 | $1.33             | <font color="green">-2_059</font>    |
| 3   | randomNumber | 1_027_546     | 1_001_018     | $0.0000013310 | $1.33             | <font color="green">-2_059</font>    |
| 4   | randomNumber | 1_027_546     | 1_001_018     | $0.0000013310 | $1.33             | <font color="green">-2_059</font>    |
| 5   | randomNumber | 1_026_967     | 1_000_786     | $0.0000013307 | $1.33             | <font color="green">-2_638</font>    |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade  | 4_819_185_369 | 3_528_264_147 | $0.0046914270 | $4_691.42         |
| 1   | randomNumber | 1_042_907     | 1_007_162     | $0.0000013392 | $1.33             |
| 2   | randomNumber | 1_029_605     | 1_001_842     | $0.0000013321 | $1.33             |
| 3   | randomNumber | 1_029_605     | 1_001_842     | $0.0000013321 | $1.33             |
| 4   | randomNumber | 1_029_605     | 1_001_842     | $0.0000013321 | $1.33             |
| 5   | randomNumber | 1_029_605     | 1_001_842     | $0.0000013321 | $1.33             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

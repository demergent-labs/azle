# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser      | 14_149_317   | 6_249_726  | $0.0000083101 | $8.31             | <font color="red">+1_086</font>    |
| 1   | createRecording | 34_560_159   | 14_414_063 | $0.0000191659 | $19.16            | <font color="green">-32_168</font> |
| 2   | deleteRecording | 48_468_444   | 19_977_377 | $0.0000265633 | $26.56            | <font color="red">+1_990</font>    |
| 3   | createRecording | 34_397_789   | 14_349_115 | $0.0000190796 | $19.07            | <font color="red">+13_894</font>   |
| 4   | deleteUser      | 34_029_991   | 14_201_996 | $0.0000188840 | $18.88            | <font color="green">-39_066</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_148_231   | 6_249_292  | $0.0000083095 | $8.30             |
| 1   | createRecording | 34_592_327   | 14_426_930 | $0.0000191831 | $19.18            |
| 2   | deleteRecording | 48_466_454   | 19_976_581 | $0.0000265623 | $26.56            |
| 3   | createRecording | 34_383_895   | 14_343_558 | $0.0000190722 | $19.07            |
| 4   | deleteUser      | 34_069_057   | 14_217_622 | $0.0000189047 | $18.90            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

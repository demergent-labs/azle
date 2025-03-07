# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser      | 14_143_821   | 6_247_528  | $0.0000083072 | $8.30             | <font color="green">-5_496</font>  |
| 1   | createRecording | 34_571_008   | 14_418_403 | $0.0000191717 | $19.17            | <font color="red">+10_849</font>   |
| 2   | deleteRecording | 48_449_751   | 19_969_900 | $0.0000265534 | $26.55            | <font color="green">-18_693</font> |
| 3   | createRecording | 34_376_581   | 14_340_632 | $0.0000190683 | $19.06            | <font color="green">-21_208</font> |
| 4   | deleteUser      | 34_028_122   | 14_201_248 | $0.0000188830 | $18.88            | <font color="green">-1_869</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_149_317   | 6_249_726  | $0.0000083101 | $8.31             |
| 1   | createRecording | 34_560_159   | 14_414_063 | $0.0000191659 | $19.16            |
| 2   | deleteRecording | 48_468_444   | 19_977_377 | $0.0000265633 | $26.56            |
| 3   | createRecording | 34_397_789   | 14_349_115 | $0.0000190796 | $19.07            |
| 4   | deleteUser      | 34_029_991   | 14_201_996 | $0.0000188840 | $18.88            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | createUser      | 14_157_291   | 6_252_916  | $0.0000083143 | $8.31             | <font color="red">+13_470</font> |
| 1   | createRecording | 34_583_248   | 14_423_299 | $0.0000191782 | $19.17            | <font color="red">+12_240</font> |
| 2   | deleteRecording | 48_517_016   | 19_996_806 | $0.0000265892 | $26.58            | <font color="red">+67_265</font> |
| 3   | createRecording | 34_405_726   | 14_352_290 | $0.0000190838 | $19.08            | <font color="red">+29_145</font> |
| 4   | deleteUser      | 34_051_859   | 14_210_743 | $0.0000188956 | $18.89            | <font color="red">+23_737</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_143_821   | 6_247_528  | $0.0000083072 | $8.30             |
| 1   | createRecording | 34_571_008   | 14_418_403 | $0.0000191717 | $19.17            |
| 2   | deleteRecording | 48_449_751   | 19_969_900 | $0.0000265534 | $26.55            |
| 3   | createRecording | 34_376_581   | 14_340_632 | $0.0000190683 | $19.06            |
| 4   | deleteUser      | 34_028_122   | 14_201_248 | $0.0000188830 | $18.88            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

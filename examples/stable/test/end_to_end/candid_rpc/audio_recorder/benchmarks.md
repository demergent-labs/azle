# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser      | 12_147_153   | 5_448_861  | $0.0000072452 | $7.24             | <font color="green">-22_437</font> |
| 1   | createRecording | 34_159_738   | 14_253_895 | $0.0000189530 | $18.95            | <font color="green">-65_725</font> |
| 2   | deleteRecording | 48_283_143   | 19_903_257 | $0.0000264648 | $26.46            | <font color="green">-47_618</font> |
| 3   | createRecording | 33_980_283   | 14_182_113 | $0.0000188575 | $18.85            | <font color="green">-2_408</font>  |
| 4   | deleteUser      | 32_898_953   | 13_749_581 | $0.0000182824 | $18.28            | <font color="green">-17_205</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 12_169_590   | 5_457_836  | $0.0000072571 | $7.25             |
| 1   | createRecording | 34_225_463   | 14_280_185 | $0.0000189879 | $18.98            |
| 2   | deleteRecording | 48_330_761   | 19_922_304 | $0.0000264901 | $26.49            |
| 3   | createRecording | 33_982_691   | 14_183_076 | $0.0000188588 | $18.85            |
| 4   | deleteUser      | 32_916_158   | 13_756_463 | $0.0000182916 | $18.29            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

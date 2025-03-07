# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | createUser      | 12_168_896   | 5_457_558  | $0.0000072568 | $7.25             | <font color="green">-1_251</font> |
| 1   | createRecording | 34_222_800   | 14_279_120 | $0.0000189865 | $18.98            | <font color="green">-2_388</font> |
| 2   | deleteRecording | 48_350_992   | 19_930_396 | $0.0000265008 | $26.50            | <font color="green">-8_708</font> |
| 3   | createRecording | 34_039_257   | 14_205_702 | $0.0000188889 | $18.88            | <font color="green">-3_197</font> |
| 4   | deleteUser      | 32_943_673   | 13_767_469 | $0.0000183062 | $18.30            | <font color="green">-5_473</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 12_170_147   | 5_458_058  | $0.0000072574 | $7.25             |
| 1   | createRecording | 34_225_188   | 14_280_075 | $0.0000189878 | $18.98            |
| 2   | deleteRecording | 48_359_700   | 19_933_880 | $0.0000265055 | $26.50            |
| 3   | createRecording | 34_042_454   | 14_206_981 | $0.0000188906 | $18.89            |
| 4   | deleteUser      | 32_949_146   | 13_769_658 | $0.0000183091 | $18.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

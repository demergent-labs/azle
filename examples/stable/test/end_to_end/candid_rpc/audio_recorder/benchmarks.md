# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | createUser      | 12_170_147   | 5_458_058  | $0.0000072574 | $7.25             | <font color="red">+5_647</font>  |
| 1   | createRecording | 34_225_188   | 14_280_075 | $0.0000189878 | $18.98            | <font color="red">+16_899</font> |
| 2   | deleteRecording | 48_359_700   | 19_933_880 | $0.0000265055 | $26.50            | <font color="red">+27_140</font> |
| 3   | createRecording | 34_042_454   | 14_206_981 | $0.0000188906 | $18.89            | <font color="red">+13_703</font> |
| 4   | deleteUser      | 32_949_146   | 13_769_658 | $0.0000183091 | $18.30            | <font color="red">+15_476</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 12_164_500   | 5_455_800  | $0.0000072544 | $7.25             |
| 1   | createRecording | 34_208_289   | 14_273_315 | $0.0000189788 | $18.97            |
| 2   | deleteRecording | 48_332_560   | 19_923_024 | $0.0000264910 | $26.49            |
| 3   | createRecording | 34_028_751   | 14_201_500 | $0.0000188833 | $18.88            |
| 4   | deleteUser      | 32_933_670   | 13_763_468 | $0.0000183009 | $18.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

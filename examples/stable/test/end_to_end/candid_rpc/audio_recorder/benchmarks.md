# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser      | 12_171_989   | 5_458_795  | $0.0000072584 | $7.25             | <font color="red">+7_489</font>    |
| 1   | createRecording | 34_164_760   | 14_255_904 | $0.0000189556 | $18.95            | <font color="green">-43_529</font> |
| 2   | deleteRecording | 48_282_702   | 19_903_080 | $0.0000264645 | $26.46            | <font color="green">-49_858</font> |
| 3   | createRecording | 33_986_787   | 14_184_714 | $0.0000188610 | $18.86            | <font color="green">-41_964</font> |
| 4   | deleteUser      | 32_954_098   | 13_771_639 | $0.0000183117 | $18.31            | <font color="red">+20_428</font>   |

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

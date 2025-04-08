# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser      | 12_162_821   | 5_455_128  | $0.0000072535 | $7.25             | <font color="green">-6_075</font>  |
| 1   | createRecording | 34_169_472   | 14_257_788 | $0.0000189582 | $18.95            | <font color="green">-53_328</font> |
| 2   | deleteRecording | 48_303_396   | 19_911_358 | $0.0000264755 | $26.47            | <font color="green">-47_596</font> |
| 3   | createRecording | 33_967_070   | 14_176_828 | $0.0000188505 | $18.85            | <font color="green">-72_187</font> |
| 4   | deleteUser      | 32_926_951   | 13_760_780 | $0.0000182973 | $18.29            | <font color="green">-16_722</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 12_168_896   | 5_457_558  | $0.0000072568 | $7.25             |
| 1   | createRecording | 34_222_800   | 14_279_120 | $0.0000189865 | $18.98            |
| 2   | deleteRecording | 48_350_992   | 19_930_396 | $0.0000265008 | $26.50            |
| 3   | createRecording | 34_039_257   | 14_205_702 | $0.0000188889 | $18.88            |
| 4   | deleteUser      | 32_943_673   | 13_767_469 | $0.0000183062 | $18.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

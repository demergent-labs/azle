⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser      | 12_169_590   | 5_457_836  | $0.0000072571 | $7.25             | <font color="red">+694</font>      |
| 1   | createRecording | 34_225_463   | 14_280_185 | $0.0000189879 | $18.98            | <font color="red">+2_663</font>    |
| 2   | deleteRecording | 48_330_761   | 19_922_304 | $0.0000264901 | $26.49            | <font color="green">-20_231</font> |
| 3   | createRecording | 33_982_691   | 14_183_076 | $0.0000188588 | $18.85            | <font color="green">-56_566</font> |
| 4   | deleteUser      | 32_916_158   | 13_756_463 | $0.0000182916 | $18.29            | <font color="green">-27_515</font> |

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

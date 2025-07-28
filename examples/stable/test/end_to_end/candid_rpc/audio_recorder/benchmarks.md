⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | createUser      | 12_207_473   | 5_472_989  | $0.0000072773 | $7.27             | <font color="red">+37_883</font>  |
| 1   | createRecording | 34_366_124   | 14_336_449 | $0.0000190627 | $19.06            | <font color="red">+140_661</font> |
| 2   | deleteRecording | 48_461_881   | 19_974_752 | $0.0000265598 | $26.55            | <font color="red">+131_120</font> |
| 3   | createRecording | 34_117_382   | 14_236_952 | $0.0000189304 | $18.93            | <font color="red">+134_691</font> |
| 4   | deleteUser      | 33_006_277   | 13_792_510 | $0.0000183395 | $18.33            | <font color="red">+90_119</font>  |

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

# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | createUser      | 11_845_515   | 16_845_515 | $0.0000230784 | $23.07            | <font color="green">-361_958</font>   |
| 1   | createRecording | 33_554_235   | 38_554_235 | $0.0000528193 | $52.81            | <font color="green">-811_889</font>   |
| 2   | deleteRecording | 47_325_333   | 52_325_333 | $0.0000716857 | $71.68            | <font color="green">-1_136_548</font> |
| 3   | createRecording | 33_330_398   | 38_330_398 | $0.0000525126 | $52.51            | <font color="green">-786_984</font>   |
| 4   | deleteUser      | 32_221_487   | 37_221_487 | $0.0000509934 | $50.99            | <font color="green">-784_790</font>   |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 12_207_473   | 17_207_473 | $0.0000235742 | $23.57            |
| 1   | createRecording | 34_366_124   | 39_366_124 | $0.0000539316 | $53.93            |
| 2   | deleteRecording | 48_461_881   | 53_461_881 | $0.0000732428 | $73.24            |
| 3   | createRecording | 34_117_382   | 39_117_382 | $0.0000535908 | $53.59            |
| 4   | deleteUser      | 33_006_277   | 38_006_277 | $0.0000520686 | $52.06            |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).

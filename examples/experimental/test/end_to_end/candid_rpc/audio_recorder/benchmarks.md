# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | createUser      | 14_174_825   | 6_259_930  | $0.0000083236 | $8.32             | <font color="red">+1_646</font>  |
| 1   | createRecording | 34_654_566   | 14_451_826 | $0.0000192162 | $19.21            | <font color="red">+73_652</font> |
| 2   | deleteRecording | 48_588_067   | 20_025_226 | $0.0000266269 | $26.62            | <font color="red">+44_029</font> |
| 3   | createRecording | 34_473_261   | 14_379_304 | $0.0000191197 | $19.11            | <font color="red">+47_066</font> |
| 4   | deleteUser      | 34_144_002   | 14_247_600 | $0.0000189446 | $18.94            | <font color="red">+25_621</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_173_179   | 6_259_271  | $0.0000083228 | $8.32             |
| 1   | createRecording | 34_580_914   | 14_422_365 | $0.0000191770 | $19.17            |
| 2   | deleteRecording | 48_544_038   | 20_007_615 | $0.0000266035 | $26.60            |
| 3   | createRecording | 34_426_195   | 14_360_478 | $0.0000190947 | $19.09            |
| 4   | deleteUser      | 34_118_381   | 14_237_352 | $0.0000189310 | $18.93            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | createUser      | 14_177_637   | 6_261_054  | $0.0000083251 | $8.32             | <font color="red">+4_458</font>  |
| 1   | createRecording | 34_658_543   | 14_453_417 | $0.0000192183 | $19.21            | <font color="red">+77_629</font> |
| 2   | deleteRecording | 48_593_157   | 20_027_262 | $0.0000266296 | $26.62            | <font color="red">+49_119</font> |
| 3   | createRecording | 34_489_361   | 14_385_744 | $0.0000191283 | $19.12            | <font color="red">+63_166</font> |
| 4   | deleteUser      | 34_166_078   | 14_256_431 | $0.0000189563 | $18.95            | <font color="red">+47_697</font> |

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

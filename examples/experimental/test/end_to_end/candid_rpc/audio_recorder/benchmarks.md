# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | createUser      | 14_174_056   | 6_259_622  | $0.0000083232 | $8.32             | <font color="red">+4_286</font>  |
| 1   | createRecording | 34_644_265   | 14_447_706 | $0.0000192107 | $19.21            | <font color="red">+10_934</font> |
| 2   | deleteRecording | 48_568_254   | 20_017_301 | $0.0000266164 | $26.61            | <font color="red">+57_756</font> |
| 3   | createRecording | 34_473_038   | 14_379_215 | $0.0000191196 | $19.11            | <font color="red">+46_345</font> |
| 4   | deleteUser      | 34_143_128   | 14_247_251 | $0.0000189441 | $18.94            | <font color="red">+25_051</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_169_770   | 6_257_908  | $0.0000083210 | $8.32             |
| 1   | createRecording | 34_633_331   | 14_443_332 | $0.0000192049 | $19.20            |
| 2   | deleteRecording | 48_510_498   | 19_994_199 | $0.0000265857 | $26.58            |
| 3   | createRecording | 34_426_693   | 14_360_677 | $0.0000190950 | $19.09            |
| 4   | deleteUser      | 34_118_077   | 14_237_230 | $0.0000189308 | $18.93            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

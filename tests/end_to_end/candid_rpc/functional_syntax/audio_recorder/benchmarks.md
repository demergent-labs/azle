# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser      | 14_168_631   | 6_257_452  | $0.0000083203 | $8.32             | <font color="green">-1_139</font>  |
| 1   | createRecording | 34_580_749   | 14_422_299 | $0.0000191769 | $19.17            | <font color="green">-52_582</font> |
| 2   | deleteRecording | 48_568_071   | 20_017_228 | $0.0000266163 | $26.61            | <font color="red">+57_573</font>   |
| 3   | createRecording | 34_409_210   | 14_353_684 | $0.0000190857 | $19.08            | <font color="green">-17_483</font> |
| 4   | deleteUser      | 34_101_983   | 14_230_793 | $0.0000189223 | $18.92            | <font color="green">-16_094</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_169_770   | 6_257_908  | $0.0000083210 | $8.32             |
| 1   | createRecording | 34_633_331   | 14_443_332 | $0.0000192049 | $19.20            |
| 2   | deleteRecording | 48_510_498   | 19_994_199 | $0.0000265857 | $26.58            |
| 3   | createRecording | 34_426_693   | 14_360_677 | $0.0000190950 | $19.09            |
| 4   | deleteUser      | 34_118_077   | 14_237_230 | $0.0000189308 | $18.93            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

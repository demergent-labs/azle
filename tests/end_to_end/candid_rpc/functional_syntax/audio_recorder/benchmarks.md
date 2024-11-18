# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser      | 14_171_079   | 6_258_431  | $0.0000083216 | $8.32             | <font color="red">+1_309</font>    |
| 1   | createRecording | 34_615_735   | 14_436_294 | $0.0000191955 | $19.19            | <font color="green">-17_596</font> |
| 2   | deleteRecording | 48_523_344   | 19_999_337 | $0.0000265925 | $26.59            | <font color="red">+12_846</font>   |
| 3   | createRecording | 34_440_735   | 14_366_294 | $0.0000191024 | $19.10            | <font color="red">+14_042</font>   |
| 4   | deleteUser      | 34_128_985   | 14_241_594 | $0.0000189366 | $18.93            | <font color="red">+10_908</font>   |

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

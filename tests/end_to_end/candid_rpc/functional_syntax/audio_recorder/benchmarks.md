# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.24.2-rc.61

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_171_724   | 6_258_689  | $0.0000083220 | $8.32             |
| 1   | createRecording | 34_593_412   | 14_427_364 | $0.0000191836 | $19.18            |
| 2   | deleteRecording | 48_499_836   | 19_989_934 | $0.0000265800 | $26.58            |
| 3   | createRecording | 34_427_714   | 14_361_085 | $0.0000190955 | $19.09            |
| 4   | deleteUser      | 34_111_163   | 14_234_465 | $0.0000189271 | $18.92            |

## Baseline benchmarks Azle version: 0.24.2-rc.61

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.24.2-rc.92

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_152_427   | 6_250_970  | $0.0000083117 | $8.31             |
| 1   | createRecording | 34_631_230   | 14_442_492 | $0.0000192037 | $19.20            |
| 2   | deleteRecording | 48_516_621   | 19_996_648 | $0.0000265889 | $26.58            |
| 3   | createRecording | 34_424_203   | 14_359_681 | $0.0000190936 | $19.09            |
| 4   | deleteUser      | 34_125_866   | 14_240_346 | $0.0000189350 | $18.93            |

## Baseline benchmarks Azle version: 0.24.2-rc.92

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

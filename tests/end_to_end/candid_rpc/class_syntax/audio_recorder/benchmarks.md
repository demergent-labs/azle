# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.24.2-rc.93

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 11_206_218   | 5_072_487  | $0.0000067447 | $6.74             |
| 1   | createRecording | 30_858_034   | 12_933_213 | $0.0000171969 | $17.19            |
| 2   | deleteRecording | 43_580_100   | 18_022_040 | $0.0000239634 | $23.96            |
| 3   | createRecording | 30_663_353   | 12_855_341 | $0.0000170934 | $17.09            |
| 4   | deleteUser      | 29_776_533   | 12_500_613 | $0.0000166217 | $16.62            |

## Baseline benchmarks Azle version: 0.24.2-rc.93

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

# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.24.2-rc.92

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 11_209_139   | 5_073_655  | $0.0000067463 | $6.74             |
| 1   | createRecording | 30_860_571   | 12_934_228 | $0.0000171983 | $17.19            |
| 2   | deleteRecording | 43_561_406   | 18_014_562 | $0.0000239534 | $23.95            |
| 3   | createRecording | 30_654_492   | 12_851_796 | $0.0000170886 | $17.08            |
| 4   | deleteUser      | 29_782_214   | 12_502_885 | $0.0000166247 | $16.62            |

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

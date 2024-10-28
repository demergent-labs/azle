# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.24.2-rc.87

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 11_207_705   | 5_073_082  | $0.0000067455 | $6.74             |
| 1   | createRecording | 30_872_665   | 12_939_066 | $0.0000172047 | $17.20            |
| 2   | deleteRecording | 43_583_117   | 18_023_246 | $0.0000239650 | $23.96            |
| 3   | createRecording | 30_648_537   | 12_849_414 | $0.0000170855 | $17.08            |
| 4   | deleteUser      | 29_775_714   | 12_500_285 | $0.0000166213 | $16.62            |

## Baseline benchmarks Azle version: 0.24.2-rc.87

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

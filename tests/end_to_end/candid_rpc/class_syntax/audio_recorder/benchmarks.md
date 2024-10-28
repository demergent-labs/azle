# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 11_206_589   | 5_072_635  | $0.0000067449 | $6.74             |
| 1   | createRecording | 30_859_923   | 12_933_969 | $0.0000171979 | $17.19            |
| 2   | deleteRecording | 43_565_569   | 18_016_227 | $0.0000239556 | $23.95            |
| 3   | createRecording | 30_640_795   | 12_846_318 | $0.0000170814 | $17.08            |
| 4   | deleteUser      | 29_767_947   | 12_497_178 | $0.0000166171 | $16.61            |

## Baseline benchmarks Azle version: 0.24.2-rc.88

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

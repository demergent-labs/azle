# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.24.2-rc.85

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 11_210_014   | 5_074_005  | $0.0000067468 | $6.74             |
| 1   | createRecording | 30_866_930   | 12_936_772 | $0.0000172016 | $17.20            |
| 2   | deleteRecording | 43_571_685   | 18_018_674 | $0.0000239589 | $23.95            |
| 3   | createRecording | 30_658_318   | 12_853_327 | $0.0000170907 | $17.09            |
| 4   | deleteUser      | 29_788_000   | 12_505_200 | $0.0000166278 | $16.62            |

## Baseline benchmarks Azle version: 0.24.2-rc.85

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

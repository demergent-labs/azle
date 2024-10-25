# Benchmarks for complex_types

## Current benchmarks Azle version: 0.24.2-rc.70

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 18_924_614   | 8_159_845  | $0.0000108499 | $10.84            |
| 1   | createThread   | 20_093_611   | 8_627_444  | $0.0000114717 | $11.47            |
| 2   | createPost     | 22_477_562   | 9_581_024  | $0.0000127396 | $12.73            |
| 3   | createReaction | 25_400_027   | 10_750_010 | $0.0000142940 | $14.29            |

## Baseline benchmarks Azle version: 0.24.2-rc.70

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
